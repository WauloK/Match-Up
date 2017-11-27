// Import the messaging module
import * as messaging from "messaging";
import { settingsStorage } from "settings";
import * as messaging from "messaging";

// Listen for the onerror event
messaging.peerSocket.onerror = function(err) {
  // Handle any errors
  console.log("Connection error: " + err.code + " - " + err.message);
}

// Listen for the onopen event
messaging.peerSocket.onopen = function() {
  // Ready to send or receive messages
  //console.log("Connection is open! :D");
}

// ------ Settings section ------
// Settings have been changed
settingsStorage.onchange = function(evt) {
  sendValue(evt.key, evt.newValue);
}

// Settings were changed while the companion was not running
if (me.launchReasons.settingChanged) {
  // Send the value of the setting
}

function sendValue(key, val) { 
  var cardName = JSON.parse(val).values[0].name;
  if (val) {
    sendSettingData({
      key: key,
      val: cardName
    });
  }
}

function sendSettingData(data) {
  // If we have a MessageSocket, send the data to the device
  if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) { 
    data.name = "settings";
    messaging.peerSocket.send(data);
  } else {
    console.log("No peerSocket connection: " + messaging.peerSocket.readyState);
  }
}