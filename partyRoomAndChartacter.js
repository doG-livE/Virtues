function updateRoomSelect(_selectListName, _scene) {
    // first, remove all the items
    var _sel = document.getElementById(_selectListName);
    while(_sel.options.length > 1) {
        _sel.removeChild( _sel.options[1] );
    }
    // loop through the scene objects, get any with labels,
    var _i=0;
    var _label="";
  
    for (_i = 0; _i < _scene._objects.length; _i++) {
        if (_scene._objects[_i].label) {_label=_scene._objects[_i].label};
        if (_label) {
            var _opt = document.createElement('option');
            _opt.text = _label;
            _opt.value = _label;
            _sel.add(_opt, _sel[_i+1]); // keeping level 0 unchanged
        }
    }
}


function updateTraitSelectList(_selectListName){
    // get the trais from AWS, update list(s).
    // stores traits in queryDataHolder
    // get the trait data if missing
    if (!allNPCTraits) {
        allNPCTraits=getAllTableData("VIRTUES_TRAITS");
    }
    allNPCTraits.then((allNPCTraits) => { // complete the DB read from the function
        allNPCTraits=allNPCTraits.body
        // loop through the select lists
        for (_j=0; _j <maxMembers; _j++) {
            // run for each select list to update.
            var _sel = document.getElementById(_selectListName+_j);
            if (_sel && allNPCTraits) {
                // first, remove all the items
                while(_sel.options.length > 1) {
                    _sel.removeChild( _sel.options[1] );
                }
                //use API query data
                for (_i = 0; _i < allNPCTraits.length; _i++) {
                    var _opt = document.createElement('option');
                    _opt.text = allNPCTraits[_i].TRAIT_NAME+" -- "+allNPCTraits[_i].TRAIT_TIP;
                    _opt.value = allNPCTraits[_i].TRAIT_NAME;
                    _sel.add(_opt, _sel[_i+1]); // keeping level 0 unchanged
                }
            } 
        }
    });
}


function addPlayerNames() {
    textHeight=100;
    for (_i = 0; _i < maxMembers; _i++) {
        if ($('#nameField'+_i).val()) {
            var PCNameText = new fabric.Text($('#nameField'+_i).val(), { left: 30, top: textHeight, fontSize: PCNameFontSize, fontWeight: "bold", linethrough: false });
            // add player banes to canvas, move down for next one.
            scene0.add(PCNameText);
            textHeight+=PCNameFontSize+10;
        }   
    }
}

function addBox() {
    var newBox = new fabric.Rect({
    top: 30, left: 30, width: 120, height: 80, fill: 'yellow' });
    scene0.add(newBox);
}

function addRoom() {
    var newBox = new LabeledRect({
    width: 150,height: 120,left: 100,top: newHeight,label: $('#newRoomNameField').val(),fill: '#faa', rx:10, ry:10 });
    scene0.add(newBox);
    newHeight+=75;
    if (newHeight > 350) {newHeight=25};
    //update the pulldown for room changes
    updateRoomSelect("NPCRoom",scene0);
}

function freeDrawToggle() {
    if (freeDrawBool) {
        //turn off
        freeDrawBool=0;
    }
    else {
        freeDrawBool=1;
    }
    scene0.freeDrawingBrush.color="orange";
    scene0.freeDrawingBrush.width="10";
    scene0.isDrawingMode=freeDrawBool;
}

function updateClients() {
    // use the chat socket to send the scene updates to the clients.
    // they should redraw the scene with the new canvas data.
    //fabric.Canvas#toObject()

    // get the data, can be either as object or as string.
    var sceneJSON0=JSON.stringify(scene0);
    var sceneObject0=scene0.toObject();

    // send to clients as message
    // let the players know that the scene is updated, also trigger for auto-update.
    sendChatText("NOTIFY: Player updated scene",$('#chatIdField').val(),$('#chatNameField').val());

    // save scene to AWS party data table. currently only one scene allowed per party.
    updatePartyScene($('#partyIDField').val(),sceneJSON0,$('#chatIdField').val());
};

function deleteSelectedItem(){
    scene0.remove(scene0.getActiveObject());
    updateRoomSelect("NPCRoom",scene0);
};


