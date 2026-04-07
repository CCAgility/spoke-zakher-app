---
name: GCP Console & Identity Platform SME
description: Expert-level guidance for managing Google Cloud Console, Identity Platform, and Multi-Factor Authentication.
---

# GCP Console & Identity Platform SME Skill

This skill provides comprehensive instructions for managing enterprise-grade authentication and infrastructure settings within the Google Cloud Console and Firebase.

## Identity Platform Management

### Upgrading from Firebase Authentication
Standard Firebase Authentication must be upgraded to **Identity Platform** to unlock advanced features:
1. Navigate to **Authentication > Sign-in method** in the Firebase Console.
2. Scroll to the **Advanced** section.
3. Click **Upgrade to enable** on the Identity Platform card.
4. Follow the 4-step wizard (SMS, Pricing, Predict, Finalize).

### Multi-Factor Authentication (MFA)
Identity Platform supports two primary MFA methods:

1. **SMS MFA**:
   - High cost per message ($0.01 - $0.60+).
   - Easy to enable via the UI.
3. **MFA Factor Pruning**:
   - If a user hits the `maximum-second-factor-count-exceeded` error, factors must be withdrawn via the Identity Platform REST API.
   - **Endpoint**: `https://identitytoolkit.googleapis.com/v2/projects/${PROJECT_ID}/accounts/${UID}:withdrawMfa`

## Programmatic Configuration

### Enabling TOTP via REST API
If the UI toggle is missing, use the Identity Platform REST API:

```bash
# Get an access token
TOKEN=$(gcloud auth print-access-token)

# Update project configuration
curl -X PATCH -H "Authorization: Bearer $TOKEN" \
     -H "Content-Type: application/json" \
     -d '{
       "mfa": {
         "state": "ENABLED",
         "enabledProviders": ["TOTP"]
       }
     }' \
     "https://identitytoolkit.googleapis.com/v2/projects/${PROJECT_ID}/config?updateMask=mfa"
```

### Admin SDK Usage (Node.js)
```javascript
const admin = require('firebase-admin');
const auth = admin.auth();

async function enableTotp() {
  await auth.projectConfigManager().updateProjectConfig({
    multiFactorConfig: {
      state: 'ENABLED',
      factorConfigs: [
        {
          state: 'ENABLED',
          totpConfig: {
            adjacentIntervals: 5
          }
        }
      ]
    }
  });
}
```

### Tiered Secret Management
BMADD v7.3.0 enforces a strict distinction between configuration and credentials:

1. **Public Config (`PUBLIC_*`)**:
   - Used for non-sensitive values like Firebase API Keys or App IDs.
   - Served via the `platformConfig` bridge for backend-to-frontend injection.
   - Example: `PUBLIC_FIREBASE_API_KEY`.
2. **Sensitive Secrets (`AGILITY_*` / `HUB_*`)**:
   - Used for private keys, database passwords, and master administrative tokens.
   - **MUST NEVER** be exposed via any public bridge or frontend code.
   - **Gemini Master Key**: MUST be restricted to the `Generative Language API` only in the GCP Credentials Console.
   - Example: `AGILITY_MASTER_API_KEY`.

### Integration Workflow
1. **Creation**: `gcloud secrets create [SECRET_NAME] --replication-policy="automatic"`
2. **Firebase Injection**:
   ```javascript
   const mySecret = defineSecret("MY_SECRET_NAME");
   exports.myFunc = onRequest({ secrets: [mySecret] }, async (req, res) => {
       const val = mySecret.value();
   });
   ```

## Troubleshooting
- **403 MFA_REQUIRED**: Ensure the user has enrolled in MFA before attempting protected actions.
- **Unauthorized: Invalid token**: Often caused by using hardcoded "sync tokens" (e.g., `PROD_HUB_SYNC`) instead of a verified Firebase ID token.
- **requires-recent-login**: MFA enrollment requires a fresh session (re-authenticate before enrolling).
- **maximum-second-factor-count-exceeded**: Withdraw factors via Admin SDK or REST API to reset the 5-factor limit.
- **AUTH/API-KEY-NOT-VALID (Blocked)**: 
  - Ensure the key used by the Hub (from Secret Manager) matches the key in the Console list.
  - Verify **Identity Toolkit API** is allowed in the key's 'API restrictions'.
  - Check that **Token Service API** and **Firebase Data Connect API** are also allowed for full functionality.
- **Protocol Syncing (Hang)**: 
  - If the loading screen hangs while "Security Verification" is visible in the header, it indicates an unhandled MFA challenge.
  - **Remedy**: Ensure the frontend catch block for `auth/multi-factor-auth-required` sets `authLoading(false)`.
  - **Verification**: Use the `Mnt` (Mount) ticker in the footer to verify the page is not in a reload loop.

---
*Maintained by Agility AI Architects // BMADD v7.3.2 (2026-03-20)*
