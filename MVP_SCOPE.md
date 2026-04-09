# Grupo Zakher — MVP Scope & Architecture Constraints

## Overview
This document outlines the core structural definitions and accepted architectural limits for the MVP (Minimum Viable Product) launch of the Zakher CMS Spoke.

## Core Feature: Property Room Presentation Strategy
### Selected Protocol: Option D (Interactive Bento Grid + Floating Modal)

During the pre-launch prototyping phase, multiple layout configurations were heavily scrutinized for the presentation of the 7-bedroom estate layout (Casa Estrella). We have formally selected the **Interactive Bento Grid** as the rigid standard for the MVP rollout. 

### Strategic Reasoning (For Stakeholder/Customer Objections)
If questioned internally or by customers about why rooms aren't broken down into traditional nested multi-page navigation (e.g. `domain.com/rooms`, `domain.com/junior-suite`), reference the following architectural logic:

1. **Highest Conversion Retention**: Industry data overwhelmingly proves that navigating *away* from the primary property/booking page to view secondary room assets significantly increases cart abandonment. The Bento Modal loads high-res assets seamlessly *over* the active page, ensuring the user retains spatial context and never loses the sticky "Reserve" action.
2. **Visual Immersion**: A grid inherently provides a "lookbook" emotional connection prior to clicking. Users natively understand tapping a masonry block expands it, pulling from the familiarity of platforms like Airbnb Luxe and Aman Resorts.
3. **Frictionless Mobile UX**: Nested pages require multiple slow load sequences on mobile connections. A single-page application (SPA) hydrating the Bento Modals from Directus guarantees instantaneous exploration, which is critical for ultra-high-end real estate presentation.

## Technical Limits for MVP
- **Single Page Architecture**: No distinct URLs will be generated for individual bedrooms.
- **Asset Hydration**: Modals will securely fetch their array of high-res WebP images purely by hydrating from the Directus `rooms` schema collection.

## Core Feature: The High-Conversion Sidebar Geometry (Option A)

During the structural design of the *Private Villa Layout* section, an asymmetrical **66/33 (12-column grid)** layout was mandated over a traditional symmetrical 50/50 split. Furthermore, all redundant "Amenities Checklists" were stripped from the black rental information sidebar.

### Strategic Layout Reasoning:
If questioned by stakeholders regarding the omission of detailed amenities next to the property photos, or the heavily weighted left-side footprint, reference this architectural logic:

1. **High Visual Footprint (66%)**: Symmetrical layouts compress imagery equally against text. By allocating 66% (lg:col-span-8) to the Bento Grid, the ultra-luxury visual storytelling is heavily prioritized, invoking a significantly deeper emotional response.
2. **Peak-Excitement CTA Targeting**: By removing administrative and repetitive checklist data from the black 33% sidebar, we avoid fatiguing the user. Instead, the sidebar leverages the user's "peak visual excitement" from the bento grid immediately adjacent to it, forcefully directing their eyes to a stark, high-contrast **"CHECK AVAILABILITY"** button directly beneath the baseline pricing logic.
3. **Luxury Frictionless Pacing**: True luxury interfaces never present the user with a spreadsheet. Granular amenities are cleanly reserved for the *Global Amenities Module* and strictly contextualized inside the single-page *Suite Level* modals, keeping the main page flow clean, bespoke, and strictly conversion-oriented.

## Deferred (Phase 2) High-Conversion UX Components
Following the Promax SME UI/UX Audit, the following high-yield architectures were identified but explicitly deferred from the MVP scope pending stakeholder approval:

### 1. Institutional Social Proof Module
*   **Concept:** A dedicated trust-building sector featuring curated "pull-quotes" from high-profile guests and a "Sovereign Audited / Concierge Certified" lockup.
*   **Strategic Reasoning:** Moving a $2,000/night asset requires eliminating all scam anxiety and establishing absolute administrative trust before the user hits the booking CTA.

### 2. "A Day at Casa Estrella" Timeline Architecture
*   **Concept:** Transitioning the functional "Amenities" checklist (e.g. WiFi, Pool) into a sequential, experiential timeline (e.g. *8:00 AM Rooftop Espresso* -> *2:00 PM In-Suite Massage* -> *8:00 PM Private Chef*).
*   **Strategic Reasoning:** Ultra-luxury conversion thrives on selling curated timelines, not individual hardware. Transitioning to chronological storytelling drastically increases emotional investment prior to booking.

### 3. Homepage Global CTA Resolution
*   **Status:** [**RESOLVED**]
*   **Concept:** Completely purging dead/hidden global reservation hooks on the root homepage in favor of a strict conversion funnel.
*   **Strategic Reasoning:** A generalized booking widget on a multi-property corporate page creates decision paralysis. Forcing users down the funnel (`Corporate Home` -> `Select Property` -> `Check Availability`) or routing root inquiries to the bespoke `Concierge Drawer` massively increases targeted conversion rates without UX ambiguity.

### 4. Homepage "Editorial Pillar" Refactor
*   **Status:** [**IMPLEMENTED RUNTIME**]
*   **Concept:** Breaking down the monolithic "About Grupo Zakher" text block into a digestible, 3-column "Bento" editorial grid (*The Portfolio*, *The Service*, *The Discretion*).
*   **Strategic Reasoning:** High-net-worth internet users scan for metrics of value; they do not read monolithic paragraphs. Expanding the layout to cleanly reflect the aesthetic topography of the property pages drastically increases engagement metrics and validates brand equity.

### 5. Network-Aware Delivery Protocol (SSR)
*   **Status:** [**IMPLEMENTED RUNTIME**]
*   **Concept:** Catching the `Save-Data` HTTP header at the Next.js server-side layer to dynamically throttle LCP image quality payloads.
*   **Strategic Reasoning:** Loading 8MB of 4K WebP assets into a throttled `3G` mobile connection crushes SEO Core Web Vitals and causes massive layout bouncing. Throttling quality to `30%` on restricted connections guarantees the "Time to Interactive" standard without failing aesthetic constraints.

### 6. The Global Concierge Drawer
*   **Status:** [**IMPLEMENTED RUNTIME**]
*   **Concept:** A unified, sliding 60/40 viewport modal to handle contact forms, booking inquiries, and locale states.
*   **Strategic Reasoning:** Intersecting user inquiries without forcing a hard page navigation (`/contact`) prevents abandonment and keeps the luxury property assets firmly positioned in the user's peripheral vision while they type.
