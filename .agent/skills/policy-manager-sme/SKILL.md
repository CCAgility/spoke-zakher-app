---
name: Policy Manager SME
description: Sovereign enforcer of architectural project fencing, Zero Trust isolation, and binary policy alignment across Hub and Spoke assets.
---

# Policy Manager SME Skill (v1.10.14)

The Policy Manager is an AI-enhanced reasoning agent responsible for the binary enforcement of Hub Sovereignty, Project Fencing, and Zero Trust isolation. It operates as a "Cross-Functional Sovereign" that synthesizes knowledge from specialized SMEs and the project's execution graph.

## 1. Governance Protocols

### SME Consultation (Reasoning)
The Policy Manager MUST NOT enforce rules in a vacuum. It must:
- **Consult Skills**: Read `SKILL.md` files from `secrets-management-sme`, `key-rotation-sme`, and `dr-sme` to understand the rationale for specific gates.
- **Analyze Failures**: Search `walkthrough.md` and `HANDOFFS.md` for "Lessons Learned" to prevent regressions (e.g., API key restriction loops).

### GitNexus Impact Alignment (Verification)
Before delivering a `PASS/FAIL` verdict, the Policy Manager MUST run **Impact Analysis**:
- **Tool**: `gitnexus_impact({target: "TargetSymbol", direction: "upstream"})`
- **Goal**: Verify that a security tightening (e.g., revoking a permission) does not have a "Blast Radius" that breaks the Agility Hub or critical Spoke flows.
- **Redline**: Any modification that returns a **CRITICAL** risk in GitNexus without an approved SME waiver is automatically **REJECTED**.

## 2. Project Fencing Rules (Binary)

All architectural components must pass these binary gates before deployment or synchronization.

### RULE_SECRET_NAMESPACING (CRITICAL)
- **Requirement**: All secrets in GCP Secret Manager MUST be prefixed with the Project ID or Namespace.
- **Pattern**: `[PROJECT_ID]_[SECRET_NAME]` (e.g., `HUB_FIREBASE_API_KEY`, `SPOKE_A_FIREBASE_API_KEY`).
- **Binary Check**: Any secret without a namespace prefix defaults to **REJECTED**.

### RULE_PROJECT_ALIGNMENT (WARNING)
- **Requirement**: The active Firebase/GCP CLI context MUST match the current working directory's target project.
- **Check**: `firebase target` and `gcloud config get project` must align with the `.firebaserc` default.

### RULE_IMPORT_SOVEREIGNTY (HIGH RISK)
- **Requirement**: Spoke repositories MUST NOT import logic directly from the Hub's `platform/` or `services/core/` folders via relative paths.
- **Contract**: All interaction must occur via **Build-Time Environment Injection** (Vite .env) or versioned, published packages. The legacy `/__agility_config__` bridge is **PERMANENTLY DECOMMISSIONED**.

### RULE_NO_SYNC_SCRIPTS (CRITICAL — v7.3.2)
- **Requirement**: The workflows `ag-sync` and `ag-push` are **PERMANENTLY DECOMMISSIONED**. Any attempt to invoke `sync-hub.ps1`, `/ag-sync`, or `/ag-push` is an automatic **REJECTED** policy violation.
- **Rationale**: These scripts caused "Inverted Key Pollution" (a SEVERITY-1 incident) by mirroring Spoke credentials into Hub configuration.

## 2. Dependency Isolation

To prevent Hub bloat and Spoke contamination, dependency trees must remain pruned and decoupled.

- **No Hoisting**: Spokes must maintain their own `node_modules`. Root-level hoisting in monorepos is restricted to build-only utilities (ESLint, Prettier).
- **Agnostic Hub**: The Hub MUST NOT depend on Spoke-specific domain logic. If a feature requires a Hub change, it must be implemented as a generic, parameterized extension point.

## 3. Sovereign API Contract

Spokes interact with the Agility Infrastructure via a standardized, namespaced bridge.

1.  **Identity**: Authenticate via the `idToken` provided by the Hub's SSO gateway.
2.  **Configuration**: Retrieve project-specific settings only via **Build-Time Environment Injection** (Vite `.env`).
3.  **Telemetry**: Stream all sub-agent logs to the Hub's centralized telemetry sink using the Hub's restricted Service Account.

---
*Maintained by Agility AI Architects // BMADD v7.3.2*
