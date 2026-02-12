/**
 * 1. GESTION DE LA NAVBAR AU SCROLL
 */
function initNavbarScroll() {
    const navLinks = document.querySelectorAll('.bottom-navbar .nav-link');
    const sections = document.querySelectorAll('header[id], section[id]');

    // Sécurité : s'il n'y a pas de liens ou de sections, on arrête
    if (navLinks.length === 0 || sections.length === 0) return;

    const updateActiveNavLink = () => {
        let currentActiveSectionId = null;
        const scrollPosition = window.scrollY;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (scrollPosition >= sectionTop - 150 && scrollPosition < sectionTop + sectionHeight - 150) {
                currentActiveSectionId = section.id;
            }
        });

        if (!currentActiveSectionId && sections.length > 0) {
            currentActiveSectionId = sections[0].id;
        }

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === currentActiveSectionId) {
                link.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', updateActiveNavLink);
    window.addEventListener('load', updateActiveNavLink);

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.forEach(nav => nav.classList.remove('active'));
            link.classList.add('active');
        });
    });
}

/**
 * 2. GESTION DU FORMULAIRE DE CONTACT
 */
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    // Sécurité : Si le formulaire n'est pas sur cette page, on arrête la fonction ici
    if (!contactForm) return;

    const formMessages = document.getElementById('form-messages');
    const sendButton = document.querySelector('.send-message-button'); // Assure-toi que cette classe existe

    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();

        // Vérification de sécurité pour le bouton
        if (sendButton) sendButton.disabled = true;
        
        if (formMessages) {
            formMessages.textContent = 'Envoi en cours...';
            formMessages.style.color = '#FFA500';
        }

        // HONEYPOT CHECK
        const honeypot = document.getElementById('website');
        if (honeypot && honeypot.value !== '') {
            console.warn('Spam détecté.');
            setTimeout(() => {
                if (formMessages) {
                    formMessages.textContent = 'Votre message a été envoyé avec succès !';
                    formMessages.style.color = '#4CAF50';
                }
                contactForm.reset();
                if (sendButton) sendButton.disabled = false;
            }, 1000);
            return;
        }

        // Récupération des champs
        const nameField = document.getElementById('name');
        const emailField = document.getElementById('email');
        const subjectField = document.getElementById('subject');
        const messageField = document.getElementById('message');

        const templateParams = {
            to_name: 'Clément', // Ton prénom
            from_name: nameField ? nameField.value : '',
            from_email: emailField ? emailField.value : '',
            subject: subjectField ? subjectField.value : '',
            message: messageField ? messageField.value : ''
        };

        // Assure-toi que EmailJS est bien chargé dans le HTML avant ce script
        if (typeof emailjs !== 'undefined') {
            emailjs.init('UaKKY6fywjdxH9m9R');
            
            emailjs.send('service_k7boed8', 'template_s013tj7', templateParams)
                .then(() => {
                    if (formMessages) {
                        formMessages.textContent = 'Votre message a été envoyé avec succès !';
                        formMessages.style.color = '#4CAF50';
                    }
                    contactForm.reset();
                    if (sendButton) sendButton.disabled = false;
                }, (error) => {
                    if (formMessages) {
                        formMessages.textContent = 'Erreur : ' + error.text;
                        formMessages.style.color = '#FF0000';
                    }
                    console.error('Erreur EmailJS :', error);
                    if (sendButton) sendButton.disabled = false;
                });
        } else {
            console.error('La librairie EmailJS n\'est pas chargée.');
        }
    });
}

/**
 * 3. GESTION DES INDICATEURS DE SWIPE (Carousel prix)
 */
function initSwipeIndicators() {
    const priceCardsContainer = document.querySelector('.price-cards-container');
    const dots = document.querySelectorAll('.swipe-indicator .dot');

    // Sécurité : Si pas de container, on arrête
    if (!priceCardsContainer || dots.length === 0) return;

    const updateDots = () => {
        const firstCard = priceCardsContainer.querySelector('.price-card');
        if (!firstCard) return;

        const cardWidthWithGap = firstCard.offsetWidth + parseFloat(getComputedStyle(priceCardsContainer).gap || '0');
        
        let activeIndex = Math.round(priceCardsContainer.scrollLeft / cardWidthWithGap);
        activeIndex = Math.max(0, Math.min(activeIndex, dots.length - 1));

        dots.forEach((dot, index) => {
            if (index === activeIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    };

    priceCardsContainer.addEventListener('scroll', updateDots);
    updateDots(); // Init
}

/**
 * 4. GESTION DU THÈME (DARK/LIGHT)
 */
function initTheme() {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const darkIcon = document.getElementById('theme-toggle-dark-icon');
    const lightIcon = document.getElementById('theme-toggle-light-icon');

    // Sécurité : Si le bouton n'existe pas (ex: page sans header standard), on arrête
    if (!themeToggleBtn) return;

    // Vérification initiale
    if (localStorage.getItem('color-theme') === 'dark' || 
        (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
        lightIcon?.classList.remove('hidden');
    } else {
        document.documentElement.classList.remove('dark');
        darkIcon?.classList.remove('hidden');
    }

    // Écouteur de clic
    themeToggleBtn.addEventListener('click', function() {
        darkIcon?.classList.toggle('hidden');
        lightIcon?.classList.toggle('hidden');

        if (localStorage.getItem('color-theme')) {
            if (localStorage.getItem('color-theme') === 'light') {
                document.documentElement.classList.add('dark');
                localStorage.setItem('color-theme', 'dark');
            } else {
                document.documentElement.classList.remove('dark');
                localStorage.setItem('color-theme', 'light');
            }
        } else {
            if (document.documentElement.classList.contains('dark')) {
                document.documentElement.classList.remove('dark');
                localStorage.setItem('color-theme', 'light');
            } else {
                document.documentElement.classList.add('dark');
                localStorage.setItem('color-theme', 'dark');
            }
        }
    });
}

/**
 * 5. FILTRAGE DES PROJETS
 */
function initProjectFilters() {
    const buttons = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.project-card');

    // Sécurité : Si pas de boutons de filtre, on arrête
    if (buttons.length === 0) return;

    const activeClasses = ['bg-slate-900', 'dark:bg-white', 'text-white', 'dark:text-slate-900', 'font-bold', 'shadow-lg'];
    const inactiveClasses = ['bg-white', 'dark:bg-slate-800', 'border', 'border-slate-200', 'dark:border-white/10', 'text-slate-600', 'dark:text-slate-300', 'font-medium'];

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.getAttribute('data-filter');

            // Visuel des boutons
            buttons.forEach(b => {
                b.classList.remove(...activeClasses);
                b.classList.add(...inactiveClasses);
            });
            btn.classList.remove(...inactiveClasses);
            btn.classList.add(...activeClasses);

            // Filtrage des cartes
            cards.forEach(card => {
                const category = card.getAttribute('data-category') || '';
                
                if (filter === 'all' || category.includes(filter)) {
                    card.classList.remove('hidden');
                    card.animate([
                        { opacity: 0, transform: 'scale(0.95)' },
                        { opacity: 1, transform: 'scale(1)' }
                    ], { duration: 300, easing: 'ease-out' });
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });
}

/**
 * =======================================================
 * INITIALISATION GLOBALE
 * =======================================================
 */
document.addEventListener('DOMContentLoaded', () => {
    // On lance toutes les fonctions. 
    // Grâce aux vérifications "if (!element) return" au début de chaque fonction,
    // elles ne planteront pas si les éléments sont absents de la page actuelle.
    
    initNavbarScroll();
    initContactForm();
    initSwipeIndicators();
    initTheme();
    initProjectFilters();
});