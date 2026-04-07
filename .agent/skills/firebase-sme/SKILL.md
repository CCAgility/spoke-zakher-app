---
name: Firebase SME
description: Expert-level patterns for Firebase Auth, Data Connect (SQL), and Serverless Orchestration in the Agility Ecosystem.
---

# Firebase SME Skill

This skill documents the production-hardened patterns for building and scaling multi-tenant AI services on the Firebase platform.

## 1. Firebase Auth (Identity Layer)

### Production-Grade Initialization (Next.js / Turbopack)
In modern SSR/ISR environments (Next.js 15+), Firebase Auth often suffers from registration race conditions (`Component auth has not been registered yet`).
- **Pattern**: **Self-Healing Singleton**. Use a lazy-initialization function that attempts `getAuth()` and falls back to `initializeAuth()` if the component registry is stale.
- **Side-Effects**: Explicitly import `firebase/auth` to force the internal provider registration:
  ```javascript
  import 'firebase/auth'; 
  import { getAuth, initializeAuth } from 'firebase/auth';
  ```
- **Persistence**: Always default to `browserLocalPersistence` for web-based agents to ensure session survival across tab reloads.

### SSO Stabilization (Loop & Hang Prevention)
- **Pattern**: **Self-Healing Singleton**. Implement auth initialization within a try/catch block that attempts `getAuth(app)` and falls back to `initializeAuth(app, { persistence: ... })` if the internal registry is missing.
- **Pattern**: **Popup Over Redirect**. In multi-tenant environments with complex hosting (e.g. Firebase Rewrites), `signInWithRedirect` often suffers from state corruption. Use `signInWithPopup` for higher reliability.
- **MFA Guardrail**: When catching an `auth/multi-factor-auth-required` error, explicitly set `authLoading=false`. Failure to do so will hang the UI on the loader while the MFA input is hidden.
- **Safety Valve**: Implement a mandatory `setTimeout` (e.g., 5s) in your auth initialization `useEffect` to force-clear any loading states if the SDK doesn't resolve.

### ID Token Verification
- **Backend**: Verifying tokens in Cloud Functions MUST use `admin.auth().verifyIdToken(token)`.
- **Claims**: Check for `sign_in_second_factor: "totp"` to enforce MFA for administrative actions (BMAD-G standard).

### Auth Loop & Session Expiry (Cold-Boot Protocol)
- **Error**: `invalid_grant (reauth related error (invalid_rapt))`.
- **Root Cause**: Local Application Default Credentials (ADC) or browser session has expired and requires a high-privilege re-authentication flow.
- **Resolution**:
  1.  **ADC Refresh**: Run `gcloud auth application-default login` in the terminal.
  2.  **Explicit Bootstrap**: If running in a remote/containerized environment, use the `--remote-bootstrap` URL provided by the CLI.
  3.  **Browser Cleanup**: Close all active Google Cloud sessions in the browser before completing the flow to ensure the correct account is prioritized.

## 2. Firebase Data Connect (SQL-First & True RLS)

### Schema Management
Data Connect replaces Firestore for relational, multi-tenant data.
- **Registry**: Keep the Data Connect registry `PUBLIC` during PoC phases to allow rapid iteration between Hub and Spoke.
- **Deployment**: Use `firebase deploy --only dataconnect` to push schema/connectors.
- **SQL Conversions**: Use `pgvector` for embedding storage where applicable.

### True Row-Level Security (RLS)
- **Connector-Level Enforcement**: In `specVersion: v1`, `@auth(expr: ...)` directives MUST be applied individually to queries and mutations in the **Connector** (`connector.gql`), NOT on the object types in the **Schema** (`schema.gql`).
- **Tenant Isolation**: Secure multi-tenant data access strictly over custom identity claims. For example: `@auth(expr: "auth.token.tenantId == vars.tenantId || auth.token.role == 'admin'")`.

### Server-Side Data Connect (Admin SDK)
When performing administrative or automated tasks (e.g., in a Cloud Function), use the `firebase-admin/data-connect` SDK to bypass client-level authentication restrictions via IAM.

- **Initialization**: Always use the correct field names in `ConnectorConfig`. 
  - **Correct**: `{ serviceId: 'lpp-ai-service', location: 'us-central1' }`
  - **Wrong**: Using `service` instead of `serviceId` will cause silent failures to phantom endpoints.
- **Import Pattern**: In Node.js environments (like Cloud Functions), the subpath export `firebase-admin/data-connect` is the standard for version 12.7.0+. If resolution fails, ensure the environment accurately maps the `exports` field in the Admin SDK's `package.json`.
- **Privileged Context**: Admins must utilize `executeGraphql` and `executeGraphqlRead` to satisfy high-privilege schema rules like `@auth(level: NO_ACCESS)`.

## 3. Deployment & Environment
- **Site Mapping**: Use `firebase.json` rewrites to isolate `portal` routes from static `wiki` assets.
- **Secrets**: Use `firebase functions:secrets:set` for sensitive API keys (e.g., `AGILITY_MASTER_API_KEY`). Avoid `.env` files in production.
- **Sovereign Key Rule (v7.3.2)**: The `AGILITY_MASTER_API_KEY` MUST be a Hub-native, restricted credential limited to the `Generative Language API`. Never use a key created in a Spoke project or AI Studio for the Hub's function layer.
- **No Cross-Project Sync**: Do NOT use `ag-sync`, `sync-hub.ps1`, or any automated script that mirrors secrets between Hub and Spoke projects. These are **PERMANENTLY DECOMMISSIONED**.

## 4. Cloud Run 2nd Gen: Calling Google APIs from Functions (CRITICAL GOTCHA)

### Problem: `admin.app().options.credential` is `undefined` in Cloud Run 2nd Gen
In Firebase Functions v2 (Cloud Run), the `firebase-admin` SDK is initialized without an explicit `credential` object attached to `app().options`. Calling `.getAccessToken()` on it will silently block or throw a `ReferenceError`.

**❌ DO NOT USE:**
```javascript
const tokenObj = await admin.app().options.credential.getAccessToken();
```

**✅ USE GCP Metadata Server instead:**
```javascript
const metaRes = await fetch(
  'http://metadata.google.internal/computeMetadata/v1/instance/service-accounts/default/token',
  { headers: { 'Metadata-Flavor': 'Google' } }
);
const { access_token } = await metaRes.json();
```

### Data Connect: No Proxy Function — Use Native REST API
The `https://us-central1-{project}.cloudfunctions.net/dataConnect/...` proxy pattern does not exist in Spoke deployments. Always call the native endpoint:
```
https://firebasedataconnect.googleapis.com/v1beta/projects/{project}/locations/us-central1/services/{serviceId}/connectors/{connectorId}:executeQuery
https://firebasedataconnect.googleapis.com/v1beta/projects/{project}/locations/us-central1/services/{serviceId}/connectors/{connectorId}:executeMutation
```
Body format:
```json
{ "operationName": "YourOperationName", "variables": { ... } }
```

---
*Maintained by Agility Systems Architecture // 2026.03.25*
