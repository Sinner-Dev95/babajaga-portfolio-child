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
 * CARICAMENTO ASSETS (CSS & JS)
 * =========================================================================
 */

/**
 * Carica gli stili CSS del tema child
 */
function blocksy_portfolio_child_enqueue_styles() {
    // Variables CSS - Foundation del design system
    wp_enqueue_style(
        'blocksy-child-variables',
        get_stylesheet_directory_uri() . '/assets/css/variables.css',
        array(), // Base, nessuna dipendenza
        wp_get_theme()->get('Version')
    );
    
    // Home CSS - Stili specifici per la homepage
    wp_enqueue_style(
        'blocksy-child-home',
        get_stylesheet_directory_uri() . '/assets/css/home.css', 
        array('blocksy-child-variables'), // Dipende dalle variables
        wp_get_theme()->get('Version')
    );
}
add_action('wp_enqueue_scripts', 'blocksy_portfolio_child_enqueue_styles', 15);

/**
 * Carica gli script JavaScript
 */
function blocksy_portfolio_child_enqueue_scripts() {
    wp_enqueue_script(
        'blocksy-child-main',
        get_stylesheet_directory_uri() . '/assets/js/main.js',
        array('jquery'), // Dipende da jQuery
        wp_get_theme()->get('Version'),
        true // Carica nel footer
    );
}
add_action('wp_enqueue_scripts', 'blocksy_portfolio_child_enqueue_scripts', 20);






