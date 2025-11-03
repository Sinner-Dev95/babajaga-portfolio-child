/**
 * MAIN.JS - Portfolio JavaScript
 * Vanilla JavaScript per performance ottimali
 * 
 * Funzionalità:
 * - Swiper News Slider (homepage)
 * - Canvas Grid Interattivo (hero section)
 * - Fix race condition canvas dimensioni
 * - Fix memory leak cleanup
 * - Fix navigazione SPA (Single Page App)
 * - Fix re-inizializzazione multipla (Instance Guard)
 */

// 🔒 INSTANCE GUARD GLOBALE
// Questa flag previene che più istanze dell'animazione canvas girino contemporaneamente.
// Deve essere in scope globale (fuori da DOMContentLoaded) così è accessibile da tutte
// le funzioni che devono controllare o modificare lo stato di inizializzazione.
let heroGridInitialized = false;

document.addEventListener('DOMContentLoaded', function() {
    
    console.log('🚀 Portfolio JS inizializzato');
    
    // Inizializza tutte le funzionalità
    initSwiperNewsSlider();
    initHeroGridCanvas();
    
    // =========================================================================
    // GESTIONE EVENTI NAVIGAZIONE SPA
    // Per garantire cleanup corretto quando l'utente naviga via dalla pagina
    // =========================================================================
    
    // 🧹 CLEANUP quando si naviga via dalla pagina
    // L'evento 'pagehide' si triggera quando l'utente lascia la pagina
    // (click su link, back button, chiude tab). È più affidabile di 'beforeunload'
    // per la pulizia delle risorse perché viene sempre triggerato.
    window.addEventListener('pagehide', function() {
        console.log('🧹 Pagina nascosta, cleanup hero grid...');
        if (window.heroCanvasCleanup) {
            window.heroCanvasCleanup();
        }
    });
    
    // 🔄 RE-INIZIALIZZAZIONE quando si torna indietro con il browser
    // L'evento 'pageshow' si triggera quando l'utente torna sulla pagina
    // (back button, forward button, ricarica). Dobbiamo re-inizializzare
    // l'animazione canvas se siamo sulla homepage.
    window.addEventListener('pageshow', function(event) {
        // Verifica che siamo sulla homepage
        if (!document.body.classList.contains('home')) {
            return;
        }
        
        console.log('🔄 Pagina mostrata, re-inizializzazione hero grid...');
        
        // 🔒 GUARD: Se già inizializzato, cleanup istanza precedente
        // Questo può succedere se la navigazione è molto rapida e la cleanup
        // non ha fatto in tempo a completare prima del pageshow
        if (heroGridInitialized) {
            console.log('🔒 Instance guard: cleanup istanza precedente prima di re-init...');
            if (window.heroCanvasCleanup) {
                window.heroCanvasCleanup();
            }
        }
        
        // Re-inizializza con un piccolo delay per dare tempo al browser
        // di completare il rendering della pagina. 200ms è un buon compromesso:
        // abbastanza lungo da evitare race condition, abbastanza breve da non
        // essere percepibile dall'utente.
        setTimeout(function() {
            initHeroGridCanvas();
        }, 200);
    });
    
    // =========================================================================
    // SWIPER NEWS SLIDER - Funzionalità esistente e stabile
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
        
        // 🔒 INSTANCE GUARD - Prima cosa da controllare
        // Previene che più istanze dell'animazione girino contemporaneamente.
        // Se la flag è true, significa che c'è già un'istanza attiva, quindi
        // usciamo immediatamente senza fare nulla.
        if (heroGridInitialized) {
            console.log('🔒 Hero grid già inizializzata, skipping...');
            return;
        }
        
        console.log('🔄 Starting fresh hero grid initialization...');
        
        // =====================================================================
        // VALIDAZIONE PREREQUISITI
        // Verifichiamo che tutte le condizioni necessarie siano soddisfatte
        // prima di procedere con l'inizializzazione
        // =====================================================================
        
        // CHECK 1: Verifica che siamo su homepage
        // L'animazione canvas è specifica per la hero section della homepage
        if (!document.body.classList.contains('home')) {
            console.log('ℹ️ Hero grid: non siamo sulla homepage');
            return;
        }
        
        // CHECK 2: Verifica che siamo su desktop
        // Su mobile/tablet non ha senso avere un'animazione che reagisce al cursore
        // perché non c'è un cursore - c'è solo il touch. Risparmiamo risorse.
        if (window.innerWidth <= 1024) {
            console.log('ℹ️ Hero grid: dispositivo mobile/tablet rilevato, skip canvas');
            return;
        }
        
        // CHECK 3: Verifica che l'elemento canvas esista nel DOM
        const canvas = document.getElementById('hero-grid-canvas');
        if (!canvas) {
            console.log('⚠️ Hero grid: canvas element non trovato');
            return;
        }
        
        // CHECK 4: Verifica che il container parent esista
        // Abbiamo bisogno del container per ascoltare gli eventi del mouse,
        // perché il canvas ha pointer-events: none per non bloccare i click
        // sui bottoni della hero section
        const container = canvas.parentElement;
        if (!container) {
            console.log('⚠️ Hero grid: container parent non trovato');
            return;
        }
        
        // ✅ TUTTI I CHECK PASSATI - Settiamo la flag SUBITO
        // CRITICO: Settiamo la flag QUI, non alla fine della funzione.
        // Questo previene che due inizializzazioni partano quasi contemporaneamente
        // in scenari di navigazione rapida (l'utente clicca back velocemente).
        // Anche se questa inizializzazione non è ancora completa, la seconda
        // verrà bloccata dall'instance guard sopra.
        heroGridInitialized = true;
        
        console.log('✅ Hero Grid Canvas: prerequisiti verificati, starting init...');
        
        // =====================================================================
        // SETUP CANVAS E CONFIGURAZIONE
        // =====================================================================
        
        const ctx = canvas.getContext('2d');
        
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
        
        // Variabili per gestire animazione e cleanup
        // Devono essere in scope della closure così la cleanup function può accedervi
        let animationFrameId = null;
        let checkStartInterval = null;
        let retryCount = 0;
        const maxRetries = 10;
        
        // =====================================================================
        // RESIZE CANVAS - FIX RACE CONDITION
        // Sistema robusto per ottenere dimensioni corrette anche se il browser
        // non ha ancora finito di calcolare il layout CSS
        // =====================================================================
        
        function resizeCanvas() {
            // STRATEGIA MULTIPLA per garantire dimensioni corrette
            // Proviamo 3 metodi diversi in ordine di affidabilità
            
            // METODO 1: getBoundingClientRect() - Più affidabile, forza un reflow
            const rect = container.getBoundingClientRect();
            let width = rect.width;
            let height = rect.height;
            
            // FALLBACK 1: offsetWidth/Height - Legge proprietà cached
            if (width === 0 || height === 0) {
                console.log('⚠️ getBoundingClientRect() ritorna zero, fallback a offsetWidth/Height');
                width = container.offsetWidth;
                height = container.offsetHeight;
            }
            
            // FALLBACK 2: Dimensioni viewport - Ultima spiaggia
            if (width === 0 || height === 0) {
                console.log('⚠️ offsetWidth/Height ritorna zero, fallback a viewport dimensions');
                width = window.innerWidth;
                height = window.innerHeight * 0.8; // 80% altezza viewport come stima
            }
            
            // Applica dimensioni al canvas
            canvas.width = width;
            canvas.height = height;
            
            console.log(`📐 Canvas dimensions: ${width}x${height} (attempt ${retryCount + 1}/${maxRetries})`);
            
            // Se abbiamo dimensioni valide, crea la griglia
            if (width > 0 && height > 0) {
                createGrid();
            } else {
                // Se ancora zero, retry con backoff
                retryCount++;
                if (retryCount < maxRetries) {
                    console.log(`⏳ Retry attempt ${retryCount + 1} in 50ms...`);
                    setTimeout(resizeCanvas, 50);
                } else {
                    console.error('❌ Failed to get canvas dimensions after all retries');
                }
            }
        }
        
        // Esegui resize con un piccolo delay per dare tempo al browser
        // di completare il rendering CSS. 100ms è sufficiente nella maggior
        // parte dei casi, e il retry interno gestisce i casi più lenti.
        setTimeout(resizeCanvas, 100);
        
        // Gestione resize della finestra con debouncing
        // Quando l'utente ridimensiona la finestra, aspettiamo che finisca
        // di ridimensionare prima di ricalcolare la griglia (altrimenti
        // faremmo centinaia di ricalcoli inutili durante il resize)
        let resizeTimeout;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(resizeCanvas, 100);
        });
        
        // =====================================================================
        // CREAZIONE GRIGLIA
        // Genera array di punti con posizioni fisse disposte in griglia uniforme
        // =====================================================================
        
        function createGrid() {
            dots = []; // Reset array per evitare accumulo in caso di re-init
            
            // Calcola quanti punti entrano in larghezza e altezza
            // Math.floor garantisce numero intero di punti
            const cols = Math.floor(canvas.width / config.spacing);
            const rows = Math.floor(canvas.height / config.spacing);
            
            // Calcola offset per centrare la griglia nel canvas
            // Questo rende la griglia simmetrica e bilanciata visivamente
            const offsetX = (canvas.width - (cols * config.spacing)) / 2;
            const offsetY = (canvas.height - (rows * config.spacing)) / 2;
            
            // Genera i punti - doppio loop per creare griglia 2D
            for (let i = 0; i < cols; i++) {
                for (let j = 0; j < rows; j++) {
                    dots.push({
                        x: offsetX + (i * config.spacing),  // Posizione X fissa
                        y: offsetY + (j * config.spacing),  // Posizione Y fissa
                        currentRadius: config.dotRadius,    // Raggio corrente (sarà animato)
                        currentOpacity: config.baseOpacity, // Opacità corrente (sarà animata)
                        targetRadius: config.dotRadius,     // Target verso cui animare il raggio
                        targetOpacity: config.baseOpacity   // Target verso cui animare l'opacità
                    });
                }
            }
            
            console.log(`✅ Griglia creata: ${dots.length} punti (${cols}x${rows})`);
        }
        
        // =====================================================================
        // TRACKING CURSORE
        // Ascoltiamo eventi mouse sul CONTAINER, non sul canvas, perché il
        // canvas ha pointer-events: none per non interferire con click su bottoni
        // =====================================================================
        
        container.addEventListener('mousemove', function(e) {
            // getBoundingClientRect() ci dà la posizione del container nella viewport
            const rect = container.getBoundingClientRect();
            
            // Convertiamo coordinate mouse da coordinate viewport a coordinate
            // relative al container
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        });
        
        // Quando cursore esce dal container, reset posizione lontano
        // Questo fa tornare tutti i punti allo stato normale
        container.addEventListener('mouseleave', function() {
            mouse.x = -1000;
            mouse.y = -1000;
        });
        
        // =====================================================================
        // ANIMAZIONE LOOP - 30 FPS
        // =====================================================================
        
        function animate() {
            // Pulisci canvas (rimuovi frame precedente)
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Processa ogni punto della griglia
            dots.forEach(dot => {
                
                // Calcola distanza tra cursore e punto corrente
                // Usiamo distanza al quadrato per evitare Math.sqrt (costosa)
                const dx = mouse.x - dot.x;
                const dy = mouse.y - dot.y;
                const distanceSquared = dx * dx + dy * dy;
                
                // Raggio di influenza al quadrato (per confronto efficiente)
                const influenceRadiusSquared = config.influenceRadius * config.influenceRadius;
                
                // Se punto è dentro raggio di influenza, calcoliamone l'intensità
                if (distanceSquared < influenceRadiusSquared) {
                    // Ora calcoliamo la distanza reale (ci serve per l'intensità)
                    const distance = Math.sqrt(distanceSquared);
                    
                    // Intensità da 0 a 1 basata su quanto è vicino il cursore
                    // 0 = sul bordo del raggio, 1 = esattamente sotto cursore
                    const intensity = 1 - (distance / config.influenceRadius);
                    
                    // Imposta target in base a intensità
                    // Interpolazione lineare tra valori base e valori hover
                    dot.targetRadius = config.dotRadius + ((config.dotRadiusHover - config.dotRadius) * intensity);
                    dot.targetOpacity = config.baseOpacity + ((config.hoverOpacity - config.baseOpacity) * intensity);
                    
                } else {
                    // Punto fuori dal raggio di influenza - torna a valori base
                    dot.targetRadius = config.dotRadius;
                    dot.targetOpacity = config.baseOpacity;
                }
                
                // EASING SMOOTH - Interpola valori correnti verso target
                // Invece di jump istantaneo, ci muoviamo del 10% (config.smoothing)
                // della distanza ogni frame. Questo crea transizione fluida.
                dot.currentRadius += (dot.targetRadius - dot.currentRadius) * config.smoothing;
                dot.currentOpacity += (dot.targetOpacity - dot.currentOpacity) * config.smoothing;
                
                // DISEGNA PUNTO
                ctx.beginPath();
                ctx.arc(dot.x, dot.y, dot.currentRadius, 0, Math.PI * 2);
                ctx.fillStyle = config.color;
                ctx.globalAlpha = dot.currentOpacity;
                ctx.fill();
            });
            
            // Reset globalAlpha per non influenzare disegni futuri
            ctx.globalAlpha = 1;
        }
        
        // =====================================================================
        // START ANIMATION LOOP - 30 FPS
        // Non usiamo 60fps perché per animazione ambientale 30fps è sufficiente
        // e dimezza il carico CPU
        // =====================================================================
        
        let lastTime = 0;
        const fps = 30;
        const interval = 1000 / fps; // ~33ms
        
        function loop(currentTime) {
            animationFrameId = requestAnimationFrame(loop);
            
            const deltaTime = currentTime - lastTime;
            
            // Esegui animate() solo ogni 33ms (30fps)
            if (deltaTime > interval) {
                lastTime = currentTime - (deltaTime % interval);
                animate();
            }
        }
        
        // =====================================================================
        // AVVIO RITARDATO ANIMAZIONE
        // Aspettiamo che la griglia sia effettivamente creata (dots.length > 0)
        // prima di avviare l'animation loop
        // =====================================================================
        
        let animationStarted = false;
        let checkStartAttempts = 0;
        const maxCheckAttempts = 50; // 50 tentativi × 100ms = 5 secondi max
        
        function startAnimation() {
            if (!animationStarted && dots.length > 0) {
                animationStarted = true;
                loop(0);
                console.log('✅ Hero Grid Canvas animazione attiva (30 FPS)');
                return true; // Indica successo
            }
            return false; // Indica che non è ancora pronto
        }
        
        // Controlla periodicamente con TIMEOUT di sicurezza (FIX MEMORY LEAK)
        checkStartInterval = setInterval(function() {
            checkStartAttempts++;
            
            const animationReady = startAnimation();
            
            if (animationReady) {
                // Animazione avviata con successo, ferma il check interval
                clearInterval(checkStartInterval);
                checkStartInterval = null;
                console.log('🎉 Animazione avviata dopo', checkStartAttempts, 'tentativi (', (checkStartAttempts * 100), 'ms)');
            } else if (checkStartAttempts >= maxCheckAttempts) {
                // TIMEOUT DI SICUREZZA - Evita memory leak
                // Dopo 5 secondi, se l'animazione non è partita, fermiamo il check
                clearInterval(checkStartInterval);
                checkStartInterval = null;
                console.error('❌ TIMEOUT: Animazione hero grid non è riuscita ad avviarsi dopo', 
                             (checkStartAttempts * 100) + 'ms');
                console.error('❌ Possibili cause:');
                console.error('   - Canvas con dimensioni 0x0');
                console.error('   - Container parent non trovato o nascosto dal CSS');
                console.error('   - Errore JavaScript che impedisce la creazione della griglia');
                
                // Debug info per troubleshooting
                console.group('🔍 Debug Info');
                console.log('Canvas width:', canvas.width, 'x height:', canvas.height);
                console.log('Container:', container);
                console.log('Dots array length:', dots.length);
                console.groupEnd();
            }
        }, 100); // Controlla ogni 100ms
        
        // =====================================================================
        // CLEANUP FUNCTION GLOBALE
        // Registriamo una funzione globale per pulire tutte le risorse quando
        // l'utente naviga via dalla pagina
        // =====================================================================
        
        window.heroCanvasCleanup = function() {
            console.log('🧹 Cleanup hero grid...');
            
            // Ferma animation loop se attivo
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
                animationFrameId = null;
            }
            
            // Ferma check interval se attivo
            if (checkStartInterval) {
                clearInterval(checkStartInterval);
                checkStartInterval = null;
            }
            
            // Pulisci canvas
            if (ctx && canvas) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            }
            
            // Reset mouse position
            mouse.x = -1000;
            mouse.y = -1000;
            
            // Reset contatori e flag
            animationStarted = false;
            checkStartAttempts = 0;
            retryCount = 0;
            
            // 🔒 RESET INSTANCE GUARD
            // Questo permette una nuova inizializzazione pulita dopo la cleanup
            heroGridInitialized = false;
            
            console.log('✅ Hero grid cleanup completato');
        };
        
        console.log('✅ Hero Grid Canvas inizializzazione completata');
    }
    
});