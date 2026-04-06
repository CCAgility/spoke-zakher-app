# Global AI Compliance Rules

## 🧬 Agentic Subconscious
- **ALL agents MUST check the `SUBSTANCE.md` file** in the project root before starting any task.
- This file contains project-specific "subconscious" preferences, tech stack decisions, and active snags that are not yet reflected in the formal documentation.
- Failure to adhere to the Substance is a protocol violation.

## 🛠️ Infrastructure Protocol
- **Admin API Access**: Administrative tasks requiring IAM/GCP permissions should leverage the `adminApi` or the Cloud Function "Trojan Deployment" pattern if local credentials fail.
- **Data Connect Neutrality**: Maintain strict tenant isolation at the schema and application layers.
