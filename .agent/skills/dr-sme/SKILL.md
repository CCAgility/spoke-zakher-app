---
name: Disaster Recovery SME
description: Expert-level guidance for performing Agility Platform synchronization, backups, and service restoration (DR).
---

# Disaster Recovery (DR) SME Skill

This skill governs the high-availability synchronization and restoration protocols for the Agility Multi-tenant ecosystem, ensuring data integrity during state transfers and backups.

## 1. Sovereign Repository Management (BMADD v7.3.2)

The legacy synchronization protocol (`/ag-sync`, `sync-hub.ps1`) has been **PERMANENTLY DECOMMISSIONED** to prevent cross-project credential pollution.

- **Primary Protocol**: Use standard Git-based repository management for code flows.
- **Secret Strategy**: All secrets MUST be managed natively within their respective GCP Projects. Cross-project secret mirroring is strictly prohibited.
- **Backup**: State-level backups (Clues, Registry) are handled via Data Connect / Cloud SQL automatic snapshots.

---

## 2. Project Fencing & Secret Integrity (BMADD v7.3.2)

To prevent "wires crossed" during DR synchronization:

- **Mandatory Mapping**: The sync script MUST verify the `project_id` for each Spoke before overwriting its `PUBLIC_` secrets in Secret Manager.
- **Tier 1 Secret Exclusion**: Secrets containing environment-specific bindings (e.g., `PUBLIC_FIREBASE_API_KEY` with project-specific `api_key` and `project_id`) MUST NEVER be synchronized across projects. These are "Project-Fenced" and must be managed natively.
- **Drift Detection**: Any mismatch between the local `.env` and the remote Secret Manager must be flagged as a **BLOCKING** sync failure for that node.
- **Tenant Isolation**: DR backups must maintain separate archive paths for each tenant to avoid cross-pollution of customer data.

---

## 3. Recovery & Restoration

### Node Restoration
In the event of a total project loss:
1. **Re-initiation**: Run `/init-project` to bootstrap the infrastructure.
2. **Registry Sync**: Call `adminApi:syncFleet` to re-discover active nodes from the registry.
3. **Secret Re-wiring**: Use the DR backup to restore versioned secrets to Secret Manager.

### Heartbeat Smoke Test
Post-restoration, a **Heartbeat Smoke Test** is mandatory:
- Verify uplink to the `agility-ai-services` Hub.
- Confirm RLS policies are active on the restored SQL instance.

---

## 4. Governance Audit

- **Audit Requirement**: Every `/ag-sync` execution must generate a `SYNC_REPORT.md` in the `docs/wiki/dr-audits/` directory.
- **Conflict Resolution**: If a sync conflict occurs, the **Hub Master Registry** is the definitive source of truth over local spoke configs.

---
*Maintained by Agility DR Architects // BMADD v7.3.2 (2026-03-20)*
