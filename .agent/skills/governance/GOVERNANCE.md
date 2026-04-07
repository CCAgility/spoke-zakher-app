# Agility Platform Governance Standards

#governance #standards #compliance #security #versioning

## 1. Service Versioning Standards
All managed services (Voice Agents, Chat Interfaces, Managed Websites) MUST have a mandatory, descriptive service version.
- **Placeholder versions** (e.g., `vDEBUG`, `vNONE`) are strictly prohibited in production and staging environments.
- **Local Development**: Use `vX.Y.Z-dev` (e.g., `v1.0.0-dev`).
- **Promotion**: Promoting a service without an incremented version number is a violation of the Deployment SME documentation.
- **Attribution Mandatory**: All deployments must explicitly identify the managing agent (e.g., `🤖 AG Managed` or `📡 Command Center Managed`) in the Deployment Log.

## 2. Project Isolation & Fencing (v1.10.14)

The Agility ecosystem ensures sovereignty through strict project fencing and dependency decoupling.

### Infrastructural Sovereignty
- **Project Scoping**: Hub (`agility-ai-services`) and Spokes (`ag-market-a-dev`, etc.) must inhabit separate Firebase projects and Git repositories.
- **Secret Namespacing**: All secrets in GCP Secret Manager MUST follow the `[PROJECT]_SECRET_NAME` standard.
- **Identity Barrier**: Hub secrets (e.g., `HUB_ADMIN_CREDENTIALS`) must never be shared with Spokes.

### Hub & Spoke Telemetry Constraints (v1.1.0)
The Hub application is restricted to `hub-admin-global` context requests only. 
No Spoke can push telemetry to another Spoke's document tree.

## Architecture Review & Design Principles (v2.0)
*Determined via 20-Year Veteran Architecture Review for PoC Development*

1. **Static Isolation**: Frontend Web Apps (Hub/Spoke) MUST be pure static artifacts. Dynamic runtime configuration bridges (e.g., `<script src="/config.js">` or `/__agility_config__`) are PERMANENTLY DECOMMISSIONED due to aggressive static caching vulnerabilities ("Static Hijacker Bug").
2. **Build-Time Composition**: All Tier-1 public configuration (Firebase Web API keys, domains) MUST be injected at build-time using `VITE_` variables in `.env`.
3. **IAM Fencing**: Firebase API Keys MUST be strictly restricted in the GCP Console to `Identity Toolkit API` and `Token Service API`.
4. **Bootstrapping Privilege**: Identity provisioning (e.g., granting `admin` custom claims) MUST NOT be handled by deployed application endpoints unless strictly required by a mature back-office UI. In a PoC, bootstrapping must be performed securely via local CLI tools using `gcloud auth application-default login` to prevent accidental privilege escalation vulnerabilities.

### Policy Manager (SME)
The **Policy Manager Agent** is the authoritative enforcer of these rules. No deployment or code-sync operation is permitted without a `PASS` from the Policy Manager. It synthesizes knowledge from existing SMEs and GitNexus impact analysis to protect the Hub's sovereign integrity.

## 3. Deployment & Sync Protocols

## 4. Customer Registry Integrity
All customer metadata (Email, Contact Name, Industry) must be persisted correctly.
- Any manual overrides or fixes must be logged in the Deployment History.

## 3. Branch Logging
A written branch log (e.g., `BRANCH_LOG.md`) MUST be accurately maintained in the project root.
- **Mandatory Metadata**: Every entry must include the **Date**, **Timestamp (ISO-8601)**, and **Version Reference** (e.g., v2.1.0).
- **Contextual Justification**: Each log entry must explicitly document the **Business Justification** (Why are we doing this for the product?) and the **Technical Justification** (How does this solve the engineering problem?).
- **Pivot Tracking**: Any change in direction (a "pivot") must be logged with a new version increment and a clear explanation of the strategy shift.

## 4. Engineering & Environment Strategy
Integration of local environments is no longer considered a high-value effort for long-term project stability. 
- **Cloud-First Development**: Developers are strongly encouraged to transition from local setups to dedicated **Firebase Cloud Development Environments** as soon as possible.
- **Consistency**: All testing and integration should be performed in a cloud-mirrored state to ensure parity with the Agility production ecosystem.
## 5. 📅 Implementation Tracking & Wiki Standard
**Mandatory**: All implementation plans MUST be tracked version-by-version and stored in the **Project Wiki** (`docs/wiki/implementations/`) for easy searchable access.
- **Metadata**: Each plan must include a **Version Tracking #** and a **Date & Time Stamp**.
- **Efficiency**: Centralizing plans in the wiki facilitates cross-team discovery and reduces redundant engineering effort.

## 6. 🛡️ Automated Security Enforcement
**Hub Synchronization Mandate**: All multi-tenant services must pass automated security audits before promotion. 
- **Secret Scanning**: Mandatory use of `pre-push-audit.py`.
- **Identity**: Move to Firebase App Check for all administrative service-to-service communication.

## 7. 🗄️ Database Architecture & Default Standards
**SQL First Mandate**: All Agility projects MUST utilize a relational Database (SQL) as the default architecture, explicitly prioritizing PostgreSQL over NoSQL solutions (e.g., standard Firestore).
- **Implementation**: Teams must leverage **Firebase Data Connect** to provision and securely interface with **Cloud SQL for PostgreSQL**.
- **AI Compatibility**: This relational mandate ensures native, highly-available support for `pgvector` indexing and robust managed connection pooling, which are strictly required by our advanced AI agent workloads and Cloud Run streaming architecture.

## 8. 🛡️ Identity & Multi-Tenancy Standards (Zero Trust Baseline)
All services MUST adhere to the **Zero Trust Model** as a minimum standard. Never assume trust based on network location or initial auth state alone; every transaction must be re-validated.

- **Identity Bridging**: Firebase ID Tokens are the sole source of truth for identity.
- **Tenant Context**: Every Hub request MUST include a valid `X-Tenant-Id` header.
- **Database Enforcement**: Multi-tenant data MUST be isolated at the database layer using **PostgreSQL Row-Level Security (RLS)** or **Firebase Data Connect @auth directives**. Middleware-only checks are insufficient for production security.
- **Role Detection**: Services must utilize Firebase custom claims (e.g., `{ role: 'admin' }`) for granular UI and API gating.

### 8.1. 🛡️ Zero-Hardcode Initiation
**Hardcoding Prohibition**: Sensitive identifiers (API Keys, App IDs, Client Secrets) MUST NEVER be hardcoded, even during "PoC" or "Initial Draft" phases.
- **Mandatory `.env`**: Every new service directory MUST be initialized with a `.env.example` template.
- **Pre-Commit Fix**: Developers are encouraged to run `python scripts/compliance.py --fix-secrets` BEFORE their first commit in a new project area.
- **Linter Alignment**: Future projects will integrate secret-scanning directly into the `npm run dev` or `vite` startup sequence to provide real-time feedback.

## 9. 📋 Session Handoff & Continuity
**Continuity Mandate**: Every engineering session MUST conclude with a definitive **Session Handoff Report**.
- **Final Status**: A concise summary of the session's achievements and high-level architectural state.
- **Handoff Logic**: Explicitly document the "where we left off" state, including active background processes, open PRs/branches, and local server states.
- **Next Steps**: A bulleted list of the immediate next technical tasks required to continue progress without re-researching.
- **Location**: Reports must be stored in the Wiki under `docs/wiki/handoffs/` or the brain directory for searchable indexed access.
- **Global Pathing (v1.11.2)**: All model-to-model handoff artifacts (e.g., `pro_review_handoff.md`) MUST include the full absolute file path as plain text at the top of the document to facilitate high-speed context ingestion for subsequent autonomous agents.

## 10. 🏗️ Vertical Spoke Demarcation (The Pivot)
**Standard**: Complex or specific service offerings (e.g., Financial Analysis, Vertical-Specific Agents) MUST be deployed as **Vertical Spokes**.
- **Self-Containment**: Each Vertical Spoke is a standalone Firebase project hosting its own engine (Cloud Run/Functions) and UI (Hosting).
- **Consolidation Hub**: The central `agility-ai-services` serves as the **Global Registry & Governance Hub**.
- **Demarcation Benefits**: Enables precise billing isolation, independent scaling, and cleaner supportability for high-security or high-compute workloads.
- **Registration Mandatory**: All Vertical Spokes must registered their Master ID and Environment Tenant IDs in the central Hub registry for global visibility.

## 11. 💓 Deployment Initiation & Heartbeat Mandate
**Strict Enforcement**: No development, operational, or secondary maintenance work is permitted on any project until a definitive, multi-tenant alignment is confirmed.

1.  **Command Center Integration**: All managed services and vertical spokes MUST be registered and bi-directionally linked to the **Agility Command Center** immediately upon repository initiation.
2.  **Heartbeat Smoke Test**: The first action post-initiation MUST be a Heartbeat Smoke Test. This test verifies the secure uplink to the central Hub and Command Center.
3.  **Prohibition of Work**: If the Heartbeat Smoke Test fails, the project enters a **STALL** state. No code modifications, documentation updates (except RCA), or deployment attempts are allowed until the Root Cause Analysis (RCA) is completed and the connection is restored.
4.  **RLS Alignment**: All tenant-level data isolation must be verified against the Hub's master registry before any automated agent harvesting begins.

## 12. 🛡️ Mandatory SME Consultation
- **Secret & API Key Governance**: Whenever dealing with secrets, API keys, or security-sensitive infrastructure, the managing agent MUST consult the relevant Subject Matter Experts (SMEs) (e.g., `firebase-sme`, `agility-deployment-sme`, `gcp-console-sme`). 
- **Audit Requirement**: Lessons learned and architectural deviations from SME standards must be documented in `AGENTS.md` and the AG brain.

## 13. 🛡️ Administrative Recovery & RAPT Protocol
**Protocol**: When running Firebase Admin SDK scripts (e.g., `grant_admin.js`) locally, you may encounter an `invalid_rapt` error. This indicates that the Google Cloud session requires a "Re-Authentication Protocol (RAPT)" token.
- **Remediation**: The user must perform a "Cold Boot" of credentials: close browser tabs, run `gcloud auth application-default login`, and re-authenticate before re-running administrative scripts.

---
*Enforced by BMADD v7.3.1 Vertical Spoke & Heartbeat Protocol (2026-03-19)*

## 14. 🏭 THE REVENUE FACTORY (SRA COMMAND CENTER)
**Status**: ACTIVE (SRA Constitution v2.0 - Monetization-First Governance)

The Sovereign Resilience Auditor (SRA) manages the Spoke generation lifecycle to enforce the Genetic Lock between the Hub and downstream properties.

### 14.1. Core Command Protocols
- `/init-spoke`: Initiates Spoke creation via Intake Interview. **MANDATORY**: Must use `mklink /J` (Directory Junction) for Windows environments to bypass Elevation requirements and link the Hub `.agent/skills` folder.
- `/audit-spoke`: Performs the Tiered DNA scan against `AG_IDENTITY.md`. **MANDATORY**: Must be executed as the absolute final gate before any 'Commit' or 'Deploy' actions.

### 14.2. Monetization-First Architecture
- If a project identifies as `DeploymentTarget: Web`, the **Sovereign SEO Fortress** is fundamentally mandatory to guarantee organic discoverability. 
- The SEO mechanism scales automatically based on the `Directus` parameter (Database-driven `seo-utils.ts` vs Static `seo-manifest.json`).

### 14.3. The 'Self-Healing' Clause
Any manual deletion or corruption of the `.agent/skills/` junction within a Spoke repository constitutes a **Critical Governance Breach**. The SRA Auditor is mandated to halt operations and automatically repair the junction before any further development or deployment continues.

### 14.4. The Project Classification Lookup
The Global DNA (Governance, Secrets Management, GCP Architect, BMI Architect, Key Rotation) is absolute. For specific service profiles (Web App vs Voice AI vs Chat Widget), the Central `PROJECT_CLASSIFICATION_GUIDE.md` dictates the exact SME inheritance paths.