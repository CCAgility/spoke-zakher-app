---
name: Directus SME
description: Directus CMS deployment, API quirks, bootstrap traps, and Cloud Run integration patterns.
---

# DIRECTUS SME — BATTLE-TESTED OPERATING CONSTRAINTS

This skill codifies every undocumented behavior, silent failure mode, and architectural constraint discovered during 10 days of production debugging (March 25 – April 4, 2026). Any agent working with Directus MUST read and follow these rules.

---

## 0. MANDATORY RESEARCH GATE (BEFORE ANY DIRECTUS WORK)

Before writing code, Dockerfiles, deployment scripts, or debugging any Directus issue, the agent MUST:

1. **Check the latest Directus release notes** at `https://github.com/directus/directus/releases` for any breaking changes, deprecations, or new behaviors since our pinned version (`10.10.7`).
2. **Cross-reference the official Directus docs** at `https://docs.directus.io/self-hosted/config-options.html` for any config option being used. Do NOT rely on training data — the API surface changes frequently.
3. **If proposing a version upgrade**, read the full changelog between the current pinned version and the target version. Document all breaking changes in a pre-upgrade assessment before touching any config.

> **Why**: Multiple days were lost during Genesis v1.1.2 because agents relied on stale training data about Directus API behavior (e.g., the `schema: {}` requirement, `ADMIN_TOKEN` bootstrap semantics). Live docs are the single source of truth.

---

## 1. VERSION POLICY (ALWAYS APPLY)

- **Pin to `directus/directus:10.10.7`**. NEVER use `:latest` in production.
- Version upgrades are a deliberate, tested operation — never automatic.
- All Dockerfiles, `gcloud run deploy`, and `docker-compose.yml` files must reference the pinned tag.
- **Reference**: Lessons Learned #19.

---

## 2. KNOWN API QUIRKS (ALWAYS APPLY)

### 2.1 POST /collections Requires `schema: {}`
- The `POST /collections` endpoint **requires** the `schema` property in the request body.
- When `schema` is omitted, Directus 10.10.7 returns **403 Forbidden** (NOT 400 Bad Request).
- This misleading error code caused multi-day debugging of permissions when the actual issue was a missing property.
- **Rule**: Always include `"schema": {}` for table collections, or `"schema": null` for folder-only collections.
- **Reference**: Lessons Learned #18, `setup-directus-schema.ps1`.

### 2.2 ADMIN_TOKEN Bootstrap Failure
- `ADMIN_TOKEN` IS a valid Directus env var (documented under "First Admin User").
- However, in practice on Cloud Run, it often **fails silently** to populate `directus_users.token` during bootstrap.
- The admin user gets created (from `ADMIN_EMAIL`/`ADMIN_PASSWORD`), but the token column remains NULL.
- **Rule**: After ANY Directus bootstrap, always verify:
  ```sql
  SELECT email, token IS NOT NULL as has_token, role FROM directus_users;
  ```
- If token is NULL, apply the deterministic fix:
  ```sql
  UPDATE directus_users SET token = '<ADMIN_TOKEN_VALUE>' WHERE email = '<ADMIN_EMAIL>';
  ```
- **Reference**: Lessons Learned #17, Handoff #35/#36.

### 2.3 Admin Role Verification
- After bootstrap, verify the admin user has the correct role with `admin_access = true`:
  ```sql
  SELECT r.name, r.admin_access FROM directus_roles r
  JOIN directus_users u ON u.role = r.id
  WHERE u.email = '<ADMIN_EMAIL>';
  ```

---

## 3. SECRET MANAGEMENT: WINDOWS → CLOUD RUN (ALWAYS APPLY)

### The CRLF Poisoning Bug
- PowerShell string operations (`Set-Content`, `Out-File`, `echo`, `>`) append `\r\n` (CRLF) to output.
- Node.js `fs.writeFileSync()` on Windows also appends CRLF.
- Cloud Run injects Secret Manager values **verbatim**, including invisible trailing bytes.
- When Directus compares env var `ADMIN_TOKEN` (34 bytes with `\r\n`) against Bearer header (32 bytes), the comparison **always fails**.

### Binary-Safe Write Protocol
```powershell
# CORRECT — binary-safe, no trailing bytes
$value = "your-secret-value"
$bytes = [System.Text.Encoding]::UTF8.GetBytes($value)
[System.IO.File]::WriteAllBytes("C:\path\to\secret.txt", $bytes)

# Then push to Secret Manager
gcloud secrets versions add SECRET_NAME --data-file="C:\path\to\secret.txt"
```

### Verification
```powershell
# Verify no trailing CRLF — last byte must NOT be 0x0D or 0x0A
$bytes = [System.IO.File]::ReadAllBytes("C:\path\to\secret.txt")
$lastByte = $bytes[$bytes.Length - 1]
if ($lastByte -eq 0x0D -or $lastByte -eq 0x0A) {
    Write-Error "CRLF DETECTED — secret is poisoned"
}
```

- **Reference**: Lessons Learned #15, Handoff #34.

---

## 4. BOOTSTRAP PROTOCOL (ALWAYS APPLY)

### Rule: Bootstrap is a Job, Not an Entrypoint
- `npx directus bootstrap` must run as a **separate Cloud Run Job**, never as the container entrypoint command.
- Running bootstrap on every container start:
  - Adds 5–10 seconds to cold-start latency.
  - Risks schema corruption on concurrent container starts during autoscaling.
  - Re-runs migration checks unnecessarily.

### Correct Pattern
1. Deploy the Cloud Run **Service** with entrypoint: `npx directus start`
2. Run bootstrap as a one-time **Cloud Run Job**:
   ```bash
   gcloud run jobs create directus-bootstrap \
     --image=<PINNED_IMAGE> \
     --service-account=<SA_EMAIL> \
     --set-env-vars="DB_CLIENT=pg,DB_HOST=..." \
     --command="npx","directus","bootstrap" \
     --region=us-central1 \
     --project=<PROJECT_ID>
   ```
3. After bootstrap completes, verify admin user state (see Section 2.2).
4. Delete the job after verification: `gcloud run jobs delete directus-bootstrap --quiet`

### Post-Bootstrap Checklist
- [ ] Admin user exists with correct email
- [ ] `token` column is populated (not NULL)
- [ ] Admin role has `admin_access = true`
- [ ] `/server/health` returns `{"status":"ok"}`
- [ ] `/server/ping` returns `pong`

---

## 5. STATELESS ARCHITECTURE RULES (ALWAYS APPLY)

### Storage — Zero Local Disk
```env
STORAGE_LOCATIONS="gcs"
STORAGE_GCS_DRIVER="gcs"
STORAGE_GCS_BUCKET="<PROJECT_ID>-assets"
```
- Local container disk writes are **strictly prohibited**.
- The container must be 100% disposable — kill it, redeploy, all assets survive in GCS.

### Caching — Redis for Horizontal Scaling
```env
CACHE_ENABLED="true"
CACHE_STORE="redis"
CACHE_REDIS_HOST="<MEMORYSTORE_IP>"
CACHE_REDIS_PORT="6379"
```
- In-memory caching fails during autoscaling (each container has its own cache).
- Redis (Memorystore) provides a shared cache layer.

### Health Check Endpoints
| Endpoint | Purpose | Expected Response |
|---|---|---|
| `/server/ping` | Startup probe | `pong` (200 OK) |
| `/server/health` | Liveness probe | `{"status":"ok"}` (200 OK) |
| `/server/info` | Readiness / deep check | System info JSON (200 OK, requires auth) |

### Cloud Run Configuration
```yaml
startup-cpu-boost: true          # Mitigate Node.js cold-start
containerConcurrency: 80         # Directus is I/O bound, not CPU bound
min-instances: 0                 # FinOps: scale to zero for PoC
```

### ⚠️ PORT TRAP — Directus Listens on 8080, NOT 8055
- Cloud Run injects `PORT=8080` as an environment variable.
- Directus respects this and binds to port **8080** (NOT its default 8055).
- All health probes (`startupProbe`, `livenessProbe`) MUST target port `8080`.
- The `containerPort` in `service.yaml` MUST be `8080`.
- **Setting probes to port 8055 will crash the container** — verified April 4, 2026.

---

## 6. CLOUD RUN NETWORKING — v23 HYBRID ARCHITECTURE (ALWAYS APPLY)

### Architecture: Shared VPC (Host/Service Project)
- **Hub Project** (`agility-ai-services`) is the Shared VPC Host.
- **Spoke Projects** (e.g., `grupo-zakher-web-cms-dev`) are Service Projects.
- Cloud Run in the spoke uses **Direct VPC Egress** for GCS FUSE only.
- This eliminates Serverless VPC Access Connectors ($15/mo per spoke saved).

### ⚠️ CRITICAL: DVPE Does NOT Route to PSA Ranges
- Cloud Run DVPE does **not reliably inherit VPC peering routes** to Cloud SQL Private Service Access (PSA) ranges (e.g., `10.127.x.x`).
- `exportCustomRoutes` on the peering only affects static/BGP routes, NOT subnet routes.
- `exchangeSubnetRoutes: true` was already enabled — it did not fix the issue.
- **This was confirmed across 4 deployment iterations (v20–v23) on April 5, 2026.**

### Cloud SQL Connection — Auth Proxy Sidecar (TCP Mode)
- **ALWAYS** use the Cloud SQL Auth Proxy sidecar for DB connectivity.
- Set `DB_HOST: "127.0.0.1"` — the proxy runs as a sidecar sharing localhost.
- Use TCP mode (`--port=5432`), NOT Unix socket mode (avoids `emptyDir` volume issues).
- The Service Account needs `roles/cloudsql.client` on the hub project.
```yaml
# Sidecar container in service.yaml
- name: cloud-sql-proxy
  image: gcr.io/cloud-sql-connectors/cloud-sql-proxy:2.8.2
  args:
  - "--structured-logs"
  - "--port=5432"
  - "agility-ai-services:us-central1:agility-ai-instance"
```

### VPC Egress — FUSE Compatibility
- **ALWAYS** use `vpc-access-egress: private-ranges-only` when GCS FUSE is present.
- `all-traffic` breaks FUSE because GCSFuse resolves `storage.googleapis.com` to public IPs. Without Cloud NAT, the traffic is black-holed.
- **Reference**: Lessons Learned #12, v21 boot log.

## 6.1 GCS FUSE — AHEAD-OF-TIME SCHEMA HYDRATION (ALWAYS APPLY)

### Purpose
Bypass the 2.5-minute Directus schema introspection deadlock on cold start.

### How It Works
1. A `snapshot.yaml` is pre-generated via `npx directus schema snapshot` and stored in GCS.
2. GCS FUSE mounts the bucket at `/opt/directus/state` on container start.
3. The entrypoint script checks for the snapshot and runs `schema apply` before `directus start`.

### Configuration
```yaml
volumes:
  - name: schema-volume
    csi:
      driver: gcsfuse.run.googleapis.com
      readOnly: false
      volumeAttributes:
        bucketName: zakher-factory-state-dev
        mountOptions: "implicit-dirs"
```

### Rules
- The FUSE bucket is for **schema state only**, not assets. Assets go to `<PROJECT_ID>-assets`.
- The runtime SA needs `roles/storage.objectAdmin` on the FUSE bucket.
- **Reference**: Lessons Learned #9, Handoff #38/#39.

---

## 7. CLOUD RUN SECRET BINDINGS (ALWAYS APPLY)

### Required Secrets (Minimum)
| Secret Name | Directus Env Var | Purpose |
|---|---|---|
| `directus-key` | `KEY` | Encryption key for sessions |
| `directus-secret` | `SECRET` | Encryption secret for JWTs |
| `directus-admin-email` | `ADMIN_EMAIL` | Bootstrap admin user email |
| `directus-admin-password` | `ADMIN_PASSWORD` | Bootstrap admin user password |
| `directus-admin-token` | `ADMIN_TOKEN` | Static API token for automation |
| `directus-db-password` | `DB_PASSWORD` | Cloud SQL database password |

### Critical Rule
- **NEVER** use `--set-secrets` for additive changes — it wipes ALL existing bindings.
- **ALWAYS** use `--update-secrets` to modify individual secrets.
- **Reference**: Lessons Learned #13.

---

_Maintained by Agility AI Architects // April 5, 2026_
_Source: 10-day Genesis v1.1.2 recovery, SME Golden Template Spec, v23 Hybrid Architecture validation_
