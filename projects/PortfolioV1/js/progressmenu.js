// Récupère les éléments HTML pour chacun des menus
const landing = document.getElementById('menuUn');
const presentation = document.getElementById('menuTwo');
const realisations = document.getElementById('menuThree');
const contact = document.getElementById('menuFour');

// Supprime la classe "active" pour tous les éléments du menu
const removeActiveClass = () => {
  landing.classList.remove("active");
  presentation.classList.remove("active");
  realisations.classList.remove("active");
  contact.classList.remove("active");
};

// Ajoute la classe "active" à l'élément "landing" lorsque la souris passe dessus
landing.addEventListener("mouseover", function() {
  removeActiveClass();
  landing.classList.add("active");
});

// Ajoute la classe "active" à l'élément "presentation" lorsque la souris passe dessus
presentation.addEventListener("mouseover", function() {
  removeActiveClass();
  presentation.classList.add("active");
});

// Ajoute la classe "active" à l'élément "realisations" lorsque la souris passe dessus
realisations.addEventListener("mouseover", function() {
  removeActiveClass();
  realisations.classList.add("active");
});

// Ajoute une classe "active" à un élément de menu en fonction de la position de défilement
window.addEventListener('scroll', () => {
    // Récupère la position actuelle de défilement, la hauteur totale du contenu et la hauteur visible de la fenêtre
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    const pageHeight = scrollHeight - clientHeight;

    removeActiveClass();

    // Ajoute la classe "active" à "landing" si la position de défilement est inférieure à 10% de la hauteur totale du contenu
    if (scrollTop / pageHeight < 0.1) {
        landing.classList.add("active");

    } 
    // Ajoute la classe "active" à "presentation" si la position de défilement est entre 10% et 40% de la hauteur totale du contenu
    else if (scrollTop / pageHeight >= 0.1 && scrollTop / pageHeight < 0.4) {
        presentation.classList.add("active");
    } 
    // Ajoute la classe "active" à "realisations" si la position de défilement est entre 40% et 70% de la hauteur totale du contenu
    else if (scrollTop / pageHeight >= 0.4 && scrollTop / pageHeight < 0.7) {
        realisations.classList.add("active");
    }
});
