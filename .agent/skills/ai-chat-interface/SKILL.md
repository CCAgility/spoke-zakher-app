---
name: AI Chat Interface
description: Patterns and best practices for building high-fidelity, responsive AI chat widgets in the Agility/Live Peak Protocol ecosystem.
---

# AI Chat Interface Skill

This skill documents the engineering standards for the Agility AI Chat Widget (`widget.js`), focusing on "Sovereign" aesthetics, robust mounting, and conversational state management.

## 🏗️ Architecture & Component Mounting

### 1. Robust Mounting Strategy
Chat widgets must survive Single Page Application (SPA) route changes and aggressive DOM purges by third-party scripts.
- **MutationObserver**: Use a global `MutationObserver` to watch `document.body` and re-mount the widget if its container is removed.
- **Heartbeat**: Implement a `setInterval` backup to check for the container ID every 2000ms.
- **Shadow DOM (Recommended)**: Encapsulate styles within a Shadow Root to prevent CSS leakage from the host site.

### 2. Styling (Sovereign Glass Aesthetic)
Widgets should embody the "Sovereign Void" and "Rose Gold" visual language.
- **Background**: `rgba(10, 10, 10, 0.98)` with `backdrop-filter: blur(20px)`.
- **Accents**: Rose Gold (`#E2B196`).
- **Typography**: Inter (System-ui fallback).
- **Theme**: Support a `.light-mode` override with high-contrast brown/rose gold text.

## 💬 Conversational Logic

### 1. Persistence Standard (v2.7.2)
Maintain session continuity without server-side database overhead where possible.
- **Session Storage**: Use `sessionStorage` for message history to persist through page reloads within a single tab session.
- **Local Storage**: Use `localStorage` to pin the `sessionId` for the current tenant.

### 2. Registry Shield Compliance (v6.1.0)
All heartbeats MUST include a `masterId` to ensure correct metadata linkage in the Fleet Monitor.
- **Script Attribute**: Explicitly tag the widget with `data-master="CUSTOMER-ID"`.
- **Heartbeat Payload**: Include `masterId` in the `POST` body.
- **API URL**: Standardize on `https://us-central1-agility-ai-services.cloudfunctions.net/adminApi`.

### 3. Markdown & Navigation Interception
The AI Concierge must produce clickable, actionable internal links.
- **Regex Parsing**: Convert `[Label](url)` into `<a>` tags.
- **Internal Link Detection**: Detect links starting with `/`, `#`, or matching known internal domains.
- **Event Interception**: Intercept clicks on internal links to prevent full page reloads and dispatch a `CustomEvent('agility-navigate', { detail: { path } })`.

## ⚡ UX & Micro-Animations

### 1. Feedback Loops
- **Synthesizing Indicator**: Display a "Synthesizing..." loading state with animated dots during API calls.
- **Bubble Hover**: Trigger subtle Y-axis translation and glow on bubble hover.

### 2. Accessibility
- All interactive elements must have unique, descriptive IDs for BMADD automated testing.
- High-contrast text modes must be available for governance compliance.

## 4. Production Resilience (Cloud Run/IAP)

When developing frontend interfaces for production:
- **Mandatory**: Use the `window.__AGILITY_CONFIG__` pattern (Config Bridge) to allow runtime injection of API keys.
- **Verification**: Always test with a manual `/config.js` probe to ensure the application reacts correctly when build-time environment variables are missing.
- **Fail-Safe**: Provide descriptive error states (e.g., "Auth Protocol Failed") if runtime configuration is unreachable.

## 🚀 Environment Standard
- **Cloud-First Development**: Transition from local setups to **Firebase Cloud Development Environments** as soon as possible. Local environment integration is deprecated.

---
*Maintained by Agility AI Architects // BMADD v6.1.0*
