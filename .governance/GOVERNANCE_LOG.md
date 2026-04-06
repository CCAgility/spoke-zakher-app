# Global Governance Log: Agility AI Services

This log tracks all major system modifications, lifecycle actions, and protocol enforcement events in accordance with BMADD v6.1.0 and Global Governance requirements.

## Post-Implementation Log: Customer Lifecycle Management (v1.2.0)
**Date**: 2026-03-02
**Status**: ACTIVE

### Summary of Changes
- **Metadata Recovery**: Restored "Stop Deed Theft" identity with accurate industry ("Legal Protection") and primary contact details.
- **Registry CRUD**: Implemented full Edit/Delete capabilities in the Admin Portal.
- **Security Guardrails**: Added "Double Safeguard" (Master ID verification) for customer deactivation to prevent accidental data loss.
- **Schema Alignment**: Expanded customer metadata to include `customerUrl` and `industry` verification.

### Implementation Task List
- [x] Abstract Firestore persistence into `FirestoreTenantRepository`.
- [x] Implement `updateCustomer` and `deleteCustomer` API endpoints.
- [x] Add `Edit` and `Delete` UI components to the Admin Portal.
- [x] Implement "Double Safeguard" modal for destructive actions.
- [x] Seed baseline with restored "Stop Deed Theft" (SDT) and "Live Peak Protocol" (LPP) identities.
- [x] Verify visual calibration (Website links) in the Registry table.

---
*Authorized by Agility AI Architects // BMADD v6.1.0*

---

## Post-Implementation Log: SQL-First Registry Step 1 (v1.3.0)
**Date**: 2026-03-16 @ 17:58 UTC
**Status**: ACTIVE

### Summary of Changes
- **Relational Pivot**: Initiated migration of Core Registry from Firestore to PostgreSQL.
- **Discovery Readiness**: Implemented `Clue` schema to support the Passive Discovery protocol.
- **Cost Governance**: Added visibility into Cloud SQL trial expiration (90 days) in the Central Wiki.

### Implementation Task List
- [x] Create isolation branch `feat/sql-registry-s1-schema`.
- [x] Extend `schema.gql` with `Customer`, `Tenant`, and `Clue` tables.
- [x] Implement `registry.gql` with type-safe queries and mutations.
- [x] Enforce `@auth` level security at the connector layer.
- [x] Document Cloud SQL billing lifecycle in the Wiki.
- [x] Create isolation branch `feat/sql-registry-s2-repo`.
- [x] Implement `SqlTenantRepository` using Data Connect SDK.
- [x] Update `functions/package.json` with new dependencies.
- [x] Create isolation branch `feat/sql-registry-s3-migration`.
- [x] Implement comprehensive `migrate-to-sql.js` migration script.
- [x] Create isolation branch `feat/sql-registry-s4-admin-api`.
- [x] Refactor `adminApi` to use `SqlTenantRepository`.
- [x] Implement Passive Discovery (Auto-Clue) in heartbeat protocol.
- [x] Synchronize Hub logs and verify schema alignment.
- [x] Conduct Global Infrastructure Arch/Sec SME Audit.
- [x] Establish Wiki section `docs/wiki/audits/` for centralized governance.
- [x] Implement True RLS Hardening (JWT Claims + Schema Policies + Relay Bridge).
- [x] Saturated Row-Level Security (RLS) across Hub PostgreSQL data layer.
