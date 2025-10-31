---
name: WordPress Architecture
description: Struttura del tema Blocksy child, organizzazione file, custom post types e template
globs: "**/*.php"
---

# 🏗️ Architettura WordPress - Blocksy Portfolio Child

## Informazioni Generali

**Nome tema**: `blocksy-portfolio-child`  
**Parent theme**: Blocksy (WordPress theme commerciale)  
**Versione WordPress**: 6.x  
**Tipo**: Child theme WordPress con custom post types

## ⚠️ CRITICO: Blocksy Specifics

Blocksy **NON è un tema WordPress standard**. Ha comportamenti specifici che devono essere rispettati per evitare conflitti e malfunzionamenti.

### NON enqueue parent style.css

Questo è l'errore più comune quando si lavora con Blocksy. A differenza di molti altri temi WordPress, Blocksy gestisce autonomamente il caricamento del proprio style.css e ha un sistema di asset management proprietario.
```php
❌ SBAGLIATO - Rompe Blocksy:
function my_enqueue_parent_styles() {
    wp_enqueue_style('parent-style', 
        get_template_directory_uri() . '/style.css'
    );
}
add_action('wp_enqueue_scripts', 'my_enqueue_parent_styles');

✅ CORRETTO - Blocksy gestisce da solo:
// Non serve enqueue del parent style!
// Blocksy lo carica automaticamente con il suo sistema
// Enqueue solo gli asset del CHILD theme
```

### Usa sempre get_stylesheet_directory_uri()

Per file del child theme, usa sempre `get_stylesheet_directory_uri()` invece di `get_template_directory_uri()`.
```php
✅ Corretto per child theme:
wp_enqueue_style(
    'child-custom-style',
    get_stylesheet_directory_uri() . '/assets/css/custom.css',
    array(),
    '1.0.0'
);
```

## 📁 Struttura Directory Completa
```
blocksy-portfolio-child/
├── .continue/
│   └── rules/
│       ├── marco-assistant-guide.md
│       ├── wordpress-architecture.md
│       └── design-system.md
├── assets/
│   ├── css/
│   │   ├── variables.css
│   │   ├── components/
│   │   │   ├── hero.css
│   │   │   ├── news.css
│   │   │   ├── progetto.css
│   │   │   └── story.css
│   │   ├── archive-news.css
│   │   ├── archive-progetto.css
│   │   ├── home.css
│   │   ├── reset.css
│   │   ├── single-news.css
│   │   ├── single-progetto.css
│   │   └── typography.css
│   └── js/
│       └── main.js
├── functions.php
├── style.css
├── front-page.php
├── archive-news.php
├── archive-progetto.php
├── single-news.php
└── single-progetto.php
```

### Organizzazione CSS

Il CSS è modulare per facilitare manutenzione e performance. Il file `variables.css` contiene tutte le custom properties usate nel sito. I file in `components/` contengono stili per componenti riusabili. I file archive e single sono caricati condizionalmente solo dove servono.

## 🎨 Custom Post Types

### Progetto (Portfolio Projects)

Gestisce i progetti del portfolio mostrati in homepage, archivio e pagine dettaglio.

**Configurazione**:
- **Slug**: `progetto` / `progetti`
- **Icona**: `dashicons-portfolio`
- **Supporta**: title, editor, thumbnail
- **Public**: true
- **Has archive**: true

**Campi ACF**:

- `immagine_progetto` (image)
  - Immagine principale progetto
  - Dimensioni: 1200x800px
  - Usata in card, archivio, hero singolo
  
- `descrizione_breve` (textarea)
  - Descrizione per card/anteprime
  - Limite: 150-200 caratteri
  - Usata in homepage e archivio
  
- `tecnologie` (text)
  - Lista tecnologie comma-separated
  - Esempio: "HTML, CSS, JavaScript, WordPress"
  - Renderizzate come badge
  
- `link_demo` (url) - opzionale
  - Link demo live progetto
  
- `link_github` (url) - opzionale
  - Link repository GitHub

**Template Files**:
- `single-progetto.php`: Dettagli completi
- `archive-progetto.php`: Grid tutti progetti
- `front-page.php`: Ultimi 3 progetti in evidenza

**Query tipica**:
```php
$progetti_query = new WP_Query([
    'post_type'      => 'progetto',
    'posts_per_page' => 3,
    'orderby'        => 'date',
    'order'          => 'DESC',
    'post_status'    => 'publish'
]);
```

### News

Gestisce notizie/articoli blog mostrati in slider homepage e archivio dedicato.

**Configurazione**:
- **Slug**: `news`
- **Icona**: `dashicons-megaphone`
- **Supporta**: title, editor, thumbnail, excerpt
- **Public**: true
- **Has archive**: true

**Campi ACF**:

- `immagine_news` (image)
  - Featured image news
  - Dimensioni: 800x600px
  - Usata in slider e archivio
  
- `categoria_news` (taxonomy)
  - Categoria custom per filtrare

**Template Files**:
- `single-news.php`: Singola news completa
- `archive-news.php`: Grid tutte news
- `front-page.php`: Slider ultime 5 news

**Query tipica**:
```php
$news_query = new WP_Query([
    'post_type'      => 'news',
    'posts_per_page' => 5,
    'orderby'        => 'date',
    'order'          => 'DESC',
    'post_status'    => 'publish'
]);
```

## 📄 Template Structure

### Homepage (front-page.php)

Template homepage statica con sezioni verticali:

1. **Hero Section**
   - Immagine background full-width
   - Titolo + sottotitolo + CTA
   - CSS: `components/hero.css`

2. **Progetti in Evidenza**
   - Ultimi 3 progetti
   - Layout alternato sx/dx
   - Card: immagine, titolo, descrizione, badge, link
   - CSS: `components/progetto.css`

3. **News Slider**
   - Ultime 5 news
   - Carousel orizzontale
   - Card: immagine, titolo, data, excerpt, link
   - CSS: `components/news.css`

4. **About Section**
   - Contenuto statico competenze
   - CSS: `home.css`

### Archive Templates

**archive-progetto.php**:
- Header: titolo "Progetti" + descrizione
- Grid 2 colonne desktop, 1 mobile
- Card: thumbnail 16:9, titolo, descrizione, badge tecnologie, link
- Paginazione WordPress standard

Layout:
```css
.projects-grid {
    display: grid;
    gap: var(--space-lg);
    grid-template-columns: 1fr; /* mobile */
}

@media (min-width: 768px) {
    .projects-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}
```

**archive-news.php**:
- Header: titolo "News" + descrizione
- Grid 3 colonne desktop, 2 tablet, 1 mobile
- Card: featured image, titolo, data, excerpt, link
- Paginazione WordPress

Layout:
```css
.news-grid {
    display: grid;
    gap: var(--space-md);
    grid-template-columns: 1fr; /* mobile */
}

@media (min-width: 768px) {
    .news-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (min-width: 1024px) {
    .news-grid {
        grid-template-columns: repeat(3, 1fr);
    }
}
```

### Single Templates

**single-progetto.php**:
1. Hero Section (full-width 60vh)
   - Immagine background
   - Titolo overlay con gradient
   - Hover: zoom leggero immagine

2. Content (max-width container)
   - Descrizione breve evidenziata
   - Contenuto completo (editor)
   - Badge tecnologie
   - Link demo + GitHub

3. Navigation prev/next (opzionale)

**single-news.php**:
1. Featured image
2. Titolo + data pubblicazione
3. Contenuto completo
4. Navigation prev/next

## 🔧 functions.php - Funzionalità Principali

### Enqueue Assets
```php
function blocksy_portfolio_enqueue_assets() {
    // CSS Variables (sempre primo)
    wp_enqueue_style(
        'portfolio-variables',
        get_stylesheet_directory_uri() . '/assets/css/variables.css',
        array(),
        '1.0.0'
    );
    
    // CSS Condizionale per pagina
    if (is_front_page()) {
        wp_enqueue_style('portfolio-home', ...);
        wp_enqueue_style('portfolio-hero', ...);
        wp_enqueue_style('portfolio-projects', ...);
        wp_enqueue_style('portfolio-news', ...);
    }
    
    if (is_post_type_archive('progetto')) {
        wp_enqueue_style('portfolio-archive-projects', ...);
    }
    
    if (is_singular('progetto')) {
        wp_enqueue_style('portfolio-single-project', ...);
    }
    
    // JavaScript
    wp_enqueue_script(
        'portfolio-main',
        get_stylesheet_directory_uri() . '/assets/js/main.js',
        array(),
        '1.0.0',
        true
    );
}
add_action('wp_enqueue_scripts', 'blocksy_portfolio_enqueue_assets');
```

### Register Custom Post Types
```php
function blocksy_register_progetto_post_type() {
    $args = array(
        'label'               => 'Progetti',
        'public'              => true,
        'has_archive'         => true,
        'menu_icon'           => 'dashicons-portfolio',
        'supports'            => array('title', 'editor', 'thumbnail'),
        'rewrite'             => array('slug' => 'progetti'),
        'show_in_rest'        => true,
    );
    register_post_type('progetto', $args);
}
add_action('init', 'blocksy_register_progetto_post_type');

function blocksy_register_news_post_type() {
    $args = array(
        'label'               => 'News',
        'public'              => true,
        'has_archive'         => true,
        'menu_icon'           => 'dashicons-megaphone',
        'supports'            => array('title', 'editor', 'thumbnail', 'excerpt'),
        'rewrite'             => array('slug' => 'news'),
        'show_in_rest'        => true,
    );
    register_post_type('news', $args);
}
add_action('init', 'blocksy_register_news_post_type');
```

### ACF Configuration

Advanced Custom Fields plugin gestisce campi custom. Field groups configurati via WordPress admin UI, non in codice.

## 🔐 Security Best Practices

### File Header Obbligatorio

Ogni file PHP deve iniziare con:
```php
<?php
if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}
```

Questo previene accesso diretto ai file PHP bypassando WordPress.

### Output Escaping

Sempre usare escape functions prima di output:
```php
// Testo generico
echo esc_html($user_data);

// URL
echo '<a href="' . esc_url($link) . '">Link</a>';

// Attributi HTML
echo '<div class="' . esc_attr($class_name) . '">Content</div>';

// HTML consentito (post content)
echo wp_kses_post($post_content);
```

### Input Sanitization

Sempre sanitizzare input utente:
```php
// Testo semplice
$name = sanitize_text_field($_POST['name']);

// Email
$email = sanitize_email($_POST['email']);

// Numeri interi positivi
$post_id = absint($_POST['post_id']);

// URL
$website = esc_url_raw($_POST['website']);
```

### Nonce Verification

Per form e AJAX:
```php
// Generare nonce nel form
wp_nonce_field('my_action_name', 'my_nonce_field');

// Verificare nonce quando processato
if (!isset($_POST['my_nonce_field']) || 
    !wp_verify_nonce($_POST['my_nonce_field'], 'my_action_name')) {
    wp_die('Security check failed');
}
```

### Capability Checks

Verificare permessi utente:
```php
if (!current_user_can('edit_posts')) {
    wp_die('Non autorizzato');
}
```

## 🎯 Naming Conventions

### Funzioni PHP

Prefisso sempre con `blocksy_`:
```php
✅ Corretto:
function blocksy_custom_function() { }

❌ Sbagliato:
function custom_function() { } // rischio conflitti
```

### Custom Hooks

Prefisso con `blocksy/`:
```php
✅ Corretto:
do_action('blocksy/before_header');

❌ Sbagliato:
do_action('before_header'); // troppo generico
```

### CSS Classes

Nomenclatura BEM-like, semantic:
```css
✅ Corretto:
.progetto-card { }
.progetto-card__title { }
.progetto-card--featured { }

.news-grid { }
.news-grid__item { }

❌ Sbagliato:
.card1 { } // non semantic
.pg-crd { } // abbreviato inutilmente
```

### File Names

Lowercase con trattini:
```
✅ Corretto:
single-progetto.php
archive-news.css

❌ Sbagliato:
SingleProgetto.php
archive_news.css
```

## 📱 Responsive Approach

### Mobile-First SEMPRE

Scrivi stili base per mobile, poi aggiungi breakpoint per schermi più grandi:
```css
/* Base (mobile) */
.element {
    padding: 1rem;
    font-size: 1rem;
}

/* Tablet */
@media (min-width: 768px) {
    .element {
        padding: 1.5rem;
        font-size: 1.125rem;
    }
}

/* Desktop */
@media (min-width: 1024px) {
    .element {
        padding: 2rem;
        font-size: 1.25rem;
    }
}
```

### Breakpoints Standard
```css
/* Mobile: base styles, no media query */
/* Tablet: 768px */
/* Desktop: 1024px */
/* Large Desktop: 1200px */
```

Questi breakpoint sono definiti in `variables.css` e usati consistentemente.

## ⚡ Performance Optimization

### Conditional Loading

Script e stili caricati solo dove servono:
```php
// Homepage: tutti gli stili sezioni
if (is_front_page()) {
    wp_enqueue_style('hero');
    wp_enqueue_style('projects');
    wp_enqueue_style('news');
}

// Archive: solo archive-specific
if (is_post_type_archive('progetto')) {
    wp_enqueue_style('archive-projects');
}

// Single: solo single-specific
if (is_singular('progetto')) {
    wp_enqueue_style('single-project');
}
```

### Image Optimization

Sempre specificare dimensioni per evitare CLS (Cumulative Layout Shift):
```php
<img src="<?php echo esc_url($image_url); ?>"
     alt="<?php echo esc_attr($image_alt); ?>"
     width="<?php echo esc_attr($width); ?>"
     height="<?php echo esc_attr($height); ?>"
     loading="lazy">
```

Lazy loading per immagini sotto fold: `loading="lazy"`

### Database Queries

Evitare query N+1:
```php
❌ Sbagliato - N+1 query:
while ($query->have_posts()) {
    $query->the_post();
    $image = get_field('immagine'); // query per ogni post
}

✅ Corretto - preload ACF fields:
// ACF fields vengono cachate automaticamente
// ma evita chiamate ripetute in loop
```

## 🔄 WordPress Coding Standards

### Indentazione

4 spazi (non tab):
```php
function my_function() {
····if ($condition) {
········do_something();
····}
}
```

### Yoda Conditions

Costante/literal a sinistra:
```php
✅ Corretto:
if ('value' === $variable) { }
if (10 < $count) { }

❌ Sbagliato:
if ($variable === 'value') { }
if ($count > 10) { }
```

Questo previene errori di assegnazione accidentale (`=` invece di `==`).

### Brace Style
```php
// Opening brace sulla stessa linea
function my_function() {
    // code
}

// Else sulla stessa linea delle closing/opening braces
if ($condition) {
    // code
} else {
    // code
}
```

## 🔄 Future Development Guidelines

Quando aggiungi nuove funzionalità:

1. **Documentare qui** la struttura e decisioni
2. **Seguire naming conventions** esistenti
3. **Rispettare security best practices** (escape, sanitize, nonce)
4. **Testare su mobile first** prima di desktop
5. **Conditional loading** per nuovi asset
6. **Update questa doc** se architettura cambia significativamente

## 📝 Note Importanti

- Blocksy parent theme non va mai modificato direttamente
- Tutti i custom code vanno nel child theme
- ACF field groups gestiti via WP admin, non in codice
- Enqueue condizionale riduce peso pagine
- Security checks sono OBBLIGATORI, non opzionali
- Mobile-first non è negoziabile

---

*Aggiorna questa documentazione quando fai cambiamenti architetturali significativi. Le rules sono documentazione vivente del progetto.*