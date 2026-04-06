# 🧠 Lessons Learned: Agility AI Architecture

This document captures systemic insights and architectural "gotchas" discovered during the evolution of the Agility Hub and Spoke ecosystem.

## 🚨 Configuration & Fencing

### 1. The "Kill Switch" Anti-Pattern (March 25, 2026)
- **Problem**: Designing security guards as absolute "Kill Switches" (e.g., the Hub Fencing Guard in `platformConfig`) can cause total service outages over minor metadata discrepancies.
- **Lesson**: Implement **Adaptive Guarding**. Use `WARNING` modes with restricted functionality fallbacks rather than total process termination.
- **Reference**: [RCA: Hub Auth Lockout (PBI-2026-001)](file:///C:/Users/emini/.gemini/antigravity/brain/d04af447-6294-4409-8257-4467a43dacee/walkthrough.md)

### 2. "Ghost Key" Build Pollution
- **Problem**: Environmental variables from `.env.local` can be "baked" into the `dist` folder during a production build.
- **Lesson**: Always execute a **Clean Build** (`npm run build`) before deploying.

### 3. Hardcoded Model Dependencies
- **Problem**: Hardcoding AI model names creates a global fragility point.
- **Lesson**: Use the **Model Registry Guard** pattern. Whitelist valid models and implement a validated "Safety Valve" fallback.
- **Reference**: `functions/src/core/engine.js` (v5.1.0)

### 4. Vector 1: Multi-Model Inflation Protection
- **Problem**: Allowing tenants to request unverified or extremely expensive models through the engine.
- **Lesson**: Implement a strict Model Registry Guard in the DeliveryEngine constructor.

### 5. Data Connect SDK "Argument-Index" Bug (March 27, 2026)
- **Problem**: Queries without variables require an explicit empty object `{}` as the second argument if the third argument (options/auth) is provided.
- **Lesson**: Always pass exactly 3 arguments: `(ref, variables || {}, options)`.

### 6. Service Account IAM "Implicit Deny" (March 27, 2026)
- **Problem**: Cloud Functions may return 403 if the Service Account lacks explicit `Firebase Data Connect Admin` roles.
- **Lesson**: Native GQL rules cannot supersede IAM-level project membership requirements.

### 7. Data Connect Admin SDK "Phantom Endpoint" Bug (March 28, 2026)
- **Problem**: The `firebase-admin/data-connect` SDK's `getDataConnect()` method expects a field named `serviceId`, not `service`.
- **Lesson**: Always use exact field names specified in the Admin SDK source: `{ serviceId: 'my-service', location: 'region' }`.
- **Reference**: `functions/src/core/sqlRepository.js` (v7.3.3)

### 8. The "Full-Context Lobotomy" (March 29, 2026)
- **Problem**: Injecting the entire knowledge base (80+ items) into the LLM's system instruction for every request creates enormous token overhead (26k+ tokens) and increases the risk of grounded hallucinations or grounding refusals when context fields (like `insight` vs `content`) are misaligned.
- **Lesson**: Implement **Hybrid Retrieval & Semantic Caching**. Use Vector Search to prune the context window to the "Top 5" relevant items and bypass the LLM for repeated FAQ queries.
- **Reference**: `functions/src/core/engine.js` (Keyword-Ranking Implementation)
- **Reference**: [RCA: Hub Auth Lockout (PBI-2026-001)](file:///C:/Users/emini/.gemini/antigravity/brain/d04af447-6294-4409-8257-4467a43dacee/walkthrough.md)

### 9. Directus SDK "Typed-Request" Bottleneck (April 2, 2026)
- **Problem**: Strict generic typing in the Directus SDK can cause `npm run build` failures when using `readItems` with custom schemas in Next.js Server Components.
- **Lesson**: Use **Explicit SDK Casting**. Wrap the client and the command in `(client as any).request((readItems as any)(...))` to bypass build-time type narrowing during Next.js optimization.

### 10. Next.js "Static Export" Secret Gap (April 2, 2026)
- **Problem**: `npm run build` attempts to pre-render (static-export) pages. If the data-fetching layer throws errors due to missing secrets (e.g., `DIRECTUS_ADMIN_TOKEN` not in CI), the build worker crashes (`Export encountered an error on /_not-found`).
- **Lesson**: Implement **Zero-Throw Initialization**. SDK managers must be non-throwing during the build phase (`NEXT_PHASE`). Use placeholders or fallback return values if secrets are missing during CI.

### 11. Cloud Build "Phantom Secret" — Substitution vs. Resolution (April 2, 2026)
- **Problem**: Cloud Build trigger substitutions are **plain-text string replacements**. Storing a Secret Manager resource path (e.g., `projects/PROJECT/secrets/NAME/versions/latest`) as a substitution value passes the literal path string to the build step, NOT the resolved secret value. The Zakher deployment received the path as its admin token, causing every SSR fetch to fail.
- **Lesson**: **NEVER use trigger substitutions for secrets.** Use the `availableSecrets` block in `cloudbuild.yaml` with `secretEnv` on individual steps. This invokes Cloud Build's native Secret Manager resolution at step execution time.
- **Reference**: `grupo-zakher-web-cms/cloudbuild.yaml` (v1.1.0), Handoff #28

### 12. Committed Credentials — Git History Persistence (April 2, 2026)
- **Problem**: Temporary credential files (`token.txt`, `pass.txt`, etc.) created during SRE provisioning were committed to git. Even after deletion, they persist in git history and are accessible to anyone with repo access.
- **Lesson**: **Pre-commit guardrails are mandatory.** Add `*.txt`, `*.key`, `*.secret`, `*.pem` to `.gitignore` BEFORE provisioning. If credentials are accidentally committed, rotate them immediately — `git rm --cached` removes tracking but does NOT purge history.

### 13. Cloud Run `--set-secrets` Is Destructive (April 3, 2026)
- **Problem**: Running `gcloud run services update --set-secrets="NEW_SECRET=name:latest"` **replaces ALL existing secret bindings** on the service, not just the one specified. This wiped 4 critical secret bindings (`SECRET`, `KEY`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`) from the Zakher Directus service, causing a `HealthCheckContainerError`.
- **Lesson**: **ALWAYS use `--update-secrets` for additive changes.** The `--set-secrets` flag is a full replacement operation. Only use it when you intend to declare the complete set of secret bindings from scratch.
- **Reference**: Handoff #30, Genesis v1.1.2 Recovery

### 14. Cloud Run Jobs Default to Compute Engine SA (April 3, 2026)
- **Problem**: Creating a Cloud Run Job with `gcloud run jobs create` without specifying `--service-account` causes the job to run as the **default Compute Engine SA** (`PROJECT_NUMBER-compute@developer.gserviceaccount.com`), NOT the custom SA used by Cloud Run services in the same project. This caused a cross-project Cloud SQL `forbidden: instances.get` error because the Compute SA had zero IAM bindings on the hub project — even though the intended `directus-runtime` SA already had `roles/cloudsql.client`.
- **Lesson**: **ALWAYS specify `--service-account` when creating Cloud Run Jobs**, especially for cross-project resource access. Never assume the job inherits the same identity as the service.
- **Reference**: Handoff #30, Genesis v1.1.2 Recovery

### 15. Windows CRLF Secret Poisoning — "The Ghost Byte" (April 4, 2026)
- **Problem**: Secret Manager values created from Windows (via PowerShell, `fs.writeFileSync`, piped `echo`, or any file written on NTFS) silently include trailing `\r\n` (0x0D 0x0A). Cloud Run injects the secret value **verbatim** as an env var, including the invisible CRLF. When Directus compares the `ADMIN_TOKEN` env var (`"...TWgd\r\n"`, 34 bytes) against the Bearer token from the HTTP header (`"...TWgd"`, 32 bytes), the comparison **always fails**. This caused a cascading failure: auth fell through to the weaker `directus_users.token` path, which lacks super-admin permissions, producing a persistent 403 on schema operations.
- **Lesson**: **ALWAYS write secrets using binary-safe methods.** On Windows/PowerShell, the ONLY reliable method is `[System.IO.File]::WriteAllBytes(path, [System.Text.Encoding]::UTF8.GetBytes(value))`. NEVER use `Set-Content`, `Out-File`, `echo`, `>`, `fs.writeFileSync()`, or piped output. After writing, **verify with hex dump**: the last byte must NOT be `0x0D` or `0x0A`.
- **Reference**: Handoff #34, Genesis v1.1.2 CRLF Fix

### 16. Agent Execution Guardrails — "The Spiral" (April 4, 2026)
- **Problem**: An AI agent (Flash) was given a handoff protocol with fallback steps. When the primary fix failed (due to the undiagnosed CRLF root cause), Flash entered a cascading debugging spiral — creating 8+ Cloud Run jobs, deleting the admin user, attempting a schema DROP, running 5 revision restarts — none of which addressed the actual problem. Each "fix" created new state corruption that masked the original issue.
- **Lesson**: **Agent handoffs must have HARD STOP gates, not fallback chains.** If an agent's primary fix fails, the agent must STOP, generate a diagnostic report with exact outputs, and yield to the orchestrating architect. Fallback plans that allow agents to modify infrastructure state (DB mutations, user deletions, schema drops) without human approval create compounding damage. The correct pattern is: **try once → verify → if fail, REPORT and STOP**.
- **Reference**: Handoff #33 (failed), Handoff #34 (corrected)

### 17. Directus `ADMIN_TOKEN` Bootstrap Behavior — "Trust but Verify" (April 4, 2026)
- **Problem**: `ADMIN_TOKEN` IS a valid Directus env var (listed under "First Admin User" in official docs). It is supposed to set the static token on the bootstrap admin user during initial project creation. However, in practice with Directus 10.10 on Cloud Run, the token was NOT applied to the user's `directus_users.token` column after a full schema reset + bootstrap cycle. The admin user was created (from `ADMIN_EMAIL`/`ADMIN_PASSWORD`), but the token column remained NULL, causing all Bearer token authentication to fail with 401.
- **Lesson**: **Never assume bootstrap env vars were applied — always verify DB state.** After any Directus bootstrap, run a verification query: `SELECT email, token IS NOT NULL as has_token, role FROM directus_users;`. If `ADMIN_TOKEN` was not applied, set it explicitly via SQL: `UPDATE directus_users SET token = '<value>' WHERE email = '<admin_email>';`. Include this as a standard post-bootstrap step in the Golden Template runbook.
- **Reference**: Official Directus docs (self-hosted/config-options.html#first-admin-user), Handoff #35/#36

### 19. Directus Version Pinning (2026-04-04)
- **Problem**: Using `:latest` in production Docker images risks silent breaking changes across the multi-tenant fleet when Directus publishes minor or patch releases.
- **Lesson**: **All Golden Template Dockerfiles and `gcloud run deploy` commands MUST reference a pinned version: `directus/directus:10.10.7`**. Version upgrades are a deliberate, tested operation — never automatic.
- **Reference**: SME Golden Template Spec, Progress Report MoSCoW Item #0.

---

## 🔐 Security & Identity

### 1. Registry Access Boundary (Security Relay Pattern)
- **Problem**: Setting Data Connect auth to `auth != null` blocks the unauthenticated "Security Relay".
- **Lesson**: Core lookups intended for relays must be `@auth(level: PUBLIC)` if the Relay itself handles security.

### 2. Secret Proliferation during Sync
- **Problem**: Automated sync workflows can "pollute" secrets across projects.
- **Lesson**: NEVER synchronize secrets programmatically without an **Extraction Guard**.

### 3. Server-Side @auth Resolution (March 28, 2026)
- **Problem**: Schema rules using `@auth(level: NO_ACCESS)` are strictly intended for IAM-authorized callers.
- **Lesson**: High-privilege admin operations MUST use the `firebase-admin/data-connect` SDK to satisfy schema levels via native IAM credentials.

---

## 🚀 Deployment & Operations

### 1. Standardized Versioning (Governance)
- **Lesson**: All remediation artifacts must be explicitly versioned and timestamped.
- **Protocol: Version-Referenced Implementation (VRI)** (March 29, 2026): All implementation and deployment plans MUST reference specific component build versions (e.g., Hub API v3.0.0-sidecar) to prevent environmental drift and configuration confusion across multi-tenant silos.
- **Reference**: [Governance Alignment Plan (Stage 6)](file:///c:/Users/emini/.gemini/antigravity/brain/d99c7f05-c96a-458a-b75d-f0096246f2e9/implementation_plan.md)

### 2. SPA Rewrite Priorities
- **Problem**: Global SPA rewrites intercept dynamic Cloud Function endpoints.
- **Lesson**: Always place **Function Rewrites** *above* the global SPA catch-all rule in `firebase.json`.

### 3. The "Performance Poison Pill" (March 25, 2026)
- **Problem**: Global CSS transitions (e.g., `* { transition: all 1s }`) degrade UI responsiveness.
- **Lesson**: NEVER apply universal wild-card transitions.

### 4. Proactive Sync Fencing
- **Problem**: Automated DR synchronization (`ag-sync`) can propagate regressions.
- **Lesson**: Implement a **Sync Interlock** during active remediation phases.

### 5. Identity Bridge Key Inversion (March 26, 2026)
- **Problem**: Serving a restricted "Master" key as a "Public" Auth key.
- **Lesson**: Separate the **Gemini Master Key** (Server-Side) from the **Firebase Browser Key** (Client-Side Auth).

### 6. Permanent Protocol Decommissioning
- **Problem**: Automated sync scripts bridging Hub and Spoke repositories are prone to pollution.
- **Lesson**: Permanently decommission legacy cross-project sync workflows.

### 7. Forced Dynamic Convergence (The "Cloud Run" Principle) (April 2, 2026)
- **Problem**: Pre-rendering pages in CI that rely on internal-only or protected backends causes "Connection Refused" (ECONNREFUSED) errors and build-time instability during the `static export` phase.
- **Lesson**: Apply `export const dynamic = 'force-dynamic';` to routes that require live backend access. This shifts the data resolution from the unstable CI build-time to the stable Cloud Run runtime.

### 8. The Introspection Deadlock (CPU Steal vs DVPE) (April 5, 2026)
- **Problem**: When moving Directus 10.x to Direct VPC Egress (DVPE) on a small Cloud SQL cluster (`db-f1-micro`), the system crashed with `KnexTimeoutError`. Because it happened over a new network path, it masqueraded as a VPC/Proxy network failure. In reality, it was a Layer 7 Resource Exhaustion deadlock: Directus runs aggressive parallel introspection queries on cold start. The `f1-micro` CPU bottlenecks, the initial 25 queries stall, and subsequent dependencies queue up into the Tarn pool. The 90s timeout triggers before the initial queries finish, crashing the ephemeral container in a loop.
- **Lesson**: **Compute scaling and elastic pooling are required for DVPE Directus**. To prevent introspection death loops: (1) Upgrade DB to `db-custom-1-3840` to avoid burst throttling. (2) Increase `DB_POOL__max` to 75 so sequential dependency queries don't get queued behind stalled schema lookups. (3) Enable `DB_POOL_IDLE_TIMEOUT_MS: 30000` to shrink the pool after boot. (4) Enable `CACHE_SCHEMA: 'true'` to eliminate introspection entirely after the first warm start.
- **Reference**: Handoff #37, Genesis v1.1.2 Factory Stabilize, Blocker DVPE

### 9. Ahead-of-Time FUSE Hydration & The SSL Handshake Ghost (April 5, 2026)
- **Problem**: Even with DB scaled up, Directus parallel schema interrogation via `CACHE_STORE="memory"` saturated the pool on cold starts. Attempting to bypass this via GCS FUSE caused side-effects: (1) Setting `vpc-access-egress: all-traffic` blackholed FUSE HTTPS checks into the Spoke VPC, causing mount times to timeout. (2) Without proxy abstraction, Directus defaults to TLS handshakes, hanging silently on private IPs (`10.127.16.3`) and throwing KnexTimeoutErrors.
- **Lesson**: **Zero-Introspection via FUSE** is the final stage of stabilizing Directus on DVPE. Implementations must: (1) Mount `snapshot.yaml` via GCS FUSE using `roles/storage.objectAdmin` on Workload Identity. (2) Lock `vpc-access-egress` strictly to `private-ranges-only` so FUSE relies on Google's backbone instead of the VPC. (3) Explicitly enforce `DB_SSL="false"` to prevent the driver from triggering an implicit TLS Handshake ghost over the raw TCP path.

---

_Maintained by Agility AI Architects // April 5, 2026_
