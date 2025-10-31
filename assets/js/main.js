/**
 * MAIN.JS - Portfolio JavaScript
 * Vanilla JavaScript per performance ottimali
 * 
 * Funzionalità:
 * - Swiper News Slider (homepage)
 */

// =========================================================================
// DOM READY - Universal approach
// =========================================================================

document.addEventListener('DOMContentLoaded', function() {
    
    console.log('🚀 Portfolio animations inizializzate');
    
    // Inizializza le funzionalità
    initSwiperNewsSlider();
    
    // =========================================================================
    // 🧪 SWIPER NEWS SLIDER - Vanilla JS ottimizzato
    // =========================================================================
    
    function initSwiperNewsSlider() {
        
        // Verifica prerequisiti
        if (typeof Swiper === 'undefined') {
            console.log('ℹ️ Swiper non disponibile');
            return;
        }
        
        if (!document.body.classList.contains('home')) {
            console.log('ℹ️ Non siamo sulla homepage');
            return;
        }
        
        const swiperContainer = document.querySelector('.news-swiper');
        if (!swiperContainer) {
            console.log('ℹ️ Container Swiper non trovato');
            return;
        }
        
        console.log('✅ Inizializzazione Swiper...');
        
        try {
            const newsSwiper = new Swiper('.news-swiper', {
                // Configurazione base ottimizzata
                slidesPerView: 1,
                spaceBetween: 24,
                loop: true,
                centeredSlides: false,
                
                // Autoplay fluido
                autoplay: {
                    delay: 5000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true
                },
                
                // Transizioni ottimizzate
                speed: 600,
                effect: 'slide',
                
                // Pagination
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                    dynamicBullets: true
                },
                
                // Breakpoints responsive
                breakpoints: {
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 32
                    },
                    1024: {
                        slidesPerView: 3,
                        spaceBetween: 40
                    },
                    1290: {
                        slidesPerView: 3,
                        spaceBetween: 48
                    }
                },
                
                // Accessibilità
                a11y: {
                    prevSlideMessage: 'Slide precedente',
                    nextSlideMessage: 'Slide successiva',
                    paginationBulletMessage: 'Vai alla slide {{index}}'
                },
                
                // Navigazione tastiera
                keyboard: {
                    enabled: true,
                    onlyInViewport: true
                },
                
                grabCursor: true
            });
            
            console.log('✅ Swiper inizializzato correttamente');
            
        } catch (error) {
            console.error('❌ Errore Swiper:', error);
        }
    }
    
});