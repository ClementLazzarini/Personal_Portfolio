function getDriverStanding() {
    fetch("https://ergast.com/api/f1/current/driverStandings.json")
    .then((response) => response.json())
    .then(({ MRData: { StandingsTable } }) => {

        if (StandingsTable.season == "2023"){

            //Cache endflag du Background
            const endflag = document.getElementById('endflag');
            endflag.setAttribute("style","visibility: hidden; display: none;");

            // Ajout bloc CTA Classement
            // Création, placement et attributions
            let mainClassDri = document.getElementById("main-class");
            let ctaGP = document.createElement('div');
            mainClassDri.append(ctaGP);
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

            ctaH2.innerHTML = "Pas trop vite..! Tu as mis ton DRS ou quoi ?</br>Le championnat n'a pas encore démarré.</br></br>En attendant, regarde la liste des pilotes de cette année !";

            ctaDivMain.setAttribute('style', 'grid-template-columns: 1fr; margin-top: 2rem;');
            ctaDivA2.setAttribute("href","../../../pilotes/pilotes.html");
            ctaDivImg2.setAttribute("src","../../img/classements/pilotes.jpeg");
            ctaDivImg2.setAttribute("alt","");
            ctaDivP2.textContent = "Pilotes 2024";


        } else if (StandingsTable.season == "2024"){
            //console.log(StandingsTable)
            for (let i = 0; i < 21; i++) {
                // Création variables
                const position = (StandingsTable.StandingsLists[0].DriverStandings[i].position);
                const firstname = (StandingsTable.StandingsLists[0].DriverStandings[i].Driver.givenName);
                let lastname = (StandingsTable.StandingsLists[0].DriverStandings[i].Driver.familyName);

                //Exceptions Pérez / Hülkenberg
                if (lastname == "Pérez"){
                    lastname = "Perez";
                } else if (lastname == "Hülkenberg"){
                    lastname = "Hulkenberg"
                }

                const name = firstname + " " + lastname;
                const nameImg = firstname.toLowerCase();
                const lastnamelower = lastname.toLowerCase();
                const namelink =  nameImg + "-" + lastnamelower;
                const points = (StandingsTable.StandingsLists[0].DriverStandings[i].points);
                const constructor = (StandingsTable.StandingsLists[0].DriverStandings[i].Constructors[0].constructorId);

                // Création éléments HTML
                let driverDiv = document.createElement('div');
                    let driverP = document.createElement('p');
                    let driverImg = document.createElement('img');
                    let driverA = document.createElement('a');
                        let linkDiv = document.createElement('div');
                            let linkP = document.createElement('p');
                    let driverP2 = document.createElement('p');

                // Ajout texte aux éléments HTML
                driverP.textContent = position;
                linkP.textContent = name;
                driverP2.textContent = points + "pts";


                // Placement éléments HTML
                const classContainer = document.getElementById("main-class")
                classContainer.append(driverDiv);
                    driverDiv.append(driverP);
                    driverDiv.append(driverImg);
                    driverDiv.append(driverA);
                        driverA.append(linkDiv);
                            linkDiv.append(linkP);
                    driverDiv.append(driverP2);


                // Attribution class et attribut aux éléments HTML
                driverDiv.classList.add("classement-pilote");
                driverP.classList.add("position");
                driverImg.classList.add("class-img");
                linkDiv.classList.add("name-pilote-class");
                driverP2.classList.add("points");

                driverImg.setAttribute("src","../../../img/pilotes/" + nameImg + "-profile.png");
                driverImg.setAttribute("alt", name);
                driverA.setAttribute("href","../../../pilotes/" + namelink + ".html");


                // Boucle IF pour attribution class par écurie
                if (constructor == "ferrari") {
                    driverDiv.classList.add("ferrari-btn");

                } else if (constructor == "mercedes"){
                    driverDiv.classList.add("mercedes-btn");

                } else if (constructor == "red_bull"){
                    driverDiv.classList.add("redbull-btn");

                } else if (constructor == "alpine"){
                    driverDiv.classList.add("alpine-btn");

                } else if (constructor == "mclaren"){
                    driverDiv.classList.add("mclaren-btn");

                } else if (constructor == "williams"){
                    driverDiv.classList.add("williams-btn");

                } else if (constructor == "aston_martin"){
                    driverDiv.classList.add("aston-btn");

                } else if (constructor == "alphatauri"){
                    driverDiv.classList.add("alpha-btn");

                } else if (constructor == "alfa"){
                    driverDiv.classList.add("alfa-btn");

                } else if (constructor == "haas"){
                    driverDiv.classList.remove("classement-pilote");
                    driverDiv.classList.add("classement-pilote-reverse");
                    driverDiv.classList.add("haas-btn");
                    driverDiv.classList.remove("btn-cons-class");
                    driverDiv.classList.add("btn-cons-class-reverse");
                }
                
        }
        }
    })
    .catch((error) => console.error("Error:", error));
    }