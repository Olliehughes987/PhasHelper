// Need to store this externally in a seperate file
let Ghosts;

// Stores each evidence and what it disables due to mutual exclusion
const disables = [
    {name:"Writing",target:"Dots"},
    {name:"Dots",target:"Writing"},
]

let validGhosts = [];
let selectedEvidence = [];

function evidenceFilter(evid) {
    if (document.getElementById(evid).classList.contains('evidence--no')) {
      return;
    }

    if(selectedEvidence.length < 3 && !selectedEvidence.includes(evid)) {
        selectedEvidence.push(evid);
    } else if(selectedEvidence.includes(evid)){
        selectedEvidence = selectedEvidence.filter(piece => piece != evid);
    }
    // iterates through each evidence selected, and disables any mutual exclusions
    disables.forEach(ev => {
        if(ev.name == evid) {
            document.getElementById(ev.target).classList.toggle("evidence--no");
        }
    });
    calculateList(validGhosts); 
}

function calculateList(currentList) {
    switch(selectedEvidence.length) {
        case 0:
            populateList(Ghosts);
            break;
        case 1:
            selectedEvidence.forEach(Piece => {
                currentList = Ghosts.filter(Ghost => Ghost.evidence.includes(selectedEvidence[0]));
            });
            populateList(currentList);
            break;
        case 2:
            selectedEvidence.forEach(Piece => {
                currentList = Ghosts.filter(Ghost => Ghost.evidence.includes(selectedEvidence[0]) && Ghost.evidence.includes(selectedEvidence[1]));
            });
            populateList(currentList);
            break;
        case 3:
            selectedEvidence.forEach(Piece => {
                currentList = Ghosts.filter(Ghost => Ghost.evidence.includes(selectedEvidence[0]) && Ghost.evidence.includes(selectedEvidence[1]) && Ghost.evidence.includes(selectedEvidence[2]));
            });
            populateList(currentList);
            break;
    }
    if(document.getElementsByClassName('ghostDisplay').length > 0) {
        document.getElementById("ghostNum").innerHTML = "Ghosts: ";
    } else if (document.getElementsByClassName('ghostDisplay').length == 0) {
        document.getElementById("ghostNum").innerHTML = "No valid ghosts";
    }
}


function toggleButton(btnList) {
    for(let i = 0; i<btnList.length;i++) {
        btnList[i].classList.toggle("evidence--no");
    }
}

function populateList(currentList) {
    document.getElementById("ghostList").innerHTML = "";
    currentList.forEach(Ghost => {

        let div = document.createElement('div');
        let gName = document.createElement('h2');
        let strength = document.createElement('p');
        let weakness = document.createElement('p');

        gName.innerHTML = Ghost.name;
        strength.innerHTML = Ghost.strength;
        weakness.innerHTML = Ghost.weakness;

        div.setAttribute('id',Ghost.name);
        div.setAttribute('class','ghostDisplay');
        strength.setAttribute('id','Strength');
        weakness.setAttribute('id','Weakness');

        div.appendChild(gName);
        div.appendChild(strength);
        div.appendChild(weakness);

        document.getElementById("ghostList").appendChild(div);
    });
}

window.addEventListener('load', () => {
            
    fetch('https://olliehughes987.github.io/PhasHelper/js/ghosts.json')
    .then((res) => {
        return res.json()
    })
    .then((data) => {
        Ghosts = data;

        let evidences = document.querySelectorAll("li.evidence");
        evidences.forEach(ev => {
            ev.addEventListener('click', event => {
                if(ev.className != "evidence evidence--no") {
                    if((document.querySelectorAll("li.evidence--selected").length < 3 || ev.className == "evidence evidence--selected")) {
                        ev.classList.toggle('evidence--selected');
                    }
    
                    switch (selectedEvidence.length) {
                        case 3:
                            unselectedEvidence = document.getElementsByClassName("evidence");
                            filteredUnselectedEvidence = Array.from(unselectedEvidence).filter(evi => (evi.className != "evidence evidence--selected") && (evi.className != "evidence evidence--no"));
                            toggleButton(filteredUnselectedEvidence);
                            break;
                        case 2:
                            const pairedDisabledButtons = disables
                              .filter(pair => selectedEvidence.includes(pair.name))
                              .map(pair => pair.target);
                            const unpairedDisabledButtons = Array.prototype.filter.call(
                              document.getElementsByClassName('evidence--no'),
                              button => !pairedDisabledButtons.includes(button.id)
                            );
                            toggleButton(unpairedDisabledButtons);
                            //calculateList(validGhosts);
                            break;
                    }
                } 
            }
            )});
    
            populateList(Ghosts);
    });
})
