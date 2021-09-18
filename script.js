const Ghosts = [
    {name:"Banshee",evidence:["Dots","Orb","Fingerprints"],
        strength:"A Banshee will only target one person at a time.",
        weakness:"Banshees fear the Crucifix and will be less aggressive when near one."},
    {name:"Demon",evidence:["Writing","Fingerprints","Freezing"],
        strength:"Demons will attack more often then any other Ghost.",
        weakness:"Asking a Demon successful questions on the Ouija Board won’t lower the users sanity."},
    {name:"Goryo",evidence:["Dots","EMF","Fingerprints"],
        strength:"A Goryo will usually only show itself on camera if there are no people nearby.",
        weakness:"They are rarely seen far from their place of death."},
    {name:"Hantu",evidence:["Orb","Fingerprints","Freezing"],
        strength:"Lower temperatures can cause the Hantu to move at faster speeds.",
        weakness:"A Hantu will move slower in warmer areas."},
    {name:"Jinn",evidence:["EMF","Fingerprints","Freezing"],
        strength:"A Jinn will travel at a faster speed if it’s victim is far away.",
        weakness:"Turning off the locations power source will prevent the Jinn from using it’s ability."},
    {name:"Mare",evidence:["Writing","Orb","SpiritBox"],
        strength:"A Mare will have an increased chance to attack in the dark.",
        weakness:"Turning the lights on around the Mare will lower it’s chance to attack."},
    {name:"Myling",evidence:["Writing","EMF","Fingerprints"],
        strength:"A Myling is known to be quieter when hunting.",
        weakness:"Mylings more frequently make paranomal sounds."},
    {name:"Oni",evidence:["Dots","EMF","Freezing"],
        strength:"Oni’s are more active when people are nearby and have been seen moving objects at great speed.",
        weakness:"Being more active will make the Oni easier to find and identify."},
    {name:"Phantom",evidence:["Dots","Fingerprints","SpiritBox"],
        strength:"Looking at a Phantom will considerably drop your sanity.",
        weakness:"Taking a photo of the Phantom will make it temporarily disappear."},
    {name:"Poltergeist",evidence:["Writing","Fingerprints","SpiritBox"],
        strength:"A Poltergeist can throw huge amounts of objects at once.",
        weakness:"A Poltergeist is almost ineffective in an empty room."},
    {name:"Revenant",evidence:["Writing","Orb","Freezing"],
        strength:"A Revenant will travel at a significantly faster speed when hunting a victim.",
        weakness:"Hiding from the Revenant will cause it to move very slowly."},
    {name:"Shade",evidence:["Writing","EMF","Freezing"],
        strength:"Being shy means the Ghost will be harder to find.",
        weakness:"The Ghost will not enter hunting mode if there is multiple people nearby."},
    {name:"Spirit",evidence:["Writing","EMF","SpiritBox"],
        strength:"Nothing.",
        weakness:"Using Smudge Sticks on a Spirit will stop it attacking for a long period of time."},
    {name:"Wraith",evidence:["Dots","EMF","SpiritBox"],
        strength:"Wraiths almost never touch the ground meaning it can’t be tracked by footsteps.",
        weakness:"Wraiths have a toxic reaction to Salt."},
    {name:"Yokai",evidence:["Dots","Orb","SpiritBox"],
        strength:"Talking near a Yokai will anger it and increase it's chance of attacking.",
        weakness:"When hunting a Yokai can only hear voices close to it."},
    {name:"Yurei",evidence:["Dots","Orb","Freezing"],
        strength:"Yurei’s have been known to have a stronger effect on people’s sanity.",
        weakness:"Smudging the Yurei’s room will cause it to not wander around the location for a long time."},

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
    if (document.getElementById(evid).classList.contains('evidence--no')) {
      return;
    }

    if(selectedEvidence.length < 3 && !selectedEvidence.includes(evid)) {
        selectedEvidence.push(evid);
    } else if(selectedEvidence.includes(evid)){
        selectedEvidence = selectedEvidence.filter(piece => piece != evid);
    }
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
}


function toggleButton(btnList) {
    for(let i = 0; i<btnList.length;i++) {
        btnList[i].classList.toggle("evidence--no");
    }
}

function populateList(currentList) {
    document.getElementById("ghostList").innerHTML = "Ghosts: ";
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
        div.appendChild(gName);
        div.appendChild(strength);
        div.appendChild(weakness);

        document.getElementById("ghostList").appendChild(div);
    });
}

window.addEventListener('load', () => {
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

})
