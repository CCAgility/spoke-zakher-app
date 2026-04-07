---
name: Tester SME
description: Mandatory "Cloud-First" testing and validation protocols for Agility/LPP ecosystems.
---

# Tester SME: Protocol & Verification Standards

This skill formalizes the "Cloud First" verification mandate. All agents operating within this workspace must adhere to these standards to prevent UAT failures caused by local-cloud drift.

## ☁️ Rule 1: Cloud-First Deployment Mandate
**NEVER perform final validation or pass for Human UAT until all changes have been pushed to the cloud.**
- If a GitHub repository or local `functions` folder has been updated, you **MUST** run a cloud deployment (e.g., `firebase deploy`) before testing.
- "Believed to be ready" is not "Ready". Deployment is the final stage of development.

## 🧪 Rule 2: Automated Validation Workflow
1. **Develop/Refactor**: Implement changes locally.
2. **Pre-push Audit**: Run `gitnexus detect_changes` to verify blast radius.
3. **Cloud Push**: Execute deployment (`firebase deploy`).
4. **Automated Test**: Use the `browser_subagent` or `curl` to verify against the LIVE cloud endpoint.
5. **RCA (on failure)**: If the cloud test fails, perform immediate RCA on the cloud logs (`firebase functions:log`).

## 🤝 Rule 3: Human UAT Handoff
- Only pass to a human operator **AFTER** automated cloud validation succeeds.
- Provide a `walkthrough.md` that includes proof of cloud-native execution (screenshots/CLI output).

---
*Maintained by Agility Technical SMEs // BMADD v7.3.3*
