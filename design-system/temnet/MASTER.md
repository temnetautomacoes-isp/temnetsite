# TemNet Design System — MASTER.md
*Generated via ui-ux-pro-max skill principles*

## 1. Brand Identity & Vision
- **Brand Name**: TemNet
- **Tagline**: "A sua conexão completa"
- **Industry**: Provedor de Internet (Banda Larga Fibra & Link Dedicado) e Infraestrutura de T.I / Redes
- **Geographic Coverage**: Alagoinhas (Polo Central), Aramari, Ouriçangas, expansão para toda a Bahia
- **Design Personality**: SaaS sofisticado, minimalista, ultra-preciso, confiável, focado em alta conversão e percepção de alto valor corporativo (R$ 10.000+)

---

## 2. Design Tokens & Architecture

### Color Palette (Monochromatic High-End Dark)
```css
:root {
  /* Backgrounds */
  --bg-primary: #09090b;       /* Zinc 950 - Deep dark canvas */
  --bg-secondary: #000000;     /* Pure pitch black for contrast */
  --bg-surface: #121215;       /* Elevated surface */
  --bg-card: #18181b;          /* Zinc 900 - Card backdrop */
  --bg-card-hover: #202024;    /* Subtle hover state */
  --bg-glass: rgba(18, 18, 21, 0.75);

  /* Borders */
  --border-subtle: rgba(255, 255, 255, 0.08);
  --border-medium: rgba(255, 255, 255, 0.15);
  --border-active: rgba(255, 255, 255, 0.35);
  --border-glow: rgba(255, 255, 255, 0.12);

  /* Typography */
  --text-primary: #ffffff;      /* High contrast pure white */
  --text-secondary: #d4d4d8;    /* Zinc 300 */
  --text-muted: #a1a1aa;        /* Zinc 400 */
  --text-dim: #71717a;          /* Zinc 500 */

  /* Accents (SaaS Monochrome with subtle functional highlights) */
  --accent-white: #ffffff;
  --accent-black: #000000;
  --status-active: #22c55e;     /* Emerald for network online/latency status */
  --status-active-glow: rgba(34, 197, 94, 0.25);

  /* Elevation & Shadows */
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.5);
  --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.6);
  --shadow-lg: 0 12px 32px rgba(0, 0, 0, 0.7);
  --shadow-glow: 0 0 25px rgba(255, 255, 255, 0.06);

  /* Radii */
  --radius-sm: 6px;
  --radius-md: 10px;
  --radius-lg: 16px;
  --radius-full: 9999px;
}
```

### Typography Scale (Plus Jakarta Sans)
- **Hero Title**: `clamp(2.5rem, 5vw, 4.25rem)` / Weight: `800` / Letter-spacing: `-0.035em` / Line-height: `1.1`
- **Section Heading (H2)**: `clamp(1.85rem, 3.5vw, 2.75rem)` / Weight: `700` / Letter-spacing: `-0.025em` / Line-height: `1.2`
- **Subheading (H3)**: `1.25rem` to `1.5rem` / Weight: `600` / Letter-spacing: `-0.015em`
- **Body Large**: `1.125rem` / Line-height: `1.6` / Color: `--text-secondary`
- **Body Regular**: `0.95rem` / Line-height: `1.5` / Color: `--text-muted`
- **Badges / Micro-labels**: `0.75rem` to `0.8125rem` / Weight: `600` / Letter-spacing: `0.05em` / Text-transform: `uppercase`

### Spacing & Grid System
- Max-width: `1200px` (standard container) with `1.5rem` padding on mobile, `2rem` on desktop
- Section spacing: `clamp(4.5rem, 8vw, 7.5rem)` vertical margin/padding
- 12-column responsive flex/grid layouts with consistent `1.5rem` to `2rem` gaps

---

## 3. Component Design Rules

1. **Buttons**:
   - Primary: Solid White `#ffffff`, Text `#000000`, Font weight `600`, Radius `9999px` or `10px`, Subtle hover `background: #e4e4e7` + scale `1.02`.
   - Secondary: Dark surface `#18181b`, Border `1px solid rgba(255,255,255,0.15)`, Text `#ffffff`, Hover `border-color: rgba(255,255,255,0.4)` and `background: #202024`.
2. **Cards**:
   - `background: #121215`, `border: 1px solid rgba(255, 255, 255, 0.08)`, `border-radius: 16px`, `backdrop-filter: blur(12px)`.
   - Hover effect: border transition to `rgba(255, 255, 255, 0.25)` and subtle box-shadow glow.
3. **Badges / Chips**:
   - `display: inline-flex`, `align-items: center`, `padding: 4px 12px`, `border-radius: 9999px`, `border: 1px solid rgba(255, 255, 255, 0.12)`, `background: rgba(255, 255, 255, 0.04)`.
4. **Interactive Tabs & Toggles**:
   - Container: rounded pill with dark surface and subtle border.
   - Active state: pure white indicator pill with black text or illuminated border.
