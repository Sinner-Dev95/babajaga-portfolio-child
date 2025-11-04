/**
 * MAIN.JS - Portfolio JavaScript
 * Vanilla JavaScript per performance ottimali
 * 
 * Funzionalità:
 * - Swiper News Slider (homepage)
 * - Canvas Grid Interattivo (hero section)
 * - GSAP Animations (Hero, Progetti, Story, News)
 * - Fix race condition canvas dimensioni
 * - Fix memory leak cleanup
 * - Fix navigazione SPA (Single Page App)
 * - Fix re-inizializzazione multipla (Instance Guard)
 */

// 🔒 INSTANCE GUARD GLOBALE
let heroGridInitialized = false;

document.addEventListener('DOMContentLoaded', function() {
    
    console.log('🚀 Portfolio JS inizializzato');
    
    // Inizializza tutte le funzionalità
    initSwiperNewsSlider();
    initHeroGridCanvas();
    initAllAnimations();
    
    // =========================================================================
    // GESTIONE EVENTI NAVIGAZIONE SPA - 🆕 FIX DOUBLE LISTENER
    // =========================================================================
    
    // 🔧 FIX: Un solo registro pagehide globale (non dentro le funzioni)
    window.addEventListener('pagehide', function() {
        console.log('🧹 Pagina nascosta, cleanup completo...');
        
        // Cleanup Hero Grid Canvas
        if (window.heroCanvasCleanup) {
            window.heroCanvasCleanup();
        }
        
        // 🆕 FIX: Cleanup GSAP animations (memory leak prevention)
        if (typeof window.portfolioAnimationsCleanup === 'function') {
            window.portfolioAnimationsCleanup();
        }
    });
    
    window.addEventListener('pageshow', function(event) {
        if (!document.body.classList.contains('home')) {
            return;
        }
        
        console.log('🔄 Pagina mostrata, re-inizializzazione...');
        
        if (heroGridInitialized) {
            console.log('🔒 Instance guard: cleanup istanza precedente...');
            if (window.heroCanvasCleanup) {
                window.heroCanvasCleanup();
            }
        }
        
        setTimeout(function() {
            initHeroGridCanvas();
            initAllAnimations();
        }, 200);
    });
    
    // =========================================================================
    // TUTTE LE ANIMAZIONI GSAP
    // =========================================================================
    
    function initAllAnimations() {
        
        if (typeof gsap === 'undefined') {
            console.log('ℹ️ GSAP non disponibile, skip animations');
            return;
        }
        
        if (!document.body.classList.contains('home')) {
            console.log('ℹ️ Non siamo sulla homepage, skip animations');
            return;
        }
        
        console.log('🎬 Inizializzazione GSAP Animations...');
        
        if (typeof ScrollTrigger !== 'undefined') {
            gsap.registerPlugin(ScrollTrigger);
        } else {
            console.warn('⚠️ ScrollTrigger non disponibile, solo Hero animations attive');
        }
        
        // =====================================================================
        // CONFIGURAZIONE GLOBALE
        // =====================================================================
        
        const isMobile = window.innerWidth <= 768;
        const speedMultiplier = isMobile ? 0.7 : 1;
        
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        
        if (prefersReducedMotion) {
            console.log('ℹ️ Reduced motion preferito, skip animations');
            return;
        }
        
        console.log('📱 Device:', isMobile ? 'Mobile' : 'Desktop');
        console.log('⚡ Speed multiplier:', speedMultiplier);
        
        // =====================================================================
        // 1. HERO SECTION - Entry Animation
        // =====================================================================
        
        console.log('🎨 Configurazione Hero animations...');
        
        gsap.set(['.hero-title', '.hero-payoff', '.hero-button', '.hero-media'], {
            opacity: 0
        });
        
        const heroTimeline = gsap.timeline({
            defaults: {
                ease: 'power2.out',
            }
        });
        
        heroTimeline.to('.hero-title', {
            opacity: 1,
            y: 0,
            duration: 1 * speedMultiplier,
            ease: 'power3.out'
        }, 0.3);
        
        heroTimeline.to('.hero-payoff', {
            opacity: 1,
            y: 0,
            duration: 0.8 * speedMultiplier
        }, 0.6);
        
        heroTimeline.to('.hero-button', {
            opacity: 1,
            scale: 1,
            duration: 0.6 * speedMultiplier,
            ease: 'back.out(1.2)'
        }, 0.9);
        
        heroTimeline.to('.hero-media', {
            opacity: 1,
            x: 0,
            duration: 1 * speedMultiplier,
            ease: 'power2.out'
        }, 1.2);
        
        console.log('✅ Hero entry animations configurate');
        
        // Hero Parallax
        if (typeof ScrollTrigger !== 'undefined') {
            gsap.to('.hero-media', {
                y: 50,
                ease: 'none',
                scrollTrigger: {
                    trigger: '.hero-section-container',
                    start: 'top top',
                    end: 'bottom top',
                    scrub: 1,
                    // markers: true // DEBUG
                }
            });
            console.log('✅ Hero parallax configurato');
        }
        
        // =====================================================================
        // 2. PROGETTI - Fade Laterale Alternato
        // =====================================================================
        
        if (typeof ScrollTrigger !== 'undefined' && document.querySelector('.progetti-home-container')) {
            
            console.log('🎨 Configurazione Progetti animations...');
            
            const progettiCards = gsap.utils.toArray('.progetto-home-item');
            
            progettiCards.forEach((card, index) => {
                const fromLeft = index % 2 === 0;
                
                gsap.from(card, {
                    opacity: 0,
                    x: fromLeft ? -50 : 50,
                    duration: 0.8 * speedMultiplier,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 80%',
                        toggleActions: 'play none none none',
                        // markers: true // DEBUG
                    }
                });
            });
            
            console.log('✅ Progetti animations configurate:', progettiCards.length, 'cards');
        }
        
        // =====================================================================
        // 3. STORY - Fade Laterale Sincrono (SOLO ScrollTrigger)
        // =====================================================================
        
        if (typeof ScrollTrigger !== 'undefined' && document.querySelector('.story-container')) {
            
            console.log('🎨 Configurazione Story animations...');
            
            // DEBUG: Verifica che gli elementi esistano
            console.log('🔍 Story elements:', {
                avatar: document.querySelector('.story-avatar'),
                content: document.querySelector('.story-content'),
                container: document.querySelector('.story-container')
            });
            
            // Avatar da sinistra - CON SCROLLTRIGGER ROBUSTO
            gsap.fromTo('.story-avatar', 
                {
                    opacity: 0,
                    x: -50
                },
                {
                    opacity: 1,
                    x: 0,
                    duration: 0.8 * speedMultiplier,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: '.story-container',
                        start: 'top 85%', // Più in basso per essere sicuri
                        end: 'bottom 15%',
                        toggleActions: 'play none none none',
                        markers: false, // Disattiva dopo il test
                        onEnter: () => console.log('🎯 Story avatar ENTERED'),
                        onLeave: () => console.log('🎯 Story avatar LEFT'),
                        onEnterBack: () => console.log('🎯 Story avatar ENTER BACK'),
                        onLeaveBack: () => console.log('🎯 Story avatar LEAVE BACK')
                    }
                }
            );
            
            // Contenuto da destra - CON SCROLLTRIGGER ROBUSTO
            gsap.fromTo('.story-content', 
                {
                    opacity: 0,
                    x: 50
                },
                {
                    opacity: 1,
                    x: 0,
                    duration: 0.8 * speedMultiplier,
                    delay: 0.2,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: '.story-container',
                        start: 'top 85%', // Più in basso per essere sicuri
                        end: 'bottom 15%',
                        toggleActions: 'play none none none',
                        markers: false, // Disattiva dopo il test
                        onEnter: () => console.log('🎯 Story content ENTERED'),
                        onLeave: () => console.log('🎯 Story content LEFT')
                    }
                }
            );
            
            console.log('✅ Story ScrollTrigger animations configurate');
        }
        
        // FORZA REFRESH SCROLLTRIGGER DOPO IL CARICAMENTO
        setTimeout(() => {
            if (typeof ScrollTrigger !== 'undefined') {
                ScrollTrigger.refresh();
                console.log('🔄 ScrollTrigger refresh forzato');
            }
        }, 500);
        
        // =====================================================================
        // 4. NEWS SLIDER - Solo Header
        // =====================================================================
        
        if (typeof ScrollTrigger !== 'undefined' && document.querySelector('.news-slider-container')) {
            
            console.log('🎨 Configurazione News animations...');
            
            gsap.from('.news-slider-header', {
                opacity: 0,
                scale: 0.95,
                duration: 0.6 * speedMultiplier,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: '.news-slider-container',
                    start: 'top 80%',
                    toggleActions: 'play none none none',
                    // markers: true // DEBUG
                }
            });
            
            console.log('✅ News animations configurate');
        }
        
        // =========================================================================
        // CLEANUP FUNCTION - 🆕 FIX MEMORY LEAK
        // =========================================================================
        
        // 🔧 FIX: Non registrare più event listener qui (già registrato globalmente)
        window.portfolioAnimationsCleanup = function() {
            console.log('🧹 Cleaning up GSAP animations...');
            
            // Kill all ScrollTrigger instances
            if (typeof ScrollTrigger !== 'undefined') {
                const triggers = ScrollTrigger.getAll();
                triggers.forEach((trigger, index) => {
                    console.log(`🗑️ Killing trigger ${index + 1}/${triggers.length}:`, 
                               trigger.vars.id || 'unnamed');
                    trigger.kill();
                });
                console.log(`✅ ScrollTrigger cleanup: ${triggers.length} triggers killed`);
            }
            
            // Kill all active GSAP tweens
            gsap.killTweensOf('*');
            console.log('✅ GSAP tweens cleanup completed');
            
            // Reset global variables
            heroGridInitialized = false;
            
            console.log('✅ Portfolio animations cleanup completed');
        };
        
        console.log('🎉 Tutte le animazioni configurate con successo!');
    }
    
    // =========================================================================
    // SWIPER NEWS SLIDER
    // =========================================================================
    
    function initSwiperNewsSlider() {
        
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
                slidesPerView: 1,
                spaceBetween: 24,
                loop: true,
                centeredSlides: false,
                
                autoplay: {
                    delay: 5000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true
                },
                
                speed: 600,
                effect: 'slide',
                
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                    dynamicBullets: true
                },
                
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
                
                a11y: {
                    prevSlideMessage: 'Slide precedente',
                    nextSlideMessage: 'Slide successiva',
                    paginationBulletMessage: 'Vai alla slide {{index}}'
                },
                
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
    
    // =========================================================================
    // HERO GRID CANVAS - 🆕 FIX RACE CONDITION
    // =========================================================================
    
    function initHeroGridCanvas() {
        
        if (heroGridInitialized) {
            console.log('🔒 Hero grid già inizializzata, skipping...');
            return;
        }
        
        console.log('🔄 Starting fresh hero grid initialization...');
        
        if (!document.body.classList.contains('home')) {
            console.log('ℹ️ Hero grid: non siamo sulla homepage');
            return;
        }
        
        if (window.innerWidth <= 1024) {
            console.log('ℹ️ Hero grid: dispositivo mobile/tablet rilevato, skip canvas');
            return;
        }
        
        const canvas = document.getElementById('hero-grid-canvas');
        if (!canvas) {
            console.log('⚠️ Hero grid: canvas element non trovato');
            return;
        }
        
        const container = canvas.parentElement;
        if (!container) {
            console.log('⚠️ Hero grid: container parent non trovato');
            return;
        }
        
        heroGridInitialized = true;
        
        console.log('✅ Hero Grid Canvas: prerequisiti verificati, starting init...');
        
        const ctx = canvas.getContext('2d');
        
        const config = {
            spacing: 25,
            dotRadius: 2,
            dotRadiusHover: 5,
            baseOpacity: 0.2,
            hoverOpacity: 0.8,
            influenceRadius: 200,
            smoothing: 0.1,
            color: 'rgb(255, 255, 255)'
        };
        
        const mouse = {
            x: -1000,
            y: -1000
        };
        
        let dots = [];
        let animationFrameId = null;
        let checkStartInterval = null;
        let retryCount = 0;
        const maxRetries = 10;
        
        // 🆕 FIX: Canvas Resize Race Condition - Versione migliorata
        function resizeCanvas() {
            const rect = container.getBoundingClientRect();
            let width = rect.width;
            let height = rect.height;
            
            if (width === 0 || height === 0) {
                console.log('⚠️ getBoundingClientRect() ritorna zero, fallback a offsetWidth/Height');
                
                // 🆕 FIX: Forza reflow del browser prima del fallback
                void container.offsetHeight; // Trigger layout recalculation
                
                width = container.offsetWidth;
                height = container.offsetHeight;
            }
            
            if (width === 0 || height === 0) {
                console.log('⚠️ offsetWidth/Height ritorna zero, fallback a viewport dimensions');
                width = window.innerWidth;
                height = window.innerHeight * 0.8;
            }
            
            canvas.width = width;
            canvas.height = height;
            
            console.log(`📐 Canvas dimensions: ${width}x${height} (attempt ${retryCount + 1}/${maxRetries})`);
            
            if (width > 0 && height > 0) {
                createGrid();
                retryCount = 0; // 🆕 FIX: Reset counter on success
            } else {
                retryCount++;
                if (retryCount < maxRetries) {
                    console.log(`⏳ Retry attempt ${retryCount + 1} in 150ms...`); // 🆕 FIX: Increased to 150ms
                    
                    // 🆕 FIX: Force reflow before retry
                    void container.offsetHeight;
                    
                    setTimeout(resizeCanvas, 150); // 🆕 FIX: Increased timeout for Safari/iOS
                } else {
                    console.error('❌ Failed to get canvas dimensions after', maxRetries, 'retries');
                    console.error('📊 Debug info:', {
                        containerExists: !!container,
                        containerDisplay: window.getComputedStyle(container).display,
                        containerVisibility: window.getComputedStyle(container).visibility,
                        containerWidth: container.clientWidth,
                        containerHeight: container.clientHeight
                    });
                    
                    // Fallback estremo: hide canvas se continua a fallire
                    canvas.style.display = 'none';
                    console.log('🛡️ Canvas fallback: hiding element due to repeated failures');
                }
            }
        }
        
        setTimeout(resizeCanvas, 100);
        
        let resizeTimeout;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(resizeCanvas, 100);
        });
        
        function createGrid() {
            dots = [];
            
            const cols = Math.floor(canvas.width / config.spacing);
            const rows = Math.floor(canvas.height / config.spacing);
            
            const offsetX = (canvas.width - (cols * config.spacing)) / 2;
            const offsetY = (canvas.height - (rows * config.spacing)) / 2;
            
            for (let i = 0; i < cols; i++) {
                for (let j = 0; j < rows; j++) {
                    dots.push({
                        x: offsetX + (i * config.spacing),
                        y: offsetY + (j * config.spacing),
                        currentRadius: config.dotRadius,
                        currentOpacity: config.baseOpacity,
                        targetRadius: config.dotRadius,
                        targetOpacity: config.baseOpacity
                    });
                }
            }
            
            console.log(`✅ Griglia creata: ${dots.length} punti (${cols}x${rows})`);
        }
        
        container.addEventListener('mousemove', function(e) {
            const rect = container.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        });
        
        container.addEventListener('mouseleave', function() {
            mouse.x = -1000;
            mouse.y = -1000;
        });
        
        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            dots.forEach(dot => {
                const dx = mouse.x - dot.x;
                const dy = mouse.y - dot.y;
                const distanceSquared = dx * dx + dy * dy;
                
                const influenceRadiusSquared = config.influenceRadius * config.influenceRadius;
                
                if (distanceSquared < influenceRadiusSquared) {
                    const distance = Math.sqrt(distanceSquared);
                    const intensity = 1 - (distance / config.influenceRadius);
                    
                    dot.targetRadius = config.dotRadius + ((config.dotRadiusHover - config.dotRadius) * intensity);
                    dot.targetOpacity = config.baseOpacity + ((config.hoverOpacity - config.baseOpacity) * intensity);
                } else {
                    dot.targetRadius = config.dotRadius;
                    dot.targetOpacity = config.baseOpacity;
                }
                
                dot.currentRadius += (dot.targetRadius - dot.currentRadius) * config.smoothing;
                dot.currentOpacity += (dot.targetOpacity - dot.currentOpacity) * config.smoothing;
                
                ctx.beginPath();
                ctx.arc(dot.x, dot.y, dot.currentRadius, 0, Math.PI * 2);
                ctx.fillStyle = config.color;
                ctx.globalAlpha = dot.currentOpacity;
                ctx.fill();
            });
            
            ctx.globalAlpha = 1;
        }
        
        let lastTime = 0;
        const fps = 30;
        const interval = 1000 / fps;
        
        function loop(currentTime) {
            animationFrameId = requestAnimationFrame(loop);
            
            const deltaTime = currentTime - lastTime;
            
            if (deltaTime > interval) {
                lastTime = currentTime - (deltaTime % interval);
                animate();
            }
        }
        
        let animationStarted = false;
        let checkStartAttempts = 0;
        const maxCheckAttempts = 50;
        
        function startAnimation() {
            if (!animationStarted && dots.length > 0) {
                animationStarted = true;
                loop(0);
                console.log('✅ Hero Grid Canvas animazione attiva (30 FPS)');
                return true;
            }
            return false;
        }
        
        checkStartInterval = setInterval(function() {
            checkStartAttempts++;
            
            const animationReady = startAnimation();
            
            if (animationReady) {
                clearInterval(checkStartInterval);
                checkStartInterval = null;
                console.log('🎉 Animazione avviata dopo', checkStartAttempts, 'tentativi (', (checkStartAttempts * 100), 'ms)');
            } else if (checkStartAttempts >= maxCheckAttempts) {
                clearInterval(checkStartInterval);
                checkStartInterval = null;
                console.error('❌ TIMEOUT: Animazione hero grid non è riuscita ad avviarsi dopo', 
                             (checkStartAttempts * 100) + 'ms');
                console.error('❌ Possibili cause:');
                console.error('   - Canvas con dimensioni 0x0');
                console.error('   - Container parent non trovato o nascosto dal CSS');
                console.error('   - Errore JavaScript che impedisce la creazione della griglia');
                
                console.group('🔍 Debug Info');
                console.log('Canvas width:', canvas.width, 'x height:', canvas.height);
                console.log('Container:', container);
                console.log('Dots array length:', dots.length);
                console.groupEnd();
                
                // 🆕 FIX: Fallback - hide canvas se non funziona
                canvas.style.display = 'none';
                console.log('🛡️ Canvas timeout fallback: hiding element');
            }
        }, 100);
        
        window.heroCanvasCleanup = function() {
            console.log('🧹 Cleanup hero grid...');
            
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
                animationFrameId = null;
            }
            
            if (checkStartInterval) {
                clearInterval(checkStartInterval);
                checkStartInterval = null;
            }
            
            if (ctx && canvas) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            }
            
            mouse.x = -1000;
            mouse.y = -1000;
            
            animationStarted = false;
            checkStartAttempts = 0;
            retryCount = 0;
            
            heroGridInitialized = false;
            
            console.log('✅ Hero grid cleanup completato');
        };
        
        console.log('✅ Hero Grid Canvas inizializzazione completata');
    }
    
});