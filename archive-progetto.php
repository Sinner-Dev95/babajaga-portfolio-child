<?php 
/**
 * Template archivio Progetti
 * Mostra tutti i progetti in formato griglia con un singolo bottone
 * 
 * @package Blocksy_Portfolio_Child
 */

if(!defined('ABSPATH')){
    exit;
}

get_header();
?>

<div class="projects-archive-container">
    <header class="projects-archive-header">
        <h1>I Miei Progetti</h1>
        <p>Una raccolta dei miei lavori e progetti di sviluppo</p>
    </header>

    <div class="projects-grid">
        <?php
        if(have_posts()) :
            while(have_posts()) : the_post();
                // Recupera campi ACF per progetto
                $immagine_progetto = get_field('immagine_progetto');
                $descrizione_breve = get_field('descrizione_breve');
                $tecnologie = get_field('tecnologie');
                
                // Fallback per immagine
                $immagine_url = $immagine_progetto ? $immagine_progetto['url'] : get_stylesheet_directory_uri() . '/assets/images/placeholder-project.jpg';
                $immagine_alt = $immagine_progetto ? $immagine_progetto['alt'] : 'Immagine progetto ' . get_the_title();
            ?>
            <article class="project-card">
                <!-- IMMAGINE PROGETTO -->
                <div class="project-thumbnail">
                    <a href="<?php the_permalink(); ?>" aria-label="Vedi progetto: <?php the_title_attribute(); ?>">
                        <img src="<?php echo esc_url($immagine_url); ?>" 
                             alt="<?php echo esc_attr($immagine_alt); ?>"
                             class="project-image"
                             loading="lazy">
                    </a>
                </div>

                <!-- CONTENUTO CARDS -->
                <div class="project-card-content">
                    <!-- TITOLO -->
                    <h2 class="project-title">
                        <a href="<?php the_permalink(); ?>">
                            <?php the_title(); ?>
                        </a>
                    </h2>

                    <!-- DESCRIZIONE BREVE -->
                    <?php if ($descrizione_breve): ?>
                        <div class="project-excerpt">
                            <?php echo esc_html(wp_trim_words($descrizione_breve, 20, '...')); ?>
                        </div>
                    <?php endif; ?>

                    <!-- TECNOLOGIE -->
                    <?php if ($tecnologie): ?>
                        <div class="project-technologies">
                            <span class="tech-label">Tecnologie:</span>
                            <span class="tech-list"><?php echo esc_html($tecnologie); ?></span>
                        </div>
                    <?php endif; ?>

                    <!-- SINGOLO BOTTONE "MOSTRA DETTAGLI" -->
                    <div class="project-actions">
                        <a href="<?php the_permalink(); ?>" class="project-details-link">
                            Mostrare Dettagli
                        </a>
                    </div>
                </div>
            </article>
            <?php
            endwhile;
            ?>
            
            <!-- PAGINAZIONE -->
            <div class="projects-pagination">
                <?php
                the_posts_pagination(array(
                    'prev_text' => '← Progetti precedenti',
                    'next_text' => 'Progetti successivi →',
                    'mid_size'  => 2
                ));
                ?>
            </div>
            <?php
        else : 
            ?>
            <div class="no-projects">
                <p>🎯 Non ci sono progetti al momento. Sto lavorando su nuovi contenuti!</p>
            </div>
            <?php
        endif;
        ?>
    </div>
</div>

<?php 
get_footer(); 
?>