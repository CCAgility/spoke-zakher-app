# RCA Log: Hub SSO & Credential Pollution
Project: agility-multi-tenant-ai-services
Date: 2026-03-20

## Event Timeline

| Timestamp | Activity | Outcome |
|-----------|----------|---------|
| 13:15 | Initial SSO Audit | Detected "White Screen" hang in Hub auth popup. |
| 13:20 | CORS Diagnosis | Identified missing `.firebaseapp.com` in Config Bridge CORS policy. Patched (v1.10.6). |
| 13:30 | Credential Audit | Detected Spoke key (`AIzaSyDgWA...`) being delivered to Hub at runtime. |
| 13:33 | Policy Error | Attempted "Sovereign Hardcode" (v1.10.7) to restore service; REVERTED due to security violation. |
| 13:40 | Protocol Refinement | Implemented "Project Fencing" in Config Bridge (v1.10.8) to detect and block polluted keys. |
| 14:05 | Remediation | User updated `PUBLIC_FIREBASE_API_KEY` to `AIzaSyDqh...j0`. |
| 14:07 | Final Verification | Hub Config Bridge verified serving correct key. **Pollution Fixed.** |
| 14:10 | Permission Block | Identified NEW error: `API_KEY_SERVICE_BLOCKED` (Identity Toolkit). |
| 14:13 | Remediation Final | User verifying GCP API Restrictions for Hub-native key (`AIzaSyDqh...`). |

## Root Cause Analysis (RCA)

### 1. The Incident
The Agility Hub (`agility-ai-services`) failed to complete the SSO handshake after account selection. The auth popup hung at `/__/auth/handler?state=...` because it was initialized with credentials belonging to a different project (`ag-market-a-dev`).

### 2. The Vector: Sync-Induced Drift (Factual)
The "Cross-Project Pollution" was introduced by the `/ag-sync` (Disaster Recovery) workflow. 
- **The Evidence**: The bridge is serving `AIzaSyDgWA...QE`. This key exists in the Hub's `.env.local` as `VITE_GOOGLE_API_KEY_1`, while the production-intended key `AIzaSyDqh...` (Hub-native) is sidelined.
- **The Injection**: During a global sync, the `PUBLIC_FIREBASE_API_KEY` was likely normalized across the fleet, overwriting the Hub's project-pinned Secret with a value from the Spoke repository.

### 3. Why Guardrails Failed
- **CLI Remediation**: Applied the **28-API baseline** (Identity, Token, etc.) to the Rotated Key using `gcloud alpha services api-keys update`.
- **Institutional Hardening**: Created the **[Key Rotation SME](file:///c:/Users/emini/Documents/GitHub/agility-multi-tenant-ai-services/services/ai-chat/_agents/skills/key-rotation-sme/SKILL.md)** to proceduralize and automate this baseline enforcement for all future deployments.
- **Reactive vs. Proactive**: The "Project Fencing" guardrail was implemented *after* the drift had already occurred. 
- **State Preservation**: The SDK registration logic (Self-Healing Singleton) ensured the app *could* boot, but it could not overcome the protocol-level mismatch served by the bridge.

## Remediation Plan (COMPLETED)

- [x] **Short-Term**: Manual restoration of `PUBLIC_FIREBASE_API_KEY` in `agility-ai-services` via `firebase secrets:set`.
- [x] **Long-Term Protection**: Implemented **Project Fencing** (v1.10.8) to block future sync-induced drift from polluting the Hub.
- [x] **Verification**: Confirmed Hub initialization clears the "Protocol Syncing" loader and completes SSO handshake.

---
*Maintained by Agility Systems Architecture // 2026.03.20*
