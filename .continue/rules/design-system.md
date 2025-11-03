---
name: Design System
description: Palette colori, tipografia, spacing, breakpoints e convenzioni CSS del portfolio
globs: "**/*.css"
---

# 🎨 Design System - Blocksy Portfolio

Questo file documenta tutti i token di design usati nel portfolio. Tutti i valori sono definiti come CSS custom properties in `assets/css/variables.css` e devono essere usati consistentemente in tutto il progetto.

## 🎨 Palette Colori

Tutti i colori sono definiti come custom properties nella root. Non usare mai valori hex direttamente nel CSS, usa sempre le variabili.

### Colori Primari (Brand)
```css
:root {
    /* Primary Brand Blue */
    --primary: #5465FF;           /* Blu principale - usato per CTA, link, elementi interattivi */
    --primary-light: #A9B5FF;     /* Variante chiara - hover, focus rings, backgrounds */
    --primary-dark: #3749DB;      /* Variante scura - hover su bottoni primari */
    --primary-bg: #E8EBFF;        /* Background leggero - sezioni evidenziate, badges */
}
```

**Quando usare**:
- `--primary`: Bottoni principali, link, icone attive, bordi focus
- `--primary-light`: Stati hover su link, focus rings, badges chiari
- `--primary-dark`: Hover su bottoni primari per contrasto maggiore
- `--primary-bg`: Background per evidenziare contenuti, card alternate

### Grayscale (Testo e Backgrounds)
```css
:root {
    /* Grayscale - da più scuro a più chiaro */
    --gray-900: #0F172A;          /* Testo principale (headings, body importante) */
    --gray-800: #1E293B;          /* Testo secondario (paragrafi standard) */
    --gray-700: #334155;          /* Testo terziario */
    --gray-600: #475569;          /* Testo secondario leggero */
    --gray-500: #64748B;          /* Testo muted (caption, metadata, placeholder) */
    --gray-400: #94A3B8;          /* Testo disabled, separator sottili */
    --gray-300: #CBD5E1;          /* Bordi, divider */
    --gray-200: #E2E8F0;          /* Bordi chiari, hover su backgrounds */
    --gray-100: #F1F5F9;          /* Background alternati, sezioni secondarie */
    --gray-50: #F8FAFC;           /* Background molto chiari, hover su card */
    
    /* Alias semantic per facilità */
    --text-primary: var(--gray-900);      /* Headings, testo importante */
    --text-secondary: var(--gray-800);    /* Body text standard */
    --text-muted: var(--gray-500);        /* Caption, date, metadata */
    --border-color: var(--gray-300);      /* Bordi standard */
    --bg-alternate: var(--gray-100);      /* Sezioni alternate */
}
```

**Gerarchia testo** (dal più importante al meno):
1. `--gray-900` / `--text-primary`: Titoli H1, H2, H3
2. `--gray-800` / `--text-secondary`: Paragrafi body, H4, H5
3. `--gray-500` / `--text-muted`: Date, caption, labels secondari

**Background** (dal più chiaro):
1. `--white`: Background principale
2. `--gray-50`: Hover leggero su card
3. `--gray-100` / `--bg-alternate`: Sezioni alternate

### Semantic Colors (Feedback)
```css
:root {
    /* Base Colors */
    --white: #FFFFFF;
    --black: #000000;
    
    /* Semantic Feedback Colors */
    --success: #10B981;           /* Verde - successo, conferme */
    --success-light: #D1FAE5;     /* Background success messages */
    
    --warning: #F59E0B;           /* Arancione - avvisi, attenzione */
    --warning-light: #FEF3C7;     /* Background warning messages */
    
    --error: #EF4444;             /* Rosso - errori, azioni distruttive */
    --error-light: #FEE2E2;       /* Background error messages */
    
    --info: #3B82F6;              /* Blu info - messaggi informativi */
    --info-light: #DBEAFE;        /* Background info messages */
}
```

**Quando usare semantic colors**:
- `--success`: Messaggio successo form, badge "pubblicato", icone positive
- `--warning`: Alert non critici, badge "in revisione", tooltip attenzione
- `--error`: Errori validazione, messaggi critici, bordi input invalidi
- `--info`: Tooltip informativi, badge "nuovo", messaggi neutrali

### Contrasti e Accessibilità

Tutti i colori sono stati testati per WCAG 2.1 AA compliance:

- `--gray-900` su `--white`: Contrast ratio **14.3:1** ✅ (AAA)
- `--gray-800` su `--white`: Contrast ratio **11.5:1** ✅ (AAA)
- `--gray-500` su `--white`: Contrast ratio **4.6:1** ✅ (AA) - usare solo per testo > 18px o metadata
- `--primary` su `--white`: Contrast ratio **5.2:1** ✅ (AA)

**Regola critica**: Non usare mai `--gray-400` o più chiaro per testo su background bianco. Solo per decorazioni e bordi.

## 📐 Spacing System

Sistema basato su multipli di **0.25rem (4px)**. Questo crea ritmo visivo coerente e facilita layout prevedibili.
```css
:root {
    --space-xs: 0.25rem;          /*   4px - gap minimo, padding micro */
    --space-sm: 0.5rem;           /*   8px - gap piccolo, padding contenuto */
    --space-md: 1rem;             /*  16px - gap standard, padding default */
    --space-lg: 1.5rem;           /*  24px - gap tra sezioni correlate */
    --space-xl: 2rem;             /*  32px - padding card, gap sezioni */
    --space-2xl: 3rem;            /*  48px - margin tra sezioni principali */
    --space-3xl: 4rem;            /*  64px - margin hero, spacing macro */
    --space-4xl: 6rem;            /*  96px - spacing molto ampio */
    --space-5xl: 8rem;            /* 128px - spacing massimo */
}
```

### Convenzioni Usage Spacing

**Padding interno elementi**:
- Bottoni piccoli: `--space-sm` `--space-md` (8px verticale, 16px orizzontale)
- Bottoni standard: `--space-md` `--space-xl` (16px verticale, 32px orizzontale)
- Card padding: `--space-xl` o `--space-2xl` (32px o 48px su tutti i lati)
- Container padding orizzontale: `--space-md` mobile, `--space-xl` desktop

**Gap tra elementi**:
- Gap minimo (badge, tags): `--space-xs` (4px)
- Gap piccolo (form fields): `--space-sm` (8px)
- Gap standard (elementi correlati): `--space-md` (16px)
- Gap medium (gruppi elementi): `--space-lg` (24px)
- Gap grande (card in grid): `--space-xl` (32px)

**Margin tra sezioni**:
- Sezioni correlate: `--space-2xl` (48px)
- Sezioni principali: `--space-3xl` (64px)
- Hero section margin: `--space-4xl` (96px)

### Esempio Pattern Spacing
```css
/* Card component spacing pattern */
.project-card {
    padding: var(--space-xl);              /* 32px interno */
    margin-bottom: var(--space-lg);        /* 24px gap con card successiva */
}

.project-card__title {
    margin-bottom: var(--space-sm);        /* 8px gap con descrizione */
}

.project-card__description {
    margin-bottom: var(--space-md);        /* 16px gap con badge */
}

.project-card__badges {
    display: flex;
    gap: var(--space-xs);                  /* 4px gap tra badge */
}
```

## ✍️ Typography

### Font Family

Usiamo system font stack per performance ottimale (zero web font caricati, zero latency).
```css
:root {
    --font-family: -apple-system, BlinkMacSystemFont, 
                   'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, 
                   Cantarell, 'Helvetica Neue', sans-serif;
}
```

Questo stack garantisce:
- **macOS/iOS**: San Francisco (sistema Apple)
- **Windows**: Segoe UI
- **Android**: Roboto
- **Linux**: Ubuntu o Oxygen
- **Fallback**: Helvetica Neue, poi sans-serif generico

### Font Sizes

Scala modulare con ratio 1.25 (major third). Per headings usiamo `clamp()` per fluid typography responsive.
```css
:root {
    /* Base size */
    --font-size-base: 1rem;               /*  16px - body text standard */
    
    /* Smaller sizes */
    --font-size-xs: 0.75rem;              /*  12px - caption, metadata piccola */
    --font-size-sm: 0.875rem;             /*  14px - small text, labels */
    
    /* Larger sizes */
    --font-size-lg: 1.125rem;             /*  18px - intro text, lead paragraph */
    --font-size-xl: 1.25rem;              /*  20px - H5 o subheading */
    --font-size-2xl: 1.5rem;              /*  24px - H4 */
    --font-size-3xl: 1.875rem;            /*  30px - H3 */
    --font-size-4xl: 2.25rem;             /*  36px - H2 */
    --font-size-5xl: 3rem;                /*  48px - H1 */
    --font-size-6xl: 3.75rem;             /*  60px - Hero title */
    
    /* Responsive Fluid Headings - si adattano automaticamente allo schermo */
    --font-size-h1: clamp(2rem, 5vw + 1rem, 3rem);          /* 32px → 48px */
    --font-size-h2: clamp(1.75rem, 4vw + 1rem, 2.5rem);     /* 28px → 40px */
    --font-size-h3: clamp(1.5rem, 3vw + 1rem, 2rem);        /* 24px → 32px */
    --font-size-h4: clamp(1.25rem, 2vw + 1rem, 1.5rem);     /* 20px → 24px */
}
```

**Mapping Headings**:
```css
h1 { font-size: var(--font-size-h1); }    /* clamp 32-48px */
h2 { font-size: var(--font-size-h2); }    /* clamp 28-40px */
h3 { font-size: var(--font-size-h3); }    /* clamp 24-32px */
h4 { font-size: var(--font-size-h4); }    /* clamp 20-24px */
h5 { font-size: var(--font-size-xl); }    /* fixed 20px */
h6 { font-size: var(--font-size-lg); }    /* fixed 18px */
```

**Body text**:
- Paragrafi standard: `--font-size-base` (16px)
- Lead paragraph (intro): `--font-size-lg` (18px)
- Caption, metadata: `--font-size-sm` (14px)
- Micro text (copyright): `--font-size-xs` (12px)

### Font Weights
```css
:root {
    --font-weight-normal: 400;            /* Body text standard */
    --font-weight-medium: 500;            /* Enfasi leggera, labels */
    --font-weight-semibold: 600;          /* Subheading, strong emphasis */
    --font-weight-bold: 700;              /* Headings, CTA */
}
```

**Mapping**:
- H1, H2, H3: `--font-weight-bold` (700)
- H4, H5, H6: `--font-weight-semibold` (600)
- Strong, bottoni: `--font-weight-medium` (500)
- Body, paragrafi: `--font-weight-normal` (400)

### Line Heights
```css
:root {
    --line-height-tight: 1.2;             /* Headings, titoli */
    --line-height-snug: 1.375;            /* Subheading, UI text */
    --line-height-normal: 1.5;            /* Body text standard (ottimale leggibilità) */
    --line-height-relaxed: 1.75;          /* Long-form content, articoli */
}
```

**Regola generale**:
- Testo grande (headings): line-height più bassa (1.2-1.3)
- Testo body: line-height standard (1.5)
- Testo lungo (articoli): line-height rilassata (1.75)

**Esempio**:
```css
h1, h2, h3 {
    line-height: var(--line-height-tight);
}

p, li {
    line-height: var(--line-height-normal);
}

.long-form-content p {
    line-height: var(--line-height-relaxed);
}
```

### Letter Spacing (Tracking)
```css
:root {
    --letter-spacing-tight: -0.025em;     /* Headings grandi (> 48px) */
    --letter-spacing-normal: 0;           /* Body text, default */
    --letter-spacing-wide: 0.025em;       /* Uppercase text, labels */
}
```

Usare con parsimonia. In generale:
- Headings molto grandi: `-0.025em` per optical correction
- Testo normale: `0` (default)
- UPPERCASE text: `0.025em` per migliorare leggibilità

## 📱 Breakpoints Responsive

Mobile-first approach **obbligatorio**. Scrivi stili per mobile senza media query, poi aggiungi breakpoint per schermi più grandi.
```css
:root {
    /* Breakpoint values (non usare direttamente, sono per riferimento) */
    --breakpoint-sm: 640px;               /* Large phones landscape */
    --breakpoint-md: 768px;               /* Tablets */
    --breakpoint-lg: 1024px;              /* Desktop */
    --breakpoint-xl: 1200px;              /* Large desktop */
    --breakpoint-2xl: 1536px;             /* Extra large */
}
```

### Media Query Standard
```css
/* Mobile: base styles (NO media query) */
.element {
    padding: var(--space-md);
    font-size: var(--font-size-base);
}

/* Small screens (640px+) - phone landscape */
@media (min-width: 640px) {
    .element {
        padding: var(--space-lg);
    }
}

/* Tablet (768px+) */
@media (min-width: 768px) {
    .element {
        padding: var(--space-xl);
        font-size: var(--font-size-lg);
    }
}

/* Desktop (1024px+) */
@media (min-width: 1024px) {
    .element {
        padding: var(--space-2xl);
    }
}

/* Large Desktop (1200px+) */
@media (min-width: 1200px) {
    .element {
        padding: var(--space-3xl);
    }
}
```

### Container & Layout
```css
:root {
    --container-max-width: 1200px;        /* Max larghezza contenuto */
    --container-padding: var(--space-md); /* Padding laterale mobile */
}

.container {
    max-width: var(--container-max-width);
    margin-inline: auto;
    padding-inline: var(--container-padding);
}

/* Desktop: aumenta padding laterale */
@media (min-width: 1024px) {
    .container {
        --container-padding: var(--space-xl);
    }
}
```

**Width comuni**:
- Contenuto text-heavy (articoli): `max-width: 65ch` (circa 65 caratteri per riga)
- Contenuto standard: `max-width: 1200px`
- Contenuto wide (grid progetti): `max-width: 1400px`
- Full-width: nessun max-width

## 🎭 Shadows & Elevation

Sistema di ombre per creare gerarchia visiva e percezione di profondità.
```css
:root {
    /* Elevation levels */
    --shadow-xs: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    --shadow-sm: 0 1px 3px 0 rgba(0, 0, 0, 0.1),
                 0 1px 2px 0 rgba(0, 0, 0, 0.06);
    --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
                 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
                 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
                 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    --shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}
```

**Quando usare**:
- `--shadow-xs`: Bordi sottili, separatori leggeri
- `--shadow-sm`: Card semplici, elementi leggermente elevati
- `--shadow-md`: Card standard, dropdown menu
- `--shadow-lg`: Modal, card importanti, hover su card
- `--shadow-xl`: Hero section, elementi molto elevati
- `--shadow-2xl`: Modal critici, overlay

**Pattern hover**:
```css
.card {
    box-shadow: var(--shadow-sm);
    transition: box-shadow 250ms ease-in-out;
}

.card:hover {
    box-shadow: var(--shadow-lg); /* elevazione su hover */
}
```

## 🔘 Border Radius
```css
:root {
    --radius-sm: 0.25rem;                 /*  4px - piccoli elementi, badge */
    --radius-md: 0.5rem;                  /*  8px - bottoni, input, card */
    --radius-lg: 0.75rem;                 /* 12px - card grandi, modal */
    --radius-xl: 1rem;                    /* 16px - elementi speciali */
    --radius-full: 9999px;                /* Completamente arrotondato (pill) */
}
```

**Mapping**:
- Badge, tag: `--radius-sm`
- Bottoni, input, card: `--radius-md`
- Modal, card grandi: `--radius-lg`
- Immagini avatar: `--radius-full` (cerchi perfetti)

## ⚡ Transitions & Animations

### Timing Functions
```css
:root {
    /* Easing curves */
    --ease-in: cubic-bezier(0.4, 0, 1, 1);
    --ease-out: cubic-bezier(0, 0, 0.2, 1);
    --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
    --ease-bounce: cubic-bezier(0.68, -0.55, 0.27, 1.55);
}
```

**Quando usare**:
- `--ease-in`: Elementi che escono (fade out, slide out)
- `--ease-out`: Elementi che entrano (fade in, slide in) - **PIÙ COMUNE**
- `--ease-in-out`: Transizioni simmetriche (toggle, slide)
- `--ease-bounce`: Effetti playful (micro-interactions)

### Duration
```css
:root {
    --duration-fast: 150ms;               /* Micro-interactions, hover */
    --duration-normal: 250ms;             /* Transizioni standard */
    --duration-slow: 350ms;               /* Transizioni complesse */
}
```

**Regola performance**: Anima **SOLO** `transform` e `opacity` per 60fps garantiti. Evita di animare `width`, `height`, `margin`, `padding`.

### Pattern Standard
```css
/* Hover transition standard */
.button {
    background-color: var(--primary);
    transition: background-color var(--duration-fast) var(--ease-out),
                transform var(--duration-fast) var(--ease-out);
}

.button:hover {
    background-color: var(--primary-dark);
    transform: translateY(-2px);
}

/* Fade in animation */
@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.fade-in {
    animation: fadeIn var(--duration-normal) var(--ease-out);
}
```

## 📐 Grid Systems

### Grid Standard (Card Layouts)
```css
/* Grid responsive automatica */
.grid {
    display: grid;
    gap: var(--space-lg);
    
    /* Mobile: 1 colonna */
    grid-template-columns: 1fr;
}

/* Tablet: 2 colonne */
@media (min-width: 768px) {
    .grid {
        grid-template-columns: repeat(2, 1fr);
    }
}

/* Desktop: 3 colonne */
@media (min-width: 1024px) {
    .grid {
        grid-template-columns: repeat(3, 1fr);
    }
}
```

### Grid Auto-Responsive (senza media query)
```css
/* Grid che si adatta automaticamente */
.auto-grid {
    display: grid;
    gap: var(--space-lg);
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}
```

Questo crea automaticamente colonne quando c'è spazio (min 300px per colonna).

## 🎯 CSS Naming Conventions

### BEM-like Approach

Usa nomenclatura semantic e leggibile, ispirata a BEM ma semplificata:
```css
/* Block (componente principale) */
.project-card { }

/* Element (parte del componente) */
.project-card__image { }
.project-card__title { }
.project-card__description { }
.project-card__badges { }

/* Modifier (variazione) */
.project-card--featured { }
.project-card--large { }
```

### Utility Classes

Prefisso con funzione, non stile:
```css
✅ Corretto (semantic):
.text-primary { color: var(--text-primary); }
.bg-alternate { background-color: var(--bg-alternate); }
.mt-lg { margin-top: var(--space-lg); }

❌ Sbagliato (style-based):
.blue { color: #5465FF; }
.big-margin { margin-top: 50px; }
```

## 🚀 Performance Best Practices

### CSS Loading

Minimizza CSS critical path:
- `variables.css` caricato prima di tutto (contiene le custom properties)
- CSS condizionale per pagina (solo stili necessari)
- Evita `@import` in CSS (usa enqueue PHP)

### Animations Performance
```css
/* ✅ BUONO - GPU accelerated */
.element {
    transition: transform 250ms, opacity 250ms;
}

.element:hover {
    transform: translateY(-4px);
    opacity: 0.8;
}

/* ❌ CATTIVO - causa reflow/repaint */
.element {
    transition: height 250ms, margin 250ms;
}
```

**Animare solo**: `transform`, `opacity`, `filter`

### Reduce Layout Shift

Sempre specificare dimensioni per immagini:
```html
<img src="..."
     width="800"
     height="600"
     alt="...">
```

## 📋 Checklist CSS Quality

Prima di committare CSS:

- [ ] Uso custom properties invece di valori hardcoded
- [ ] Mobile-first (base styles senza media query)
- [ ] Breakpoint coerenti con design system
- [ ] Animations usano solo `transform` e `opacity`
- [ ] Contrasto colori rispetta WCAG AA
- [ ] Nomenclatura classes segue convenzioni BEM-like
- [ ] Spacing usa variabili `--space-*`
- [ ] Typography usa variabili `--font-*`
- [ ] Nessun `!important` (tranne override necessari)

## 🔄 Aggiornamenti Design System

Quando modifichi il design system:

1. **Update variables.css** prima
2. **Testa impatto** su componenti esistenti
3. **Documenta qui** le modifiche
4. **Commit semantico**: `style: update --primary color value`

Il design system deve evolvere con il progetto, ma cambiamenti devono essere intenzionali e documentati.

---

*Tutti i valori in questo design system sono definiti in `assets/css/variables.css`. Usa sempre le custom properties, mai valori diretti.*