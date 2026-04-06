# 🏗️ THE GENESIS FACTORY: MASTER PROTOCOL (v1.2)

**Status**: LOCKED — Effective 2026-04-06 (Updated 2026-04-06)
**Owner**: Staff SRE / Principal SaaS Architect
**Scope**: All CCAgility Genesis Core + Spoke repositories

---

## Core Philosophy

We do not "build" websites; we **manufacture Spokes**. We prioritize **Deterministic Naming**, **Stateless Infrastructure**, and **Zero-Babysitting Automation**. The "Lab" is dead; the "Factory" is live.

---

## 🏷️ SECTION 1: THE DETERMINISTIC NAMING STANDARD

All resources must follow the **Prefix-Tenant-Environment** pattern. This ensures 1:1 mental mapping across GitHub, GCP, and Firebase.

### 1.1 GitHub Repositories (CCAgility Org)

| Asset Type | Pattern | Spoke Zero Example (Zakher) |
|---|---|---|
| **Core Engine** | `genesis-core-[type]` | `genesis-core-web`, `genesis-core-cms` |
| **Factory HCL** | `genesis-factory-hcl` | `genesis-factory-hcl` |
| **Spoke App** | `spoke-[tenant]-app` | `spoke-zakher-app` |
| **Spoke CMS** | `spoke-[tenant]-cms` | `spoke-zakher-cms` |

### 1.2 Infrastructure (GCP & Firebase)

> [!IMPORTANT]
> **Project ID Alignment**: GCP and Firebase projects **MUST** share the same ID.

| Environment | Pattern | Example |
|---|---|---|
| **Dev** | `genesis-[tenant]-dev` | `genesis-zakher-dev` |
| **Staging** | `genesis-[tenant]-staging` | `genesis-zakher-staging` |
| **Prod** | `genesis-[tenant]-prod` | `genesis-zakher-prod` |

**Service Naming**: Always use generic identifiers (`web-engine`, `cms-engine`, `assets-v1`) inside the project to keep HCL modules reusable.

### 1.3 Full Resource Naming Matrix

| Asset Type | Pattern | Spoke Zero Example (Zakher) |
|---|---|---|
| **GCP Project** | `genesis-[tenant]-[env]` | `genesis-zakher-dev` |
| **Firebase Display** | `genesis-[tenant]-[env]` | `genesis-zakher-dev` |
| **GitHub Repo (App)** | `spoke-[tenant]-app` | `spoke-zakher-app` |
| **GitHub Repo (CMS)** | `spoke-[tenant]-cms` | `spoke-zakher-cms` |
| **Cloud Run Service** | `[type]-engine` | `web-engine` / `cms-engine` |
| **Cloud SQL Database** | `spoke_db_[tenant]_[env]` | `spoke_db_zakher_dev` |
| **Cloud SQL User** | `[tenant]_[env]_user` | `zakher_dev_user` |
| **GCS Assets Bucket** | `genesis-[tenant]-[env]-assets` | `genesis-zakher-dev-assets` |
| **GCS State Bucket** | `[tenant]-factory-state-[env]` | `zakher-factory-state-dev` |
| **Service Account** | `[type]-runtime@genesis-[tenant]-[env].iam` | `directus-runtime@genesis-zakher-dev.iam` |
| **Secret Manager Secret** | `[service]-[secret-name]` | `directus-db-password` |
| **Artifact Registry** | `genesis-[tenant]-[env]/genesis` | `genesis-zakher-dev/genesis` |
| **Cloud Run Job (Backup)** | `factory-backup-janitor` | `factory-backup-janitor` |
| **Cloud Run Job (Migration)** | `factory-migration-[tenant]` | `factory-migration-zakher` |

### Variables

- `[tenant]` — Lowercase slug, no hyphens inside tenant name (e.g., `zakher`, `clientb`).
- `[env]` — `dev`, `staging`, or `prod`.
- `[type]` — `web`, `cms`, `api`, etc.

### Legacy Lab Names (DO NOT REUSE)

The following names belong to the Lab era and must **never** be used for new Factory Spokes:

- `grupo-zakher-web-cms-dev` (GCP Project)
- `agility-ai-services` (Hub Project — infrastructure only)
- `directus-cms` (generic Cloud Run service name)

### 1.4 Local Workspace Alignment (THE FLAT-PEER RULE)

All Factory components must reside as **top-level peers** within the local root (e.g., `C:\...\GitHub\`).

> [!CAUTION]
> **FORBIDDEN**: Nesting a "Spoke" repository inside the "Agility Hub" or any "Engine" repository. This causes Git collisions, CI/CD pathing errors, and breaks the "Cattle" mental model.

**Required Structure:**
```
📁 C:\Users\<user>\Documents\GitHub\
├── 📁 agility-multi-tenant-ai-services  (The Orchestrator/Hub)
├── 📁 genesis-core-web                  (The Engine)
├── 📁 genesis-core-cms                  (The Engine)
├── 📁 genesis-factory-hcl               (The Vending Machine)
├── 📁 spoke-zakher-app                  (Spoke Zero — Peer-Level Product)
└── 📁 spoke-[tenant]-app                (Future Spokes — Peer-Level Products)
```

Every Spoke is an **independent, production-grade repository** with its own `.git`, CI/CD pipeline, and remote origin.

---

## 🛠️ SECTION 2: ARCHITECTURAL NON-NEGOTIABLES

Every Spoke vended by the Factory must adhere to the **2026 SRE Blueprint**. Deviation triggers the Flash-Pause Protocol.

### 2.1 Networking — Direct VPC Egress (DVPE)

- **Standard**: Cloud Run v2 Direct VPC Egress.
- **Manifest annotation**: `run.googleapis.com/vpc-access-egress: private-ranges-only`
- **FORBIDDEN**: Legacy Gen 1 VPC Access Connectors.
- **FORBIDDEN**: Cloud SQL Auth Proxy Unix sockets — use Private IP over Shared VPC.

### 2.2 The Sidecar Paradox (Jobs)

All Cloud Run Jobs that use the Cloud SQL Auth Proxy sidecar **MUST** include:

```bash
# SLEEPER — Wait for proxy readiness
while ! nc -z 127.0.0.1 5432; do sleep 0.5; done;

# ... (job payload) ...

# KILLER — Terminate sidecar so the Job container exits cleanly
pkill -TERM cloud_sql_proxy || true;
```

Without the Killer, the Job hangs indefinitely because the sidecar never exits.

### 2.3 Stateless Hydration

| Layer | Driver | Notes |
|---|---|---|
| File Storage | `STORAGE_LOCATIONS="gcs"` | FUSE-compatible, mounted via GCS FUSE CSI driver |
| Cache | `CACHE_STORE="redis"` | Memorystore Redis or equivalent |
| Schema State | GCS FUSE mount | Ahead-of-Time Hydration via `snapshot.yaml` |
| Local Disk | **Ephemeral only** | `/tmp` volume, never persisted |

### 2.4 Zero-Trust Secrets

- All sensitive data retrieved via `value_source` / `valueFrom.secretKeyRef` in Cloud Run YAML.
- `.env` files are for **local development only** — never deployed.
- **FORBIDDEN**: Hardcoded secrets in YAML, Dockerfiles, or Terraform.
- **FORBIDDEN**: Service Account JSON key files (`.json`).
- **Windows CRLF Protection**: Secrets must be written using `[System.IO.File]::WriteAllBytes()`. Never `Set-Content`, `Out-File`, `echo`, or `>`.

### 2.5 Workload Identity

- Cloud Run services and jobs **assume** their identity via IAM.
- Minimum Viable SA Profile:
  - `roles/cloudsql.client`
  - `roles/storage.objectAdmin`
  - `roles/secretmanager.secretAccessor`
  - `roles/logging.logWriter`
  - `roles/monitoring.metricWriter`
- **NEVER**: `roles/owner`, `roles/editor`, or `roles/iam.serviceAccountAdmin`.

---

## 🚀 SECTION 3: THE ASSEMBLY LINE (WORKFLOW)

We use a **"One Repo, Two Environments"** strategy. Code is always Production-Grade, even when running in Dev.

### Phase 1: VEND (Infrastructure)

1. Use `genesis-factory-hcl` to provision the `genesis-[tenant]-dev` project.
2. Add the new `tenant_id` to `genesis-factory-hcl/variables.tf`.
3. Run `terraform plan` → audit the diff.
4. Run `terraform apply` → provisions GCP project, GCS bucket, DB user, Cloud Run service.

### Phase 2: HYDRATE (Repository)

1. Initialize `CCAgility/spoke-[tenant]-app` in GitHub.
2. Clone `genesis-core-web` engine as the baseline.
3. Configure tenant-specific environment variables in Secret Manager.

### Phase 3: GRAFT (UI/UX)

1. Merge the customer-specific design (e.g., Node.js ZIP) into the Spoke repo.
2. Ensure it uses the Directus Singleton SDK (`src/lib/directus.ts`).
3. Validate `middleware.ts` correctly extracts `x-tenant-id` from the host header.

### Phase 4: IGNITE (Deploy)

> [!IMPORTANT]
> **One Repo, Two Environments** deployment strategy:
> - **Push to `main`** → Deploys to the **Dev** project (`genesis-[tenant]-dev`).
> - **Create Release Tag (`v1.x`)** → Deploys to the **Prod** project (`genesis-[tenant]-prod`).

1. Build the container image via Cloud Build.
2. Deploy the grafted image to the target project.
3. Execute the 6-point smoke test suite.
4. Validate health at `/server/health` (CMS) and `/api/revalidate` (Web).

---

## 🛡️ SECTION 4: DATA MIGRATION (PROTOCOL 7)

We use the **Surgical Janitor** for all Lab-to-Factory transitions.

### 4.1 Extract

Run `pg_dump` on the legacy Lab database, targeting only the tenant's logical schema.

```bash
pg_dump -h 127.0.0.1 -U $DB_USER $DB_NAME | gzip > backup.sql.gz
```

### 4.2 Store

Upload the `.sql.gz` artifact to the `genesis-factory-backups` bucket:

```bash
gcloud storage cp backup.sql.gz gs://genesis-factory-backups/[tenant]/backup.sql.gz
```

### 4.3 Restore

The Janitor Job (`factory-backup-janitor`) hydrates the new `tenant_db` in the fresh project. This Job follows the **Sidecar Paradox** pattern (Sleeper + Killer).

---

## 🛡️ SECTION 5: THE FLASH-PAUSE PROTOCOL

If any automated agent or manual process deviates from these standards, the system **MUST PAUSE** for a Naming & Architecture Audit.

### Forbidden Actions

| Violation | Why It's Forbidden |
|---|---|
| Reusing old "Lab" repos or Firebase projects for new Spokes | Namespace collision, ungovernable state |
| Hardcoding URLs or project IDs | Breaks multi-tenancy, non-portable |
| Using Service Account JSON keys | Security anti-pattern, non-rotatable |
| Using Legacy VPC Access Connectors (Gen 1) | Deprecated, incompatible with DVPE |
| Deploying secrets in `.env` files to Cloud Run | Zero-Trust violation |
| Cloud SQL Job without `pkill -TERM` Killer logic | Job hangs indefinitely |

### Agent Delegation Rules

- **Flash** (fast model): Execution only. No debugging, no architecture decisions, no infrastructure mutation without pre-approved commands.
- **Opus/AG** (reasoning model): Architecture, debugging, and plan authorship. Approves all Flash handoffs. Operates as the **Factory Foreman**.
- **Hard Stop**: If Flash encounters any deviation, it generates a diagnostic report and halts.

### Factory Foreman Directive

When operating as the Factory Foreman:
- If a request asks to reuse a legacy "Lab" project/repo → **PAUSE** and flag for audit.
- When performing UI/UX mods, ensure all code remains compatible with the Genesis Core Engine.
- All naming must pass deterministic validation against the Section 1 matrix before provisioning.

### 5.1 Directory Audit (Pre-Init Gate)

Before initializing any new Spoke, the Foreman **MUST**:
1. Verify the current working directory is at the **Flat-Peer root** (e.g., `C:\...\GitHub\spoke-[tenant]-app`).
2. If the path is nested inside another Git-managed project → **PAUSE** and force relocation to the Flat-Peer root.
3. Confirm no `.git` directory is inherited from a parent repository.
4. Run `git init` only after the directory is confirmed as an independent peer.

---

## 📦 GENESIS CORE REPOSITORIES

| Repository | Purpose | Status |
|---|---|---|
| `CCAgility/genesis-core-cms` | Directus CMS engine blueprint | ✅ Hydrated |
| `CCAgility/genesis-core-web` | Next.js web engine blueprint | ✅ Hydrated |
| `CCAgility/genesis-factory-hcl` | Terraform spoke vending machine | ✅ Hydrated |
| `CCAgility/spoke-zakher-app` | Spoke Zero: Grupo Zakher Web App | 🟡 Initialized (Awaiting Graft) |

---

## 🔖 VERSION HISTORY

| Version | Date | Author | Change |
|---|---|---|---|
| v1.0 | 2026-04-06 | Staff SRE | Initial codification from Lab lessons learned |
| v1.1 | 2026-04-06 | Staff SRE | Added Protocol 7 data migration, One Repo Two Environments deploy strategy, Project ID alignment rule, Factory Foreman directive |
| v1.2 | 2026-04-06 | Staff SRE | Flat-Peer Rule (§1.4), Directory Audit gate (§5.1), spoke-zakher-app registry entry |
