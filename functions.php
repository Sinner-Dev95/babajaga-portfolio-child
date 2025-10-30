<?php
/**
 * Blocksy Portfolio Child Theme - Functions
 * 
 * @package Blocksy_Portfolio_Child
 * @version 1.0.0
 */

// =========================================================================
// SICUREZZA - PREVENZIONE ACCESSO DIRETTO
// =========================================================================

if (!defined('ABSPATH')) {
    exit;
}

// =========================================================================
// 1. CARICAMENTO ASSETS (CSS & JS)
// =========================================================================

/**
 * Carica gli stili CSS del tema child
 * Ordine: reset -> variables -> components
 */
function blocksy_portfolio_child_enqueue_styles() {
    if (!function_exists('wp_enqueue_style')) {
        return;
    }

    $theme_version = wp_get_theme()->get('Version');
    
    // CSS Base del tema
    $css_assets = [
        'reset' => '/assets/css/reset.css',
        'variables' => '/assets/css/variables.css',
        'home' => '/assets/css/home.css'
    ];

    // CSS Components del tema
    $component_css = [
        'hero' => '/assets/css/components/hero.css',
        'story' => '/assets/css/components/story.css',
        'news' => '/assets/css/components/news.css',
        'progetto' => '/assets/css/components/progetto.css'  // ← AGGIUNTO
    ];

    // Merge degli array CSS
    $all_css_assets = array_merge($css_assets, $component_css);

    // Dipendenze CSS
    $dependencies = [
        'reset' => [],
        'variables' => ['blocksy-child-reset'],
        'home' => ['blocksy-child-variables'],
        'hero' => ['blocksy-child-variables'],
        'story' => ['blocksy-child-variables'], 
        'news' => ['blocksy-child-variables'],
        'progetto' => ['blocksy-child-variables']  // ← AGGIUNTO
    ];

    // Caricamento CSS base e components
    foreach ($all_css_assets as $handle => $path) {
        $file_path = get_stylesheet_directory() . $path;
        
        if (!file_exists($file_path)) {
            error_log("Blocksy Child: File {$path} non trovato");
            continue;
        }

        wp_enqueue_style(
            "blocksy-child-{$handle}",
            esc_url(get_stylesheet_directory_uri() . $path),
            $dependencies[$handle],
            $theme_version
        );
    }
    
    // CSS condizionale per archivio news
    if (is_post_type_archive('news')) {
        $archive_news_css = '/assets/css/archive-news.css';
        $archive_news_path = get_stylesheet_directory() . $archive_news_css;

        if (file_exists($archive_news_path)) {
            wp_enqueue_style(
                'blocksy-child-archive-news',
                esc_url(get_stylesheet_directory_uri() . $archive_news_css),
                array('blocksy-child-variables'),
                $theme_version
            );
        }
    }
    
    // CSS condizionale per singolo progetto
    if (is_singular('progetto')) {
        $single_progetto_css = '/assets/css/single-progetto.css';
        $single_progetto_path = get_stylesheet_directory() . $single_progetto_css;

        if (file_exists($single_progetto_path)) {
            wp_enqueue_style(
                'blocksy-child-single-progetto',
                esc_url(get_stylesheet_directory_uri() . $single_progetto_css),
                array('blocksy-child-variables'),
                $theme_version
            );
        }
    }
    
    // CSS condizionale per archivio progetti
    if (is_post_type_archive('progetto')) {
        $archive_progetto_css = '/assets/css/archive-progetto.css';
        $archive_progetto_path = get_stylesheet_directory() . $archive_progetto_css;

        if (file_exists($archive_progetto_path)) {
            wp_enqueue_style(
                'blocksy-child-archive-progetto',
                esc_url(get_stylesheet_directory_uri() . $archive_progetto_css),
                array('blocksy-child-variables'),
                $theme_version
            );
        }
    }
}
add_action('wp_enqueue_scripts', 'blocksy_portfolio_child_enqueue_styles', 15);

/**
 * Carica Swiper su homepage E archivio news
 * Priorità: 17 (dopo CSS base)
 */
function blocksy_child_enqueue_swiper() {
    // Carica solo dove serve: homepage e archivio news
    if (!is_front_page() && !is_post_type_archive('news')) {
        return;
    }

    if (!function_exists('wp_enqueue_style') || !function_exists('wp_enqueue_script')) {
        return;
    }

    $swiper_version = '10.3.1';
    
    // CSS Swiper bundle (include navigation e pagination)
    wp_enqueue_style(
        'swiper-css',
        'https://cdn.jsdelivr.net/npm/swiper@' . $swiper_version . '/swiper-bundle.min.css',
        array('blocksy-child-variables'),
        $swiper_version
    );
    
    // JS Swiper caricato nel footer
    wp_enqueue_script(
        'swiper-js',
        'https://cdn.jsdelivr.net/npm/swiper@' . $swiper_version . '/swiper-bundle.min.js',
        array('jquery'),
        $swiper_version,
        true
    );
}
add_action('wp_enqueue_scripts', 'blocksy_child_enqueue_swiper', 17);

/**
 * Carica script JavaScript principale del tema
 * Priorità: 20 (dopo Swiper)
 */
function blocksy_portfolio_child_enqueue_scripts() {
    if (!function_exists('wp_enqueue_script')) {
        return;
    }

    $js_file = '/assets/js/main.js';
    $js_path = get_stylesheet_directory() . $js_file;

    if (file_exists($js_path)) {
        wp_enqueue_script(
            'blocksy-child-main',
            esc_url(get_stylesheet_directory_uri() . $js_file),
            ['jquery'],
            wp_get_theme()->get('Version'),
            true
        );
    } else {
        error_log("Blocksy Child: File {$js_file} non trovato");
    }
}
add_action('wp_enqueue_scripts', 'blocksy_portfolio_child_enqueue_scripts', 20);

/**
 * Carica script specifico per slider news
 * Priorità: 25 (dopo main.js)
 */
function blocksy_portfolio_child_enqueue_news_scripts() {
    if (!is_post_type_archive('news')) {
        return;
    }

    if (!function_exists('wp_enqueue_script')) {
        return;
    }

    $js_file = '/assets/js/news-slider.js';
    $js_path = get_stylesheet_directory() . $js_file;

    if (file_exists($js_path)) {
        wp_enqueue_script(
            'blocksy-child-news-slider',
            esc_url(get_stylesheet_directory_uri() . $js_file),
            ['jquery', 'swiper-js'],
            wp_get_theme()->get('Version'),
            true
        );
    }
}
add_action('wp_enqueue_scripts', 'blocksy_portfolio_child_enqueue_news_scripts', 25);

// =========================================================================
// 2. CUSTOM POST TYPES
// =========================================================================

/**
 * Custom Post Type: News
 * Utilizzato per l'archivio con slider
 */
function blocksy_portfolio_child_register_news() {
    $labels = array(
        'name' => 'News',
        'singular_name' => 'News',
        'menu_name' => 'News',
        'add_new' => 'Aggiungi News',
        'add_new_item' => 'Aggiungi Nuova News',
        'edit_item' => 'Modifica News',
        'all_items' => 'Tutte le News',
        'view_item' => 'Visualizza News',
        'search_items' => 'Cerca News',
        'not_found' => 'Nessuna news trovata',
        'not_found_in_trash' => 'Nessuna news nel cestino'
    );

    $args = array(
        'labels' => $labels,
        'public' => true,
        'publicly_queryable' => true,
        'show_ui' => true,
        'show_in_menu' => true,
        'show_in_admin_bar' => true,
        'menu_position' => 6,
        'menu_icon' => 'dashicons-media-document',
        'supports' => array('title', 'editor', 'thumbnail', 'excerpt'),
        'has_archive' => true,
        'show_in_rest' => true,
        'can_export' => true,
        'capability_type' => 'post',
        'rewrite' => array('slug' => 'news')
    );
    
    register_post_type('news', $args);
}
add_action('init', 'blocksy_portfolio_child_register_news');

/**
 * Custom Post Type: Progetti Portfolio
 */
function blocksy_portfolio_child_register_projects() {
    $labels = array(
        'name' => 'Progetti',
        'singular_name' => 'Progetto',
        'menu_name' => 'Progetti',
        'add_new' => 'Aggiungi Progetto',
        'add_new_item' => 'Aggiungi Nuovo Progetto',
        'edit_item' => 'Modifica Progetto',
        'all_items' => 'Tutti i Progetti',
        'view_item' => 'Visualizza Progetto',
        'search_items' => 'Cerca Progetti',
        'not_found' => 'Nessun progetto trovato',
        'not_found_in_trash' => 'Nessun progetto nel cestino'
    );

    $args = array(
        'labels' => $labels,
        'public' => true,
        'publicly_queryable' => true,
        'show_ui' => true,
        'show_in_menu' => true,
        'show_in_admin_bar' => true,
        'menu_position' => 5,
        'menu_icon' => 'dashicons-portfolio',
        'supports' => array('title', 'editor', 'thumbnail', 'excerpt'),
        'has_archive' => true,
        'show_in_rest' => true,
        'can_export' => true,
        'capability_type' => 'post',
        'rewrite' => array('slug' => 'progetti')
    );
    
    register_post_type('progetto', $args);

    // Tassonomia: Tecnologie
    register_taxonomy('tecnologia', 'progetto', array(
        'labels' => array(
            'name'          => 'Tecnologie',
            'singular_name' => 'Tecnologia',
        ),
        'hierarchical'      => false,
        'public'            => true,
        'show_ui'           => true,
        'show_admin_column' => true,
        'rewrite'           => array('slug' => 'tecnologia'),
        'show_in_rest'      => true,
    ));

    // Tassonomia: Tipologie Progetto
    register_taxonomy('tipo_progetto', 'progetto', array(
        'labels' => array(
            'name'          => 'Tipologie Progetto',
            'singular_name' => 'Tipologia Progetto',
        ),
        'hierarchical'      => true,
        'public'            => true,
        'show_ui'           => true,
        'show_admin_column' => true,
        'rewrite'           => array('slug' => 'tipo-progetto'),
        'show_in_rest'      => true,
    ));
}
add_action('init', 'blocksy_portfolio_child_register_projects');

// =========================================================================
// 3. TEMPLATE SICUREZZA - FEATURE FUTURE
// =========================================================================

/**
 * Template per funzione AJAX sicura
 * PRONTO PER UTILIZZO - Da attivare quando necessario
 */
/*
function blocksy_child_ajax_handler() {
    // 1. Verifica nonce per sicurezza
    if (!wp_verify_nonce($_POST['nonce'], 'blocksy_child_nonce')) {
        wp_die('Security check failed');
    }

    // 2. Verifica capabilities utente
    if (!current_user_can('edit_posts')) {
        wp_die('Non autorizzato');
    }

    // 3. Sanitizza tutti gli input
    $user_data = map_deep($_POST, 'sanitize_text_field');

    // 4. Validazione specifica
    if (empty($user_data['required_field'])) {
        wp_send_json_error('Campo obbligatorio mancante');
    }

    // 5. Escape output prima dell'invio
    wp_send_json_success([
        'message' => esc_html__('Operazione completata', 'blocksy-portfolio-child'),
        'data' => esc_html($user_data['required_field'])
    ]);
}
add_action('wp_ajax_blocksy_child_action', 'blocksy_child_ajax_handler');
*/

/**
 * Template per shortcode sicuro
 * PRONTO PER UTILIZZO - Da attivare quando necessario
 */
/*
function blocksy_child_shortcode($atts) {
    $atts = shortcode_atts([
        'text' => 'Default',
        'url' => '#',
        'class' => ''
    ], $atts, 'blocksy_child');

    return sprintf(
        '<a href="%s" class="%s">%s</a>',
        esc_url($atts['url']),
        esc_attr(sanitize_html_class($atts['class'])),
        esc_html($atts['text'])
    );
}
add_shortcode('blocksy_child', 'blocksy_child_shortcode');
*/