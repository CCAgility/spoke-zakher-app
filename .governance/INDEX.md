# 🧬 DNA GOVERNANCE INDEX
**Scope**: Centralized Governance Artifacts for Spoke Injection  
**Version**: 1.0.0  
**Last Updated**: 2026-04-06  

This directory contains the **canonical governance DNA** that must be injected into every Spoke repository at vend-time. The `/dna/governance` directory in the Hub is the **single source of truth**; Spoke `.governance/` directories are read-only mirrors.

## 📁 Contents

| File | Purpose |
|------|---------|
| `GENESIS_FACTORY_STANDARD.md` | Master Protocol v1.2 — naming, architecture, workflow |
| `ZERO_TRUST.md` | Security model — RBAC, RLS, micro-segmentation |
| `LESSONS_LEARNED.md` | Systemic insights and architectural gotchas |
| `GOVERNANCE_LOG.md` | Tracked system modifications and lifecycle events |
| `RCA_LOG.md` | Root Cause Analysis records |
| `ARCHITECT_SKILL.md` | SME operational protocols and Cloud Run rules |
| `AGENT_RULES.md` | Global AI compliance rules |
| `SRE_INSTRUCTIONS.md` | Spoke-level agent compliance wrapper |

## 🔄 Sync Protocol

1. **Hub → Spoke**: Run `scripts/sync-governance.ps1` to propagate updates.
2. **Spoke `.governance/`**: Read-only. Spokes MUST NOT modify governance files locally.
3. **Versioning**: Every sync stamps the `SYNC_VERSION` in the Spoke's `.governance/SYNC_MANIFEST.md`.
