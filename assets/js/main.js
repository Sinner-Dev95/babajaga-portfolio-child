/**
 * MAIN.JS - Inizializzazione Swiper per homepage
 */
jQuery(document).ready(function($) {
    
    // Verifica che Swiper sia caricato
    if (typeof Swiper !== 'undefined') {
        
        // Inizializza Swiper solo se siamo sulla homepage
        if ($('body').hasClass('home')) {
            
            const newsSwiper = new Swiper('.news-swiper', {
                // Base configuration
                slidesPerView: 1,
                spaceBetween: 24,
                loop: true,
                centeredSlides: false,
                
                // Autoplay - Scorrimento automatico
                autoplay: {
                    delay: 5000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true
                },
                
                // Transizioni
                speed: 600,
                effect: 'slide',
                
                // Pagination - Solo indicatori (NO frecce)
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                    dynamicBullets: true
                },
                
                // Responsive breakpoints
                breakpoints: {
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 32,
                        centeredSlides: false
                    },
                    1024: {
                        slidesPerView: 3,
                        spaceBetween: 40,
                        centeredSlides: false
                    },
                    1290: {
                        slidesPerView: 3,
                        spaceBetween: 48,
                        centeredSlides: false
                    }
                },
                
                // Accessibility
                a11y: {
                    prevSlideMessage: 'Slide precedente',
                    nextSlideMessage: 'Slide successiva',
                    paginationBulletMessage: 'Vai alla slide {{index}}'
                },
                
                // Keyboard navigation
                keyboard: {
                    enabled: true,
                    onlyInViewport: true
                },
                
                // Cursore interattivo
                grabCursor: true
            });
            
            console.log('✅ News Swiper inizializzato');
            
        }
        
    } else {
        console.error('❌ Swiper non caricato');
    }
});