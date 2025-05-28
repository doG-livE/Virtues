function populateCardDisplay(dropdownValue, targetdiv, searchType) {
    //Looks at the value of the dropdown, runs switch-case on it to determine which cards get filtered in.
    //Then displays those cards, in the div ID indluded in the dropdown's data property.
    "use strict";

    let toPrintArray = [];
    var searchResult=0;
    var searchMatches=0;
    if (searchType) {
        switch (searchType) {
        case "SearchBearings":
            for (let i = 0; i < virtuesJson.length; i++) {
                if (virtuesJson[i].cardVirtue == "bearing") {
                    searchResult=(virtuesJson[i].cardBody+' '+virtuesJson[i].cardTitle).toLowerCase().search(dropdownValue.toLowerCase());
                    if (searchResult>0) {
                        searchMatches+=1;
                        toPrintArray.push(i);
                    }
                    
                }
            }
            console.log(searchMatches)
            break;
        case "SearchTechniques":
            for (let i = 0; i < virtuesJson.length; i++) {
                if (virtuesJson[i].cardType == "technique") {
                    searchResult=(virtuesJson[i].cardBody+' '+virtuesJson[i].cardTitle).toLowerCase().search(dropdownValue.toLowerCase());
                    if (searchResult>0) {
                        searchMatches+=1;
                        toPrintArray.push(i);
                    }
                    
                }
            }
            console.log(searchMatches)
            break;
    
        default:
            console.log("search field not found")
        }
    }
    else {
        switch (dropdownValue) {
        case "All":
            for (let i = 0; i < virtuesJson.length; i++) {
                if (virtuesJson[i].cardType == "technique") {
                    toPrintArray.push(i);
                }
            }
            break;
        // added allbearing display to populate all canvas on load
        case "AllCards":
        for (let i = 0; i < virtuesJson.length; i++) {
                toPrintArray.push(i);
            }
            break;
        // added noCards to depopulate populate div once the cards are added but the system
        case "noCards":
            toPrintArray=[];
            break;
        case "Courage":
        case "Compassion":
        case "Clever":
            for (let i = 0; i < virtuesJson.length; i++) {
                if (virtuesJson[i].cardVirtue == dropdownValue) {
                    toPrintArray.push(i);
                }
            }
            break;
        case "M":
        case "H":
        case "P":
        case "A":
            for (let i = 0; i < virtuesJson.length; i++) {
                if (virtuesJson[i].cardActionLetter == dropdownValue) {
                    toPrintArray.push(i);
                }
            }
            break;
        case "Calling":
            for (let i = 0; i < virtuesJson.length; i++) {
                if (virtuesJson[i].cardType == "technique" && virtuesJson[i].techIsCalling != false) {
                    toPrintArray.push(i);
                }
            }
            break;
        case "Straightforward":
        case "Headstrong":
        case "Scarred Soldier":
        case "Punchy Princess":
        case "Overprotective Pilgrim":
        case "Fiery Dancer":
        case "Prophecy's Chosen":
        case "Martyr":
        case "Chemist":
        case "Executioner":
            for (let i = 0; i < virtuesJson.length; i++) {
                if (virtuesJson[i].cardTitle == dropdownValue) {
                    toPrintArray.push(i);
                }
            }
            break;
        default:
            alert("Default reached in populateCardDisplay, please tell Rick!");
        }
    }

    document.getElementById(targetdiv).innerText = "";      //clear the target div

    for (let j = 0; j < toPrintArray.length; j++) {
        addCard(toPrintArray[j], targetdiv);
    }
}

function repopulateDashboard() {
    "use strict";
    for (let i=0; i<techsKnown.length; i++) {
        document.getElementById("initialTechsKnownContainer").appendChild(canvasArray[techsKnown[i]]);
    }
    for (let i=0; i<bearingsKnown.length; i++) {
        document.getElementById("initialBearingsKnownContainer").appendChild(canvasArray[bearingsKnown[i]]);
    }
}

function addCard(cardIndex, targetdiv) {  //just appends the required card from the sorted array to the appropriate target parent div.
    canvasArray[cardIndex].style.length = "300px";
    canvasArray[cardIndex].style.width = "400px";
    canvasArray[cardIndex].style.marginTop = "10px";
    canvasArray[cardIndex].style.marginRight = "10px";
    document.getElementById(targetdiv).appendChild(canvasArray[cardIndex]);
}


