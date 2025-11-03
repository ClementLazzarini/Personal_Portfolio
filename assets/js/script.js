document.addEventListener('DOMContentLoaded', () => {
    // =======================================================
    // 1. Gestion de la navbar active au scroll
    // =======================================================

    const navLinks = document.querySelectorAll('.bottom-navbar .nav-link');
    const sections = document.querySelectorAll('header[id], section[id]');

    const updateActiveNavLink = () => {
        let currentActiveSectionId = null;
        const scrollPosition = window.scrollY; // Position actuelle de défilement

        // Parcourir les sections pour trouver celle qui est la plus visible
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            // La section est considérée comme active si son début est passé
            // et que sa fin n'est pas encore atteinte, avec une marge.
            // Ajustez l'offset (ex: 150px) si l'activation est trop tôt/tard.
            if (scrollPosition >= sectionTop - 150 && scrollPosition < sectionTop + sectionHeight - 150) {
                currentActiveSectionId = section.id;
            }
        });

        // Si aucune section n'est active (par exemple, tout en haut avant la première section),
        // activer le lien de la première section par défaut.
        if (!currentActiveSectionId && sections.length > 0) {
            currentActiveSectionId = sections[0].id; // La première section du document
        }

        // Mettre à jour la classe 'active' sur les liens de la navbar
        navLinks.forEach(link => {
            link.classList.remove('active');
            // Compare l'ID de la section visible avec le 'href' du lien
            if (link.getAttribute('href').substring(1) === currentActiveSectionId) {
                link.classList.add('active');
            }
        });
    };

    // Attacher les écouteurs d'événements
    window.addEventListener('scroll', updateActiveNavLink);
    window.addEventListener('load', updateActiveNavLink); // Important pour l'état initial au chargement

    // Gestion des clics sur les liens de la navbar pour un défilement doux
    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            // Pas besoin de preventDefault() si scroll-behavior: smooth est déjà dans le CSS
            // et que les href pointent vers les ID des sections.
            // Si vous avez des problèmes de défilement, décommentez ceci :
            // event.preventDefault();
            // const targetId = link.getAttribute('href').substring(1);
            // document.getElementById(targetId).scrollIntoView({ behavior: 'smooth' });

            // Met à jour la classe active immédiatement au clic pour une meilleure UX
            navLinks.forEach(nav => nav.classList.remove('active'));
            link.classList.add('active');
        });
    });

    // =======================================================
    // 2. Gestion du formulaire de contact avec EmailJS
    // (avec champ "honeypot" pour réduire le spam)
    // =======================================================
    const contactForm = document.getElementById('contactForm');
    const formMessages = document.getElementById('form-messages');
    const sendButton = document.querySelector('.send-message-button');
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();

        sendButton.disabled = true;
        formMessages.textContent = 'Envoie en cours...';
        formMessages.style.color = '#FFA500';

        // ============================================
        // HONEYPOT CHECK
        // ============================================
        const honeypot = document.getElementById('website').value;
        if (honeypot !== '') {
            // Si le champ honeypot est rempli, c'est probablement un bot
            console.warn('Spam détecté via le champ honeypot.');
            setTimeout(() => {
                formMessages.textContent = 'Votre message a été envoyé avec succès !';
                formMessages.style.color = '#4CAF50';
                contactForm.reset();
                sendButton.disabled = false;
            }, 1000); // Simule un délai d'envoi

            return; // Ne pas continuer avec l'envoi réel
        }
        
        // Récupérer les valeurs des champs du formulaire
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;

        // Configuration du service EmailJS
        emailjs.init('UaKKY6fywjdxH9m9R');
        
        // Envoi de l'e-mail
        const templateParams = {
            to_name: 'Votre Nom',
            from_name: name,
            from_email: email,
            firstname: name,
            lastname: name,
            subject: subject,
            message: message
        };

        const serviceID = 'service_k7boed8'; 
        const templateID = 'template_s013tj7';

        formMessages.textContent = 'Envoi en cours...';
        formMessages.style.color = '#FFA500';
        
        emailjs.send(serviceID, templateID, templateParams)
            .then(() => {
                formMessages.textContent = 'Votre message a été envoyé avec succès !';
                formMessages.style.color = '#4CAF50';
                contactForm.reset();
            }, (error) => {
                formMessages.textContent = 'Erreur lors de l\'envoi du message : ' + error.text;
                formMessages.style.color = '#FF0000';
                console.error('Erreur EmailJS :', error);
            });
    });


    // =======================================================
    // 3. Gestion de l'indicateur de swipe pour les cartes (points)
    // =======================================================

    const priceCardsContainer = document.querySelector('.price-cards-container');
    const dots = document.querySelectorAll('.swipe-indicator .dot');

    if (priceCardsContainer && dots.length > 0) {
        const updateDots = () => {
            const scrollLeft = priceCardsContainer.scrollLeft;
            // Récupère la première carte pour connaître sa largeur
            const firstCard = priceCardsContainer.querySelector('.price-card');
            if (!firstCard) return; // S'assurer qu'une carte existe

            // La largeur de la carte PLUS le gap s'il est appliqué par CSS flexbox.
            // Si le gap est un style sur .price-cards-container, cardWidthOffset devrait l'inclure.
            // Une manière plus robuste est de prendre la largeur totale (offset + margin/gap)
            // ou de calculer le pas de défilement si scroll-snap-align: center est utilisé.
            
            // Pour scroll-snap-align: center, la position 0 est le centre de la première carte.
            // La position cardWidth est le centre de la deuxième, etc.
            const cardWidthWithGap = firstCard.offsetWidth + parseFloat(getComputedStyle(priceCardsContainer).gap);
            // Utilisez la largeur réelle de défilement par item.
            // Ici, on va arrondir à l'entier le plus proche pour gérer le "snap".
            
            let activeIndex = Math.round(scrollLeft / cardWidthWithGap);
            
            // S'assurer que l'index ne dépasse pas le nombre de points disponibles
            activeIndex = Math.max(0, Math.min(activeIndex, dots.length - 1));

            dots.forEach((dot, index) => {
                if (index === activeIndex) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        };

        // Met à jour les points au défilement du conteneur
        priceCardsContainer.addEventListener('scroll', updateDots);
        // Met à jour au chargement initial pour que le premier dot soit actif
        updateDots();
    }
});