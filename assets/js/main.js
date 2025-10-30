/**
 * MAIN.JS - Script principale tema
 * Gestisce inizializzazione Swiper slider homepage
 */

// =========================================================================
// ASPETTIAMO CHE IL DOM SIA PRONTO
// =========================================================================

/*
 * PERCHÉ jQuery(document).ready()?
 * - Assicura che l'HTML sia completamente caricato
 * - Swiper ha bisogno degli elementi HTML per inizializzarsi
 * - Se eseguiamo prima, Swiper non trova gli elementi
 */

jQuery(document).ready(function($) {
    
    // =====================================================================
    // VERIFICHIAMO CHE SWIPER SIA CARICATO
    // =====================================================================
    
    /*
     * typeof Swiper !== 'undefined'
     * 
     * PERCHÉ questo check?
     * - Verifica che la libreria Swiper sia stata caricata
     * - Se manca, evitiamo errori JavaScript
     * - Sicurezza: non tutto va sempre come previsto
     */
    
    if (typeof Swiper !== 'undefined') {
        
        // =================================================================
        // INIZIALIZZIAMO LO SWIPER NEWS
        // =================================================================
        
        /*
         * new Swiper('.news-swiper', {...})
         * 
         * COSA FA?
         * - Cerca l'elemento con classe .news-swiper
         * - Lo trasforma in uno slider interattivo
         * - Applica tutte le configurazioni che passiamo
         */
        
        const newsSwiper = new Swiper('.news-swiper', {
            
            // =============================================================
            // CONFIGURAZIONE BASE
            // =============================================================
            
            /*
             * slidesPerView: 1
             * MOBILE FIRST - Partiamo da 1 slide visibile
             */
            slidesPerView: 1,
            
            /*
             * spaceBetween: 24
             * GAP tra le slide in pixel
             * 24px = var(--space-md) dal tuo design system
             */
            spaceBetween: 24,
            
            /*
             * loop: true
             * Slider infinito - torna all'inizio dopo l'ultima slide
             * UX migliore: non serve tornare indietro manualmente
             */
            loop: true,
            
            /*
             * centeredSlides: false
             * Su mobile non centriamo (slide occupa tutta la larghezza)
             * Su desktop centreremo per effetto visivo migliore
             */
            centeredSlides: false,
            
            // =============================================================
            // AUTOPLAY - Scorrimento automatico
            // =============================================================
            
            autoplay: {
                /*
                 * delay: 5000
                 * Aspetta 5 secondi prima di passare alla slide successiva
                 * 
                 * PERCHÉ 5000ms?
                 * - Abbastanza per leggere titolo + excerpt
                 * - Non troppo lento (utente si annoia)
                 * - Non troppo veloce (utente non fa in tempo)
                 */
                delay: 5000,
                
                /*
                 * disableOnInteraction: false
                 * Autoplay continua anche dopo che l'utente usa i controlli
                 * 
                 * PERCHÉ false?
                 * - UX migliore: slider riprende dopo interazione
                 * - Utente può navigare manualmente senza bloccare autoplay
                 */
                disableOnInteraction: false,
            },
            
            // =============================================================
            // VELOCITÀ E ANIMAZIONI
            // =============================================================
            
            /*
             * speed: 600
             * Durata transizione tra slide in millisecondi
             * 
             * PERCHÉ 600ms?
             * - Fluido ma non troppo lento
             * - Coerente con var(--transition-normal) del tuo CSS
             */
            speed: 600,
            
            /*
             * effect: 'slide'
             * Tipo di transizione: slide (scorrimento orizzontale)
             * 
             * Altre opzioni: 'fade', 'cube', 'flip'
             * Ma 'slide' è il più performante e pulito
             */
            effect: 'slide',
            
            // =============================================================
            // NAVIGAZIONE - Frecce
            // =============================================================
            
            navigation: {
                /*
                 * nextEl, prevEl
                 * Collega i div HTML ai controlli Swiper
                 * 
                 * Swiper popola questi elementi con le icone freccia
                 */
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            
            // =============================================================
            // PAGINAZIONE - Pallini
            // =============================================================
            
            pagination: {
                /*
                 * el: '.swiper-pagination'
                 * Dove mostrare i pallini indicatori
                 */
                el: '.swiper-pagination',
                
                /*
                 * clickable: true
                 * Pallini cliccabili per saltare direttamente a una slide
                 * 
                 * UX: utente può navigare rapidamente
                 */
                clickable: true,
                
                /*
                 * dynamicBullets: true
                 * Mostra solo alcuni pallini alla volta (su tanti slide)
                 * 
                 * PERCHÉ utile?
                 * - Con 6 news, evita 6 pallini troppo affollati
                 * - Mostra solo quelli vicini alla slide corrente
                 */
                dynamicBullets: true,
            },
            
            // =============================================================
            // BREAKPOINTS - Responsive behavior
            // =============================================================
            
            /*
             * QUESTA È LA PARTE FONDAMENTALE!
             * 
             * Definisce quante slide mostrare a diverse larghezze schermo
             * Mobile-first: partiamo da 1 slide, poi aggiungiamo
             */
            
            breakpoints: {
                
                // =========================================================
                // TABLET - 768px e oltre
                // =========================================================
                768: {
                    /*
                     * 2 slide visibili su tablet
                     * 
                     * PERCHÉ 2?
                     * - Spazio medio: bilanciamento perfetto
                     * - Permette confronto tra 2 news
                     * - Non troppo affollato
                     */
                    slidesPerView: 2,
                    
                    /*
                     * spaceBetween: 32
                     * Gap più largo su tablet (32px = var(--space-lg))
                     * 
                     * PERCHÉ più largo?
                     * - Più spazio disponibile
                     * - Migliore separazione visiva
                     */
                    spaceBetween: 32,
                    
                    /*
                     * centeredSlides: false
                     * Non centriamo su tablet
                     */
                    centeredSlides: false,
                },
                
                // =========================================================
                // DESKTOP - 1024px e oltre
                // =========================================================
                1024: {
                    /*
                     * 3 slide visibili su desktop
                     * 
                     * PERCHÉ 3?
                     * - Sfrutta larghezza schermo grande
                     * - Mostra più contenuto senza affollare
                     * - Standard per slider desktop (2-4 slide)
                     */
                    slidesPerView: 3,
                    
                    /*
                     * spaceBetween: 40
                     * Gap ancora più largo (40px)
                     * 
                     * PERCHÉ?
                     * - Desktop ha più spazio
                     * - Card ben separate = più facili da distinguere
                     */
                    spaceBetween: 40,
                    
                    /*
                     * centeredSlides: false
                     * Allineamento a sinistra su desktop
                     */
                    centeredSlides: false,
                },
                
                // =========================================================
                // DESKTOP LARGE - 1290px e oltre (max container)
                // =========================================================
                1290: {
                    /*
                     * Configurazione uguale a 1024px
                     * Ma definiamo esplicitamente per eventuali future modifiche
                     */
                    slidesPerView: 3,
                    spaceBetween: 48,
                    centeredSlides: false,
                },
            },
            
            // =============================================================
            // ACCESSIBILITÀ
            // =============================================================
            
            /*
             * a11y (accessibility)
             * Miglioramenti per screen reader e navigazione da tastiera
             */
            a11y: {
                prevSlideMessage: 'Slide precedente',
                nextSlideMessage: 'Slide successiva',
                firstSlideMessage: 'Prima slide',
                lastSlideMessage: 'Ultima slide',
                paginationBulletMessage: 'Vai alla slide {{index}}',
            },
            
            // =============================================================
            // KEYBOARD - Navigazione da tastiera
            // =============================================================
            
            keyboard: {
                /*
                 * enabled: true
                 * Permette navigazione con frecce tastiera
                 * 
                 * ACCESSIBILITÀ: utenti senza mouse possono navigare
                 */
                enabled: true,
                
                /*
                 * onlyInViewport: true
                 * Tastiera attiva solo se slider visibile
                 * 
                 * PERCHÉ?
                 * - Evita conflitti se hai più slider nella pagina
                 * - Non cattura eventi quando utente scrolla oltre
                 */
                onlyInViewport: true,
            },
            
            // =============================================================
            // GRAB CURSOR - Cursore interattivo
            // =============================================================
            
            /*
             * grabCursor: true
             * Mostra cursore "mano" quando si passa sopra lo slider
             * 
             * UX: indica visivamente che è trascinabile
             */
            grabCursor: true,
            
        }); // Fine configurazione Swiper
        
        // =================================================================
        // DEBUG - Console log per sviluppatori
        // =================================================================
        
        /*
         * PERCHÉ questo log?
         * - Conferma che Swiper è stato inizializzato
         * - Utile per debugging durante sviluppo
         * - Puoi rimuoverlo in produzione
         */
        console.log('✅ News Swiper inizializzato con successo');
        
    } else {
        
        // =================================================================
        // ERRORE - Swiper non caricato
        // =================================================================
        
        /*
         * Se Swiper non è disponibile, logghiamo errore
         * 
         * POSSIBILI CAUSE:
         * - CDN non raggiungibile
         * - functions.php non carica Swiper
         * - Conflitti con altri script
         */
        console.error('❌ Swiper non è stato caricato. Verifica functions.php');
    }
    
}); // Fine jQuery ready