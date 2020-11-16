function updateCharacterSheet() {
    // using the last two cards as the character sheet
    // second from last is character text
    var cardText="";
    // build the character text
    $(document).ready(() => {
        cardText = "Name: " +$('#rainbowHeader').text() +" <br> <br> ";
        //cardText += "Player: <br> <br> ";
        cardText += "Calling 1: " + $("#callingDropDownPrimary").val() + " <br> <br> ";
        cardText += "Calling 2: " + $("#callingDropDownSecondary").val() + " <br> <br> ";
        cardText += "Background 1: " + $("#background1").val() + " <br> <br> ";
        cardText += "Background 2: " + $("#background2").val() + " <br> <br> ";
        cardText += "Background 3: " + $("#background3").val() + " <br> <br> ";
        virtuesJson[virtuesJson.length-2].cardBody = cardText;

        // build the data text
        cardText = "Inspiration earned: " + $('#inspirationEarnedField').val() +" <br> <br> " ;
        cardText += "Morale: " + $("input[name='moraleValue']:checked").val() +" <br> <br> ";
        cardText += "Hope: " + $("input[name='hopeValue']:checked").val() + " <br> <br> <br> ";
        cardText += "Courage: " + $("input[name='courageValue']:checked").val() + " <br> <br> <br> ";
        cardText += "Clever: " + $("input[name='cleverValue']:checked").val() + " <br> <br> <br> ";
        cardText += "Compassion: " + $("input[name='compassionValue']:checked").val() + " <br> <br> <br> ";
        cardText += "Status Effects: <br> <br> <br> ";
        virtuesJson[virtuesJson.length-1].cardBody = cardText;
    });
}   
/*
$(document).ready(() => {
    getStr += "&l1=" + $("input[name='courageValue']:checked").val();
    getStr += "&l2=" + $("input[name='cleverValue']:checked").val();
    getStr += "&l3=" + $("input[name='compassionValue']:checked").val();
    getStr += "&m=" + $("input[name='moraleValue']:checked").val();
    getStr += "&h=" + $("input[name='hopeValue']:checked").val();
    if (charName) { getStr += "&title=" + charName; };
    getStr += "&tech=" + techsKnown;
    getStr += "&bear=" + bearingsKnown;
    getStr += "&bg1=" + $("#background1").val();
    getStr += "&bg2=" + $("#background2").val();
    getStr += "&bg3=" + $("#background3").val();
    getStr += "&IE=" + $('#inspirationEarnedField').val();
*/