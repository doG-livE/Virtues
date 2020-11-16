function updateInspirationTable(amountSpentVal, areaSpentStr, amountEarnedVal) {
    "use strict";
    // call update character sheet
    // amount spent and amount earned are values, areaSpent is string;
    // if passing inspiration earned, add that to the earned dialog.
    if (amountEarnedVal) {
        inspirationEarned+=amountEarnedVal;
        $('#inspirationEarnedField').val(inspirationEarned);
    }
    // should support spend and earn at the same time action, though that may be unlikely
    if (amountSpentVal) { 
        inspirationSpent+=amountSpentVal; 
        //$('#inspirationSpentField').val(inspirationSpent);
        var tempVal=$('#inspiration'+areaSpentStr+'SpentField').val();
        $('#inspiration'+areaSpentStr+'SpentField').val(parseInt(tempVal)+amountSpentVal);
    }
    
    // checking radio buttons for every call, also calculate totals
    // NOTE: the event manager for the primary / secondary pulldown should probably adjust the base values
    // this function is only adjusting the text fields for accounting one free, plus primary and seconday free
    // first set from radio buttons, then set in fields, subtract one for free virtues
    var tempCourage=parseInt($("input[name='courageValue']:checked").val())-1;
    var tempCompassion=parseInt($("input[name='compassionValue']:checked").val())-1;
    var tempClever=parseInt($("input[name='cleverValue']:checked").val())-1;
    $('#inspiration'+'Courage'+'SpentField').val(tempCourage);
    $('#inspiration'+'Compassion'+'SpentField').val(tempCompassion);
    $('#inspiration'+'Clever'+'SpentField').val(tempClever);
    // now subtract the primary and the secondary values
    // Note: this may end as negative if it started at 0, 1, or 2
    var tempPrimaryCalling=parseInt($('#inspiration'+$('#callingDropDownPrimary').val()+'SpentField').val());
    var primaryCalling=$('#callingDropDownPrimary').val().toLowerCase();
    var selectedPrimaryCallingValue="";
    if ($('#callingDropDownPrimary').val() == $('#callingDropDownSecondary').val()) {
        tempPrimaryCalling+=-3;
        //console.log(parseInt($("input[name='"+primaryCalling+"Value']:checked").val()));
        selectedPrimaryCallingValue=parseInt($("input[name='"+primaryCalling+"Value']:checked").val());
        if (selectedPrimaryCallingValue > 6) {
            // one extra point cost for 6-9
            tempPrimaryCalling=tempPrimaryCalling+selectedPrimaryCallingValue-6;
        }
        if (selectedPrimaryCallingValue > 9) {
            // one extra point cost for 10
            tempPrimaryCalling=tempPrimaryCalling+selectedPrimaryCallingValue-9;
        }
        $('#inspiration'+$('#callingDropDownPrimary').val()+'SpentField').val(tempPrimaryCalling);
    }
    else {
        tempPrimaryCalling+=-2;
        var selectedPrimaryCallingValue=parseInt($("input[name='"+primaryCalling+"Value']:checked").val());
        if (selectedPrimaryCallingValue > 5) {
            // one extra point cost for 5-8
            tempPrimaryCalling=tempPrimaryCalling+selectedPrimaryCallingValue-5;
        }
        if (selectedPrimaryCallingValue > 8) {
            // one extra point cost for 9-10
            tempPrimaryCalling=tempPrimaryCalling+selectedPrimaryCallingValue-8;
        }
       $('#inspiration'+$('#callingDropDownPrimary').val()+'SpentField').val(tempPrimaryCalling);

        var tempSecondaryCalling=parseInt($('#inspiration'+$('#callingDropDownSecondary').val()+'SpentField').val());
        tempSecondaryCalling+=-1;
        var secondaryCalling=$('#callingDropDownSecondary').val().toLowerCase();
        var selectedSecondaryCallingValue=parseInt($("input[name='"+secondaryCalling+"Value']:checked").val());
        //console.log(secondaryCalling)
        //console.log(selectedSecondaryCallingValue)
        if (selectedSecondaryCallingValue > 3) {
            // one extra point cost for 4-6
            tempSecondaryCalling=tempSecondaryCalling+selectedSecondaryCallingValue-4;
        }
        if (selectedSecondaryCallingValue > 6) {
            // one extra point cost for 7-9
            tempSecondaryCalling=tempSecondaryCalling+selectedSecondaryCallingValue-7;
        }
        if (selectedSecondaryCallingValue > 9) {
            // one extra point cost for 10
            tempSecondaryCalling=tempSecondaryCalling+selectedSecondaryCallingValue-9;
        }
        $('#inspiration'+$('#callingDropDownSecondary').val()+'SpentField').val(tempSecondaryCalling);
    }
    // for any not selected as primary, or secondary, calculate here
    var callingsArray = ["Compassion","Courage","Clever"];
    var arrayLength = callingsArray.length;
    for (var i = 0; i < arrayLength; i++) {
        var testVal=(callingsArray[i]);
        //var testVal="Compassion";
        //console.log(testVal)
        var tempCalling=-1
        if (testVal.toLowerCase() != primaryCalling && testVal.toLowerCase() !=secondaryCalling ) {
            //console.log(testVal);
            var tempSelected=parseInt($("input[name='"+testVal.toLowerCase()+"Value']:checked").val());
            //console.log(tempSelected);
            if (tempSelected > 3) {
                // one extra point cost for 4-6
                tempCalling=tempCalling+tempSelected-4;
            }
            if (tempSelected > 6) {
                // one extra point cost for 7-9
                tempCalling=tempCalling+tempSelected-7;
            }
            //console.log(tempCalling);
            if (selectedSecondaryCallingValue > 9) {
                // one extra point cost for 10
                tempCalling=tempCalling+tempSelected-9;
            }
               $('#inspiration'+ testVal +'SpentField').val(tempCalling+tempSelected);
        }
    }

    // update inspiration remaining
    // update temp values to new ones from the calling, and first free calculations
    //tempCourage=parseInt($("input[name='courageValue']:checked").val());
    //tempCompassion=parseInt($("input[name='compassionValue']:checked").val());
    //tempClever=parseInt($("input[name='cleverValue']:checked").val());
    // and techniques and bearings ...
    // remove 3 points for starting techs 
    if (techValAdjust!=0) { 
        $('#inspirationTechSpentField').val(parseInt($('#inspirationTechSpentField').val())+techValAdjust);
        techValAdjust=0;
        console.log($('#inspirationTechSpentField').val())
    }
    var tempTechSpent=parseInt($('#inspirationTechSpentField').val());
    var tempBearingSpent=parseInt($('#inspirationBearingSpentField').val());
    var tempInspirationEarned=parseInt($('#inspirationEarnedField').val());
    var c1=parseInt($('#inspirationCleverSpentField').val())+1;
    var c2=parseInt($('#inspirationCompassionSpentField').val())+1;
    var c3=parseInt($('#inspirationCourageSpentField').val())+1;
    // there are the first 3 "free" virtue points from the callings, subtract from the total.
    var tempCallingAdjust=3;
     // set the field to earned less spent.
    // This could have used less variables, but I wanted to be sure I got them all, so I'm using different variables for each thing at the moment
    var tempInspirationSpent=c1+c2+c3+tempTechSpent+tempBearingSpent-tempCallingAdjust;
    $('#inspirationSpentField').val(tempInspirationSpent);
    $('#inspirationRemainingField').val(tempInspirationEarned-tempInspirationSpent);

};
