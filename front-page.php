<?php
get_header();
?>

<section class="hero-section-container">
    <div class="hero-section">
        <div class="hero-content">
            <h1 class="hero-title"><?php echo esc_html__('Soluzioni WordPress su misura. Fatto bene, fatto per durare', 'blocksy-portfolio-child'); ?></h1>
            <h2 class="hero-payoff"><?php echo esc_html__('Temi custom, codice pulito e performance ottimizzate per il tuo business.', 'blocksy-portfolio-child'); ?></h2>
            <div class="hero-button">
                <a href="<?php echo esc_url(home_url('/portfolio')); ?>">
                    <?php echo esc_html__('Guarda cosa so fare', 'blocksy-portfolio-child'); ?>
                </a>
            </div>
        </div>  
     
        <div class="hero-media">
            <img src="<?php echo esc_url('http://babajaga-lab.local/wp-content/uploads/2025/10/gemini-2.5-flash-image-preview_lo_sfondoo_non_deve_esserci_ritaglialo-0.png') ?>" alt="<?php echo esc_attr__( 'Illustrazione 3D isometrica di uno sviluppatore al lavoro con icone AI luminose', 'blocksy-portfolio-child') ?>"
            class="hero-image"
        loading="lazy"
        width="600"
        height="400">
            
        </div>
            
    </div>
</section>

<?php
get_footer();
?>