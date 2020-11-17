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
        save1=result.body
        //console.log(save1);
        //console.log(JSON.parse(save1).GET_DATA);
        getStr="?"+JSON.parse(save1).GET_DATA
        //console.log(getStr);
        urlParams = new URLSearchParams(getStr);
        //console.log(urlParams);
        //console.log("l1: "+urlParams.get('l1'));
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
        //console.log(save1);
        getStr="?"+JSON.parse(save1).GET_DATA
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
            //console.log(playerDataAr[_num]);
            // setting the name field
            $('#idField'+_num).val(playerDataAr[_num].id);
            $('#nameField'+_num).val(playerDataAr[_num].name);
            // calculate total inspration
            var _total=0;
            for(playerData in playerDataAr) {
                _total+=parseInt(playerDataAr[playerData].inspiration)
                //console.log(_total)
            }
            $('#totalInspirationField').val(_total);
            return save1;
        });
    });
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
        save1=result.body
        //console.log(save1);
        //console.log(JSON.parse(save1).GET_DATA);
        getStr="?"+JSON.parse(save1).GET_DATA
        //console.log(getStr);
        urlParams = new URLSearchParams(getStr);
        //console.log(urlParams);
        //console.log("l1: "+urlParams.get('l1'));
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
        console.log(save1);
        getStr="?"+JSON.parse(save1).GET_DATA
        //console.log(getStr);
        urlParams = new URLSearchParams(getStr);
        //console.log(urlParams);
        //console.log("l1: "+urlParams.get('l1'));
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
        var _partyMembersAr=_partyJSON.PARTY_MEMBERS.split(/\s*,\s*/);
        //console.log(_partyMembersAr)
        _partyMembersAr.forEach(_member => {
            //$('#idField'+_i).val(_partyMembersAr[_i]);
            updateUser(_member,_i)
            _i++
        });
        // do not put alert here, it messes with the loops
        console.log("done loading party of "+_i);
    });
    
}
function savePartyIDs() {
    var _str="";
    // up to 10 members in party ... does not preserve party orders ref maxMembers global var
    for(_i = 0; _i < maxMembers; _i++) {
        //console.log($('#idField'+_i).val());
        if ($('#idField'+_i).val()) {
            if(_str) {
                _str+=",";
                _str+=$('#idField'+_i).val();
            }
            else {
                _str+=$('#idField'+_i).val();
            }
        }
    }
    //console.log(_str);
    var _partyID=$('#partyIDField').val();
    // instantiate a headers object
    var myHeaders = new Headers();
    // add content type header to object
    myHeaders.append("Content-Type", "application/json");
    var _data = {
        "PARTY_ID":_partyID,
        "PARTY_MEMBERS":_str
    }
    //console.log(_data);
    var _dataJSON = JSON.stringify(_data);
    //console.log(_dataJSON);
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: _dataJSON,
        redirect: 'follow'
    };
    // make API call with parameters and use promises to get response
    fetch("https://fn067im8bk.execute-api.us-east-2.amazonaws.com/dev/", requestOptions)
    .then(response => response.text())
    .then(result => alert(JSON.parse(result).body))
    .catch(error => console.log('error', error));        
}
