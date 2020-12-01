
// set global variable for the 
var currentStatusNames = {
    "USERID":"",
    "NAME": "",
    "PARTYID": "",
    "FOCUS":"",
    "MORALE": "",
    "HOPE": "",
    "FORCE_MOD":"",
    "ROOM_NAME":"",
}
var partyMembersAr=[];


function readPlayerData(_ID) {
    var raw = JSON.stringify({"KEY":"ID","VALUE":_ID,"TABLE_NAME":"VIRTUES_SAVES"});
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };
    const fetchPromise = fetch("https://3u99pwarzl.execute-api.us-east-2.amazonaws.com/Virtues_dev/", requestOptions);
    fetchPromise.then(response => {
        save1=response.json();
        return save1;
    }).then(result => {
        save1=result.body;
        getStr="?"+JSON.parse(save1).GET_DATA
        urlParams = new URLSearchParams(getStr);
        $(document).ready(() => {
            $('#courageField').val(urlParams.get('l1'));
            $('#compassionField').val(urlParams.get('l2'));
            $('#cleverField').val(urlParams.get('l3'));
            $('#moraleField').val(urlParams.get('m'));
            $('#hopeField').val(urlParams.get('h'));
            $('#nameField').val(urlParams.get('title'));
            return save1;
        });
    });
}

function updateUser(_ID,_num) {
    var raw = JSON.stringify({"KEY":"ID","VALUE":_ID,"TABLE_NAME":"VIRTUES_SAVES"});
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };
    const fetchPromise = fetch("https://3u99pwarzl.execute-api.us-east-2.amazonaws.com/Virtues_dev/", requestOptions);
    fetchPromise.then(response => {
        save1=response.json();
        return save1;
    }).then(result => {
        save1=result.body
        getStr="?"+JSON.parse(save1).GET_DATA;
        urlParams = new URLSearchParams(getStr);
        var _IDJSON=JSON.parse(save1);
        $(document).ready(() => {
            // Add the values for the given player number
            playerDataAr[_num]=
                {"courage":urlParams.get('l1'),
                "compassion":urlParams.get('l2'),
                "clever":urlParams.get('l3'),
                "hope":urlParams.get('h'),
                "morale":urlParams.get('m'),
                "name":urlParams.get('title'),
                "inspiration":urlParams.get('IE'),
                "id":_IDJSON.ID
            };
            // setting the name field
            $('#idField'+_num).val(playerDataAr[_num].id);
            $('#nameField'+_num).val(playerDataAr[_num].name);
            $('#moraleField'+_num).val(playerDataAr[_num].morale);
            // calculate total inspration
            var _total=0;
            for(playerData in playerDataAr) {
                _total+=parseInt(playerDataAr[playerData].inspiration)
            }
            $('#totalInspirationField').val(_total);
            return save1;
        });
    });
}


function readPlayerChatData(_ID) {
    var raw = JSON.stringify({"KEY":"ID","VALUE":_ID,"TABLE_NAME":"VIRTUES_SAVES"});
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };
    const fetchPromise = fetch("https://3u99pwarzl.execute-api.us-east-2.amazonaws.com/Virtues_dev/", requestOptions);
    fetchPromise.then(response => {
        save1=response.json();
        return save1;
    }).then(result => {
        save1=result.body
        getStr="?"+JSON.parse(save1).GET_DATA
        urlParams = new URLSearchParams(getStr);
        $(document).ready(() => {
            $('#chatNameField').val(urlParams.get('title'));
            return save1;
        });
    });
}

function loadPartyIDs(_partyID,_encounterName) {
    var raw = JSON.stringify({"PARTY_ID":_partyID,"TABLE_NAME":"VIRTUES_PARTY","ENCOUNTER_NAME":_encounterName});
    var _dataRead="";
    // remove any old party data.
    playerDataAr=[];
    var _i="";
    // macMembers -> global var
    for(_i = 0; _i < maxMembers; _i++) {
        //console.log($('#idField'+_i).val());
        // clear name and ID fields to reset the party.
        if ($('#idField'+_i).val()) {
            $('#idField'+_i).val("");
        }
        if ($('#nameField'+_i).val()) {
            $('#nameField'+_i).val("");
        }
        if ($('#currentMoraleField'+_i).val()) {
            $('#currentMoraleField'+_i).val("");
        }
        if ($('#currentFocusField'+_i).val()) {
            $('#currentFocusField'+_i).val("");
        }
        if ($('#moraleField'+_i).val()) {
            $('#moraleField'+_i).val("");
        }
        if ($('#currentRoomField'+_i).val()) {
            $('#currentRoomField'+_i).val("");
        }
        $('#totalInspirationField'+_i).val("")
    }
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };
    const fetchPromise = fetch("https://yowtulzb9l.execute-api.us-east-2.amazonaws.com/dev/", requestOptions);
    fetchPromise.then(response => {
        _dataRead=response.json();
        return _dataRead;
    }).then(result => {
        _dataRead=result.body
        //console.log(_dataRead);
        var _partyJSON=JSON.parse(_dataRead)
        var _i=0;
        //console.log(_partyJSON.PARTY_SCENE);
        if (_partyJSON.PARTY_SCENE) {
            // update the encounter if there is one
            scene0.loadFromJSON(_partyJSON.PARTY_SCENE);
        };
        var _partyMembersAr=_partyJSON.PARTY_MEMBERS.split(/\s*,\s*/);
        partyMembersAr=_partyMembersAr;
        //console.log(_partyfocusAr)
        for (_i = 0; _i < _partyMembersAr.length; _i++) {
            updateUser(_partyMembersAr[_i],_i);
            getCurrentPlayerStats(_partyMembersAr[_i],_partyID,_i);
        }

        getPlayers();// update the players list. for the dash page.
        // this will throw an error for pages without the list.
        
        // do not put alert here, it messes with the loops
        console.log("done loading party of "+_i);

    });
    
}
function savePartyIDs() {
    var _str="";
    // up to 10 members in party ... does not preserve party orders ref maxMembers global var
    for(_i = 0; _i < maxMembers; _i++) {
        if ($('#idField'+_i).val()) {
            if(_str) {
                _str+=",";
                _str+=$('#idField'+_i).val();
            }
            else {
                _str+=$('#idField'+_i).val();
                // if there is a userid, update the current stats
                // this is a seperate table from the party for easier updates.
                // populate known values and call ...
                
            }
                var _data = currentStatusNames;
                _data.USERID=$('#idField'+_i).val();
                _data.NAME=$('#nameField'+_i).val();
                _data.PARTYID=$('#partyIdField').val();
                _data.FOCUS=$('#currentFocusField'+_i).val();
                _data.MORALE=$('#currentMoraleField'+_i).val();
                _data.HOPE=$('#currentHopeField'+_i).val();
                _data.FORCE_MOD=$('#force'+_i).val();
                _data.ROOM_NAME=$('#currentRoomField'+_i).val();
                // update for each player
                // console.log(_data);

            postCurrentPlayerStats(_data);
        } 

    }
    var _partyID=$('#partyIdField').val();
    // instantiate a headers object
    var myHeaders = new Headers();
    // add content type header to object
    myHeaders.append("Content-Type", "application/json");
    var _data = {
        "PARTY_ID":_partyID,
        "PARTY_MEMBERS":_str,
        "ENCOUNTER_NAME":$('#encounterNameField').val()
    }
    var _dataJSON = JSON.stringify(_data);
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: _dataJSON,
        redirect: 'follow'
    };
    // make API call with parameters and use promises to get response
    fetch("https://fn067im8bk.execute-api.us-east-2.amazonaws.com/dev/", requestOptions)
    .then(response => response.text())
//    .then(result => alert(JSON.parse(result).body))
    .catch(error => console.log('error', error)); 
}

function getCurrentPlayerStats(_userid,_partyid,_num) {
        var raw = JSON.stringify({"PARTYID":_partyid,"USERID":_userid});
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        const fetchPromise = fetch("https://fbi3x16fa5.execute-api.us-east-2.amazonaws.com/dev", requestOptions);
        fetchPromise.then(response => {
            _dataRead=response.json();
            return _dataRead;
        }).then(result => {
            _dataRead=result.body
            var _currentJSON=JSON.parse(_dataRead)
            var _i=0;
            var _name=_currentJSON.NAME;
            $('#currentMoraleField'+_num).val(_currentJSON.MORALE);
            $('#currentFocusField'+_num).val(_currentJSON.FOCUS);
            $('#currentRoomField'+_num).val(_currentJSON.ROOM_NAME);
            //console.log(_currentJSON);
            // current data should also be stored into the  array NPCCurrentList, add that here
        });
        
    }


function postCurrentPlayerStats(_currentData) {
    // instantiate a headers object
    var myHeaders = new Headers();
    // add content type header to object
    myHeaders.append("Content-Type", "application/json");
    var _data = {
        "USERID":_currentData.USERID,
        "NAME": _currentData.NAME,
        "PARTYID": _currentData.PARTYID,
        "FOCUS": _currentData.FOCUS,
        "MORALE": _currentData.MORALE,
        "HOPE": _currentData.HOPE,
        "FORCE_MOD": _currentData.FORCE_MOD,
        "COMPOSURE_MOD": _currentData.COMPOSURE_MOD,
        "INSPIRATION": _currentData.INSPIRATION,
        "IN_HAND": _currentData.IN_HAND,
        "ON_COOLDOWN": _currentData.ON_COOLDOWN,
        "READY": _currentData.READY,
        "ROOM_NAME": _currentData.ROOM_NAME,
    }
    var _dataJSON = JSON.stringify(_data);
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: _dataJSON,
        redirect: 'follow'
    };
    // make API call with parameters and use promises to get response
    fetch("https://lg5j44cyu3.execute-api.us-east-2.amazonaws.com/dev", requestOptions)
    .then(response => response.text())
//    .then(result => alert(JSON.parse(result).body))
    .catch(error => console.log('error', error));        
}


function updatePartyScene(_partyID,_scene,_userID,_encounterName) {
    // instantiate a headers object
    var sceneJSON0=JSON.stringify(_scene);
    var myHeaders = new Headers();
    // add content type header to object
    // this one is not adding a record, it is for an update to a current record, no need to replace party members
    // pass update=1 to tell API it is update.
    myHeaders.append("Content-Type", "application/json");
    var _data = {
        "PARTY_ID": _partyID,
        "PARTY_SCENE": sceneJSON0,
        "USER_ID": _userID,
        "UPDATE": 1,
        "ENCOUNTER_NAME": _encounterName
    }
    var _dataJSON = JSON.stringify(_data);
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: _dataJSON,
        redirect: 'follow'
    };
    // make API call with parameters and use promises to get response
    fetch("https://fn067im8bk.execute-api.us-east-2.amazonaws.com/dev/", requestOptions)
    .then(response => response.text())
    .then(result => updateRoomSelect("NPCRoom",_scene)) //alert(JSON.parse(result).body))
    .catch(error => console.log('error', error)); 
}


function showLatestScene(_partyID,_sceneTarget,_encounterName) {
    var raw = JSON.stringify({"PARTY_ID":_partyID,"TABLE_NAME":"VIRTUES_PARTY", "ENCOUNTER_NAME":_encounterName});
    // get the PARTY_SCENE data
    var _scene="";

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };
    const fetchPromise = fetch("https://yowtulzb9l.execute-api.us-east-2.amazonaws.com/dev/", requestOptions);
    fetchPromise.then(response => {
        _dataRead=response.json();
        return _dataRead;
    }).then(result => {
        _dataRead=result.body;
        var _partyJSON=JSON.parse(_dataRead);
        _scene =_partyJSON.PARTY_SCENE;
        console.log("done reading scene");
        //console.log(_scene);
        scene0Data=_scene;
        _sceneTarget.loadFromJSON(scene0Data);
        return _scene
        
    });

    //console.log(_scene);
    return scene0Data;
}

// returning promise, completing scan after function call.
async function getAllTableData(_tableName) {
    // store in allNPCTraits
    var raw = JSON.stringify({"TABLE_NAME":_tableName});
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };
    let response = await fetch("https://bgjcen5ru2.execute-api.us-east-2.amazonaws.com/dev", requestOptions);
        
    if (response.status == 200) {
        let _dataRead=await response.json();
        //console.log(_dataRead.body); 
        queryDataHolder= _dataRead.body;     
        return _dataRead
    }
    throw new Error(res.status);
    
}
getAllTableData('database error').catch(console.log); // Error: 404 (4)
        

function saveNPC() {
    // save NPC values to AWS, Keys == NPC_NAME and PARTY_ID.
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    // create arrays for traits. traitsListAr, traitsVisibilityAr
    var _traitsListAr=[];
    var _traitsVisibilityAr=[];
    for (_i=0; _i < maxMembers; _i++ ) {
        if ($("#NPCTrait"+_i).val()) {
            _traitsListAr.push($("#NPCTrait"+_i).val());
            _traitsVisibilityAr.push(document.getElementById("NPCVisibleTrait"+_i).checked)
        }
    }
    //$("#NPCTrait1").val()
    // to allow multiple NPC per encounter, the party id will include the party id and encounter name. (otherwise the current tables do not allow multiples)
    var _comboId = [];
    _comboId[0]=document.getElementById('partyIdField').value;
    _comboId[1]=document.getElementById("encounterNameField").value;

    var _data = {
            "PARTY_ID": JSON.stringify(_comboId),
            "CREATOR_ID": document.getElementById('NPCCreator').value,
            "NPC_NAME": document.getElementById('NPCName').value,
            "NPC_BASE_VISIBILITY":document.getElementById("NPCVisible").checked,
            "NPC_BASE_MORALE": document.getElementById('NPCMoral').value,
            "NPC_BASE_FORCE": document.getElementById('NPCForce').value,
            "NPC_BASE_COMPOSURE": document.getElementById('NPCComposure').value,
            "NPC_BASE_RANGE": document.getElementById('NPCRange').value,
            "NPC_BASE_TRAITS_VISIBLE_AR": JSON.stringify(_traitsVisibilityAr),
            "NPC_TRAITS_AR": JSON.stringify(_traitsListAr),
            "NPC_ROOM_NAME": document.getElementById("NPCRoom").value,
            "ENCOUNTER_NAME": document.getElementById("encounterNameField").value
    }
    var _dataJSON = JSON.stringify(_data);
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: _dataJSON,
        redirect: 'follow'
    };
    //console.log(_data);
    // make API call with parameters and use promises to get response
    fetch("https://7dxqxy0m90.execute-api.us-east-2.amazonaws.com/dev", requestOptions)
    .then(response => response.text())
    //.then(result => alert(JSON.parse(result).body))
    .catch(error => console.log('error', error));        
}
    

async function getNPCOrScanNPCParty(_tableName,_partyID,_NPCName,_encounterName) {
    // get the NPC party members for a party
    // get the NPC current status for the members
    // update the party text lines and/or fields after return
    // API to return all records if not providing both keys. Return matching records if providing keys.
    if (!_tableName) {_tableName="VIRTUES_NPC"};
    // partyid is now a combo, parse it before restingify ...
    //_partyID=JSON.parse(_partyID);
    var _comboId = [];
    _comboId[0]=_partyID;
    _comboId[1]=_encounterName;
    _partyComboID = JSON.stringify(_comboId);
    var raw = JSON.stringify({"TABLE_NAME":_tableName,"NPC_NAME":_NPCName,"PARTY_ID":_partyComboID});

    //console.log(raw);

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };
    //console.log(requestOptions);
    let response = await fetch("https://50ittpn3u4.execute-api.us-east-2.amazonaws.com/dev", requestOptions);
        
    if (response.status == 200) {
        let _dataRead=await response.json();
        //console.log(_dataRead.body); 
        queryDataHolder= _dataRead.body;     
        return _dataRead
    }
    throw new Error(res.status);
}
getAllTableData('database error').catch(console.log); // Error: 404 (4)


function saveDataToTable(_dataStr) {
    // save current NPC data keys need to be included in the _dataStr
    // not data needs table name and PK values.
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: _dataStr,
        redirect: 'follow'
    };
    //console.log(requestOptions);
    // make API call with parameters and use promises to get response (virtues save table row API)
    fetch("https://0s8bii7ypb.execute-api.us-east-2.amazonaws.com/dev", requestOptions)
    .then(response => response.text())
    //.then(result => alert(JSON.parse(result).body))
    .catch(error => console.log('error', error));        
}
