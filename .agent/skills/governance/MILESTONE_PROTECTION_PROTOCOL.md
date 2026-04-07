# MILESTONE PROTECTION PROTOCOL (MPP)
## Sovereign Milestone: TASK-43 Gold Master — "Zakher Genesis"

**Effective Date:** 2026-04-06T17:27:00-04:00  
**Retention Lock Expiry:** 2026-05-06 (30 days)  
**Protected Bucket:** `gs://agility-vault-159885988938`  
**Project:** `grupo-zakher-web-cms-dev` (159885988938)

---

## Protected Assets

| Asset | Location | Status |
|-------|----------|--------|
| Schema Blueprint (v2 GOLD) | `gs://agility-vault-159885988938/dna/blueprints/zakher_v2_schema_GOLD.json` | 🔒 LOCKED |
| Schema Blueprint (v1 original) | `gs://agility-vault-159885988938/dna/blueprints/zakher_v1_schema.json` | 🔒 LOCKED |
| Hub Source Archive | `gs://agility-vault-159885988938/archives/hub-source-archive.zip` | 🔒 LOCKED |
| Spoke Source Archive | `gs://agility-vault-159885988938/archives/zakher-source-archive.zip` | 🔒 LOCKED |
| Governance Log | `gs://agility-vault-159885988938/dna/governance/GOVERNANCE_LOG.md` | 🔒 LOCKED |
| Governance Guard | `gs://agility-vault-159885988938/dna/governance/GOVERNANCE_GUARD.md` | 🔒 LOCKED |

## Directus Production State (at lock time)

| Collection | Status | Records |
|------------|--------|---------|
| `pages` | ✅ Active | 1 (Home — "Grupo Zakher") |
| `properties` | ✅ Active | 0 |
| `site_config` | ✅ Active | 1 |
| `global_settings` | ✅ Active | 0 |

## API Endpoint

- **Production URL:** `https://directus-cms-159885988938.us-central1.run.app`
- **Static Token:** Synced to `q5KlYjzctH1wkDi82vb7A4FsQL6ZTWgd`
- **Admin Role:** `67ae8578-c7ab-4780-b496-3845d53be6ba` (admin_access: true)
- **Directus Version:** 10.10.7

## HARD BLOCK RULES

> **Any destructive command targeting Task-43 assets is HARD-BLOCKED until the retention lock expires.**

### Prohibited Actions
1. ❌ `gcloud run services delete directus-cms` — BLOCKED
2. ❌ `gcloud storage rm gs://agility-vault-159885988938/**` — BLOCKED (retention lock)
3. ❌ Any "Ironclad", "Reseed", or "Optimization" protocol — BLOCKED
4. ❌ Schema migration that drops `pages`, `properties`, or `site_config` — BLOCKED
5. ❌ Deletion or modification of admin user static token — BLOCKED

### Permitted Actions
1. ✅ Read-only queries against the API
2. ✅ Adding new records to existing collections
3. ✅ Creating new collections (additive only)
4. ✅ Deploying new Cloud Run revisions (non-destructive)
5. ✅ Backup exports to the vault

## Recovery Procedure (if needed)

1. Pull `zakher_v2_schema_GOLD.json` from the locked vault
2. POST to `/schema/diff` then `/schema/apply` on the production endpoint
3. Re-seed data using `push_data.js` from the hub repository
4. Verify 200 OK on `/items/pages` with "Grupo Zakher" branding

---

**Signed:** Automated SRE Recovery — Task-44  
**Audit Trail:** See `docs/reports/task_44_recovery_status.md`
