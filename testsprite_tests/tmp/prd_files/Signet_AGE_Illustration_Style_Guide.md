# Signet Visual Illustration System
## Atmospheric Gradient Editorial — Style Guide & Image Generation Documentation
**Project:** Signet 2.0 — The Alchemist's Forge  
**Style Reference:** Urban Nightscape with Digital Luminosity (Screenshot 2026-06-04 133455)  
**Date:** June 4, 2026  
**Classification:** Atmospheric Gradient Editorial / Moody Digital Narrative

---

## 1. Style Identification & Naming

### 1.1 Official Style Name

**"Atmospheric Gradient Editorial"** (AGE)

This is a deliberate departure from the dominant tech-industry "Corporate Memphis" flat-vector style. Unlike Corporate Memphis—which relies on bright, flat color fields, disproportionate bendy limbs, and non-representational skin tones in primary colors—AGE is defined by **mood, depth, and luminosity**. It sits at the intersection of editorial storytelling, atmospheric digital painting, and vector-based precision.

### 1.2 Why This Style for Signet

The Alchemist's Forge design language demands imagery that communicates:
- **Depth and mystery** (the dark void of potential)
- **Warmth and humanity** (the user at the center of their career journey)
- **Digital luminosity** (the glow of AI insight, the spark of creation)
- **Premium sophistication** (not childish, not corporate-generic)

Atmospheric Gradient Editorial delivers all four. The dark backgrounds align perfectly with the new OKLCH dark theme. The warm glows from screens and light sources map directly to the coral (`#EA545F`) and violet (`#8264FF`) accent system. The stylized human figures feel approachable without being cartoonish. The narrative quality supports the storytelling architecture of the landing page.

### 1.3 Style Lineage

| Parent Style | What We Keep | What We Discard |
|:---|:---|:---|
| **Atmospheric Gradient** (2024–2026 trend) | Soft color transitions, airiness, depth | Overly pastel or nature-focused palettes |
| **Moody & Warm** (2025 trend) | Nostalgia, welcoming darkness, emotional resonance | Earthy tones, analog textures, hand-drawn imperfection |
| **Neon Noir** (Cyberpunk adjacent) | High-contrast lighting, electric accents, cinematic composition | Grit, dystopia, harshness, urban decay |
| **Corporate Memphis** (Vector discipline) | Scalability, clean shapes, vector production | Flatness, bright primaries, bendy limbs, fake positivity |
| **Editorial Illustration** (Magazine tradition) | Narrative composition, human-centered storytelling, conceptual depth | Print-specific details, paper textures, collage elements |

---

## 2. Core Visual Characteristics

### 2.1 The Five Pillars of AGE

| Pillar | Description | Signet Application |
|:---|:---|:---|
| **1. Atmospheric Depth** | Layered backgrounds with gradient fades, haze, and soft vignetting. No flat solid-color backgrounds. | Hero backgrounds, section dividers, empty-state illustrations |
| **2. Luminous Focal Points** | Light sources (screens, orbs, sparks, lamps) create warm/cool glows that illuminate surrounding surfaces. | CTA areas, feature highlights, AI processing states, success moments |
| **3. Stylized Humanity** | Human figures are simplified but proportionate. Faces are minimal but expressive. Bodies have weight and posture. | User personas, onboarding steps, testimonials, empty states |
| **4. Narrative Composition** | Every image tells a micro-story. Figures interact with objects or environments. There is a sense of moment. | Landing page sections, product feature illustrations, blog headers |
| **5. Controlled Color Temperature** | Cool shadows (deep blue-violet) vs. warm highlights (coral, amber, soft white). Temperature defines depth. | Full brand alignment with the four-color diamond system |

### 2.2 Detailed Technical Specifications

#### Color Behavior
- **Shadows:** Deep, cool, desaturated. `oklch(0.15 0.02 260)` to `oklch(0.25 0.03 270)`. Never pure black. Always have a subtle hue shift toward blue-violet.
- **Midtones:** Muted, atmospheric. `oklch(0.35 0.05 265)` to `oklch(0.50 0.08 255)`. Used for buildings, distant objects, secondary figures.
- **Highlights:** Warm, glowing, saturated. `oklch(0.70 0.15 25)` (coral) and `oklch(0.65 0.18 285)` (violet). Used for screens, light sources, magical particles, UI elements within illustrations.
- **Skin Tones:** Warm but muted. `oklch(0.75 0.08 45)` to `oklch(0.85 0.06 55)`. Never neon or non-representational. Subtle and naturalistic within the stylized world.
- **Gradients:** All color transitions are smooth, using 8–12 color stops. No banding. Soft radial glows for light sources, linear fades for atmospheric perspective.

#### Line & Shape Language
- **Outlines:** None. Or extremely soft, 0.5px lines in a slightly darker shade of the fill color. The style is "outline-free."
- **Shapes:** Organic but controlled. Buildings can be geometric, but nature and figures are soft-edged. Rounded corners on architectural elements.
- **Proportions:** Human figures are approximately 6–7 heads tall (slightly stylized but not cartoonish). Heads are simplified. Hands are suggested, not detailed.
- **Perspective:** Atmospheric perspective is mandatory. Distant objects are lighter, cooler, and less saturated. Foreground objects have more contrast and warmth.

#### Light & Shadow
- **Light Sources:** Always defined. Every illustration must have at least one primary light source (screen glow, lamp, moon, spark) and one ambient fill.
- **Glow Effects:** Soft radial gradients emanating from light sources. `blur(20px)` equivalent in digital painting. Light bleeds into surrounding surfaces.
- **Shadows:** Soft, diffused, cool-toned. No hard shadows. Shadows are gradient-based, not solid shapes.
- **Reflections:** Subtle. Screen light reflects on faces and hands. Wet surfaces (if present) reflect ambient light softly.

#### Texture & Surface
- **Base Texture:** Smooth vector surfaces with subtle digital grain (2–4% noise opacity) to prevent sterile flatness.
- **Atmospheric Texture:** Very fine particle dust or bokeh orbs in light beams (like fireflies in the reference image).
- **No Paper Texture:** This is not a handcrafted/analog style. No torn edges, no watercolor bleeds, no pencil lines.
- **No Photorealism:** No photographic elements, no 3D renders, no AI photorealism. Everything must be clearly illustrated.

### 2.3 Mood & Emotional Register

| Context | Mood | Visual Cues |
|:---|:---|:---|
| **Hero / Discovery** | Wonder, possibility, vastness | Wide compositions, small figures in large spaces, upward light, starry/particle-filled skies |
| **Feature / Product** | Clarity, intelligence, precision | Close-up interactions with glowing interfaces, focused light, clean geometry |
| **Onboarding / Learning** | Guidance, warmth, safety | Figures in cozy enclosed spaces, warm lamp light, soft coral tones |
| **Success / Export** | Triumph, completion, radiance | Central figure illuminated, radiating light, particles expanding outward, warm glow |
| **Community / Social Proof** | Connection, shared purpose | Multiple figures in warm proximity, overlapping glows, unified light temperature |
| **Empty / Error State** | Calm, patience, gentle redirection | Single figure in quiet space, soft moonlight, minimal but warm elements |

---

## 3. Signet Brand Alignment Matrix

### 3.1 Color Mapping: Illustration Palette → Design Tokens

Every illustration must be created using this restricted palette to ensure seamless integration with the Signet UI.

| Illustration Role | OKLCH Value | Hex Approx. | Design Token | Usage in Image |
|:---|:---|:---|:---|:---|
| **Deep Void** | `oklch(0.12 0.02 265)` | `#0A0A0F` | `--background` | Sky, deep shadows, negative space |
| **Atmospheric Blue** | `oklch(0.25 0.05 270)` | `#1A1F2E` | `--card` (darkened) | Distant buildings, background layers |
| **Violet Glow Core** | `oklch(0.55 0.22 285)` | `#8264FF` | `--primary` | AI interfaces, magical particles, wisdom light |
| **Violet Glow Aura** | `oklch(0.55 0.22 285 / 0.4)` | `#8264FF66` | `--primary-glow` | Halos around violet light sources |
| **Coral Heat Core** | `oklch(0.60 0.20 25)` | `#EA545F` | `--accent` | CTA elements, forge sparks, action light |
| **Coral Heat Aura** | `oklch(0.60 0.20 25 / 0.35)` | `#EA545F59` | `--accent-glow` | Warm ambient fill, success radiance |
| **Pure Light** | `oklch(0.95 0 0)` | `#F5F5F7` | `--foreground` | Screen content, bright highlights, stars |
| **Warm Skin** | `oklch(0.80 0.07 50)` | `#E8C4A8` | N/A | Human figures, hands, faces |
| **Cool Skin Shadow** | `oklch(0.65 0.05 260)` | `#8A9AAF` | N/A | Skin in shadow, reflected cool light |
| **Muted Surface** | `oklch(0.40 0.04 265)` | `#4A5568` | `--muted` | Buildings, furniture, neutral objects |
| **Glass Reflection** | `oklch(0.70 0.10 285 / 0.3)` | `#B8A8FF4D` | `--border` (lightened) | Glass surfaces, UI panels within illustration |

### 3.2 Prohibited Colors

These colors must never appear in Signet illustrations, as they break brand cohesion:

- **Pure Green** (especially bright `#00FF00` or `#10B981` tactical green) — conflicts with the old brand identity.
- **Pure Cyan** (`#00FFFF`, `#06B6D4`) — breaks the warm/cool temperature balance.
- **Bright Yellow** (`#FFFF00`) — too aggressive, conflicts with coral as the warm accent.
- **Orange** (unless extremely muted and blended into coral) — risks clashing with the coral accent.
- **High-Saturation Magenta/Pink** — outside the controlled palette.
- **Brown/Earthy Tones** — this is not an organic/nature brand. No wood, no earth, no rust.

### 3.3 Light Temperature Rules

- **Cool light (violet/blue)** = Intelligence, AI, data, structure, the "signet" seal, wisdom.
- **Warm light (coral/amber)** = Human action, creation, the forge, emotion, completion.
- **Neutral light (white)** = Clarity, truth, the final resume, purity of output.
- **No green light** — unless absolutely necessary for a specific data-visualization context within an illustration, and even then, it must be muted and shifted toward teal-cyan, not tactical green.

---

## 4. Image Taxonomy: What We Need & Where

### 4.1 Landing Page Illustrations

| Image ID | Dimensions | Aspect Ratio | Scene Description | Mood |
|:---|:---|:---|:---|:---|
| `HERO-01` | 1920×1080 | 16:9 | A figure stands at a vast dark workbench. Above them, a luminous geometric "signet" seal (violet, crystalline, slowly rotating) casts light downward. Particles of coral and violet drift in the air. The figure holds a glowing tablet showing a resume. | Wonder, possibility |
| `MISSION-01` | 1200×800 | 3:2 | Two figures face each other across a glass table. One is shadowed ("the past self"), one is illuminated ("the future self"). Between them, a resume glows with violet light, bridging the gap. | Transformation, clarity |
| `FEATURE-AI-01` | 800×600 | 4:3 | Close-up of hands holding a device. From the screen, violet geometric shapes (representing AI structure) flow upward like smoke, reorganizing into a perfect document. | Intelligence, precision |
| `FEATURE-ATS-01` | 800×600 | 4:3 | A figure stands before a large circular interface (like a vault door or portal). The interface has glowing checkpoints. The figure holds a glowing key (coral). | Optimization, unlocking |
| `FEATURE-PREVIEW-01` | 800×600 | 4:3 | A figure looks into a mirror-like floating screen. The reflection shows a perfectly composed, luminous version of themselves (professional attire, confident posture). The mirror frame is violet neon. | Realization, polish |
| `SOCIAL-01` | 1600×400 | 4:1 | Wide panoramic scene. A curved walkway (like the reference image) with multiple figures walking, each looking at a glowing device. The devices emit warm coral light. Above, a vast dark sky with subtle violet nebula. | Community, shared journey |
| `TESTIMONIAL-BG-01` | 1200×600 | 2:1 | Soft, abstract atmospheric background. No figures. Just deep blue-black gradient with floating violet and coral particles, subtle grid lines suggesting structure. | Trust, calm |
| `CTA-FINAL-01` | 1920×600 | 3.2:1 | A figure stands at the threshold of a glowing doorway. The doorway emits warm coral and violet light. The figure's silhouette is backlit, holding a completed resume that radiates white light. | Triumph, invitation |

### 4.2 Product UI Illustrations

| Image ID | Dimensions | Aspect Ratio | Scene Description | Context |
|:---|:---|:---|:---|:---|
| `EMPTY-STATE-SLATES` | 400×300 | 4:3 | A quiet, dark workspace with an empty glass desk. A single violet spark hovers above the desk, waiting. Soft moonlight from a circular window. | "No resumes yet" dashboard state |
| `EMPTY-STATE-TRACKER` | 400×300 | 4:3 | A figure sits at a desk looking at a large map/table that is mostly dark. A few scattered coral dots represent potential opportunities. The figure holds a stylus, ready to mark. | "No applications tracked" state |
| `ONBOARD-STEP-0` | 600×400 | 3:2 | A figure stands before a large scanning arch. Violet light sweeps down across the figure (like a scanner). Digital particles float in the beam. | Identity verification step |
| `ONBOARD-STEP-1` | 600×400 | 3:2 | Four distinct workstations in a dark atelier, each glowing with a different subtle hue (engineering = blue-violet, CS = warm coral, leadership = gold, marketing = bright white). | Specialization selection |
| `ONBOARD-STEP-4` | 600×400 | 3:2 | A figure kneels before a glowing forge. They hold a hammer (coral glow). Sparks fly upward as they strike a glowing seal. The seal bears their initials. | Forge commitment ritual |
| `SUCCESS-EXPORT` | 600×400 | 3:2 | A figure releases a glowing paper document into the air. The document unfolds into a constellation of light. The figure's face is illuminated with warm satisfaction. | Post-export success modal |
| `ERROR-STATE` | 400×300 | 4:3 | A figure sits calmly in a dark room, looking at a small glowing device that shows a gentle error symbol. Soft violet ambient light. A window shows a peaceful night sky. | Generic error/404 state |
| `LOADING-AI` | 400×300 | 4:3 | Abstract. A central violet vortex of geometric shapes slowly rotating. Small particles are drawn into the center and emerge as organized lines (representing structured data). | AI reforge processing state |

### 4.3 Marketing & Blog Illustrations

| Image ID | Dimensions | Aspect Ratio | Scene Description | Topic |
|:---|:---|:---|:---|:---|
| `BLOG-CAREER-01` | 1200×630 | 1.91:1 | A figure climbs a stairway made of floating glass steps. Each step glows brighter as it ascends. The top is a radiant violet portal. | Career growth article |
| `BLOG-ATS-01` | 1200×630 | 1.91:1 | A figure navigates a maze made of dark walls. The walls have glowing checkpoints. The figure leaves a trail of coral light behind them. | ATS optimization guide |
| `BLOG-RESUME-01` | 1200×630 | 1.91:1 | A figure sits at a desk, surrounded by floating papers and documents. A large violet hand (AI) gently arranges the papers into a perfect stack. | Resume writing tips |
| `SOCIAL-CARD-01` | 1200×630 | 1.91:1 | Bold, centered composition. A glowing signet seal in violet and coral. The tagline "CODE WITHOUT LIMITS" (or Signet equivalent) in DM Sans Bold. Dark background with subtle particle field. | Twitter/LinkedIn share card |

### 4.4 Iconographic & Decorative Elements

| Element | Style | Usage |
|:---|:---|:---|
| **Floating Particles** | Small, soft-glowing orbs (2–8px), violet and coral, varying opacity (0.1–0.4), drifting slowly. | Background decoration across all pages. CSS-animated or static. |
| **Geometric Seals** | Crystalline, faceted 3D-like shapes (simplified), violet glow, slow rotation. | Hero centerpiece, loading states, brand motifs. |
| **Light Beams** | Soft radial cones of light, low opacity, emanating from unseen sources above. | Section transitions, feature card backgrounds. |
| **Constellation Lines** | Thin, 1px lines connecting small glowing dots, suggesting networks and structure. | Analytics section, data visualization decoration. |
| **Glass Panels** | Floating rectangular planes with subtle reflection, edge glow, transparency. | UI decoration, feature card accents. |

---

## 5. Generation Guidelines & Prompts

### 5.1 For AI Image Generation (Midjourney, DALL-E, Stable Diffusion)

#### Base Prompt Formula

```
Atmospheric gradient editorial illustration, [scene description], 
deep cool shadows in midnight blue and violet, warm glowing highlights in coral and soft amber, 
soft diffused lighting with defined light sources, stylized human figures with minimal facial features, 
vector-smooth surfaces with subtle digital grain, no outlines, no photorealism, 
narrative composition, cinematic depth, moody and contemplative, 
limited color palette: deep indigo, violet, coral, warm white, muted slate --ar [ratio] --style raw --s 250
```

#### Example Prompts by Context

**Hero Image:**
```
Atmospheric gradient editorial illustration, a lone figure stands at a vast dark workbench in an infinite atelier, 
above them a luminous crystalline geometric seal rotates slowly casting violet light downward, 
floating particles of coral and violet drift in the air like fireflies, the figure holds a glowing tablet 
showing a luminous document, deep cool shadows in midnight blue and violet, warm glowing highlights in coral, 
soft diffused lighting, stylized human figure with minimal facial features, vector-smooth surfaces with subtle grain, 
no outlines, no photorealism, narrative composition, cinematic depth, moody and contemplative, 
premium tech aesthetic, limited palette: deep indigo, violet, coral, warm white --ar 16:9 --style raw --s 250
```

**Feature Card (AI Reforge):**
```
Atmospheric gradient editorial illustration, close-up of hands holding a glowing smartphone, 
from the screen violet geometric shapes flow upward like smoke and reorganize into a perfect floating document, 
deep cool shadows, warm coral glow from the device screen illuminating the hands, 
soft diffused lighting, stylized hands with minimal detail, vector-smooth surfaces with subtle grain, 
no outlines, no photorealism, narrative composition, cinematic depth, moody and contemplative, 
limited palette: deep indigo, violet, coral, warm white --ar 4:3 --style raw --s 250
```

**Empty State:**
```
Atmospheric gradient editorial illustration, a quiet dark workspace with an empty glass desk, 
a single floating violet spark hovers above the desk waiting, soft moonlight from a circular window, 
deep cool shadows in midnight blue, subtle warm glow from the spark, 
minimal composition, stylized environment, vector-smooth surfaces with subtle grain, 
no outlines, no photorealism, contemplative and calm, 
limited palette: deep indigo, violet, soft white --ar 4:3 --style raw --s 250
```

**Social Proof / Community:**
```
Atmospheric gradient editorial illustration, a curved elevated walkway at night with multiple figures walking, 
each figure looks at a glowing device emitting warm coral light, above them a vast dark sky with subtle violet nebula, 
street lamps cast soft amber pools of light, firefly-like particles float between the figures, 
deep cool shadows, warm glowing highlights, stylized human figures with minimal facial features, 
vector-smooth surfaces with subtle grain, no outlines, no photorealism, 
narrative composition, cinematic depth, moody and connected, 
limited palette: deep indigo, violet, coral, warm white --ar 4:1 --style raw --s 250
```

### 5.2 For Human Illustrators (Figma, Illustrator, Procreate)

#### Production Specifications

| Parameter | Specification |
|:---|:---|
| **Software** | Adobe Illustrator (primary), Figma (for UI-integrated elements), Procreate (for texture exploration) |
| **Canvas Setup** | RGB color mode, 300 DPI for marketing assets, 150 DPI for UI assets |
| **Color Management** | Use OKLCH values directly if supported; otherwise use the provided Hex approximations |
| **Gradient Stops** | Minimum 8 stops for radial glows, 4 stops for linear atmospheric fades |
| **Export Formats** | Web: AVIF (primary), WebP (fallback), PNG (legacy). Marketing: PNG (lossless) |
| **Export Dimensions** | 2× display size for retina. Hero: 3840×2160. Cards: 1600×1200. UI: 800×600 |
| **Animation Prep** | If animating, export elements in layers (background, midground, foreground, light effects, particles) |

#### Layer Structure (for Illustrator/Figma)

```
Layer 1: Background Atmosphere
  - Deep void base
  - Gradient overlay (cool to warm transition)
  - Vignette edge darkening

Layer 2: Midground Environment
  - Architectural elements (buildings, furniture, structures)
  - Atmospheric perspective treatment (cooler, lighter, less saturated)

Layer 3: Figures
  - Base shapes (clothing, posture)
  - Skin tones (warm base + cool shadow)
  - Screen/device glow reflection on skin

Layer 4: Light Sources
  - Core glow (brightest point)
  - Aura (radial gradient, 20–40% opacity)
  - Ambient fill (subtle color cast on surroundings)

Layer 5: Particles & Effects
  - Floating orbs (varying sizes, opacity, blur)
  - Dust/light beams (gradient cones, low opacity)
  - Reflections on surfaces

Layer 6: Color Grading
  - Overall temperature adjustment layer
  - Subtle noise/grain texture (2–4%)
```

### 5.3 Style Guardrails — What to Avoid

| ❌ Avoid | ✅ Do Instead |
|:---|:---|
| Photorealistic faces or detailed anatomy | Stylized, minimal facial features; suggestive posture |
| Bright, flat Corporate Memphis colors | Moody, gradient-rich, atmospheric depth |
| Hard black outlines | Soft edges, color-based separation, subtle 0.5px dark lines if needed |
| White or light backgrounds | Deep dark void backgrounds with atmospheric perspective |
| Green as a primary accent | Violet and coral as the only warm/cool accents |
| Busy, cluttered compositions | Generous negative space, focal point clarity, breathing room |
| 3D-rendered photorealism | Flat illustration with gradient depth; 2.5D at most |
| Stock photography | Always illustrated, always original, always on-brand |
| Cute/chibi proportions | Adult, professional, slightly stylized but proportionate figures |
| Dystopian/cyberpunk grit | Clean, premium, hopeful darkness—not decay |

---

## 6. Animation & Motion Guidelines for Illustrations

When illustrations are animated (hero centerpiece, loading states, transitions):

| Element | Animation | Duration | Easing |
|:---|:---|:---|:---|
| **Floating Particles** | Slow drift (translateY, translateX), opacity pulse | 15–25s loop | Linear, infinite |
| **Light Source Glow** | Scale pulse (1.0 → 1.05 → 1.0), opacity wave | 4–6s loop | Ease-in-out, infinite |
| **Figure Subtle Motion** | Micro-movements (breathing scale, slight sway) | 8–12s loop | Ease-in-out, infinite |
| **Background Gradient** | Slow color temperature shift (cool → slightly warmer → cool) | 20–30s loop | Ease, infinite |
| **Entrance (Scroll Trigger)** | Fade in + translateY(30px → 0), scale(0.98 → 1) | 0.8s | `cubic-bezier(0.4, 0, 0.2, 1)` |
| **Hover (Interactive)** | Subtle parallax shift (layers move at different speeds), glow intensifies | 0.3s | `cubic-bezier(0.4, 0, 0.2, 1)` |

**Reduced Motion:** If `prefers-reduced-motion` is active, all particle motion stops, glow pulses freeze, and entrance animations become simple opacity fades (0.3s).

---

## 7. Quality Assurance Checklist

Before any illustration is approved for production, it must pass this checklist:

### 7.1 Brand Alignment
- [ ] Uses only the approved 12-color illustration palette (Section 3.1)
- [ ] No prohibited colors present (Section 3.2)
- [ ] Light temperature rules followed (cool = intelligence, warm = action)
- [ ] No green accents unless explicitly approved for data-viz context
- [ ] Dark background dominant (minimum 60% of image area)

### 7.2 Style Fidelity
- [ ] No hard outlines visible
- [ ] Gradients are smooth (no banding at 100% zoom)
- [ ] Light sources have defined core + aura + ambient fill
- [ ] Figures are stylized but proportionate (not Corporate Memphis, not realistic)
- [ ] Atmospheric perspective is present (distant objects cooler/lighter)
- [ ] Subtle grain texture applied (2–4%)

### 7.3 Technical Quality
- [ ] Exported at 2× display resolution
- [ ] AVIF or WebP format for web; PNG for marketing
- [ ] File size under 200KB for UI illustrations, under 800KB for hero images
- [ ] Transparent background only if specifically required
- [ ] Animation layers separated if motion is planned

### 7.4 Emotional Resonance
- [ ] Image tells a micro-story (not just a posed figure)
- [ ] Mood matches the assigned emotional register (Section 2.3)
- [ ] Feels premium, not generic
- [ ] Feels hopeful, not dystopian
- [ ] Feels human, not sterile

---

## 8. Reference Library & Inspiration Sources

### 8.1 Direct Comparables

| Source | What to Learn | What to Avoid |
|:---|:---|:---|
| **Reference Screenshot** (Screenshot 2026-06-04 133455) | The gold standard: particle density, light temperature, figure style, atmospheric depth | Exact composition reuse (must be original) |
| **Stripe Press Illustrations** | Narrative quality, editorial composition, premium mood | Their brighter daytime palettes |
| **Notion Blog Illustrations** | Clean stylization, human interaction with product, soft colors | Their lighter, pastel-dominant approach |
| **Medium Featured Images** | Storytelling in single frames, moody lighting, conceptual depth | Overly abstract or non-tech contexts |
| **Airtable Marketing** | Product-in-context, warm human moments, clean vector style | Their brighter, more colorful palette |
| **Ghost.org Brand** | Dark atmosphere, premium editorial, restrained color | Their more photographic/3D approach |

### 8.2 Artist References (for Commissioning)

| Artist/Studio | Style Match | Best For |
|:---|:---|:---|
| **Xoana Herrera** | Atmospheric, narrative, soft glow | Hero images, feature illustrations |
| **Buck Studio** (non-Alegria work) | Cinematic composition, light mastery | Motion-ready illustrations |
| **Rafael Varona** | Looping atmospheric animations | Animated hero sections |
| **Fireart Studio** | Moody gradients, tech editorial | Blog headers, marketing assets |
| **Tubik Studio** | Atmospheric digital landscapes | Background environments |

---

## 9. Implementation Timeline

| Phase | Deliverables | Timeline |
|:---|:---|:---|
| **Phase 1: Style Proofs** | 3 hero concepts, 1 feature card, 1 empty state. Test integration with live UI. | Week 1 |
| **Phase 2: Landing Page Suite** | All 8 landing page illustrations (HERO through CTA), plus particles/decoratives. | Weeks 2–3 |
| **Phase 3: Product UI Suite** | All 8 UI illustrations (empty states, onboarding, error, loading). | Weeks 4–5 |
| **Phase 4: Marketing & Blog** | 4 blog headers, 2 social cards, iconographic elements. | Week 6 |
| **Phase 5: Animation & Motion** | Animated versions of hero, loading states, success modal. Lottie/JSON exports. | Week 7 |
| **Phase 6: QA & Optimization** | Full checklist review, compression, responsive cropping, dark-mode integration test. | Week 8 |

---

## 10. Summary: The AGE Promise

> **Atmospheric Gradient Editorial** is the visual voice of Signet 2.0. It is dark without being depressing, technical without being cold, and human without being cartoonish. It turns every page into a scene, every feature into a story, and every user into the protagonist of their own career transformation.

**The three rules:**
1. **Dark is the canvas.** Light is the story.
2. **Violet is wisdom.** Coral is action.
3. **Figures are souls, not stick figures.** Give them posture, presence, and purpose.

---

*Document generated by Design Audit System — June 4, 2026*  
*Style Reference: Urban Nightscape Digital Illustration (Screenshot 2026-06-04 133455)*  
*Brand Alignment: Signet 2.0 — The Alchemist's Forge (OKLCH Diamond Palette)*
