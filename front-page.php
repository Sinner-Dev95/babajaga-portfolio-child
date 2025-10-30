<?php
get_header();
?>

<!-- ========================================================================
     HERO SECTION - Introduzione homepage
     ======================================================================== -->

<section class="hero-section-container">
    <div class="hero-section">
        <div class="hero-content">
            <h1 class="hero-title"><?php echo esc_html__('Sviluppatore web, trasformo le tue  idee in siti veloci e funzionali', 'blocksy-portfolio-child'); ?></h1>
            <h2 class="hero-payoff"><?php echo esc_html__('WordPress, Elementor, custom code: scelgo gli strumenti giusti per ogni progetto. L\'importante è il risultato: siti che caricano veloce, convertono e non ti fanno impazzire.', 'blocksy-portfolio-child'); ?></h2>
            <div class="hero-button">
                <a href="<?php echo esc_url(home_url('/portfolio')); ?>">
                    <?php echo esc_html__('Scopri di più ', 'blocksy-portfolio-child'); ?>
                </a>
            </div>
        </div>

        <div class="hero-media">
            <?php
            $hero_image_id = 71;

            if (wp_attachment_is_image($hero_image_id)) {
                $image_data = wp_get_attachment_image_src($hero_image_id, 'large');

                if ($image_data) {
                    $image_url = $image_data[0];
                    $image_width = $image_data[1];
                    $image_height = $image_data[2];

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
                        decoding="async">
                <?php }
            } else { ?>
                <div class="hero-placeholder">
                    <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <rect x="3" y="3" width="18" height="18" rx="2" stroke-width="2" />
                        <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" />
                        <path d="M21 15l-5-5L5 21" stroke-width="2" />
                    </svg>
                    <p><?php echo esc_html__('Immagine non caricata', 'blocksy-portfolio-child'); ?></p>
                </div>
            <?php } ?>
        </div>
    </div>
</section>

<!-- ========================================================================
     SEZIONE PROGETTI - Layout alternato portfolio
     POSIZIONE 2: Mostra subito il portfolio dopo hero
     ======================================================================== -->

<section class="progetti-home-container" aria-labelledby="progetti-heading">
    <div class="progetti-home-wrapper">
        
        <!-- HEADER SEZIONE -->
        <div class="progetti-home-header">
            <h2 id="progetti-heading" class="progetti-home-title">
                <?php echo esc_html__('Progetti in Evidenza', 'blocksy-portfolio-child'); ?>
            </h2>
            <p class="progetti-home-subtitle">
                <?php echo esc_html__('Lavori recenti e case studies', 'blocksy-portfolio-child'); ?>
            </p>
        </div>

        <?php
        $progetti_query = new WP_Query([
            'post_type'      => 'progetto',
            'posts_per_page' => 3,
            'orderby'        => 'date',
            'order'          => 'DESC',
            'post_status'    => 'publish'
        ]);

        if ($progetti_query->have_posts()) :
            $counter = 0;
        ?>

        <!-- PROGETTI GRID -->
        <div class="progetti-home-grid">
            
            <?php while ($progetti_query->have_posts()) : $progetti_query->the_post(); 
                $counter++;
                $is_reverse = ($counter % 2 == 0);
                
                $immagine = get_field('immagine_progetto');
                $descrizione = get_field('descrizione_breve');
                $tecnologie = get_field('tecnologie');
            ?>
            
            <article class="progetto-home-item <?php echo $is_reverse ? 'reverse' : ''; ?>">
                
                <!-- IMMAGINE -->
                <div class="progetto-home-media">
                    <a href="<?php the_permalink(); ?>" aria-label="<?php echo esc_attr('Vedi progetto: ' . get_the_title()); ?>">
                        <?php if ($immagine): ?>
                            <img src="<?php echo esc_url($immagine['url']); ?>" 
                                 alt="<?php echo esc_attr($immagine['alt']); ?>"
                                 class="progetto-home-img"
                                 loading="lazy">
                        <?php else: ?>
                            <div class="progetto-home-placeholder">
                                <span>📁</span>
                            </div>
                        <?php endif; ?>
                    </a>
                </div>
                
                <!-- CONTENUTO -->
                <div class="progetto-home-content">
                    
                    <span class="progetto-home-number">0<?php echo $counter; ?></span>
                    
                    <h3 class="progetto-home-title-item">
                        <a href="<?php the_permalink(); ?>">
                            <?php the_title(); ?>
                        </a>
                    </h3>
                    
                    <?php if ($descrizione): ?>
                        <p class="progetto-home-excerpt">
                            <?php echo esc_html(wp_trim_words($descrizione, 20, '...')); ?>
                        </p>
                    <?php endif; ?>
                    
                    <?php if ($tecnologie): ?>
                        <div class="progetto-home-tech">
                            <?php 
                            $tech_array = array_map('trim', explode(',', $tecnologie));
                            $tech_array = array_slice($tech_array, 0, 3);
                            foreach ($tech_array as $tech) {
                                if (!empty($tech)) {
                                    echo '<span class="tech-tag">' . esc_html($tech) . '</span>';
                                }
                            }
                            ?>
                        </div>
                    <?php endif; ?>
                    
                    <a href="<?php the_permalink(); ?>" class="progetto-home-link">
                        <?php echo esc_html__('Scopri il progetto', 'blocksy-portfolio-child'); ?> →
                    </a>
                    
                </div>

            </article>
            
            <?php endwhile; ?>
            
        </div>

        <?php 
        wp_reset_postdata();
        else : 
        ?>
            <div class="no-progetti-home">
                <p><?php echo esc_html__('Nessun progetto disponibile al momento.', 'blocksy-portfolio-child'); ?></p>
            </div>
        <?php endif; ?>

        <!-- LINK ARCHIVIO COMPLETO -->
        <div class="progetti-home-footer">
            <a href="<?php echo esc_url(get_post_type_archive_link('progetto')); ?>" 
               class="btn-view-all-progetti">
                <?php echo esc_html__('Vedi tutti i progetti', 'blocksy-portfolio-child'); ?>
            </a>
        </div>

    </div>
</section>

<!-- ========================================================================
     STORY SECTION - Chi sono
     POSIZIONE 3: Trust building dopo aver visto i progetti
     ======================================================================== -->

<section class="story-container" aria-labelledby="story-heading">
    <div class="story">

        <div class="story-avatar">
            <?php
            $story_image_id = 73;

            if (wp_attachment_is_image($story_image_id)) {
                $story_image_data = wp_get_attachment_image_src($story_image_id, 'medium');

                if ($story_image_data) {
                    $story_image_url = $story_image_data[0];
                    $story_image_width = $story_image_data[1];
                    $story_image_height = $story_image_data[2];

                    $story_image_alt = get_post_meta($story_image_id, '_wp_attachment_image_alt', true);
                    if (empty($story_image_alt)) {
                        $story_image_alt = __('Marco - Sviluppatore Web', 'blocksy-portfolio-child');
                    }
            ?>
                    <img
                        src="<?php echo esc_url($story_image_url); ?>"
                        alt="<?php echo esc_attr($story_image_alt); ?>"
                        width="<?php echo esc_attr($story_image_width); ?>"
                        height="<?php echo esc_attr($story_image_height); ?>"
                        class="story-avatar-image"
                        loading="lazy"
                        decoding="async">
                <?php }
            } else { ?>
                <div class="story-avatar-placeholder">
                    <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <circle cx="12" cy="7" r="5" stroke-width="2" />
                        <path d="M17 22H7c0-3 2.5-5.5 5-5.5s5 2.5 5 5.5z" stroke-width="2" />
                    </svg>
                </div>
            <?php } ?>
        </div>

        <div class="story-content">
            <h2 id="story-heading" class="story-title">
                <?php echo esc_html__('Da dove nasce Babajaga?', 'blocksy-portfolio-child'); ?>
            </h2>

            <div class="story-text">
                <p class="story-para">
                    <?php echo esc_html__('Tutto è iniziato con la curiosità di capire come funzionano le cose dietro lo schermo. Da bambino smontavo i giocattoli per vedere i meccanismi interni - oggi faccio lo stesso con i siti web. Babajaga rappresenta questa filosofia: esplorare, comprendere, costruire.', 'blocksy-portfolio-child'); ?>
                </p>

                <p class="story-para">
                    <?php echo esc_html__('Il nome viene da un\'antica leggenda slava che parla di una figura che testa il coraggio e l\'ingegno. Nel mio lavoro, ogni progetto è una sfida da risolvere con creatività e competenza tecnica. Non mi limito a seguire le istruzioni: studio il problema e trovo la soluzione migliore.', 'blocksy-portfolio-child'); ?>
                </p>

                <p class="story-para">
                    <?php echo esc_html__('Oggi continuo a mantenere vivo questo approccio: sempre curioso, sempre in apprendimento, sempre pronto a trasformare idee complesse in soluzioni eleganti e funzionali.', 'blocksy-portfolio-child'); ?>
                </p>
            </div>

            <div class="story-signature">
                <img
                    src="<?php echo esc_url('http://babajaga-lab.local/wp-content/uploads/2025/10/Immagine_2025-10-28_103723-removebg-preview.png'); ?>"
                    alt="<?php echo esc_attr__('Firma digitale di Marco - Sviluppatore Web', 'blocksy-portfolio-child'); ?>"
                    class="signature-image"
                    loading="lazy"
                    decoding="async"
                    width="200"
                    height="80">
            </div>
        </div>

    </div>
</section>

<!-- ========================================================================
     SEZIONE SLIDER NEWS - Carousel delle ultime novità
     POSIZIONE 4: Bonus content per approfondimento
     ======================================================================== -->

<section class="news-slider-container" aria-labelledby="news-heading">
    <div class="news-slider-wrapper">
        
        <!-- HEADER SEZIONE -->
        <div class="news-slider-header">
            <h2 id="news-heading" class="news-slider-title">
                <?php echo esc_html__('Ultime News', 'blocksy-portfolio-child'); ?>
            </h2>
            <p class="news-slider-subtitle">
                <?php echo esc_html__('Resta aggiornato sulle novità del mondo tech', 'blocksy-portfolio-child'); ?>
            </p>
        </div>

        <?php
        $news_query = new WP_Query([
            'post_type'      => 'news',
            'posts_per_page' => 6,
            'orderby'        => 'date',
            'order'          => 'DESC',
            'post_status'    => 'publish'
        ]);

        if ($news_query->have_posts()) :
        ?>

        <!-- SWIPER SLIDER -->
        <div class="swiper news-swiper">
            <div class="swiper-wrapper">
                
                <?php while ($news_query->have_posts()) : $news_query->the_post(); ?>
                
                <div class="swiper-slide">
                    <article class="news-slide-card">
                        
                        <?php if (has_post_thumbnail()) : ?>
                            <div class="news-slide-image">
                                <a href="<?php the_permalink(); ?>" 
                                   aria-label="<?php echo esc_attr('Leggi: ' . get_the_title()); ?>">
                                    <?php 
                                    the_post_thumbnail('medium_large', [
                                        'loading' => 'lazy',
                                        'alt'     => get_the_title()
                                    ]); 
                                    ?>
                                </a>
                            </div>
                        <?php endif; ?>

                        <div class="news-slide-content">
                            <time class="news-slide-date" datetime="<?php echo get_the_date('c'); ?>">
                                <?php echo get_the_date('j F Y'); ?>
                            </time>

                            <h3 class="news-slide-title">
                                <a href="<?php the_permalink(); ?>">
                                    <?php the_title(); ?>
                                </a>
                            </h3>

                            <div class="news-slide-excerpt">
                                <?php echo wp_trim_words(get_the_excerpt(), 15, '...'); ?>
                            </div>

                            <a href="<?php the_permalink(); ?>" class="news-slide-link">
                                <?php echo esc_html__('Leggi tutto', 'blocksy-portfolio-child'); ?>
                            </a>
                        </div>

                    </article>
                </div>
                
                <?php endwhile; ?>
                
            </div>

            <!-- CONTROLLI NAVIGAZIONE -->
           
            <div class="swiper-pagination"></div>

        </div>

        <?php 
        wp_reset_postdata();
        else : 
        ?>
            <div class="no-news-slider">
                <p><?php echo esc_html__('Nessuna news disponibile al momento.', 'blocksy-portfolio-child'); ?></p>
            </div>
        <?php endif; ?>

        <!-- LINK ARCHIVIO COMPLETO -->
        <div class="news-slider-footer">
            <a href="<?php echo esc_url(get_post_type_archive_link('news')); ?>" 
               class="btn-view-all">
                <?php echo esc_html__('Vedi tutte le news', 'blocksy-portfolio-child'); ?>
            </a>
        </div>

    </div>
</section>

<?php
get_footer();
?>