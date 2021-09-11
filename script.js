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

let validGhosts = [];
let selectedEvidence = [];

function evidenceFilter(evid) {
    if(selectedEvidence.length < 3 && !selectedEvidence.includes(evid)) {
        selectedEvidence.push(evid);
    } else if(selectedEvidence.includes(evid)){
        selectedEvidence = selectedEvidence.filter(piece => piece != evid);
    }
    console.log(selectedEvidence);
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
            console.log(currentList);
            populateList(currentList);
            break;
        case 2:
            selectedEvidence.forEach(Piece => {
                currentList = Ghosts.filter(Ghost => Ghost.evidence.includes(selectedEvidence[0]) && Ghost.evidence.includes(selectedEvidence[1]));
            });
            console.log(currentList);
            populateList(currentList);
            break;
        case 3:
            selectedEvidence.forEach(Piece => {
                currentList = Ghosts.filter(Ghost => Ghost.evidence.includes(selectedEvidence[0]) && Ghost.evidence.includes(selectedEvidence[1]) && Ghost.evidence.includes(selectedEvidence[2]));
            });
            console.log(currentList);
            populateList(currentList);
            break;
    }

}

function populateList(currentList) {
    document.getElementById("ghostList").innerHTML = "Ghosts: ";
    currentList.forEach(Ghost => {
        document.getElementById("ghostList").innerHTML += Ghost.name + " ";
    });
}

window.addEventListener('load', () => {
    populateList(Ghosts);
})
