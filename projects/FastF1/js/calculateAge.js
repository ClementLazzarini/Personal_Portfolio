function calculateAge() {
    // Définition des variables
    var ageDriver = document.getElementById("baseAge").textContent;
    var currentDate = new Date();
    var birthDate = new Date(ageDriver);
    var ageInMilliseconds = currentDate - birthDate;
    var age = ageInMilliseconds / (1000 * 60 * 60 * 24 * 365.25);
    var age = Math.floor(age);

    document.getElementById("age").innerHTML = age + " ans";
}