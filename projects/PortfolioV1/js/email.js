document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();

    document.querySelector('.btn-envoi').disabled = true;
    
    // Récupérer les valeurs des champs du formulaire
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    const firstname = document.getElementById('firstname').value;
    const lastname = document.getElementById('lastname').value;
    const subject = document.getElementById('subject').value;

    // Configuration du service EmailJS
    emailjs.init('UaKKY6fywjdxH9m9R');
    
    // Envoi de l'e-mail
    const templateParams = {
        to_name: 'Votre Nom',
        from_name: lastname,
        from_email: email,
        firstname: firstname,
        lastname: lastname,
        subject: subject,
        message: message
    };
    
    emailjs.send('service_k7boed8', 'template_s013tj7', templateParams)
        .then(function(response) {
            console.log('E-mail envoyé avec succès', response);
            window.location.href = 'message-envoye.html';
            // Réinitialiser le formulaire ou afficher un message de succès
        }, function(error) {
            console.error('Erreur lors de l\'envoi de l\'e-mail', error);
            window.location.href = 'message-erreur.html';
            // Afficher un message d'erreur
        });
});
