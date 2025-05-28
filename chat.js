//initial test values and data names
var fullLogNames={ // all the fields
    "SOURCE_NAME": "",
    "SOURCE_ID": "",
    "MESSAGE": "",
    "TIME_STAMP": "",
    "CLIENT_MILLIS": Date.now(),
    "ROUND": "",
    "ROLL": "",
    "FOCUS_SPENT": "",
    "COST": "",
    "TECHNIQUE": "",
    "PARTY_ID": "",
    "TARGET_IDS": "",
    "MODIFIERS": "",
    "MORALE": "",
    "HOPE": "",
    "BACKGROUND": "",
    "PLAYER_NAME": "",
    "FOCUS_END": "",
    "FOCUS_START": "",
    "ACTION_TYPE": "",
    "RESULT": "",
    "GATHER": ""
};

{
    "SOURCE_NAME"
    "SOURCE_ID"
    "MESSAGE"
    "TIME_STAMP"
    "CLIENT_MILLIS"
    "ACTION"

}


var playerChatLogNames={ // all the fields
    "SOURCE_NAME": "sourceName",
    "SOURCE_ID": "sourceID",
    "MESSAGE": "message",
    "CLIENT_MILLIS": Date.now()
};

function sendChatText(_message,_id,_sourceName){
    // format message as {"action" : "onMessage" , "message" : "Message"}
    // note: this needs an open socket
    let outgoingMessage = '{"action" : "onMessage" , "message" : "' + _message + '", "sourceName":"'+_sourceName+'"}';
    socket.send(outgoingMessage);
    
    // update the log message (should be initialized in the chat.js file)
    playerChatLogNames.MESSAGE=_message;
    playerChatLogNames.SOURCE_ID=_id;
    playerChatLogNames.SOURCE_NAME="PlayerChat";
    playerChatLogNames.CLIENT_MILLIS=Date.now();

    saveLogMessage(playerChatLogNames);
    //return false;        
}

function rollD6Chat(_thisManyRolls,_id,_sourceName) {
    // roll and output to chat
    // for RNG, grab a timestamp, check the last digit.
    var _rollsAr=[];
    var _roll =0;
    for (_i=0;_i<_thisManyRolls;_i++) {
        _roll=Math.floor(Math.random() * 6) + 1;  // returns a random integer from 1 to 6
        _rollsAr.push(_roll);
    }
    // make the message
    console.log(_rollsAr);
    _message="Rolling "+_thisManyRolls+" D6 : ";
    for (_i=0;_i< _rollsAr.length;_i++) {
        _message+=" R"+(_i+1)+" = "+_rollsAr[_i]+"  ";
    }

    let outgoingMessage = '{"action" : "onMessage" , "message" : "' + _message + '", "sourceName":"'+_sourceName+'"}';
    socket.send(outgoingMessage);
    
    // update the log message (should be initialized in the chat.js file)
    playerChatLogNames.MESSAGE=_message;
    playerChatLogNames.SOURCE_ID=_id;
    playerChatLogNames.SOURCE_NAME="PlayerRollD6s";
    playerChatLogNames.CLIENT_MILLIS=Date.now();

    saveLogMessage(playerChatLogNames);
    //return false;      
}

function saveLogMessage(_data) {
    // save the message to the log
    // note: data must contain SOURCE_NAME
    // note: this does not use a socket            
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var _dataJSON = JSON.stringify(_data);
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: _dataJSON,
        redirect: 'follow'
    };
    // make API call with parameters and use promises to get response
    fetch("https://oefy7ib51f.execute-api.us-east-2.amazonaws.com/dev/", requestOptions)
    .then(response => response.text())
//    .then(result => console.log(JSON.parse(result).body))
    .catch(error => console.log('error', error));        
}

