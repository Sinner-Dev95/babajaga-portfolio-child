<?php 
/**
 * Template archivio News
 * Mostra tutte le news in formato griglia con immagini
 * 
 * @package Blocksy_Portfolio_Child
 */

if(!defined('ABSPATH')){
    exit;
}

get_header();
?>

<div class="news-archive-container">

    <header class="news-archive-header">
        <h1>Le baba News</h1>
        <p>Ultimi aggiornamenti e novità dal mondo tech</p>
    </header>

    <div class="news-grid">
        <?php
        if(have_posts()) :
            while(have_posts()) : the_post();
            ?>
            <!-- SINGOLA CARD -->
            <article class="news-card">
                
                <!-- ========================================= -->
                <!-- IMMAGINE IN EVIDENZA (Featured Image) -->
                <!-- ========================================= -->
                <?php if (has_post_thumbnail()) : ?>
                    <div class="news-thumbnail">
                        <a href="<?php the_permalink(); ?>" aria-label="Leggi: <?php the_title_attribute(); ?>">
                            <?php 
                            the_post_thumbnail('medium_large', array(
                                'class' => 'news-image',
                                'loading' => 'lazy',
                                'alt' => get_the_title()
                            )); 
                            ?>
                        </a>
                    </div>
                <?php endif; ?>

                <!-- ========================================= -->
                <!-- CONTENUTO TESTO - WRAPPER CORRETTO -->
                <!-- ========================================= -->
                <div class="news-card-content">
                    
                    <!-- TITOLO -->
                    <h2 class="news-title">
                        <a href="<?php the_permalink(); ?>">
                            <?php the_title(); ?>
                        </a>
                    </h2>

                    <!-- DATA di pubblicazione -->
                    <div class="news-date">
                        <time datetime="<?php echo get_the_date('c'); ?>">
                            Pubblicato il: <?php echo get_the_date('j F Y'); ?>
                        </time>
                    </div>

                    <!-- Anteprima del contenuto - LIMITATA -->
                    <div class="news-excerpt">
                        <?php 
                        // Limita excerpt a 25 parole per essere più "tech" e pulito
                        $excerpt = wp_trim_words(get_the_excerpt(), 25, '...');
                        echo $excerpt;
                        ?>
                    </div>

                    <!-- LINK per leggere tutto -->
                    <a href="<?php the_permalink(); ?>" class="read-more">
                        Leggi l'articolo completo →
                    </a>
                
                </div><!-- /.news-card-content -->

            </article>
            <?php
            endwhile;
            ?>
            
            <!-- PAGINAZIONE -->
            <div class="news-pagination">
                <?php
                the_posts_pagination(array(
                    'prev_text' => '← News precedenti',
                    'next_text' => 'News successive →',
                ));
                ?>
            </div>
            <?php
            
        else : 
            ?>
            <div class="no-news">
                <p>😴 Non ci sono news al momento. Torna presto!</p>
            </div>
            <?php
        endif;
        ?>
    </div>

</div>

<?php 
get_footer(); 
?>