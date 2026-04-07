---
name: Google AI Agent Orchestration
description: Efficient patterns for building modular, multi-tenant AI agents using Gemini 3.x Flash/Pro, Firebase Functions v2, and Data Connect (SQL). Platform Standard models: gemini-3-flash-preview, gemini-3.1-pro-preview.
---

# Google AI Agent Orchestration

This skill provides a standardized framework for deploying autonomous revenue recovery (ARR) agents within the Google Ecosystem.

## 1. Multi-Tenant Architecture
- Always isolate tenant context from Firestore using `tenantId`.
- Load feature flags (`modules`) at the start of every request.
- Use regional deployment (e.g., `us-central1`) for Cloud Functions to minimize latency.

## 2. Dynamic Module System
- **Concierge Mode (Info-Only)**: Restrict the agent to answering from the `brand_bible` and using the `captureLead` tool.
- **Recovery Mode (Full-Recovery)**: Append scheduling instructions and enable Google Calendar tool-calling.
- **Prompt Merging**:
  ```javascript
  const sysInstruction = `${BASE_CONCIERGE}\n\n${modules.scheduling ? RECOVERY_EXT : INFO_ONLY_EXT}`;
  ```

## 3. Tool-Calling Standards
- **CaptureLead**: Standardized tool for meeting requests when scheduling is DISABLED.
- **CheckAvailability/CreateEvent**: G-Workspace integration for scheduling when ENABLED.
- **Safety**: Always validate `modules` flags BEFORE initializing the Gemini model with a specific toolset.

## 4. Development Workflow
- **Aesthetics**: Use the 'Prestige Loader' for client-side feedback during agent materialization.
- **Verification**: Test endpoints with `?tenantId=poc-tenant-123` to verify context isolation.

## 4. Infrastructure-Aware Auth (IAP / Cloud Run)

When orchestrating services on Google Cloud Run gated by IAP:
- **Never Hardcode Build-Time Secrets**: Do not rely on `VITE_*` variables for critical auth keys in production.
- **Dynamic Config Fallback**: Implementation must always check for `window.__AGILITY_CONFIG__` (the Config Bridge).
- **Runtime Injection**: Ensure that backend services serve a `/config.js` endpoint to facilitate dynamic secret injection from Secret Manager.

This prevents authentication failure (`AUTH/API-KEY-NOT-VALID`) when deploying to environments where build-time context is disconnected from runtime secrets.

## 🏗️ Self-Healing Infrastructure
Infrastructure components should be autonomously discoverable and self-healing.
- **Heartbeat Discovery**: Nodes must heartbeat into the `adminApi` with a `masterId` to trigger automatic Registry enrichment and tracking-node cleanup.
- **Bootstrap Pattern**: Implement server-side `bootstrap` actions in the `adminApi` to repopulate core Registry data, bypassing reliance on unstable local seed files.
- **Global Reconciliation**: Use `syncFleet` to mass-reconcile Fleet entries against the Customer Registry.

## 🚀 Environment Standard
- **Cloud-First Development**: Prioritize **Firebase Cloud Development Environments** over local setups to ensure system parity and reduce integration overhead.

## 6. API-Perimeter Security (Security Relay)

Due to constraints with the Data Connect Client SDK in Node.js, **"True RLS" at the database engine level via identity relay is currently an anti-pattern**.

Instead, standardize on **Security Relay (API Perimeter)**:
- **Registry Access**: Core tables accessed exclusively by the server must be set to `@auth(level: PUBLIC)` to prevent `UNAUTHENTICATED` rejections.
- **Perimeter Defense**: The Cloud Function acts as the absolute perimeter, enforcing Domain constraints, MFA claims, and Tenant scoping logic *before* querying Data Connect.
- **Client SDK**: Initialize Data Connect globally, but do *not* attempt to use `impersonate: { auth }` with the Client SDK during concurrent server requests.

## 7. Coding Snippets (Security Relay Implementation)

```javascript
const { onRequest } = require("firebase-functions/v2/https");
const { getDataConnect, executeQuery } = require("firebase/data-connect");

exports.deliveryEngine = onRequest({ region: "us-central1", cors: true }, async (req, res) => {
    // 1. Strict Perimeter Authorization
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).send("Unauthorized");
    
    const decodedToken = await admin.auth().verifyIdToken(authHeader.split('Bearer ')[1]);
    if (!decodedToken.firebase.sign_in_second_factor) return res.status(403).send("MFA Required");

    // 2. Execute Query with Public Access (Secured by Perimeter)
    // Note: The registry.gql must use @auth(level: PUBLIC) for this query.
    const dc = getDataConnect(connectorConfig);
    const result = await executeQuery(getTenantRef(dc, { id: req.body.tenantId }));

    res.json(result.data);
});
```
