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
