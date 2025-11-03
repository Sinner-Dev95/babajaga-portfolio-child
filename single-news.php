<?php
/**
 * Template singola News - Design Premium
 * 
 * @package Blocksy_Portfolio_Child
 */

if (!defined('ABSPATH')) {
    exit;
}

get_header();

while (have_posts()) : the_post();
?>

<article class="single-news-container">
    
    <!-- HERO SECTION - Immagine Featured + Titolo Overlay -->
    <header class="news-header">
        
        <!-- Immagine di sfondo -->
        <?php if (has_post_thumbnail()): ?>
            <div class="news-immagine">
                <?php 
                the_post_thumbnail('full', [
                    'class' => 'news-img',
                    'alt' => get_the_title()
                ]); 
                ?>
            </div>
        <?php endif; ?>
        
        <!-- Titolo overlay -->
        <h1 class="news-title"><?php the_title(); ?></h1>
        
    </header>
    
    <!-- CONTENT WRAPPER -->
    <div class="news-content-wrapper">
        
        <!-- META INFO - Data e Categorie -->
        <div class="news-meta">
            <time class="news-date" datetime="<?php echo get_the_date('c'); ?>">
                📅 <?php echo get_the_date('j F Y'); ?>
            </time>
            
            <?php 
            $categories = get_the_category();
            if ($categories): 
            ?>
                <div class="news-categories">
                    <span class="meta-label">📂 Categoria:</span>
                    <?php foreach($categories as $category): ?>
                        <span class="category-badge">
                            <?php echo esc_html($category->name); ?>
                        </span>
                    <?php endforeach; ?>
                </div>
            <?php endif; ?>
        </div>
        
        <!-- CONTENUTO PRINCIPALE -->
        <div class="news-contenuto">
            <?php the_content(); ?>
        </div>
        
        <!-- TAG (se presenti) -->
        <?php 
        $tags = get_the_tags();
        if ($tags): 
        ?>
            <div class="news-tags">
                <span class="tags-label">🏷️ Tag:</span>
                <?php foreach($tags as $tag): ?>
                    <a href="<?php echo get_tag_link($tag->term_id); ?>" class="tag-link">
                        <?php echo esc_html($tag->name); ?>
                    </a>
                <?php endforeach; ?>
            </div>
        <?php endif; ?>
        
        <!-- NAVIGAZIONE NEWS PRECEDENTE/SUCCESSIVA -->
        <nav class="news-navigation">
            <?php
            $prev_post = get_previous_post();
            $next_post = get_next_post();
            ?>
            
            <?php if ($prev_post): ?>
                <a href="<?php echo get_permalink($prev_post->ID); ?>" class="nav-previous">
                    ← <?php echo esc_html($prev_post->post_title); ?>
                </a>
            <?php endif; ?>
            
            <?php if ($next_post): ?>
                <a href="<?php echo get_permalink($next_post->ID); ?>" class="nav-next">
                    <?php echo esc_html($next_post->post_title); ?> →
                </a>
            <?php endif; ?>
        </nav>
        
    </div>

</article>

<?php
endwhile;

get_footer();
?>