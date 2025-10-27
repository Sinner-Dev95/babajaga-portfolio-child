<?php
get_header();
?>



<section class="hero-section-container">
    <div class="hero-section">
        <div class="hero-content">
            <h1 class="hero-title"><?php echo esc_html__('Sviluppatore web, trasformo le tue  idee in siti veloci e funzionali', 'blocksy-portfolio-child'); ?></h1>
            <h2 class="hero-payoff"><?php echo esc_html__('WordPress, Elementor, custom code: scelgo gli strumenti giusti per ogni progetto. L\'importante è il risultato: siti che caricano veloce, convertono e non ti fanno impazzire.', 'blocksy-portfolio-child'); ?></h2>
            <div class="hero-button">
                <a href="<?php echo esc_url(home_url('/portfolio')); ?>">
                    <?php echo esc_html__('Scopri di più →', 'blocksy-portfolio-child'); ?>
                </a>
            </div>
        </div>  
     
<div class="hero-media">
    <?php
    $hero_image_id = 44;
    
    if (wp_attachment_is_image($hero_image_id)) {
        
        // Ottieni URL + dimensioni reali
        $image_data = wp_get_attachment_image_src($hero_image_id, 'large');
        
        if ($image_data) {
            $image_url = $image_data[0];
            $image_width = $image_data[1];
            $image_height = $image_data[2];
            
            // Alt text dinamico
            $image_alt = get_post_meta($hero_image_id, '_wp_attachment_image_alt', true);
            if (empty($image_alt)) {
                $image_alt = __('Developer workspace con tecnologie moderne', 'blocksy-portfolio-child');
            }
            ?>
            
            <img 
                src="<?php echo esc_url($image_url); ?>" 
                alt="<?php echo esc_attr($image_alt); ?>"
                width="<?php echo esc_attr($image_width); ?>"
                height="<?php echo esc_attr($image_height); ?>"
                class="hero-image"
                loading="eager"
                decoding="async"
            >
            
        <?php }
    } else { ?>
        
        <div class="hero-placeholder">
            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <rect x="3" y="3" width="18" height="18" rx="2" stroke-width="2"/>
                <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor"/>
                <path d="M21 15l-5-5L5 21" stroke-width="2"/>
            </svg>
            <p><?php echo esc_html__('Immagine non caricata', 'blocksy-portfolio-child'); ?></p>
        </div>
        
    <?php } ?>
</div>
            
    </div>
</section>

<?php
get_footer();
?>