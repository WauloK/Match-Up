import document from "document";
import { vibration } from "haptics";
import * as anim from "../common/animate";
import * as game from "../common/game";
import * as settings from "../common/settings";
import { prefs, save, load } from "../common/preferences";

// Get handles to elements
var startButton = document.getElementById("startButton");
var restartButton = document.getElementById("restartButton");
var myButton = document.getElementById("myButton");

// Declare handle to timer
var cardTimer;

// Create card arrays
var cardArray = new Array();
var cardsShowingArray = new Array();

// Card 1 or 2 touched
let card1Played = false;

// Initial cardFace type
let cardFace = "Trees";

// Initial cardBack
let cardBack = "One";

// Load saved settings
cardBack = settings.loadCardBack(cardBack);
cardFace = settings.loadCardFace(cardFace);
prefs.cardFaceChanged = false;
prefs.cardBackChanged = false;

// Store card values
let cardPicked1 = 0;
let cardPicked2 = 0;
let pickedCard1 = 0;
let currentlyTurning = false;

// How many cards showing
let cardsShowing = 0;

// Constants
let LAYERTOP = 2;
let LAYERBOT = 1;

// Configure modes for gamestate
var gameMode = {
  TITLE: 1,
  RUNNING: 2,
  GAMEOVER: 3,
};

// Initialize gameState
var gameState = gameMode.TITLE;

// Set layers for buttons to use
startButton.layer = LAYERTOP;
myButton.layer = LAYERBOT;
restartButton.layer = LAYERBOT;
restartButton.style.display = "none";

// Start button was touched
startButton.onmouseup = function(evt) {
  if (gameState != gameMode.TITLE) return;
  // Initialize card arrays
  cardArray = game.initializeCardArray(cardArray);
  cardsShowingArray = game.initializeCardsShowingArray(cardsShowingArray);
  // Hide elements on Title page. Show cards.
  anim.hideMenu();
  anim.showCards();
  // Vibrate to let player know START successfully hit
  vibration.start("confirmation");
  // Disable start button. Enable touchscreen button
  startButton.layer = LAYERBOT;
  myButton.layer = LAYERTOP;
  gameState = gameMode.RUNNING;
  cardArray = game.startGame(cardArray);
  cardTimer = setInterval(updateCardChanges, 1000);
}

// Restart button was touched
restartButton.onmouseup = function(evt) {
  if (gameState != gameMode.GAMEOVER) return;
  anim.hideCards();
  anim.showMenu();
  gameState = gameMode.TITLE;
  startButton.layer = LAYERTOP;
  myButton.layer = LAYERBOT;
  restartButton.style.display = "none";
  anim.turnOverAllCards(cardBack);
}

// Big button representing Cards was touched
myButton.onmouseup = function(evt) {
  if (gameState != gameMode.RUNNING) return;
  if (currentlyTurning) return;
  var cardX; var cardY;
  let x = evt.screenX; let y = evt.screenY;
  if (x > 49 && x < 299 && y > -1 && y < 251) {
    // Work out card touched
    cardX = Math.round((x -50)/62)-1; cardY = Math.round((y -1)/62)-1;
    cardX = (cardX > -1) ? cardX : 0;
    cardY = (cardY > -1) ? cardY : 0;
    // Card Array number
    let thisCard = cardX + (cardY * 4);
    let cardValue = cardArray[thisCard];
    // If card is already showing
    if (cardsShowingArray[thisCard]) return;
    // Vibrate to let player know selection is valid
    vibration.start("bump");
    // Turn over card for player
    anim.showCard(cardFace, cardValue, thisCard);
    // If it's the first card turned...
    if (! card1Played) {
      card1Played = true;
      cardPicked1 = cardArray[thisCard];
      cardsShowingArray[thisCard] = true;
      pickedCard1 = thisCard;
    }
    // Otherwise...
    else {
      card1Played = false;
      cardPicked2 = cardArray[thisCard];
      cardsShowingArray[thisCard] = true;
    
      // Are the cards the same values?
      if (cardPicked1 == cardPicked2) {
        // Play vibration to notify player
        vibration.start("confirmation");
        cardsShowing += 2;
        if (cardsShowing == 16) {
          // Game completed!!! :) :) :)
          clearInterval(cardTimer); // Disable timer
          gameState = gameMode.GAMEOVER;
          restartButton.layer = LAYERTOP;
          myButton.layer = LAYERBOT;
          restartButton.style.display = "inline";
          setTimeout(function() {vibration.start("confirmation-max");}, 200)
        }
      }
      else {
        // Cards were different
        currentlyTurning = true;
        cardsShowingArray[pickedCard1] = false;
        cardsShowingArray[thisCard] = false;
        setTimeout(function() { anim.hideCard(cardBack, pickedCard1);}, 1000)
        setTimeout(function() { anim.hideCard(cardBack, thisCard); currentlyTurning = false;}, 1000)
      }
    }
  }
}

function updateCardChanges() {
    // Check if settings changed cardBack or cardFace
    if ( typeof prefs.cardBackChanged !== "undefined" && prefs.cardBackChanged ) {
      prefs.cardBackChanged = false;
      anim.updateCardBacks(prefs.cardBack, cardsShowingArray);
      cardBack = prefs.cardBack;
    }
    if ( typeof prefs.cardFaceChanged !== "undefined" && prefs.cardFaceChanged ) {
      prefs.cardFaceChanged = false;
      anim.updateCardFaces(prefs.cardFace, cardArray, cardsShowingArray);
      cardFace = prefs.cardFace;
    }    
}