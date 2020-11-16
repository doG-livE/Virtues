function buyOrSell() {    //when buyable canvas card is clicked, buy or sell it
    "use strict";

    let parentDiv = $(this).parent().attr('id');
    let canvasIndex = $(this).data('canvasindex');

    if (parentDiv == "initialTechPurchaseContainer" || parentDiv == "initialBearingPurchaseContainer") {
        buyCard(parentDiv, canvasIndex);
    } else if (parentDiv == "initialTechsKnownContainer" || parentDiv == "initialBearingsKnownContainer") {
        sellCard(parentDiv, canvasIndex);
    }
}

function buyCard(parentDiv, canvasIndex) {
    "use strict";
    var areaSpent="";
    if (techsKnown.includes(canvasIndex) || bearingsKnown.includes(canvasIndex)) {
        alert("You've already purchased this card ("+canvasIndex+").");
        return;
    }
    if (parentDiv == "initialTechPurchaseContainer") {
        techsKnown.push(canvasIndex);
        document.getElementById("initialTechsKnownContainer").appendChild(canvasArray[canvasIndex]);
        areaSpent="Tech";
        purchaseHistory += "<br>Purchased " + virtuesJson[canvasIndex].cardTitle;
    } else {
        bearingsKnown.push(canvasIndex);
        document.getElementById("initialBearingsKnownContainer").appendChild(canvasArray[canvasIndex]);
        areaSpent="Bearing";
        purchaseHistory += "<br>Purchased " + virtuesJson[canvasIndex].cardTitle + " " + virtuesJson[canvasIndex].cardNumber + virtuesJson[canvasIndex].cardActionLetter;
    }
    // add to image list
    cardsForImagesArray.push(canvasIndex);
    //alert("Card purchased!");
    console.log("bought "+canvasIndex+" for "+virtuesJson[canvasIndex].inspirationCostToBuy+" spent total: "+inspirationSpent);
    updateInspirationTable(parseInt(virtuesJson[canvasIndex].inspirationCostToBuy),areaSpent);
}

function sellCard(parentDiv, canvasIndex) {
    "use strict";
    var areaSpent="";

    if (techsKnown.includes(canvasIndex)) {
        document.getElementById("initialTechPurchaseContainer").appendChild(canvasArray[canvasIndex]);
        inspirationSpent += -parseInt(virtuesJson[canvasIndex].inspirationCostToBuy);
        techsKnown.splice(canvasIndex, 1);
         areaSpent="Tech";
       purchaseHistory += "<br>Refunded " + virtuesJson[canvasIndex].cardTitle;
    } else if (bearingsKnown.includes(canvasIndex)) {
        document.getElementById("initialBearingPurchaseContainer").appendChild(canvasArray[canvasIndex]);
        bearingsKnown.splice(canvasIndex, 1);
        areaSpent="Bearing";
        inspirationSpent += -parseInt(virtuesJson[canvasIndex].inspirationCostToBuy);
        purchaseHistory += "<br>Refunded " + virtuesJson[canvasIndex].cardTitle + " " + virtuesJson[canvasIndex].cardNumber + virtuesJson[canvasIndex].cardActionLetter;
    } else {
        alert("This card ("+canvasIndex+"). wasn't in your list of known abilities, please tell Rick!");
    }
    // remove from image list
    var index = cardsForImagesArray.indexOf(canvasIndex);
    if (index > -1) {
            cardsForImagesArray.splice(index, 1);
    };
    alert("Card refunded!");
    console.log("bought "+canvasIndex+" for "+virtuesJson[canvasIndex].inspirationCostToBuy+" spent total: "+inspirationSpent);
    updateInspirationTable(-parseInt(virtuesJson[canvasIndex].inspirationCostToBuy),areaSpent);
}
function buyAllCards() {
    // buy all cards of cardType. This will need to be adjusted in the future, as the types are currently, individually, hard coded.
    // cardType is technique type, bearing type, heal, range, movement ... again, these are hardcoded currently 
    // for each card in the deck, add as tech or bearing.
    // this is mostly copied from populateCardDisplay
    // remove all the other cards (from the print list).
    // as-is, the outlooks are populated by default, they are not included in the case blocks.
    // note: reload after saving.
    while(cardsForImagesArray.length>0) {
        cardsForImagesArray.pop();
    }
    cardType="All";
    if ($("#buyAllCardsPulldown").val()) {
        cardType=$("#buyAllCardsPulldown").val();
        fileSaveAs=cardType;
        console.log("fileSaveAs: "+fileSaveAs);
    }
    // file name based on the selection
    

    switch (cardType) {
        case "Courage":
        case "Compassion":
        case "Clever":
            for (let i = 0; i < virtuesJson.length; i++) {
                // not adding callings to these decks
                if (virtuesJson[i].cardVirtue == cardType && virtuesJson[i].techIsCalling == false) {
                    buyCard("initialTechPurchaseContainer", i);
                }
            }
            break;
        case "M":
        case "H":
        case "P":
        case "A":
            for (let i = 0; i < virtuesJson.length; i++) {
                if (virtuesJson[i].cardActionLetter == cardType && virtuesJson[i].techIsCalling == false) {
                    buyCard("initialTechPurchaseContainer", i);
                }
            }
            break;
        case "Calling":
            for (let i = 0; i < virtuesJson.length; i++) {
                if (virtuesJson[i].cardType == "technique" && virtuesJson[i].techIsCalling != false) {
                    buyCard("initialTechPurchaseContainer", i);
                }
            }
            break;
        case "Bold":
        case "Direct":
        case "Guarded":
        case "Pugilist":
        case "Resourceful":
        case "Subtle":
            for (let i = 0; i < virtuesJson.length; i++) {
                if (virtuesJson[i].cardTitle == cardType) {
                    buyCard("initialTechPurchaseContainer", i);
                }
            }
            break;
        default:
            //alert("No card to add");
            for (let i = 0; i < virtuesJson.length; i++) {
                //putting them all in the technique field, this is only inteneded for printing.
                buyCard("initialTechPurchaseContainer", i);
            }
        }
}


