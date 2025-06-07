function fetchColor(cardVirtue) {
    //Switch-case to determine what color the cards should be based on their Virtue type.
    "use strict";
    let colorVar = "";

    switch (cardVirtue) {
        case "Courage":
            colorVar = "hsl(0, 100%, 50%)";
            break;
        case "Compassion":
            colorVar = "hsl(125, 100%, 30%)";
            break;
        case "Clever":
            colorVar = "hsl(225, 100%, 70%)";
            break;
        case "bearing":
            colorVar = "hsl(35, 80%, 25%)";
            break;
        case "Neutral":
            colorVar = "hsl(0, 0%, 10%)";
            break;
        default:
            colorVar = "hsl(0, 0%, 10%)";
            //alert("fetchColor Error; Please tell Rick");
    }
    return colorVar;
}

function fetchIcon(cardIndex) {
    //Switch-case to determine what Virtue icon a technique should have. 
    //Courage = man with stick, compassion = shield, clever = book.
    //Icons are taken from FontAwesome website, which is included in <head>.
    "use strict";
    let iconVar = "";
    let techVirtueType = virtuesJson[cardIndex].cardVirtue;
    switch (techVirtueType) {
        case "Courage":
            iconVar = '<i class="fa fa-blind fa-lg"></i>';
            break;
        case "Compassion":
            iconVar = '<i class="fa fa-shield fa-lg"></i>';
            break;
        case "Clever":
            iconVar = '<i class="fa fa-book fa-lg"></i>';
            break;
        case "bearing":
            iconVar = '';
            break;
        case "Neutral":
            iconVar = '';
            break;
        default:
            alert("Default reached in fetchIcon");
    }
    return iconVar;
}
