<?php
/**
 * Blocksy Portfolio Child Theme - Functions
 * 
 * @package Blocksy_Portfolio_Child
 * @version 1.0.0
 */

// Sicurezza: previene accesso diretto
if (!defined('ABSPATH')) {
    exit;
}

/**
 * =========================================================================
 * CARICAMENTO ASSETS (CSS & JS) - VERSIONE SICURA
 * =========================================================================
 */

/**
 * Carica gli stili CSS del tema child
 */
function blocksy_portfolio_child_enqueue_styles() {
    // Verifica siamo in ambiente WordPress
    if (!function_exists('wp_enqueue_style')) {
        return;
    }

    // 1. RESET CSS - Fondamentale, prima di tutto
    wp_enqueue_style(
        'blocksy-child-reset',
        esc_url( get_stylesheet_directory_uri() . '/assets/css/reset.css' ),
        array(), // Nessuna dipendenza
        sanitize_text_field( wp_get_theme()->get('Version') )
    );
    
    // 2. VARIABLES CSS - Design system foundation
    wp_enqueue_style(
        'blocksy-child-variables',
        esc_url( get_stylesheet_directory_uri() . '/assets/css/variables.css' ),
        array('blocksy-child-reset'), // Dipende dal reset
        sanitize_text_field( wp_get_theme()->get('Version') )
    );
    
    // 3. HOME CSS - Stili specifici homepage
    wp_enqueue_style(
        'blocksy-child-home',
        esc_url( get_stylesheet_directory_uri() . '/assets/css/home.css' ), 
        array('blocksy-child-variables'), // Dipende dalle variables
        sanitize_text_field( wp_get_theme()->get('Version') )
    );

    // 4. COMPONENTI CSS - Stili modulari
    wp_enqueue_style(
        'blocksy-child-components',
        esc_url( get_stylesheet_directory_uri() . '/assets/css/components/hero.css' ),
        array('blocksy-child-variables'), // Dipende dalle variables
        sanitize_text_field( wp_get_theme()->get('Version') )
    );
}
add_action('wp_enqueue_scripts', 'blocksy_portfolio_child_enqueue_styles', 15);

/**
 * Carica gli script JavaScript
 */
function blocksy_portfolio_child_enqueue_scripts() {
    // Verifica siamo in ambiente WordPress
    if (!function_exists('wp_enqueue_script')) {
        return;
    }

    wp_enqueue_script(
        'blocksy-child-main',
        esc_url( get_stylesheet_directory_uri() . '/assets/js/main.js' ),
        array('jquery'), // Dipende da jQuery
        sanitize_text_field( wp_get_theme()->get('Version') ),
        true // Carica nel footer
    );

    // Aggiungi nonce per sicurezza AJAX (se usi AJAX in futuro)
    // wp_localize_script('blocksy-child-main', 'blocksy_child_ajax', array(
    //     'nonce' => wp_create_nonce('blocksy_child_nonce'),
    //     'ajaxurl' => admin_url('admin-ajax.php')
    // ));
}
add_action('wp_enqueue_scripts', 'blocksy_portfolio_child_enqueue_scripts', 20);

/**
 * =========================================================================
 * SICUREZZA AGGIUNTIVA - FEATURES FUTURE
 * =========================================================================
 */

/**
 * Esempio: Funzione AJAX sicura per features future
 */
/*
function blocksy_child_ajax_example() {
    // 1. Verifica nonce
    check_ajax_referer('blocksy_child_nonce', 'nonce');
    
    // 2. Verifica capabilities utente
    if (!current_user_can('edit_posts')) {
        wp_die('Non autorizzato');
    }
    
    // 3. Sanitizza input
    $user_input = sanitize_text_field($_POST['data']);
    
    // 4. Escape output
    echo esc_html($user_input);
    
    wp_die();
}
add_action('wp_ajax_blocksy_child_action', 'blocksy_child_ajax_example');
*/

/**
 * Esempio: Shortcode sicuro per features future
 */
/*
function blocksy_child_safe_shortcode($atts) {
    // 1. Sanitizza attributi
    $atts = shortcode_atts(array(
        'text' => 'Default',
        'url' => '#'
    ), $atts, 'blocksy_child_shortcode');
    
    // 2. Escape tutto l'output
    return sprintf(
        '<a href="%s" class="safe-link">%s</a>',
        esc_url($atts['url']),
        esc_html($atts['text'])
    );
}
add_shortcode('blocksy_child', 'blocksy_child_safe_shortcode');
*/