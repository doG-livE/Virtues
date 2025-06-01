function createCanvases() {
    "use strict";
    let canvasVar = document.createElement("canvas");   //placeholder

    for (let i = 0; i < virtuesJson.length; i++) {
        canvasVar = create3by4(i);
        $(canvasVar).attr('data-canvasindex', i);
        $(canvasVar).attr("id", i); // Use ID to check for a click
        canvasVar.addEventListener("click", buyOrSell, true);
        canvasArray.push(canvasVar);
    }
}

function create3by4(cardIndex) {
    //updateCharacterSheet();
    let colorVar = fetchColor(virtuesJson[cardIndex].cardVirtue);
    let clearX = 30;
    let clearY = 50;
    let cardCanvas = document.createElement("canvas");
    cardCanvas.width = 1160;
    cardCanvas.height = 1600;

    let ctx = cardCanvas.getContext('2d');
    ctx.font = "bold 80px Arial";
    ctx.textAlign = "center";

    ctx.fillStyle = blackVar;
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    ctx.fillStyle = colorVar;
    ctx.fillRect(0, 0, clearX + 100, ctx.canvas.height);

    ctx.fillStyle = whiteVar;
    if (virtuesJson[cardIndex].cardActionLetter) {
        //            ctx.strokeRect(clearX, clearY, 80, 80);
        ctx.fillText(virtuesJson[cardIndex].cardActionLetter, clearX + 40, clearY + 64);
        clearY += 120;
    }

    if (virtuesJson[cardIndex].cardNumber) {
        if (virtuesJson[cardIndex].cardNumber == "2/0") {
            ctx.font = "bold 64px Arial";
            ctx.fillText(virtuesJson[cardIndex].cardNumber, clearX + 40, clearY + 60);
            ctx.font = "bold 80px Arial";
        } else {
            ctx.fillText(virtuesJson[cardIndex].cardNumber, clearX + 40, clearY + 60);
        }
        clearY += 120;
    }

    ctx.font = "bold 92px Arial";
    let titleWidth = ctx.measureText(virtuesJson[cardIndex].cardTitle).width;
    titleYvar = titleWidth + 20;
    titleYvar = titleYvar / 2;
    titleYvar += clearY;
    ctx.save();
    ctx.translate(95, titleYvar);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText(virtuesJson[cardIndex].cardTitle, 0, 0);
    ctx.restore();
    ctx.font = "64px Arial";
    ctx.textAlign = "left";
    printCanvasBody(ctx, virtuesJson[cardIndex].cardBody, 1110);

    return cardCanvas;
}

function printCanvasBody(ctx, textBody, maxX) {
    let words = textBody.split(" ");
    let word = words[0];
    let lineX = 160;
    let lineY = 110;
    let lineHeight = 70;
    let newX = 0;

    for (let i = 0; i < words.length; i++) {
        word = words[i];
        switch (word) {
            case "<br>":
                lineY += lineHeight;
                lineX = 160;
                break;
            case "<strong>":
                ctx.font = "bold 64px Arial";
                break;
            case "</strong>":
                ctx.font = "64px Arial";
                break;
            default:
                if (lineX + ctx.measureText(word + " ").width < maxX) {
                    ctx.fillText(word, lineX, lineY);
                    lineX += ctx.measureText(word + " ").width;
                } else {
                    lineY += lineHeight;
                    lineX = 160;
                    ctx.fillText(word, lineX, lineY);
                    lineX += ctx.measureText(word + " ").width;
                }
                break;
        }
    }
    return;
}

function create4by6(index, nextIndex) {
    "use strict";

    let cardCanvas1 = create3by4(index);
    let cardCanvas2 = create3by4(nextIndex);

    let card4by6 = document.createElement("canvas");
    card4by6.width = 2400;
    card4by6.height = 1600;

    let ctx = card4by6.getContext('2d');

    ctx.drawImage(cardCanvas1, 20, 0);
    ctx.drawImage(cardCanvas2, 1210, 0);


    return card4by6;
}
function makeImages() {
    // popup window with all the selected card IDs (or even better, the cards)
    if (confirm("Press OK to print, number of cards: " + cardsForImagesArray.length+" indexes: " + cardsForImagesArray)) {
        let canvases = document.getElementsByTagName("canvas");
        let a = document.createElement("a");
        for (let i = 0; i < cardsForImagesArray.length; i++) {
            // call create4by6 to get 2 2x3 cards for printing each second card
            // want to add default card to last one if needed, adding extra copy of card for now.
            if (i+1<cardsForImagesArray.length) {
                card4by6=create4by6(cardsForImagesArray[i],cardsForImagesArray[i+1]);
                i++; // added the next card to print already
            }
            else {
                card4by6=create4by6(cardsForImagesArray[i],cardsForImagesArray[i]);
            }
            if (window.navigator.msSaveBlob) {          //for ie or edge
                window.navigator.msSaveBlob(card4by6.msToBlob(), "Virtues-card.png");  //edge can only do png files
            }
            else {         //all besides ie or edge, are downloaded below using a forced anchor click
                document.body.appendChild(a);
                a.href = card4by6.toDataURL("image/jpeg");

                //a.download = $('#rainbowHeader').text()+".jpg";
                a.download = "VirtuesCards.jpg";
                a.click();
                document.body.removeChild(a);
            };
            
        }
    
    }
    else {
        console.log("Cancel Print");
    }
}
function makeImagesForSheets() {
    // popup window with all the selected card IDs (or even better, the cards)
    if (confirm("Press OK to print, number of cards: " + cardsForImagesArray.length+" indexes: " + cardsForImagesArray)) {
        let canvases = document.getElementsByTagName("canvas");
        let a = document.createElement("a");
        for (let i = 0; i < cardsForImagesArray.length; i++) {
            // call create4by6 to get 2 2x3 cards for printing each second card
            // want to add default card to last one if needed, adding extra copy of card for now.
            if (i+1<cardsForImagesArray.length) {
                card4by6=create4by6(cardsForImagesArray[i],cardsForImagesArray[i+1]);
                i++; // added the next card to print already
            }
            else {
                card4by6=create4by6(cardsForImagesArray[i],cardsForImagesArray[i]);
            }
            if (window.navigator.msSaveBlob) {          //for ie or edge
                window.navigator.msSaveBlob(card4by6.msToBlob(), "Virtues-card.png");  //edge can only do png files
            }
            else {         //all besides ie or edge, are downloaded below using a forced anchor click
                document.body.appendChild(a);
                a.href = card4by6.toDataURL("image/jpeg");
                a.download = $("SheetsVirtuesCardExport.jpg");
                a.click();
                document.body.removeChild(a);
            };

        }

    }
    else {
        console.log("Cancel Print");
    }
}
function makeSingleImages() {
    // popup window with all the selected card IDs (or even better, the cards)
    console.log("single images ... ");
    if (confirm("Press OK to begin, number of cards: " + cardsForImagesArray.length+" indexes: " + cardsForImagesArray)) {
        let canvases = document.getElementsByTagName("canvas");
        let a = document.createElement("a");
        for (let i = 0; i < cardsForImagesArray.length; i++) {
            document.body.appendChild(a);
            console.log("single image " + cardsForImagesArray[i]);
            let cardCanvas1 = create3by4(cardsForImagesArray[i]);
        
            let card3by4 = document.createElement("canvas");
            card3by4.width = 1200;
            card3by4.height = 1600;
        
            let ctx = card3by4.getContext('2d');
        
            ctx.drawImage(cardCanvas1, 20, 0);
        
            a.href = card3by4.toDataURL("image/jpeg");
            // use the character name if there is one
            charName=$('#rainbowHeader').text();
            if (charName) { fileSaveAs = charName; };            
            a.download = fileSaveAs+cardsForImagesArray[i]+".jpg";
            a.click();
            document.body.removeChild(a);
            wait(500);
        }
    }
    else {
        console.log("Cancel Print");
    }
}
// intended for testing only, seemed to load the pictures too quickly
// very expensive sleep, lol
function wait(ms){
    var start = new Date().getTime();
    var end = start;
    while(end < start + ms) {
      end = new Date().getTime();
   }
 }