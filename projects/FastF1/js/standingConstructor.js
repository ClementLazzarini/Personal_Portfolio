function getConstrutorStanding() {
    fetch("https://ergast.com/api/f1/current/constructorStandings.json")
    .then((response) => response.json())
    .then(({ MRData: { StandingsTable } }) => {

        if (StandingsTable.season == "2023"){
            //console.log(StandingsTable.season)

            //Cache endflag du Background
            const endflag = document.getElementById('endflag');
            endflag.setAttribute("style","visibility: hidden; display: none;");

            // Ajout bloc Decompte et CTA GP
            // Création, placement et attributions - bloc Decompte
            let mainClassCons = document.getElementById("main-class");
            

            // Création, placement et attributions - bloc Decompte
            let ctaGP = document.createElement('div');
            mainClassCons.append(ctaGP);
            ctaGP.classList.add("cta-class");

            let ctaH2 = document.createElement("h2");
            let ctaDivMain = document.createElement("div");
                
                let ctaDivBox2 = document.createElement("div");
                    let ctaDivCard2 = document.createElement("div");
                        let ctaDivA2 = document.createElement("a");
                            let ctaDivImg2 = document.createElement("img");
                            let ctaDivP2 = document.createElement("p");
            
            ctaGP.append(ctaH2);
            ctaGP.append(ctaDivMain);
                
                ctaDivMain.append(ctaDivBox2);
                    ctaDivBox2.append(ctaDivCard2);
                        ctaDivCard2.append(ctaDivA2);
                            ctaDivA2.append(ctaDivImg2);
                            ctaDivA2.append(ctaDivP2);

            ctaDivMain.classList.add("main-classements");
            ctaDivMain.classList.add("cta-gp-btn");

            ctaDivBox2.classList.add("card-article-box");
            
            ctaDivCard2.classList.add("card-article");
            
            ctaDivA2.classList.add("link-card-article");
            ctaDivP2.classList.add("card-article-title");

            ctaH2.innerHTML = "Pas trop vite..! Tu as mis ton DRS ou quoi ?<br>Le championnat n'a pas encore démarré.</br></br>En attendant, regarde la liste des constructeurs !";

            ctaDivMain.setAttribute('style', 'grid-template-columns: 1fr; margin-top: 2rem;');
            ctaDivA2.setAttribute("href","../../../constructeurs/constructeurs.html");
            ctaDivImg2.setAttribute("src","../../img/classements/constructeurs.jpeg");
            ctaDivImg2.setAttribute("alt","");
            ctaDivP2.textContent = "Constructeurs 2024";


        } else if (StandingsTable.season == "2024"){
            //console.log(StandingsTable)
            for (let i = 0; i < 10; i++) {
                // Création variables
                const position = (StandingsTable.StandingsLists[0].ConstructorStandings[i].position);
                const name = (StandingsTable.StandingsLists[0].ConstructorStandings[i].Constructor.name);
                const points = (StandingsTable.StandingsLists[0].ConstructorStandings[i].points);
                const constructor = (StandingsTable.StandingsLists[0].ConstructorStandings[i].Constructor.constructorId);
                
                const classContainer = document.getElementById("main-class")
                

                // Création éléments HTML
                let constructorDiv = document.createElement('div');
                    let constructorP = document.createElement('p');
                    let constructorImg = document.createElement('img');
                    let constructorA = document.createElement('a');
                        let linkDiv = document.createElement('div');
                            let linkP = document.createElement('p');
                    let constructorP2 = document.createElement('p');

                // Ajout texte aux éléments HTML
                constructorP.textContent = position;
                linkP.textContent = name;
                constructorP2.textContent = points + "pts";


                // Placement éléments HTML
                classContainer.append(constructorDiv);
                    constructorDiv.append(constructorP);
                    constructorDiv.append(constructorImg);
                    constructorDiv.append(constructorA);
                        constructorA.append(linkDiv);
                            linkDiv.append(linkP);
                    constructorDiv.append(constructorP2);


                // Attribution class et attribut aux éléments HTML
                constructorDiv.classList.add("classement-pilote");
                constructorP.classList.add("position");
                constructorImg.classList.add("constructeur-logo");
                linkDiv.classList.add("btn-cons-class");
                constructorP2.classList.add("points");

                constructorImg.setAttribute("src","../../../img/constructeurs/" + constructor + "-logo.jpeg");
                constructorImg.setAttribute("alt", name);
                constructorA.setAttribute("href","../../../constructeurs/" + constructor + ".html");


                // Boucle IF pour attribution class par écurie
                if (constructor == "ferrari") {
                    constructorDiv.classList.add("ferrari-btn");

                } else if (constructor == "mercedes"){
                    constructorDiv.classList.add("mercedes-btn");

                } else if (constructor == "red_bull"){
                    constructorDiv.classList.add("redbull-btn");

                } else if (constructor == "alpine"){
                    constructorDiv.classList.add("alpine-btn");

                } else if (constructor == "mclaren"){
                    constructorDiv.classList.add("mclaren-btn");

                } else if (constructor == "williams"){
                    constructorDiv.classList.add("williams-btn");

                } else if (constructor == "aston_martin"){
                    constructorDiv.classList.add("aston-btn");

                } else if (constructor == "alphatauri"){
                    constructorDiv.classList.add("alpha-btn");

                } else if (constructor == "alfa"){
                    constructorDiv.classList.add("alfa-btn");

                } else if (constructor == "haas"){
                    constructorDiv.classList.remove("classement-pilote");
                    constructorDiv.classList.add("classement-pilote-reverse");
                    constructorDiv.classList.add("haas-btn");
                    constructorDiv.classList.remove("btn-cons-class");
                    constructorDiv.classList.add("btn-cons-class-reverse");
                }
                
                if (name == "Alpine F1 Team") {
                    linkP.textContent = "Alpine";

                } else if (name == "Haas F1 Team"){
                    linkP.textContent = "Haas";

                }
        }
        } 
    })
    .catch((error) => console.error("Error:", error));
    }