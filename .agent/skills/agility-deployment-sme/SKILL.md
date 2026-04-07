---
name: Agility Deployment SME
description: Expert-level guidance for deploying Agility Hub and Spoke infrastructure across Firebase, Data Connect, and Cloud Functions.
---

# Agility Deployment SME Skill

This skill provides a comprehensive framework for managing production-grade deployments while maintaining security consistency and fleet visibility.

## 1. Firebase Deployment Standards

### Multi-Codebase Deployments
When managing multiple codebases (e.g., `platform` and `stop-deed-theft`), use explicit targeting:
- **Command**: `firebase deploy --only "functions:platform,functions:stop-deed-theft"`
- **Note**: Always use double quotes for comma-separated lists in PowerShell to avoid parsing errors.

### Firebase Auth Initialization (Next.js v15 / Turbopack)
In production builds, `@firebase/auth` registration may fail due to tree-shaken side-effects.
- **Mandatory**: Add `import 'firebase/auth'` to the top of your Firebase utility.
- **Pattern**: Use a 'Self-Healing' singleton that catches the `"Component auth not registered"` error and retries with `initializeAuth`.
- **Early-Priming**: Call the initialization utility in a browser-targeted entry point (e.g., `layout.tsx`) to ensure stable telemetry before component interaction.

### Data Connect (SQL)
Data Connect requires specialized deployment to synchronize the PostgreSQL schema and GraphQL connectors:
1. **Schema Check**: Ensure `@auth` rules follow the `[read, write]` array syntax.
2. **Command**: `firebase deploy --only dataconnect`
3. **Rollback**: If `@auth` rules cause regressions, revert `schema.gql` and use Cloud Function middleware for authorization instead of SDK-level impersonation.

## 2. Security & Secret Management

### 2.2. Sovereign Deployment Fencing (v7.3.2)
To prevent cross-project pollution during rapid deployments:
- **Mandatory Project Validation**: Every cloud function MUST validate the `project_id` in injected secrets against the runtime `GCLOUD_PROJECT`.
- **Secret Versioning**: Use `firebase functions:secrets:set SECRET_NAME --project PROJECT_ID` to rotate keys; this ensures immediate propagation and staleness cleanup across the fleet.
- **Interlock**: Automated cross-project synchronization of secrets is **STRICTLY PROHIBITED**. Use project-pinned secondary keys for multi-project reasoners.

### 2.3. Zero-Trust Principles
- **No Static Tokens**: Hardcoded bearer tokens like `PROD_HUB_SYNC` are deprecated. Use verified Firebase ID tokens for all inter-service heartbeats.
- **MFA Enforcement**: All write operations (`POST/PATCH/DELETE`) to `adminApi` must verify the `sign_in_second_factor` claim in the decoded JWT.

## 3. Fleet Recovery & Bootstrapping

### Manual Node Restoration
If node visibility is lost due to a database wipe or RLS restriction:
1. **Bootstrap Action**: Call the `bootstrap` action on the `adminApi` with a verified administrator token.
2. **Sync Loop**: Trigger a `syncFleet` action via the Fleet Monitor UI to mass-reconcile discovered nodes with the registry.

### MFA Enrollment Limits
- **Error**: `maximum-second-factor-count-exceeded`.
- **Mitigation**: Users must be unenrolled from existing TOTP factors via the Google Cloud Console or Identity Platform REST API if they exceed the 5-factor limit or experience enrollment loops.

---
*Maintained by Agility AI Architects // BMADD v6.1.1*
