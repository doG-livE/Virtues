function alphabetizeJson() {
    "use strict";
    virtuesJson.sort(getSortOrder("cardTitle"));
}


function getSortOrder(parameter) {
    //borrowed this function from stackexchange, waaaay more succint than how I was alphabetizing
    return function (a, b) {
        if (a[parameter] > b[parameter]) {
            return 1;
        } else if (a[parameter] < b[parameter]) {
            return -1;
        }
        return 0;   //if they are equal
    }
}


function alphabetizeRulesDropdown() {      //Simple enough, alphabetizes rules items and populates a dropdown with them
    "use strict";
    rulesJson.sort(getSortOrder("rulesTitle"));
    let dropdownInnardsString = "";

    for (let i = 0; i < rulesJson.length; i++) {
        dropdownInnardsString += '<option value="' + i + '">' + rulesJson[i].rulesTitle + '</option>';
    }
    document.getElementById("rulesDropDown").innerHTML = dropdownInnardsString;
}
