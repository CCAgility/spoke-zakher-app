---
name: Secrets Management SME
description: Expert-level guidance for managing multi-tiered secrets across Firebase, GCP Secret Manager, and the Agility Config Bridge.
---

# Secrets Management SME Skill

This skill defines the mandatory protocols for handling sensitive credentials within the Agility Multi-tenant ecosystem, ensuring zero-hardcode compliance and secure identity propagation.

## 1. The 3-Tier Secret Strategy

All credentials MUST be categorized into one of the following three tiers. Mixing these tiers or **Cross-Project Pollution** (using a Spoke key in the Hub) is a SEVERITY-1 deployment failure.

### 2. Project Fencing & Sovereignty (v7.3.2)
Every secret in Secret Manager MUST be logically pinned to its **GCP Project Number**.
- **Sovereign Interlock**: Legacy synchronization tools (`ag-sync`, `ag-push`, `sync-hub.ps1`) are **PERMANENTLY DECOMMISSIONED**. Cross-project secret mirroring is strictly prohibited.
- **Master Key Security**: The `AGILITY_MASTER_API_KEY` MUST be a project-native credential restricted to the `Generative Language API` only.
- **Validation**: `platformConfig` and `DeliveryEngine` MUST verify that the `project_id` in secret metadata matches the current `process.env.GCLOUD_PROJECT`.

### 3. Tier 1: Public Build-Time Config (`.env`)

Used for frontend initialization (Firebase API keys, Analytics IDs).

- **Naming Convention**: MUST prefix with `VITE_` in `.env` (e.g., `VITE_GOOGLE_API_KEY`).
- **Format**: Plain text strings in the `.env` file at the root of the project.
- **Injection Logic**:
  - Values are injected at **build time** by Vite.
  - Access in React code via `import.meta.env.VITE_GOOGLE_API_KEY`.
- **Security Posture**: 
  - *WARNING*: Any variable prefixed with `VITE_` will be exposed in the client bundle. **NEVER** prefix private service keys logic with `VITE_`.
  - Because public keys are safe for exposure, build-time injection is vastly superior to the legacy "Config Bridge" runtime approach. It physically cannot suffer from the "Static Hijacker" bug because there is no dynamic runtime rewrite failure state.
- **Restriction Mandatory**: Public keys MUST be restricted in the GCP Console to specific allowed APIs:
    - `Identity Toolkit API`
    - `Token Service API`
    - `Google Cloud Data Connect API`

> **DEPRECATION NOTICE**: The legacy `platformConfig` (`window.__AGILITY_CONFIG__`) bridge has been deprecated for frontend initialization. Do not use dynamic script insertion for public keys.

---

## 3. Tier 2: Service Secrets (Firebase)

Used for server-to-server communication and admin SDKs.

- **Implementation**: Use `firebase-functions/params`.
- **Naming**: Use `UPPER_SNAKE_CASE` (e.g., `AGILITY_MASTER_API_KEY`).
- **Usage**:
  ```javascript
  const { defineSecret } = require("firebase-functions/params");
  const masterKey = defineSecret("AGILITY_MASTER_API_KEY");
  // Access via masterKey.value() inside the function handler.
  ```

---

## 4. Tier 3: Tenant Vault (Secret Manager)

Used for BYOK (Bring Your Own Key) customer credentials (e.g., Gemini API keys).

- **Implementation**: Managed via `functions/src/core/secrets.js`.
- **Naming**: `gemini-key-{masterId}`.
- **Access Control**: Only the `SecretManager` class should interface with the `@google-cloud/secret-manager` client.
- **Reference**: Use `kms://{secretId}` URIs in the database to refer to these vaulted keys.

---

## 5. Automated Compliance

- **Scan**: Run `python scripts/compliance.py` to detect and fix hardcoded secrets.
- **Audit**: Use `scripts/audit-compliance.js` to ensure architectural boundaries (e.g., no Tier 3 access in Tier 1 functions).

## 6. GCP API Restriction Fix (Emergency Protocol)

If "API Blocked" errors appear:
1. Navigate to: [GCP Credentials](https://console.cloud.google.com/apis/credentials)
2. Locate the key corresponding to `PUBLIC_FIREBASE_API_KEY`.
3. **The 25 API Baseline**: Ensure "API Restrictions" includes the following mandatory set:
    - Identity Toolkit, Token Service, Secure Token, Identity Platform
    - Data Connect, Firestore, SQL Admin, Datastore, Firebase API
    - Hosting, Rules, Storage, Installations, App Check, ML Kit
    - Remote Config, Remote Config Realtime, Vertex AI, Google Play
    - App Hosting, App Distribution, App Testers, In-App Messaging
4. **Diagnostic Signal**: 
    - `API_KEY_SERVICE_BLOCKED`: Incorrect Scope. 
    - `getprojectconfig-are-blocked`: Legacy key with tight method restrictions; **Requires New Key**.
    - `auth/popup-closed-by-user`: Cross-Project Pollution or Ghost Key.

---
## 7. Project Fencing & Diagnostic Triangulation (v1.11.0)

### Diagnosing Static Shadowing (The "Static Hijacker" Bug)
If `gcloud secrets` is updated but the browser continues to see a stale key:
- **Check**: Local `web/public/config.js` or `dist/config.js`. 
- **Pattern**: Static files in the Hosting `public` folder will shadow dynamic Cloud Function rewrites.
- **Resolution**: **DELETE** all static `config.js` files to allow the Config Bridge to take priority.

### Resolving Secret Version Pinning
- **Trap**: `firebase deploy` often pins Cloud Functions to the secret version available *at time of first deployment*.
- **Fix**: Use `gcloud functions update` or `firebase functions:secrets:use SECRET_NAME@latest` to force the function to move to the newest hardened key version.

### Scalable Key Rotation (Ghost Key Prevention)
If an API key is manually rotated in the **GCP Credentials Console** (e.g., creating a new restricted key and deleting the default), the Firebase CLI (`firebase apps:sdkconfig`) will often aggressively cache the legacy "ghost" key.
- **MANDATORY RULE**: Automated scripts or agents performing JSON-Fencing wrap updates MUST NOT source the raw `api_key` from `firebase apps:sdkconfig`. 
- **Source of Truth**: Always read the existing, working value from the `latest` version in Secret Manager first (`gcloud secrets versions access latest`), or query the active GCP keys directly (`gcloud services api-keys list`).
- Injecting the Firebase CLI output into a JSON Secret Vault after a GCP-level manual rotation will cause an immediate `auth/popup-closed-by-user` failure globally due to ghost key revival.

---
## 8. Claim-Based Authorization Standards (v1.12.0)

### The "Admin == True" Protocol
To prevent ambiguity in RLS (Row-Level Security), all administrative access MUST be gated by a boolean `admin` claim.
- **MANDATORY**: Use `auth.token.admin == true`.
- **DEPRECATED**: Avoid string-based role checks like `auth.token.role == 'admin'`.
- **Reasoning**: Boolean claims are atomic, less prone to typo-pollution, and satisfy the strictest Data Connect GQL `@auth` expression evaluators.

---
*Maintained by Secrets SME // BMADD v7.3.4 (2026-03-22)*
