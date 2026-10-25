---
name: Academic Portal Design System
colors:
  surface: '#fbf9f8'
  surface-dim: '#dcd9d9'
  surface-bright: '#fbf9f8'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f3f2'
  surface-container: '#f0eded'
  surface-container-high: '#eae8e7'
  surface-container-highest: '#e4e2e1'
  on-surface: '#1b1c1c'
  on-surface-variant: '#5c403f'
  inverse-surface: '#303030'
  inverse-on-surface: '#f3f0f0'
  outline: '#906f6e'
  outline-variant: '#e5bdbb'
  surface-tint: '#bf0229'
  primary: '#9e001f'
  on-primary: '#ffffff'
  primary-container: '#c8102e'
  on-primary-container: '#ffdad8'
  inverse-primary: '#ffb3b1'
  secondary: '#115cb9'
  on-secondary: '#ffffff'
  secondary-container: '#659dfe'
  on-secondary-container: '#003370'
  tertiary: '#00591d'
  on-tertiary: '#ffffff'
  tertiary-container: '#0e742b'
  on-tertiary-container: '#99f79e'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdad8'
  primary-fixed-dim: '#ffb3b1'
  on-primary-fixed: '#410007'
  on-primary-fixed-variant: '#92001c'
  secondary-fixed: '#d7e2ff'
  secondary-fixed-dim: '#acc7ff'
  on-secondary-fixed: '#001a40'
  on-secondary-fixed-variant: '#004491'
  tertiary-fixed: '#99f89e'
  tertiary-fixed-dim: '#7edb85'
  on-tertiary-fixed: '#002106'
  on-tertiary-fixed-variant: '#00531b'
  background: '#fbf9f8'
  on-background: '#1b1c1c'
  surface-variant: '#e4e2e1'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.015em
  headline-md:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: -0.005em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.04em
  code-sm:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 18px
    letterSpacing: 0.01em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-desktop: 1.5rem
  margin: 1rem
  margin-tablet: 1.5rem
  margin-desktop: 2rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 0.75rem
  space-lg: 1rem
  space-xl: 1.5rem
  space-2xl: 2rem
---

## Brand & Style

This design system serves an institutional course registration and academic dashboard environment. The brand personality is authoritative, rigorously organized, dependable, and student-focused. It removes cognitive friction during high-stress registration periods by prioritizing immediate readability, clear visual affordances, and strict spatial predictability.

The aesthetic leans into modern institutional enterprise design:
- **Clean Structure & Order:** Structured tabular grids, crisp dividing rules, high contrast, and dense yet balanced data layouts.
- **Tone:** Academic, purposeful, and functional. Avoiding consumer-grade novelties, heavy gradients, or decorative glassmorphism.
- **Emotional Response:** Inspires confidence, clarity, and precision. Students and academic advisors feel in full control of complex schedules, degree audits, prerequisite chains, and deadlines.

## Colors

The palette balances institutional heritage with functional clarity:
- **Primary (`#C8102E` Crimson Red):** Anchors the academic identity. Used for primary navigation states, active structural indicators, key action buttons (e.g., "Register Course", "Submit Schedule"), and critical university alerts.
- **Secondary (`#0056B3` Collegiate Blue):** Serves functional status tracking, links, single-semester course indicators, and informational messaging.
- **Tertiary (`#1E7E34` Academic Evergreen):** Dedicated to prerequisite completion, open seats, registration confirmations, and multi-semester/full-year course badges.
- **Neutral Base & Canvas:**
  - Page Canvas / Base Background: `#F6F7F8` (Light Cool Gray) to reduce screen glare during extended catalog browsing.
  - Cards, Tables & Panels: `#FFFFFF` (Clean White) to frame actionable data clearly against the base background.
  - Crisp Borders & Separators: `#DCE0E5` (Structural Gray) to delineate rows, table cells, and panel bounds without heavy visual weight.
- **Typography & Icons:**
  - Primary Content: `#333333` (Charcoal Neutral) for maximum WCAG AAA contrast against white panels.
  - Secondary/Caption Content: `#555E68` for metadata, course codes, and secondary labels.
- **Semantic Badges & Alerts:**
  - Single-Semester Badges: Light Blue tint (`#EBF3FA`) with Navy Blue text (`#0056B3`).
  - Multi-Semester Badges: Light Green tint (`#E8F5E9`) with Deep Forest text (`#1E7E34`).
  - Warnings & Holds: Amber tint (`#FFF3CD`) with Dark Amber text (`#856404`).
  - Conflicts & Full Sections: Soft Red tint (`#FDE8E8`) with Crimson text (`#C8102E`).

## Typography

The typographic system utilizes **Inter** across display, body, and UI labels to preserve a neutral, crisp, enterprise standard with optimal tabular figure support and character distinction:
- **Tabular Numerals (`tnum`):** Enforced across course numbers, credit weights, time blocks, and GPA calculations to ensure clean vertical alignment across table columns.
- **Hierarchy Rules:**
  - Section banners and major workspace titles use `headline-lg`.
  - Panel headers and course category titles use `headline-md`.
  - Data table headers and metadata callouts utilize uppercase tracking on `label-sm` to maintain clear demarcation from table rows.
  - Course codes (e.g., `CS 3410`, `MATH 1920`) employ `code-sm` with medium weight to ensure immediate visual scanning.

## Layout & Spacing

The portal implements an adaptive, fluid-grid layout optimized for data-dense academic scheduling:
- **Canvas Architecture:** A multi-pane model consisting of a fixed 64px global header, an optional collapsible 240px navigation sidebar, and an expandable 12-column grid layout for the primary workspace.
- **Breakpoints & Behavior:**
  - **Desktop (1280px+):** 12 columns, `1.5rem` gutters, `2rem` outer margins. Accommodates split views (catalog search on left 7 columns, live weekly calendar and credit count on right 5 columns).
  - **Tablet (768px - 1279px):** 8 columns, `1rem` gutters, `1.5rem` margins. The weekly calendar collapses into an accordion view beneath active registrations.
  - **Mobile (< 768px):** 4 columns, `0.75rem` gutters, `1rem` margins. Single-column stacked lists with sticky bottom action trays for schedule validation.
- **Data Densities:** Spacing scales are restrained. Component gaps rely heavily on `space-sm` (8px) and `space-md` (12px) to keep critical registration metrics above the fold.

## Elevation & Depth

To preserve an institutional, utilitarian aesthetic, depth is established through **borders and tonal surfaces** rather than dramatic drop shadows:
- **Level 0 (Base Canvas):** `#F6F7F8`. Neutral background for all workspace surfaces.
- **Level 1 (Card & Table Panels):** `#FFFFFF` surface enclosed by a 1px solid border in `#DCE0E5`. Flat appearance with zero shadow during default states.
- **Level 2 (Dropdowns, Popovers & Context Menus):** `#FFFFFF` surface, 1px solid border `#DCE0E5`, with an ambient micro-shadow (`0 4px 12px rgba(0, 0, 0, 0.06)`).
- **Level 3 (Modal Dialogs & Degree Checkers):** Centered `#FFFFFF` surface backed by a 40% opacity neutral dark scrim (`rgba(17, 24, 39, 0.45)`), framed with a distinct 1px border and a subtle structural shadow (`0 8px 24px rgba(0, 0, 0, 0.12)`).
- **Interactive State Elevation:** Interactive rows, list items, and cards do not lift in space; they shift background color to `#F1F4F7` on hover to emphasize speed and utility.

## Shapes

The portal adheres to crisp, functional geometry to uphold institutional seriousness:
- **Default Geometry (Level 1 - Soft):** Base containers, table shells, input fields, and standard buttons utilize a restrained 4px (`0.25rem`) border radius. This ensures clean intersections in dense data matrices.
- **Controlled Exception (Pill Badges):** Status tags, term indicators, and credit counter pills strictly use a 9999px fully rounded border radius (`rounded-full`). This geometric contrast clearly separates status metadata from interactive container cards and buttons.
- **Modal and Dialog Panels:** Maximum radius capped at 8px (`0.5rem`) to prevent unnecessary bubble effects.

## Components

### Buttons
- **Primary:** Background `#C8102E`, text `#FFFFFF`, 4px radius, 36px default height (compact 32px for table rows). Hover: `#A50D25`. Active: `#840A1E`. Focused: 2px offset ring in `#C8102E`.
- **Secondary:** Surface `#FFFFFF`, border 1px solid `#DCE0E5`, text `#333333`. Hover: background `#F6F7F8`, border `#C4C9D0`.
- **Destructive/Drop:** Subtle background `#FDE8E8`, text `#C8102E`, border 1px solid transparent. Hover: border `#C8102E`.

### Pill Badges & Term Indicators
- **Multi-Semester / Full Year:** Pill-shaped (fully rounded), background `#E8F5E9`, text `#1E7E34`, border 1px solid `#C3E6CB`. Font: `label-sm` uppercase.
- **Single-Semester:** Pill-shaped, background `#EBF3FA`, text `#0056B3`, border 1px solid `#B8DAFF`. Font: `label-sm` uppercase.
- **Waitlisted / Restricted:** Pill-shaped, background `#FFF3CD`, text `#856404`, border 1px solid `#FFEEBA`.

### Alert Banners
- Full-width or inline card banners with a 4px left-accent border (4px solid), 1px top/right/bottom border, and 4px radius.
- **Registration Hold / Error:** Background `#FDF2F2`, left border `#C8102E`, body text `#333333`, bold headline.
- **Important Academic Deadline:** Background `#FEF9E7`, left border `#D97706`, body text `#333333`.
- **Enrollment Confirmation:** Background `#F0FDF4`, left border `#1E7E34`, body text `#333333`.

### Input Fields & Select Pickers
- Height: 36px. Surface `#FFFFFF`, border 1px solid `#C4C9D0`, border radius 4px, text `#333333`, font `body-md`.
- Focus state: Border color `#C8102E`, paired with a 1px matching outline ring. No fuzzy outer glow.
- Placeholder text in `#8C95A0`.

### Tables & Data Grids
- **Header:** Background `#F6F7F8`, border-bottom 2px solid `#DCE0E5`. Text `label-sm` uppercase, `#555E68`.
- **Rows:** White background, 1px horizontal dividers (`#EAECEF`), zero vertical dividers. Row height fixed at 44px for high density.
- **Row Hover:** Background shifts to `#F1F4F7`.
- **Conflict Highlight:** Subtle diagonal pattern or light tint `#FFF5F5` across conflicting time blocks.

### Course Cards & Schedule Blocks
- **Schedule Calendar Event Blocks:** Solid left accent (4px) matching faculty or requirement group, container `#FFFFFF`, 1px border `#DCE0E5`, padding `space-xs` `space-sm`. Displays course code in bold, section room, and enrollment pill badge.