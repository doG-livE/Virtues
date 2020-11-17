//initial test values and data names
var fullLogNames={ // all the fields
    "SOURCE_NAME": "sourceName",
    "SOURCE_ID": "sourceID",
    "MESSAGE": "message",
    "TIME_STAMP": "timeStamp",
    "ROUND": "round",
    "ROLL": "roll",
    "FOCUS_SPENT": "focusSpent",
    "COST": "cost",
    "TECHNIQUE": "technique",
    "PARTY_ID": "partyID",
    "TARGET_IDS": "targetIDs",
    "MODIFIERS": "modifiers",
    "MORALE": "morale",
    "HOPE": "hope",
    "BACKGROUND": "background",
    "PLAYER_NAME": "playerName",
    "FOCUS_END": "focusEnd",
    "FOCUS_START": "focusStart",
    "ACTION_TYPE": "actionType",
    "RESULT": "result",
    "GATHER": "gather"
};

var playerChatLogNames={ // all the fields
    "SOURCE_NAME": "sourceName",
    "SOURCE_ID": "sourceID",
    "MESSAGE": "message"
};

function sendChatText(_message,_id){
    // format message as {"action" : "onMessage" , "message" : "Message"}
    //console.log(this);
    let outgoingMessage = '{"action" : "onMessage" , "message" : "' + _message + '"}';
    socket.send(outgoingMessage);
    console.log(_message+" -  sent")
    
    // update the log message (should be initialized in the chat.js file)
    playerChatLogNames.MESSAGE=_message;
    playerChatLogNames.SOURCE_ID=_id;
    playerChatLogNames.SOURCE_NAME="PlayerChat";
    //console.log(playerChatLogNames);

    saveLogMessage(playerChatLogNames);
    //return false;        
}

function saveLogMessage(_data) {
    // save the message to the log
    // note: data must contain SOURCE_NAME            
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var _dataJSON = JSON.stringify(_data);
    console.log(_dataJSON);
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: _dataJSON,
        redirect: 'follow'
    };
    // make API call with parameters and use promises to get response
    fetch("https://oefy7ib51f.execute-api.us-east-2.amazonaws.com/dev/", requestOptions)
    .then(response => response.text())
    .then(result => alert(JSON.parse(result).body))
    .catch(error => console.log('error', error));        
}

