/**
 * MAIN.JS - Portfolio JavaScript
 * Vanilla JavaScript per performance ottimali
 * 
 * Funzionalità:
 * - Swiper News Slider (homepage)
 * - Canvas Grid Interattivo (hero section)
 */

document.addEventListener('DOMContentLoaded', function() {
    
    console.log('🚀 Portfolio JS inizializzato');
    
    // Inizializza tutte le funzionalità
    initSwiperNewsSlider();
    initHeroGridCanvas();
    
    // =========================================================================
    // SWIPER NEWS SLIDER - Codice esistente che funziona
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
    // HERO GRID CANVAS - Griglia interattiva che reagisce al cursore
    // =========================================================================
    
    function initHeroGridCanvas() {
        
        // Verifica che siamo su homepage
        if (!document.body.classList.contains('home')) {
            console.log('ℹ️ Hero grid: non siamo sulla homepage');
            return;
        }
        
        // Verifica che siamo su desktop (no senso su mobile senza cursor)
        if (window.innerWidth <= 1024) {
            console.log('ℹ️ Hero grid: dispositivo mobile/tablet rilevato, skip canvas');
            return;
        }
        
        const canvas = document.getElementById('hero-grid-canvas');
        if (!canvas) {
            console.log('⚠️ Hero grid: canvas element non trovato');
            return;
        }
        
        // IMPORTANTE: Prendiamo il container parent per ascoltare gli eventi
        // Il canvas ha pointer-events: none per non bloccare click sui bottoni
        // quindi ascoltiamo sul parent e convertiamo le coordinate
        const container = canvas.parentElement;
        if (!container) {
            console.log('⚠️ Hero grid: container parent non trovato');
            return;
        }
        
        console.log('✅ Inizializzazione Hero Grid Canvas...');
        
        const ctx = canvas.getContext('2d');
        
        // Setup dimensioni canvas - deve riempire la hero section
        function resizeCanvas() {
            canvas.width = container.offsetWidth;
            canvas.height = container.offsetHeight;
            // Quando ridimensioniamo, ricreiamo la griglia per adattarla
            createGrid();
        }
        
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        
        // CONFIGURAZIONE GRIGLIA - Parametri che definiscono aspetto e comportamento
        const config = {
            spacing: 25,              // Pixel tra ogni punto (25px = griglia bilanciata)
            dotRadius: 2,             // Raggio punto base in pixel (2px = sottile)
            dotRadiusHover: 5,        // Raggio massimo quando illuminato (5px = visibile)
            baseOpacity: 0.2,         // Opacità base punti (0.2 = molto trasparente)
            hoverOpacity: 0.8,        // Opacità massima quando illuminato (0.8 = molto visibile)
            influenceRadius: 200,     // Raggio di influenza cursore in pixel (200px = area media)
            smoothing: 0.1,           // Fattore smoothing per easing (0.1 = transizione fluida)
            color: 'rgb(255, 255, 255)' // Colore punti (bianco)
        };
        
        // Posizione cursore - tracciamo dove si muove il mouse
        const mouse = {
            x: -1000, // Inizia fuori schermo così non illumina nulla all'inizio
            y: -1000
        };
        
        // Array che contiene tutti i punti della griglia
        let dots = [];
        
        // CREAZIONE GRIGLIA - Genera array di punti con posizioni fisse
        function createGrid() {
            dots = []; // Reset array
            
            // Calcola quanti punti entrano in larghezza e altezza
            const cols = Math.floor(canvas.width / config.spacing);
            const rows = Math.floor(canvas.height / config.spacing);
            
            // Calcola offset per centrare la griglia nel canvas
            const offsetX = (canvas.width - (cols * config.spacing)) / 2;
            const offsetY = (canvas.height - (rows * config.spacing)) / 2;
            
            // Genera i punti - doppio loop per creare griglia 2D
            for (let i = 0; i < cols; i++) {
                for (let j = 0; j < rows; j++) {
                    dots.push({
                        x: offsetX + (i * config.spacing),  // Posizione X fissa
                        y: offsetY + (j * config.spacing),  // Posizione Y fissa
                        currentRadius: config.dotRadius,    // Raggio corrente (animato)
                        currentOpacity: config.baseOpacity, // Opacità corrente (animata)
                        targetRadius: config.dotRadius,     // Target verso cui animare
                        targetOpacity: config.baseOpacity   // Target opacità
                    });
                }
            }
            
            console.log(`✅ Griglia creata: ${dots.length} punti (${cols}x${rows})`);
        }
        
        createGrid();
        
        // TRACKING CURSORE - Ascoltiamo sul CONTAINER, non sul canvas
        // Questo funziona anche con pointer-events: none sul canvas
        container.addEventListener('mousemove', function(e) {
            // getBoundingClientRect ci dà la posizione del container nella viewport
            const rect = container.getBoundingClientRect();
            
            // Convertiamo le coordinate del mouse in coordinate relative al container
            // e.clientX è la posizione X del mouse nella viewport
            // rect.left è la distanza del container dal bordo sinistro della viewport
            // La differenza ci dà la posizione X del mouse dentro il container
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
            
            // Debug: togli il commento se vuoi vedere le coordinate nella console
            // console.log(`Mouse: ${Math.round(mouse.x)}, ${Math.round(mouse.y)}`);
        });
        
        // Quando cursore esce dal container, reset posizione lontano
        // Questo fa tornare tutti i punti allo stato normale
        container.addEventListener('mouseleave', function() {
            mouse.x = -1000;
            mouse.y = -1000;
        });
        
        // ANIMAZIONE LOOP - Viene chiamata 30 volte al secondo
        function animate() {
            // Pulisci canvas (rimuovi frame precedente)
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Processa ogni punto della griglia
            dots.forEach(dot => {
                
                // Calcola distanza tra cursore e punto corrente
                // Usiamo distanza al quadrato per evitare Math.sqrt (operazione costosa)
                const dx = mouse.x - dot.x;
                const dy = mouse.y - dot.y;
                const distanceSquared = dx * dx + dy * dy;
                
                // Raggio di influenza al quadrato (per confronto con distanceSquared)
                const influenceRadiusSquared = config.influenceRadius * config.influenceRadius;
                
                // Se punto è dentro raggio di influenza, calcoliamone l'intensità
                if (distanceSquared < influenceRadiusSquared) {
                    // Ora calcoliamo la distanza reale (ci serve per l'intensità)
                    const distance = Math.sqrt(distanceSquared);
                    
                    // Intensità da 0 a 1 basata su quanto è vicino il cursore
                    // 0 = sul bordo del raggio, 1 = esattamente sotto cursore
                    const intensity = 1 - (distance / config.influenceRadius);
                    
                    // Imposta target in base a intensità
                    // Più il cursore è vicino, più il punto diventa grande e luminoso
                    dot.targetRadius = config.dotRadius + ((config.dotRadiusHover - config.dotRadius) * intensity);
                    dot.targetOpacity = config.baseOpacity + ((config.hoverOpacity - config.baseOpacity) * intensity);
                    
                } else {
                    // Punto fuori dal raggio di influenza - torna a valori base
                    dot.targetRadius = config.dotRadius;
                    dot.targetOpacity = config.baseOpacity;
                }
                
                // EASING SMOOTH - Interpola valori correnti verso target
                // Invece di jump istantaneo, ci muoviamo del 10% della distanza ogni frame
                // Questo crea una transizione fluida e naturale
                dot.currentRadius += (dot.targetRadius - dot.currentRadius) * config.smoothing;
                dot.currentOpacity += (dot.targetOpacity - dot.currentOpacity) * config.smoothing;
                
                // DISEGNA PUNTO - Crea cerchio sulla posizione del punto
                ctx.beginPath();
                ctx.arc(dot.x, dot.y, dot.currentRadius, 0, Math.PI * 2);
                ctx.fillStyle = config.color;
                ctx.globalAlpha = dot.currentOpacity;
                ctx.fill();
            });
            
            // Reset globalAlpha per non influenzare altri disegni futuri
            ctx.globalAlpha = 1;
        }
        
        // START ANIMATION LOOP - 30 FPS per performance ottimale
        // Non usiamo 60fps perché per questo tipo di animazione ambientale
        // 30fps è più che sufficiente e dimezza il carico sulla CPU
        let animationFrameId;
        let lastTime = 0;
        const fps = 30;
        const interval = 1000 / fps;
        
        function loop(currentTime) {
            animationFrameId = requestAnimationFrame(loop);
            
            const deltaTime = currentTime - lastTime;
            
            // Esegui animate() solo ogni 33ms (30fps)
            if (deltaTime > interval) {
                lastTime = currentTime - (deltaTime % interval);
                animate();
            }
        }
        
        loop(0);
        
        console.log('✅ Hero Grid Canvas animazione attiva (30 FPS)');
        
        // Cleanup quando pagina viene scaricata
        // Fermiamo l'animation loop per liberare risorse
        window.addEventListener('beforeunload', function() {
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
            }
        });
    }
    
});