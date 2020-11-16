$(document).ready(function () {

    $('ul.tabs li').click(function () {         //changing tabs in the Dashboard.
        var tab_id = $(this).attr('data-tab');

        $('ul.tabs li').removeClass('current');
        $('.tab-content').removeClass('current');

        $(this).addClass('current');
        $("#" + tab_id).addClass('current');
    });

    $('ul.lg-tabs li').click(function () {         //changing big dashboard/cb/comp tabs
        var tab_id = $(this).attr('data-tab');

        $('ul.lg-tabs li').removeClass('current');
        $('.lg-tab-content').removeClass('current');

        $(this).addClass('current');
        $("#" + tab_id).addClass('current');

        if ($(this).text() == "Dashboard") {
            repopulateDashboard();
        }
    });

    $('ul.buy-tabs li').click(function () {         //For Purchase window tabs. I couldn't find a way to do all types of tabs with one function. If you find one, go for it
        var tab_id = $(this).attr('data-tab');

        $('ul.buy-tabs li').removeClass('current');
        $('.buy-tab-content').removeClass('current');

        $(this).addClass('current');
        $("#" + tab_id).addClass('current');
    });

    $('.callingDropDown').change(function () {         //When primary Calling is chosen from dropdown in dashboard, change to appropriate font color and fetch callings.
        let callingChoice = $(this).val();
        let callingColor = fetchColor(callingChoice);

        $("#primaryCallingDiv").css("color", callingColor);
        document.getElementById($(this).attr('data-span')).style.color = callingColor;

        primaryVirtue = $('#callingDropDownPrimary').val();
        secondaryVirtue = $('#callingDropDownSecondary').val();

        document.getElementById("initialCallingContainer").innerHTML = "";

        for (let i = 0; i < virtuesJson.length; i++) {
            if (virtuesJson[i].techIsCalling == primaryVirtue || virtuesJson[i].techIsCalling == "sec" + secondaryVirtue || virtuesJson[i].techIsCalling == primaryVirtue + "/" + secondaryVirtue) {
                addCard(i, "initialCallingContainer");
                // also add to list of cards for images i fmissing
                if (!cardsForImagesArray.includes(i)) {
                    cardsForImagesArray.push(i);
                }
            }
            else {
                // remove any calling techniques that may have been from a different calling
                if (virtuesJson[i].techIsCalling && cardsForImagesArray.includes(i)) {
                    var index = cardsForImagesArray.indexOf(i);
                     if (index > -1) {
                        cardsForImagesArray.splice(index, 1);
                    };
                }
            }
        }
    });

    $('.cardDropDown').change(function () {         //when a display-related dropdown is changed, populate its corresponding div
        populateCardDisplay($(this).val(), $(this).data('targetdiv'));
    });
    
    $('.searchBearings').change(function () {         //when a display-related dropdown is changed, populate its corresponding div
        populateCardDisplay($(this).val(), $(this).data('targetdiv'),"SearchBearings");
    });

    $('.searchTechniques').change(function () {         //when a display-related dropdown is changed, populate its corresponding div
        populateCardDisplay($(this).val(), $(this).data('targetdiv'),"SearchTechniques");
    });


    $('#rulesDropDown').change(function () {         //The dropdown in rules compendium tab
        ruleIndex = $("#rulesDropDown").val();
        displayRule(ruleIndex);
    });

    $('#printableDropDown').change(function () {         //The dropdown in canvas printing tab
        populateCardDisplay($(this).val(), $(this).data('targetdiv'));
 //   this is where we need to let the user download the jpgs.
    });

    $(".prompt-replace").click(function () {    //Class only used to add onclick event so strings can change to other strings
        "use strict";
        let newText = prompt($(this).data('prompt'));
        if (newText != null && newText != "") {
            this.innerText = newText;
            charName=newText;
        }
    });

    $(".focusBuy").click(function () {      //Class only used to increase the Virtue numbers when they are clicked
        "use strict";

        inspirationSpent++;
        let newNum = parseInt(this.innerText);
        newNum++;
        this.innerHTML = newNum + " (click here to level up)";
    });
})
