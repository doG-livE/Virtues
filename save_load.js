function loadURLData() {
    // I saw this run on switching tabs, so, cehcking to be sure only runs one time.
    if (loadData) {
        loadData = false;
        /* check "GET" for saved values */
        /* shortened variable names are used to shorten the URL string */
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);

        if (urlParams.get('pv')) { primaryVirtue = urlParams.get('pv'); };//primary calling
        if (urlParams.get('pv')) { secondaryVirtue = urlParams.get('sv'); };//secondary calling
        focusLevel = [urlParams.get('l1'), urlParams.get('l2'), urlParams.get('l3')];//courage level clever level compassion level
        moraleValue = urlParams.get('m');//Morale
        hopeValue = urlParams.get('h');//Hope

        $(document).ready(() => {
            if (primaryVirtue) { $("#callingDropDownPrimary").val(primaryVirtue); };
            if (secondaryVirtue) { $("#callingDropDownSecondary").val(secondaryVirtue); };
            $('#courageV' + focusLevel[0]).prop('checked', true);
            $('#cleverV' + focusLevel[1]).prop('checked', true);
            $('#compassionV' + focusLevel[2]).prop('checked', true);
            $('#moraleV' + moraleValue).prop('checked', true);
            $('#hopeV' + hopeValue).prop('checked', true); 
            if (urlParams.get('title')) { $('#rainbowHeader').text(urlParams.get('title')); };
            $('#background1').val(urlParams.get('bg1'));
            $('#background1').val(urlParams.get('bg1'));
            $('#background2').val(urlParams.get('bg2'));
            $('#background3').val(urlParams.get('bg3'));
            $('#inspirationEarnedField').val(urlParams.get('IE'));

            // without pre-rendering the cards, they are the big size.
            // rendering all the cards to the correct size before adding the canvases
            populateCardDisplay("AllCards","initialTechPurchaseContainer");

            // check for a value, may be null a now and then
            if (urlParams.get('tech')) {
                getTech = urlParams.get('tech').split(','); 
                for (i = 0; i < getTech.length; i++) {
                    if (getTech[i]) {
                        buyCard("initialTechPurchaseContainer", getTech[i]);
                    };
                };
            }
            else {
                // add default techs that are not included otherwise
                // only need to do this if the cards are not set, if they are set, then this will add duplicates.
                for (i = 0; i < virtuesJson.length; i++) {
                    if (virtuesJson[i].techIsDefault) {
                        buyCard("initialTechPurchaseContainer", i);
                    };
                };
            };

            // check for a value, may be null a now and then
            if (urlParams.get('bear')) {
                getBearing = urlParams.get('bear').split(',');
                for (i = 0; i < getBearing.length; i++) {
                    if (getBearing[i]) {
                        buyCard("initialBearingPurchaseContainer", getBearing[i]);
                    };
                };
            };
            
            // clear the cards, otherwise they are all left on the screen.
            populateCardDisplay("noCards","initialTechPurchaseContainer");

            // register the change event for updating calling powers
            // if I do this first, they can get removed from the div, I think it is during the buy they get removed
            if (primaryVirtue) {$('.callingDropDown').change();};
        });
    };
};
function saveURLData() {
    /* create the string and redirect to the new URL */
    /* note: using abbreviated variable names in URL to save space */
    var getStr=makeURLPairs();
    window.open(window.location.origin + window.location.pathname + "?" + getStr);
};
function makeURLPairs() {
   // var getStr = "?";
    var getStr = "";
    getStr += "pv=" + primaryVirtue;
    getStr += "&sv=" + secondaryVirtue;
    /* check the radio buttons to see which are selected, add to the string */
    /* edited the radio buttons to store a value, That is what I'm using for the variable */
    getStr += "&l1=" + $("input[name='courageValue']:checked").val();
    getStr += "&l2=" + $("input[name='cleverValue']:checked").val();
    getStr += "&l3=" + $("input[name='compassionValue']:checked").val();
    getStr += "&m=" + $("input[name='moraleValue']:checked").val();
    getStr += "&h=" + $("input[name='hopeValue']:checked").val();
    getStr += "&title=" + $('#rainbowHeader').text();
    getStr += "&tech=" + techsKnown;
    getStr += "&bear=" + bearingsKnown;
    getStr += "&bg1=" + $("#background1").val();
    getStr += "&bg2=" + $("#background2").val();
    getStr += "&bg3=" + $("#background3").val();
    getStr += "&IE=" + $('#inspirationEarnedField').val();
    getStr += "&userid=" + $('#useridField').val();
    return getStr;
};

function saveAWSData() {
    // define the callAPI function that takes a first name and last name as parameters
    userid=$('#useridField').val();
    var getStr=makeURLPairs();
    // instantiate a headers object
    var myHeaders = new Headers();
    // add content type header to object
    myHeaders.append("Content-Type", "application/json");
    // using built in JSON utility package turn object to string and store in a variable
    var raw = JSON.stringify({"ID":userid,"GET_DATA":getStr});
    //console.log("save data: " + raw);
    // create a JSON object with parameters for API call and store in a variable
    console.log(raw);
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };
    // make API call with parameters and use promises to get response
    fetch("https://rvx0qsoxk3.execute-api.us-east-2.amazonaws.com/Virtues_dev/", requestOptions)
    .then(response => response.text())
    .then(result => alert(JSON.parse(result).body))
    .catch(error => console.log('error', error));
};

