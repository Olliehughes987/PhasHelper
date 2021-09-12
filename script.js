const Ghosts = [
    {name:"Banshee",evidence:["Dots","Orb","Fingerprints"]},
    {name:"Demon",evidence:["Writing","Fingerprints","Freezing"]},
    {name:"Goryo",evidence:["Dots","EMF","Fingerprints"]},
    {name:"Hantu",evidence:["Orb","Fingerprints","Freezing"]},
    {name:"Jinn",evidence:["EMF","Fingerprints","Freezing"]},
    {name:"Mare",evidence:["Writing","Orb","SpiritBox"]},
    {name:"Myling",evidence:["Writing","EMF","Fingerprints"]},
    {name:"Oni",evidence:["Dots","EMF","Freezing"]},
    {name:"Phantom",evidence:["Dots","Fingerprints","SpiritBox"]},
    {name:"Poltergeist",evidence:["Writing","Fingerprints","SpiritBox"]},
    {name:"Revenant",evidence:["Writing","Orb","Freezing"]},
    {name:"Shade",evidence:["Writing","EMF","Freezing"]},
    {name:"Spirit",evidence:["Writing","EMF","SpiritBox"]},
    {name:"Wraith",evidence:["Dots","EMF","SpiritBox"]},
    {name:"Yokai",evidence:["Dots","Orb","SpiritBox"]},
    {name:"Yurei",evidence:["Dots","Orb","Freezing"]}

];

const disables = [
    {name:"EMF",target:"Orb"},
    {name:"Orb",target:"EMF"},
    {name:"Freezing",target:"SpiritBox"},
    {name:"SpiritBox",target:"Freezing"},
    {name:"Writing",target:"Dots"},
    {name:"Dots",target:"Writing"},
]

let validGhosts = [];
let selectedEvidence = [];

function evidenceFilter(evid) {
    if(selectedEvidence.length < 3 && !selectedEvidence.includes(evid)) {
        selectedEvidence.push(evid);
    } else if(selectedEvidence.includes(evid)){
        selectedEvidence = selectedEvidence.filter(piece => piece != evid);
    }
    disables.forEach(ev => {
        if(ev.name == evid) {
            document.getElementById(ev.target).classList.toggle("evidence--disabled");
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
}


function toggleButton(btnList) {
    for(let i = 0; i<btnList.length;i++) {
        btnList[i].classList.toggle("evidence--disabled");
    }
}

function populateList(currentList) {
    document.getElementById("ghostList").innerHTML = "Ghosts: ";
    currentList.forEach(Ghost => {
        document.getElementById("ghostList").innerHTML += Ghost.name + " ";
    });
}

window.addEventListener('load', () => {
    let evidences = document.querySelectorAll("li.evidence");
    evidences.forEach(ev => {
        ev.addEventListener('click', event => {
            if(ev.className != "evidence evidence--disabled") {
                if((document.querySelectorAll("li.evidence--selected").length < 3 || ev.className == "evidence evidence--selected")) {
                    ev.classList.toggle('evidence--selected');
                }
                if(selectedEvidence.length == 3) {
                    unselectedEvidence = document.getElementsByClassName("evidence");
                    filteredUnselectedEvidence = Array.from(unselectedEvidence).filter(evi => (evi.className != "evidence evidence--selected") && (evi.className != "evidence evidence--disabled"));
                    toggleButton(filteredUnselectedEvidence);
                } else if (selectedEvidence.length < 3) {
                    document.getElementById("Fingerprints").className = "evidence";
                    calculateList(validGhosts);
                }
            } 
        }
        )});
        populateList(Ghosts);

})
