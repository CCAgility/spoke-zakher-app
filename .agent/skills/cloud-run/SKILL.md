---
name: Cloud Run SME
description: Cloud Run multi-container deployment, DVPE networking, GCS FUSE, sidecar patterns, and cold-start optimization.
---

# CLOUD RUN SME — BATTLE-TESTED OPERATING CONSTRAINTS

This skill codifies undocumented behaviors, networking traps, and architectural patterns discovered during production debugging of the Agility Project Factory (March 25 – April 5, 2026).

---

## 1. EXECUTION ENVIRONMENT (ALWAYS APPLY)

- **ALWAYS** use `gen2` execution environment for multi-container workloads.
- Gen2 is required for GCS FUSE CSI driver and multi-container sidecars.
- Set via annotation: `run.googleapis.com/execution-environment: gen2`

---

## 2. MULTI-CONTAINER SIDECARS

### TCP Localhost Sharing
- All containers in a Cloud Run service share `127.0.0.1` (localhost).
- Sidecar containers can expose ports accessible to the main container without volumes.
- **Example**: Cloud SQL Auth Proxy on `--port=5432` → main container uses `DB_HOST: 127.0.0.1`.

### emptyDir Volume Trap
- Cloud Run YAML validation **rejects** `emptyDir: {}` volume mounts if the volume name conflicts with reserved names or if the mount target doesn't exist.
- For TCP-mode sidecars (Auth Proxy), **skip the volume entirely** — use localhost networking instead.
- Unix socket mode requires `emptyDir`, but TCP mode does not.

---

## 3. DIRECT VPC EGRESS (DVPE) — CRITICAL CONSTRAINTS

### ⚠️ DVPE Does NOT Inherit PSA Peering Routes
- Cloud Run DVPE does **not reliably route traffic** to Cloud SQL Private Service Access (PSA) ranges.
- Even with `exchangeSubnetRoutes: true` and `exportCustomRoutes: true` on the VPC peering, TCP connections to PSA IPs (e.g., `10.127.x.x:5432`) time out.
- **Confirmed**: April 5, 2026 across 4 deployment iterations (v20–v23).
- **Fix**: Use Cloud SQL Auth Proxy sidecar instead of direct private IP connectivity.

### Egress Mode and GCS FUSE Compatibility

| Egress Mode | FUSE Works? | DB via Private IP? | Notes |
|---|---|---|---|
| `private-ranges-only` | ✅ Yes | ❌ No (PSA black hole) | **Use this** + Auth Proxy sidecar |
| `all-traffic` | ❌ No | ❌ Untested | Breaks FUSE — needs Cloud NAT |

- GCSFuse resolves `storage.googleapis.com` to **public IPs** (e.g., `173.194.206.207`).
- `all-traffic` routes everything through the VPC. Without Cloud NAT, public IPs are unreachable.
- `private-ranges-only` lets FUSE traffic bypass the VPC and reach Google APIs directly.

### Private Google Access (PGA)
- PGA on the subnet allows `all-traffic` mode to reach `*.googleapis.com` via restricted VIPs.
- However, GCSFuse uses **standard DNS**, not `restricted.googleapis.com` VIPs.
- PGA alone does NOT fix the FUSE + `all-traffic` incompatibility.

---

## 4. GCS FUSE CSI DRIVER

### Configuration
```yaml
volumes:
  - name: schema-volume
    csi:
      driver: gcsfuse.run.googleapis.com
      readOnly: false
      volumeAttributes:
        bucketName: <BUCKET_NAME>
        mountOptions: "implicit-dirs"
```

### Rules
- Requires `gen2` execution environment.
- Requires `run.googleapis.com/launch-stage: BETA` annotation.
- Runtime SA needs `roles/storage.objectAdmin` on the target bucket.
- Mount is available in ~80–250ms on warm instances, ~3.7s on cold start.

---

## 5. COLD START OPTIMIZATION

### startup-cpu-boost
- `run.googleapis.com/startup-cpu-boost: 'true'` allocates extra CPU during startup.
- Reduces Directus cold start from ~60s to ~29s.
- **Always enable** for Node.js workloads.

### Startup Probe
```yaml
startupProbe:
  failureThreshold: 60    # Allow up to 5 minutes
  tcpSocket:
    port: 8080
  initialDelaySeconds: 15  # Wait for FUSE + proxy init
  periodSeconds: 5
  timeoutSeconds: 3
```

### Benchmark (v23 Genesis)
| Phase | Time |
|---|---|
| Instance created → FUSE mounted | +3.7s |
| FUSE → Snapshot detected | +4.4s |
| Snapshot → Version banner | +11.7s |
| **Instance → Startup probe PASS** | **+29.0s** |

---

## 6. PORT INJECTION

- Cloud Run injects `PORT=8080` as an environment variable.
- Most frameworks (including Directus) respect this automatically.
- **NEVER** hardcode port 8055 (Directus default) in probes or containerPort.
- All probes and `containerPort` MUST use `8080`.

---

## 7. SECRET MANAGEMENT

- Use `valueFrom: secretKeyRef` in service YAML for native secret injection.
- **NEVER** use `--set-secrets` for additive changes — it wipes ALL existing bindings.
- **ALWAYS** use `--update-secrets` for individual secret modifications.
- Secrets injected from Secret Manager preserve bytes verbatim — beware of CRLF poisoning from Windows (see Directus SME Skill, Section 3).

---

## 8. DEPLOYMENT — THE "GHOST DEPLOY" TRAP

- Always use a **nonce label** to verify deployments actually applied:
  ```yaml
  labels:
    client.knative.dev/nonce: 'genesis-dvpe-20260405-v23b'
  ```
- After `gcloud run services replace`, verify with:
  ```bash
  gcloud run revisions list --service=<NAME> --limit=1
  ```
- If the revision name/nonce doesn't change, the deployment did NOT apply.
- **Reference**: Lessons Learned #14.

---

## 9. IAM REQUIREMENTS (PROJECT FACTORY)

| Role | Target Project | SA | Purpose |
|---|---|---|---|
| `roles/compute.networkUser` | Hub (agility-ai-services) | Runtime SA + Service Agent | DVPE network access |
| `roles/cloudsql.client` | Hub (agility-ai-services) | Runtime SA | Auth Proxy connection |
| `roles/storage.objectAdmin` | Spoke project | Runtime SA | FUSE bucket + asset bucket |
| `roles/secretmanager.secretAccessor` | Spoke project | Runtime SA | Secret injection |

---

_Maintained by Agility AI Architects // April 5, 2026_
_Source: v20–v23 Hybrid Architecture debugging, SME validation_
