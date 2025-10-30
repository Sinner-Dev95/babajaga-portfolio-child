<?php
/**
 * Template singolo Progetto - Design Premium
 * 
 * @package Blocksy_Portfolio_Child
 */

if (!defined('ABSPATH')) {
    exit;
}

get_header();

while (have_posts()) : the_post();

// Recupera campi ACF
$immagine = get_field('immagine_progetto');
$descrizione = get_field('descrizione_breve');
$tecnologie = get_field('tecnologie');
$link_demo = get_field('link_demo');
$link_github = get_field('link_github');
?>

<article class="single-progetto-container">
    
    <!-- HERO SECTION - Immagine + Titolo Overlay -->
    <header class="progetto-header">
        
        <!-- Immagine di sfondo -->
        <?php if ($immagine): ?>
            <div class="progetto-immagine">
                <img src="<?php echo esc_url($immagine['url']); ?>" 
                     alt="<?php echo esc_attr($immagine['alt']); ?>"
                     width="<?php echo esc_attr($immagine['width']); ?>"
                     height="<?php echo esc_attr($immagine['height']); ?>"
                     class="progetto-img">
            </div>
        <?php endif; ?>
        
        <!-- Titolo overlay -->
        <h1 class="progetto-title"><?php the_title(); ?></h1>
        
    </header>
    
    <!-- CONTENT WRAPPER -->
    <div class="progetto-content-wrapper">
        
        <!-- DESCRIZIONE BREVE -->
        <?php if ($descrizione): ?>
            <div class="progetto-descrizione">
                <h2>Descrizione</h2>
                <p><?php echo esc_html($descrizione); ?></p>
            </div>
        <?php endif; ?>
        
    </div>
    
    <!-- TECNOLOGIE - Badge colorati (full width) -->
    <?php if ($tecnologie): ?>
        <div class="progetto-tecnologie">
            <h3>Tech Stack</h3>
            <p>
                <?php 
                // Splitta le tecnologie per virgola e crea badge
                $tech_array = array_map('trim', explode(',', $tecnologie));
                foreach ($tech_array as $tech) {
                    if (!empty($tech)) {
                        echo '<span class="tech-badge">' . esc_html($tech) . '</span>';
                    }
                }
                ?>
            </p>
        </div>
    <?php endif; ?>
    
    <!-- CONTENT WRAPPER -->
    <div class="progetto-content-wrapper">
        
        <!-- BOTTONI - Demo e GitHub -->
        <?php if ($link_demo || $link_github): ?>
            <div class="progetto-link">
                <?php if ($link_demo): ?>
                    <a href="<?php echo esc_url($link_demo); ?>" 
                       target="_blank" 
                       rel="noopener noreferrer"
                       class="btn btn-demo">
                        Vedi Demo Live
                    </a>
                <?php endif; ?>
                
                <?php if ($link_github): ?>
                    <a href="<?php echo esc_url($link_github); ?>" 
                       target="_blank" 
                       rel="noopener noreferrer"
                       class="btn btn-github">
                        Codice GitHub
                    </a>
                <?php endif; ?>
            </div>
        <?php endif; ?>
        
        <!-- CONTENUTO WORDPRESS (se presente) -->
        <?php if (get_the_content()): ?>
            <div class="progetto-contenuto-extra">
                <h2>Dettagli aggiuntivi</h2>
                <?php the_content(); ?>
            </div>
        <?php endif; ?>
        
    </div>

</article>

<?php
endwhile;

get_footer();
?>