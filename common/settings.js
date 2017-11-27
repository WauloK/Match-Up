import { settingsStorage } from "settings";
import * as messaging from "messaging";
import * as anim from "../common/animate";
import { prefs, save, load } from "../common/preferences";

// Listen for messages from the companion
messaging.peerSocket.onmessage = function(evt) {
  if (evt.data) {
    var dataName = evt.data.name; 
    var dataKey  = evt.data.key;
    var dataVal  = evt.data.val;
    if (dataName == "settings" && dataKey == "cardBack") {
      prefs.cardBack = dataVal;
      prefs.cardBackChanged = true;
    }
     else if (dataName == "settings" && dataKey == "cardFace") {
      prefs.cardFace = dataVal;
      prefs.cardFaceChanged = true;
    }
  }
}

// Listen for the onerror event
messaging.peerSocket.onerror = function(err) {
  // Handle any errors
  console.log("Connection error: " + err.code + " - " + err.message);
}

// Listen for the onopen event
messaging.peerSocket.onopen = function() {
  // Ready to send or receive messages
  //console.log("Connection to Companion open!!");
}

export function loadCardBack(cardBack) {
  if (typeof prefs.cardBack !== "undefined") {
  cardBack = prefs.cardBack;
  updateCardBacks(cardBack,cardsShowingArray);
  }
  return cardBack;
}

export function loadCardFace(cardFace) { 
if (typeof prefs.cardFace !== "undefined") {
  cardFace = prefs.cardFace;
  updateCardFaces(cardFace,cardArray,cardsShowingArray);
  }
  return cardFace;
}