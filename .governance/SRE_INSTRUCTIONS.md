# 🛡️ SRE INSTRUCTIONS: SPOKE-ZAKHER-APP
**Version**: 1.0.0  
**Effective**: 2026-04-06  
**Authority**: Agility Hub — Chief Governance Officer

---

## MANDATORY PRE-FLIGHT COMPLIANCE

**Before ANY code generation, modification, or deployment in this repository, the operating agent MUST:**

1. **READ** all files in the `/.governance/` directory.
2. **VERIFY** the current task does not violate any protocol listed in `GENESIS_FACTORY_STANDARD.md`.
3. **CONFIRM** all secrets management follows the Zero-Trust model in `ZERO_TRUST.md`.
4. **CHECK** the `LESSONS_LEARNED.md` for known pitfalls related to the current task.
5. **LOG** any governance-relevant action in a structured format.

Failure to comply is a **Protocol Violation** and triggers the Flash-Pause Protocol.

---

## PROTOCOL QUICK-REFERENCE

### Protocol 1: Deterministic Naming
- All resources follow `Prefix-Tenant-Environment` (§1 of Factory Standard).
- Tenant slug: `zakher`. Environment: `dev`.
- Pattern validation: `genesis-zakher-dev`, `spoke-zakher-app`.

### Protocol 8: Next.js App Router Engine
- All pages use `src/app/` directory routing.
- Server Components are the default. Client Components require `'use client'` directive.
- All navigation uses `next/link` (NOT `react-router-dom`).
- Dynamic data fetched via the Directus SDK Singleton (`src/lib/directus.ts`).

### Zero-Trust Secrets
- `.env.local` is LOCAL DEVELOPMENT ONLY — never deployed.
- Production secrets via `valueFrom.secretKeyRef` in Cloud Run YAML.
- Windows CRLF Protection: Use `[System.IO.File]::WriteAllBytes()` for secret writes.
- NEVER hardcode tokens, passwords, or API keys in source code.

### Cloud Run Operational Rules
- `--update-secrets` for additive changes (NEVER `--set-secrets`).
- Always specify `--service-account` on Cloud Run Jobs.
- Directus version MUST be pinned (`directus/directus:10.10.7`).

### Tenant Isolation
- All CMS queries MUST filter by `tenant_id`.
- Environment variable: `NEXT_PUBLIC_TENANT_ID="zakher"`.
- Row-Level Security enforced at the database layer.

---

## AGENT DELEGATION RULES

| Agent | Authority | Guardrails |
|-------|-----------|------------|
| **Opus/AG** (Architect) | Full — architecture, debugging, plan authorship | Must consult governance before infrastructure changes |
| **Flash** (Executor) | Execution only — no debugging, no architecture | Hard-stop on failure; report and yield |
| **Antigravity** (Foreman) | Autonomous operations within governance bounds | Must verify `.governance/` before every task |

---

## COMPLIANCE SCAN CHECKLIST

Before any production push (`git push origin main`), verify:

- [ ] No hardcoded secrets in any `.tsx`, `.ts`, or `.env` file committed to git.
- [ ] All `Link` components use `href` (Next.js), not `to` (React Router).
- [ ] All CMS queries include `tenant_id` filter.
- [ ] `npm run build` passes without errors.
- [ ] `.governance/SYNC_MANIFEST.md` shows current sync version.
- [ ] No files in `.governance/` have been locally modified.

---

*Enforced by Agility Hub Governance Engine // 2026-04-06*
