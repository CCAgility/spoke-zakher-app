---
name: Key Rotation SME
description: Expert guidance for automated API key rotation and restriction management.
---

# Key Rotation SME Skill

This skill provides mandatory procedures and automated logic for rotating GCP API keys while maintaining the "25 API Baseline" required for Agility Hub/Spoke operations.

## 1. The "25 API Baseline"

All Tier 1 public keys MUST be restricted to the following internal service identifiers to ensure full Firebase/Hub functionality:

| Search Label | Internal Service Name |
|--------------|-----------------------|
| Identity Toolkit | `identitytoolkit.googleapis.com` |
| Identity Platform | `identityplatform.googleapis.com` |
| Token Service | `securetoken.googleapis.com` |
| Firestore | `firestore.googleapis.com` |

## 2. Automated CLI Rotation & Alignment

To rotate a key and apply the baseline in a single pass, use the following `gcloud` logic:

### A. Identify Key
```bash
gcloud alpha services api-keys list --project=[PROJECT_ID] --filter="displayName='[KEY_NAME]'" --format="value(name)"
```

### B. Apply Baseline (29 APIs)
```bash
gcloud alpha services api-keys update [KEY_ID] \
  --api-target=service=identitytoolkit.googleapis.com \
  --api-target=service=identityplatform.googleapis.com \
  --api-target=service=securetoken.googleapis.com \
  --api-target=service=firestore.googleapis.com \
  --api-target=service=firebasedataconnect.googleapis.com \
  --api-target=service=firebasehosting.googleapis.com \
  --api-target=service=firebasestorage.googleapis.com \
  --api-target=service=logging.googleapis.com \
  --api-target=service=sqladmin.googleapis.com
```

### C. Mandatory Secret Alignment
After rotating the key, you MUST update the `PUBLIC_FIREBASE_API_KEY` secret and perform a namespaced deployment:

1. **Update Secret**: `gcloud secrets versions add PUBLIC_FIREBASE_API_KEY --data-file=- --project=[ID]`
2. **Surgical Deploy**: `firebase deploy --only functions:[codebase]:platformConfig`

## 4. The Agility Master Key (Tier 2/3) Rotation Protocol (v7.3.2)

To rotate the Hub-native Gemini Master Key while maintaining strict sovereignty:

1. **Generation**: Create a new API key in Google AI Studio or GCP Console specifically for the Hub project.
2. **Restriction**: MUST restrict the key to the `Generative Language API` only.
3. **Secret Update**: `firebase functions:secrets:set AGILITY_MASTER_API_KEY --project agility-ai-services`
4. **Propagate**: Respond `Yes` to the CLI prompt to re-deploy functions (`adminApi`, `deliveryEngine`).
5. **Baseline Sync**: Update the `PROJECT_COLLISION_REGISTRY` in `scripts/compliance.py` with the new key string to prevent "Pollution" false positives in future scans.

## 5. Propagation SLAs
- **Standard**: 180 seconds.
- **Max**: 300 seconds.
- **Fail-Safe**: If `API_KEY_SERVICE_BLOCKED` persists after 300s, verify and re-apply the baseline.

---
*Maintained by Key Rotation SME // BMADD v7.3.2 (2026-03-20)*
