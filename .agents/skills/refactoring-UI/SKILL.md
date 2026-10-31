---
name: refactoring-ui
description: Practical UI design principles for developers without a design background, distilled from the book "Refactoring UI" by Adam Wathan and Steve Schoger. Use whenever designing, building, reviewing, or improving a user interface - layout, spacing, visual hierarchy, typography, color palettes, shadows and depth, images, empty states, and finishing touches. Trigger on requests like "make this UI look better", "review my design", "pick colors/fonts/spacing", "build a design system", or any time you are about to write HTML/CSS/Tailwind/React markup for a visual interface, even if the user does not mention design explicitly.
---

# Refactoring UI

## Overview

Good-looking interfaces come from systems and rules, not artistic talent. This skill turns the principles of *Refactoring UI* into a workflow and checklists that can be applied directly when designing or coding interfaces.

Core ideas:
- Design **features**, not shells. Build real things in short cycles.
- **Hierarchy** is the most powerful tool: de-emphasize secondary information, emphasize what matters.
- Pick values from **predefined systems** (spacing, type, color, shadow, radius) instead of tweaking one pixel at a time.
- Start generous (white space), then remove. Start grayscale, then add color.

## When to use this skill

- Designing a new screen or feature from scratch.
- Reviewing or "refactoring" an existing UI that feels off, cluttered, flat, or amateur.
- Choosing fonts, colors, spacing scales, shadows, or border radii.
- Writing front-end code (HTML/CSS, Tailwind, React, etc.) and wanting the result to look polished by default.
- Defining a design system or design tokens.

## How to use this skill

1. Identify the situation: **new design** (start at Workflow), **fixing an existing UI** (go to the Review Checklist), or **writing code** (read the Principles plus Reference Values).
2. Before writing code, settle the systems: spacing scale, type scale, color shades, shadows, radius.
3. When something looks wrong but the cause is unclear, diagnose in this order: **hierarchy, spacing, typography, color, depth, finishing details.**

---

## Workflow

1. **Clarify the feature and the personality** (one or two sentences). Choose font, primary color, border radius, and tone of voice accordingly.
2. **Declare the systems** (CSS variables or Tailwind config): spacing, type scale, color shades 100-900, shadows, radii.
3. **Build the structure in grayscale.** Check hierarchy: what is primary, secondary, tertiary?
4. **Add generous white space, then trim.** Use spacing to show grouping.
5. **Apply typography:** line length, line height, weight, two or three text colors.
6. **Add color** from the predefined palette; verify contrast.
7. **Add depth** with the elevation system; prefer fewer borders.
8. **Finish:** empty states, accent borders, upgraded defaults, hover/active states.
9. **Run the Review Checklist** at the end and fix what fails.

---

## Principles

### 1. Starting from scratch

**Start with a feature, not a layout.** An app is a collection of features; until a few are designed there is not enough information to decide on navigation. Begin with a concrete piece of functionality and list what it truly needs. For flight search: departure city, destination, dates, a search button. Nothing more.

**Detail comes later.**
- Ignore fonts, shadows, and icons in the earliest stage. Sketching on paper with a thick marker prevents obsessing over details.
- Design in **grayscale first**. This forces spacing, contrast, and size to carry the hierarchy, producing a clearer interface that is easy to enhance with color later.
- Do not over-invest in low-fidelity. Sketches and wireframes are disposable; drop them once a decision is made.

**Do not design too much.**
- Do not design every feature and edge case in the abstract (what if there are 2000 contacts? where does the form error go?).
- Work in **short cycles**: design a simple version of the next feature, build it for real, iterate on the working version, then move to the next feature.
- **Be a pessimist:** do not imply functionality you are not ready to build. Treat nice-to-haves as later additions. Design the smallest useful version so there is always something to ship (comments without attachments beat no comments).

**Choose a personality.** Four concrete levers define the feel:

| Lever | Effect |
|---|---|
| Typeface | Serif feels elegant or classic; rounded sans feels playful; neutral sans feels plain and lets other elements carry personality |
| Color | Blue feels safe and familiar; gold feels expensive; pink feels fun and less serious |
| Border radius | Small is neutral; large is playful; none is serious or formal. **Stay consistent**; mixing square and rounded corners usually looks worse |
| Language | Impersonal wording feels official; casual wording feels friendly. Words matter as much as color and type |

If unsure, look at sites your target users already use, but avoid copying direct competitors too closely.

**Limit your choices.**
- Unlimited options cause decision fatigue (12px or 13px? 10% or 15% shadow opacity?).
- Define systems in advance: 8-10 shades per color, a restrictive type scale, and so on.
- **Decide by elimination:** with a scale of 12/16/24/32px for an icon, guess 16, then compare 12 and 24. Usually two options are clearly worse. If an outer option wins, repeat with it as the middle.
- Systematize: font size, font weight, line height, color, margin, padding, width, height, box shadow, border radius, border width, opacity. Avoid making the same small decision twice.

### 2. Hierarchy is everything

Visual hierarchy is how important elements appear relative to one another. When everything competes for attention, the UI feels noisy. Deliberately de-emphasize secondary and tertiary information.

**Size is not everything.**
- Do not rely only on font size; it leads to primary text that is too large and secondary text that is too small. Use **weight** and **color** as well.
- Make primary content bolder rather than bigger. Make supporting text a softer color rather than tiny.
- Use **two or three text colors**: dark (primary), grey (secondary, such as a publish date), lighter grey (tertiary, such as a footer notice).
- Two font weights usually suffice: normal (400/500) and heavy (600/700).
- Avoid weights under 400 for UI text. To de-emphasize, use a lighter color or smaller size instead.

**Do not use grey text on colored backgrounds.**
- Light grey on white works because it reduces contrast. On a colored background it looks off.
- Lowering the opacity of white text looks washed out or disabled, and lets the background show through on images or patterns.
- Instead hand-pick a color with the **same hue as the background** and adjust saturation and lightness.

**Emphasize by de-emphasizing.** If a primary element does not stand out and there is nothing more to add to it, soften the competing elements. Give inactive nav items a softer color rather than making the active one louder. If a sidebar competes with the content, remove its background color and let it sit on the page background.

**Labels are a last resort.** Avoid the default "label: value" format because it gives everything equal emphasis.
1. Often no label is needed: the format reveals meaning (an email address, a phone number, a price), or context does (a department name below a person's name).
2. Combine label and value: "In stock: 12" becomes "12 left in stock"; "Bedrooms: 3" becomes "3 bedrooms".
3. When a label is needed (for example on a scannable dashboard), treat it as secondary: smaller, lower contrast, or lighter weight.
4. On dense, specification-style pages where users scan for the label, emphasize the label instead, but do not make the value too faint.

**Separate visual hierarchy from document hierarchy.** Choose elements for semantics (h1, h2, and so on) but style them for hierarchy. In app UIs, section titles often behave like labels and can be small. They may even be visually hidden (but kept in the markup for accessibility) when the content speaks for itself.

**Balance weight and contrast.**
- Solid icons are visually heavy and tend to dominate adjacent text. Since icon weight cannot be changed, **lower the icon's contrast** with a softer color.
- Conversely, to emphasize a low-contrast element such as a thin light border, **increase its weight** (thicker) rather than darkening the color, which can look harsh.

**Semantics are secondary for buttons.** Every action sits in a pyramid of importance. Most pages have one primary action.
- **Primary:** obvious; solid, high-contrast background.
- **Secondary:** clear but not prominent; outline or lower-contrast background.
- **Tertiary:** discoverable but unobtrusive; styled like a link.
- **Destructive actions** are not automatically big, red, and bold. If it is not the page's primary action, give it secondary or tertiary styling, and reserve the big red treatment for the confirmation step where it becomes the primary action.

### 3. Layout and spacing

**Start with too much white space, then remove it.** Adding space only until things stop looking bad yields the bare minimum. Starting generous and trimming gives better results; what looks like "a little too much" in isolation is often "just enough" in context. Dense UIs (dashboards) are legitimate, but make density a deliberate decision.

**Establish a spacing and sizing system.**
- A linear scale (multiples of 4px) does not help choose between 120px and 125px. A good system accounts for **relative difference** between neighbors: 12px to 16px is +33%, while 500px to 520px is only +4%.
- **No two values in the scale should be closer than about 25%.**
- Start from a base of 16px (divides well, browser default font size) and build from its factors and multiples: tightly packed at the small end, increasingly spread out at the large end.
- Using the system: pick a value; if it is not enough, take the next one. Working in the browser by typing numbers is easier than dragging with a mouse.

**You do not have to fill the whole screen.** If you need 600px, use 600px. Shrink the canvas (for example, design the ~400px mobile layout first, then adapt upward). Split narrow content into **columns** rather than stretching it. Do not force content into small spaces either.

**Grids are overrated.**
- Not every element should be fluid. A sidebar should usually have a **fixed width** tuned to its content, with the main area flexing to fill the rest.
- Do not use percentage widths unless you want the element to scale.
- **Do not shrink an element before you need to.** Give a login card a `max-width` (for example 500px) and let it shrink only when the screen is narrower, instead of column-based widths that make it wider on medium screens than on large ones.

**Relative sizing does not scale.**
- A heading at 2.5em of an 18px body is 45px on desktop, but with 14px body text on mobile it becomes 35px, far too big; 20-24px is better.
- Large elements should shrink faster than already-small ones; the gap between large and small should narrow on small screens.
- Within one component too: larger buttons deserve proportionally more generous padding, smaller buttons proportionally tighter padding. Do not tie padding to font size so everything scales like a zoom.

**Avoid ambiguous spacing.** When there is no border or background to separate groups, make sure **space around a group exceeds space within it**. Examples: label/input pairs in forms, space above headings in articles, space between list bullets, and horizontal component layouts.

### 4. Designing text

**Establish a type scale.**
- Avoid using every pixel size from 10 to 24. A linear scale does not work; small jumps matter at the bottom, large jumps at the top.
- Modular scales (ratios like 4:5, 2:3, golden ratio) produce fractional pixels and often too few sizes for UI work.
- A **hand-picked scale** is more practical and can align with the spacing scale.
- **Avoid `em` units** for the scale: nested elements compound (1.25em containing .875em yields 17.5px, off the scale). Use `px` or `rem`.

**Use good fonts.**
- Play it safe with a neutral sans-serif or the system font stack: `-apple-system, Segoe UI, Roboto, Noto Sans, Ubuntu, Cantarell, Helvetica Neue`.
- Ignore typefaces with fewer than five weights; filter on Google Fonts for 10+ styles (counting italics).
- Optimize for legibility: headline fonts have tight spacing and short x-height; small-size fonts have wider spacing and taller x-height. Avoid condensed, short x-height fonts for main UI text.
- Trust popularity, and look at what well-regarded design teams use.

**Keep line length in check.** Aim for **45-75 characters per line**, roughly **20-35em** width. When mixing paragraphs with wider media, still limit the paragraph width.

**Baseline, not center.** When mixing font sizes on one line, align by **baseline** rather than vertically centering.

**Line height is proportional.**
- It is proportional to **line length**: narrow text works with about 1.5; very wide text may need up to about 2.
- It is **inversely** proportional to **font size**: small text needs taller line height; large headlines can use 1.

**Not every link needs a color.** In link-heavy UIs, emphasize links subtly (heavier weight or darker color). Ancillary links can show an underline or color change only on hover.

**Align with readability in mind.**
- Left-align most text. Do not center long-form text (more than two or three lines); shorten it instead.
- **Right-align numbers** in tables so decimals line up.
- Enable **hyphenation** whenever text is justified.

**Letter-spacing.** Mostly trust the typeface designer. Exceptions: **tighten** letter-spacing for headlines set in fonts designed for small sizes, and **increase** it for ALL CAPS text. Do not try the reverse (headline fonts at small sizes).

### 5. Working with color

**Use HSL instead of hex.** Hue (position on the wheel: 0 red, 120 green, 240 blue), saturation (vividness; at 0% hue is irrelevant), lightness (0 black, 100 white, 50 the pure color). Browsers understand HSL, not HSB, which many design tools use.

**You need more colors than you think.** Five generated hex codes are not enough. A real palette has:
- **Greys (8-10 shades):** text, backgrounds, panels, controls. Avoid pure black; start from a very dark grey.
- **Primary color(s) (5-10 shades each):** primary actions, active nav. Very light shades work as tinted backgrounds; dark shades work for text.
- **Accent colors (multiple shades each):** highlights for new features, plus semantic colors: red (destructive), yellow (warning), green (positive). Categorical uses (charts, calendar events, tags) may need still more.
- Complex UIs may need around ten colors with 5-10 shades each.

**Define shades up front.** Do not generate shades on the fly with `lighten()`/`darken()`.
1. Pick the **base** (500): a shade that works as a button background.
2. Pick the **edges**: darkest (900, usually for text) and lightest (100, for tinted backgrounds). An alert component is a good place to choose them. Match the base hue.
3. **Fill the gaps:** choose 700 and 300 as compromises, then 800, 600, 400, 200. Nine shades is a good number.
4. For greys, the base matters less; start at the edges (darkest text color, subtle off-white background) and fill in.
5. It is not pure science: tweak by eye, but avoid adding shades often.

**Do not let lightness kill saturation.** As lightness moves away from 50%, saturation has less effect, so **increase saturation** for very light and very dark shades. Also use **perceived brightness**: yellow, cyan, and magenta look lighter than red, green, and blue at the same HSL lightness. To lighten a color, rotate hue toward 60, 180, or 300 degrees; to darken, rotate toward 0, 120, or 240. This keeps intensity (a yellow palette gets warm oranges instead of muddy browns). Do not rotate more than about 20-30 degrees.

**Greys do not have to be grey.** Slight saturation sets temperature: add blue for cool greys, yellow or orange for warm ones. Increase saturation at the lightest and darkest ends to keep temperature consistent.

**Accessible does not have to mean ugly.** WCAG asks for contrast of at least **4.5:1** for normal text (under about 18px) and **3:1** for large text.
- **Flip the contrast:** instead of white text on a dark colored background (which has to be very dark and loud), use dark colored text on a light tinted background.
- **Rotate the hue:** for colored text on a colored background, shift hue toward a brighter hue (cyan, magenta, yellow) to gain contrast without approaching pure white.

**Do not rely on color alone.** Add icons or other cues for good/bad indicators (red-green color blindness). For multi-line charts, use contrast (light vs dark) rather than many distinct hues. Color should support information that is already communicated another way.

### 6. Creating depth

**Emulate a light source: light comes from above.**
- **Raised elements:** reveal a bit of the top edge, slightly **lighter** than the face (top border or inset shadow with small vertical offset; hand-pick the lighter color rather than overlaying semi-transparent white, which drains saturation). Add a small, dark shadow below with a slight vertical offset and only a couple of pixels of blur; keep it fairly sharp.
- **Inset elements** (wells, inputs, checkboxes): a slightly **lighter bottom edge** (bottom border or inset shadow with negative offset) and a small dark **inset shadow at the top**.
- Do not chase photo-realism; it makes interfaces busy.

**Use shadows to convey elevation.**
- Small, tight shadows suggest slightly raised elements (buttons); medium shadows suit dropdowns; large shadows suit modals. Closer things attract more focus.
- Define an **elevation system** of about five shadows, from smallest to largest, increasing roughly linearly.
- Tie shadows to interaction: add a shadow when an item is picked up for dragging; shrink or remove it when a button is pressed.
- Think in terms of where an element sits on the z-axis, then assign the shadow.

**Shadows can have two parts.** Use a larger, softer shadow (direct light, big vertical offset, large blur) plus a tighter, darker one (ambient occlusion, small offset, small blur). At higher elevations the small dark shadow should fade, nearly disappearing at the top level.

**Flat designs can still have depth.** Lighter elements feel closer and darker ones feel further (raised vs inset). Another option is **solid shadows**: short, vertically offset, no blur.

**Overlap elements to create layers.** Let cards straddle the boundary between two backgrounds, make an element taller than its parent, or overlap carousel controls. For overlapping images, add an "invisible border" matching the background color to prevent clashing.

### 7. Working with images

**Use good photos.** Bad photos ruin designs. Hire a professional or use quality stock (for example Unsplash). Do not design with placeholder images planning to swap in phone photos later.

**Text needs consistent contrast on images.** The image is the problem, not the text. Options:
1. A semi-transparent **overlay** (black for light text, white for dark text).
2. **Lower the image contrast** and adjust brightness to compensate.
3. **Colorize:** lower contrast, desaturate, then add a solid fill with the multiply blend mode. This also ties images to brand colors.
4. A **text shadow** acting like a soft glow: large blur, no offset. Still reduce image contrast a bit.

**Everything has an intended size.**
- Do not scale up icons drawn for 16-24px; they get chunky. Place them inside a colored shape instead.
- Do not scale down full screenshots (16px text becomes 4px). Capture at a smaller viewport, use partial screenshots, or draw a simplified UI with lines for text.
- Do not scale down large logos or icons to favicon size; redraw a simplified version at the target size.

**Beware user-uploaded content.** Control shape and size by centering images in fixed containers and cropping the overflow (for example `background-size: cover`). Prevent background bleed with a subtle **inner box shadow** (or a semi-transparent inner border) rather than a regular border, which often clashes with image colors.

### 8. Finishing touches

- **Supercharge the defaults:** replace bullets with icons (checkmarks, arrows, or content-specific icons); promote testimonial quotes into visual elements (larger, colored); give links distinctive styling (color, weight, a thick colored partial underline); use brand-colored custom checkboxes and radios.
- **Accent borders:** add colored borders on top of cards, beside active nav items, along the side of alerts, as a short underline beneath headlines, or across the top of the layout.
- **Decorate backgrounds:** change a panel's or section's background color; use a slight gradient (two hues no more than about 30 degrees apart); add subtle repeating patterns (low contrast, possibly along only one edge); add simple shapes or illustrations in specific positions.
- **Do not overlook empty states:** they are the first experience of a feature. Use an image or illustration, emphasize the call to action, and hide supporting UI (tabs, filters) until it is useful.
- **Use fewer borders:** separate elements with a box shadow, different background colors, or extra spacing.
- **Think outside the box:** dropdowns can have sections, columns, supporting text, and icons; tables can merge related columns and include images or color; radio buttons can become selectable cards.

### 9. Leveling up

- When you see a design you like, ask what the designer did that you would not have thought of.
- Rebuild favorite interfaces from scratch without peeking at developer tools. Working out why your version differs teaches tricks such as tighter heading line height, letter-spacing on uppercase, and combined shadows.

---

## Reference values (starting points)

These are practical starting points consistent with the principles above, not mandatory numbers. Adjust them and then **lock them in** as the project's system.

| Item | Starting point |
|---|---|
| Spacing / sizing (px) | 4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 192, 256, 384, 512, 640, 768 (base 16; neighbors at least about 25% apart) |
| Type scale (px) | 12, 14, 16, 18, 20, 24, 30, 36, 48, 60, 72 (hand-picked; use px or rem, never em) |
| Font weights | 400 (or 500) normal; 600/700 emphasis |
| Greys | 8-10 shades |
| Primary / accent | 5-10 shades each, numbered 100-900 with 500 as base |
| Shadows | About 5 elevation levels, two layers each; small dark layer fades at higher levels |
| Line length | 45-75 characters (about 20-35em) |
| Line height | About 1.5 for narrow body text, up to about 2 for very wide text, about 1 for large headings |
| Contrast (WCAG) | At least 4.5:1 normal text; at least 3:1 large text |
| Gradient hue gap | No more than about 30 degrees |
| Hue rotation for lightness | No more than about 20-30 degrees |

---

## Review checklist

**Process and systems**
- [ ] Did the design start from a feature, and is work happening in short cycles?
- [ ] Are there systems for spacing, type, color, shadow, radius, and border width?
- [ ] Does every value in use come from a system?
- [ ] Are font, color, radius, and tone of voice consistent with one personality?

**Hierarchy**
- [ ] Is there one clear primary action per screen, with secondary and tertiary actions toned down?
- [ ] Is hierarchy built from weight and color, not size alone?
- [ ] No grey text or reduced-opacity text on colored backgrounds (same hue, adjusted S/L instead)?
- [ ] Can labels be removed or merged with values? Remaining labels de-emphasized?
- [ ] Are section titles larger than they need to be?
- [ ] Are heavy icons softened to balance adjacent text?
- [ ] Are destructive actions confirmed, with the big red button only in the confirmation step?

**Layout and spacing**
- [ ] Is there enough white space (started generous, then trimmed)?
- [ ] Is space around groups larger than space within them?
- [ ] Do elements use sensible `max-width` instead of stretching with the screen?
- [ ] Do sidebars and similar elements have fixed widths rather than arbitrary percentages?

**Typography**
- [ ] Lines of 45-75 characters? Line height proportional to line length and inverse to font size?
- [ ] Mixed font sizes on one line aligned by baseline?
- [ ] Long text left-aligned, numbers right-aligned, justified text hyphenated?
- [ ] Headlines tightened if set in a body-oriented font; uppercase text letter-spaced?
- [ ] Minor links toned down?

**Color**
- [ ] HSL used; shades defined up front; saturation raised at light and dark ends?
- [ ] Greys share a consistent temperature?
- [ ] Contrast meets WCAG; flipped contrast or hue rotation considered?
- [ ] Information never conveyed by color alone?

**Depth and images**
- [ ] Light consistently from above? Shadows follow the elevation system?
- [ ] Text on images has consistent contrast (overlay, colorize, text shadow)?
- [ ] No upscaled small icons or downscaled detailed screenshots and logos?
- [ ] User-uploaded images cropped to fixed containers, with bleed prevention?

**Finishing**
- [ ] Defaults upgraded (bullets, links, quotes, checkboxes)?
- [ ] Accent borders or subtle background decoration used?
- [ ] Empty states designed deliberately?
- [ ] Borders reduced in favor of shadow, background color, or spacing?
- [ ] Any component still following the default template that could be reimagined?

---

## Attribution

Source: *Refactoring UI* by Adam Wathan and Steve Schoger. This file is a paraphrased summary of the book's principles for use as a skill; it does not replace the original, which contains many illustrative visuals.
