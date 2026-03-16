function getRaceCount(){
    fetch("https://ergast.com/api/f1/current/last/results.json")
    .then((response) => response.json())
    .then(({ MRData: { RaceTable } }) => {
        console.log(RaceTable)
        const season = (RaceTable.season);
        let compteurCourses = document.getElementById("racecount");
        let baseNBCourses = document.getElementById("basenbcourse").textContent;
        const baseNBCoursesInt = parseInt(baseNBCourses, 10);
        if(season == "2023"){
            compteurCourses.textContent = baseNBCoursesInt;
        } else if (season == "2024"){
            const lastRound = RaceTable.Races[0].round;
            const lastRoundInt = parseInt(lastRound, 10);
            
            const countRace = lastRoundInt + baseNBCoursesInt

            compteurCourses.textContent = countRace;
        }
    })
    .catch((error) => console.error("Error:", error));
}