
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

function loadPartyIDs(_partyID) {
    var raw = JSON.stringify({"PARTY_ID":_partyID,"TABLE_NAME":"VIRTUES_PARTY"});
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

        //console.log(_partyfocusAr)
        for (_i = 0; _i < _partyMembersAr.length; _i++) {
            updateUser(_partyMembersAr[_i],_i);
            getCurrentPlayerStats(_partyMembersAr[_i],_partyID,_i);

        }

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
                _data.PARTYID=$('#partyIDField').val();
                _data.FOCUS=$('#currentFocusField'+_i).val();
                _data.MORALE=$('#currentMoraleField'+_i).val();
                _data.HOPE=$('#currentHopeField'+_i).val();
                _data.FORCE_MOD=$('#force'+_i).val();
                _data.ROOM_NAME=$('#currentRoomField'+_i).val();
                // update for each player
                console.log(_data);

            postCurrentPlayerStats(_data);
        } 

    }
    var _partyID=$('#partyIDField').val();
    // instantiate a headers object
    var myHeaders = new Headers();
    // add content type header to object
    myHeaders.append("Content-Type", "application/json");
    var _data = {
        "PARTY_ID":_partyID,
        "PARTY_MEMBERS":_str
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


function updatePartyScene(_partyID,_scene,_userID) {
    // instantiate a headers object
    var myHeaders = new Headers();
    // add content type header to object
    // this one is not adding a record, it is for an update to a current record, no need to replace party members
    myHeaders.append("Content-Type", "application/json");
    var _data = {
        "PARTY_ID": _partyID,
        "PARTY_SCENE": _scene,
        "USER_ID": _userID,
        "UPDATE": 1
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


function showLatestScene(_partyID,_sceneTarget) {
    var raw = JSON.stringify({"PARTY_ID":_partyID,"TABLE_NAME":"VIRTUES_PARTY"});
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

    console.log(_scene);
    return scene0Data;
}