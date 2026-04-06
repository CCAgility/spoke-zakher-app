# 🔒 Zero Trust Model (ZT)
**Status**: Active Baseline | **Scope**: Global (Hub & Spokes)

The Agility Platform adheres to a **Zero Trust** security model. We assume no implicit trust and verify every transaction, regardless of origin.

## 🚀 The Core Concepts of Agility Zero Trust (Audit Scope)

### 1. Continuous Verification (Never Trust)
We treat every request as potentially malicious, regardless of its origin (Internal/External).
- **Identity-First**: Every transaction is gated by a cryptographically verified Firebase ID Token.
- **Contextual Auth**: Verification includes session expiration, project-specific audience checks, and token integrity.

### 2. Least Privilege (RBAC)
Users and services are granted only the minimum permissions required to perform their specific function.
- **Role-Based Gating**: Roles (`admin`, `dev`, `customer-success`) are embedded in the identity token custom claims.
- **Granular API Entry**: Endpoints are explicitly checked for required roles before processing (e.g., `checkAdminRole` middleware).

### 3. Assume Breach (Data Centricity)
We assume the network perimeter is compromised and protect the data at the source.
- **Cryptographic Isolation (SATURATED)**: Database-level **PostgreSQL RLS** ensures data is invisible and immutable to unauthorized tenants. Every operation is row-scoped by the caller's verified JWT identity, protecting against application-layer compromise.
- **Encryption in Transit**: All communication between Spokes, the Hub, and GCP services is via TLS 1.3+.

### 4. Micro-segmentation (Tenant Isolation)
Workloads and data are divided into atomic segments to prevent lateral movement.
- **X-Tenant-Id Isolation**: The `slug` based isolation strategy ensures compute and storage contexts are strictly segmented per tenant.
- **Service Identity**: Cloud Run services use dedicated Service Accounts with minimal IAM permissions.

### 5. Dynamic Policy Enforcement
Security policies are enforced in real-time based on the most current user context.
- **Claims-Based Authorization**: Data Connect `@auth` directives automatically map user claims (`tenantId`) to database access patterns at the engine level.
- **Identity Relay**: Cloud Functions act as an "Identity Bridge," relaying the caller's JWT context using Data Connect impersonation patterns to ensure RLS saturation.

## 📊 Audit Evidence Artifacts
- **[Deployment Log](../../DEPLOYMENT_LOG.md)**: Real-time history of authenticated deployments.
- **[Governance Standards](../../GOVERNANCE.md)**: Codified security mandates and versioning rules.
- **[Data Connect Schema](../../../dataconnect/schema/schema.gql)**: Proof of database-level RLS and auth directives.

---
*Verified by Antigravity Compliance Agent*
