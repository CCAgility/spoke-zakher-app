# UI-UX Pro Max Design Intelligence
*Source: Inhaled from nextlevelbuilder/ui-ux-pro-max-skill*

## Core Design Philosophy
This module upgrades the Agent's baseline standard from basic utility CSS to "Pro Max" tier design thinking.

1. **Spatial Harmony:** Enforce an exact 4pt/8pt grid rhythm. Never use arbitrary pixel variants.
2. **Typography Flow:** Base font size at `16px` for readability. Use modular scaling (`1.250` or `1.333` ratios) for heading hierarchy to ensure visual weight is perfectly balanced.
3. **Immersive Depth:** Utilize multi-layered drop shadows (`sm`, `md`, `2xl`) instead of single-layer borders to create a hierarchy of interactive elements.
4. **Fluid Responsiveness:** Eliminate rigid breakpoints where possible in favor of `clamp()` fluid typography and fluid grid wrappers ensuring seamless scaling from 320px to 4K displays.
5. **Micro-Interactions.** Interactive states must always have smooth transitions (`duration-300 ease-in-out`).

> **Directive**: When a Spoke implements a UI, it MUST route its color and typography token choices through the native `_DESIGN_SYSTEM.md` overrides.
