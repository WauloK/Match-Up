import document from "document";

// Set up variables
let Header = document.getElementById("Header");
let startButton = document.getElementById("startButton");
let OziByteLogo = document.getElementById("OziByteLogo");

// Hide/Show menu
export function hideMenu() {
  Header.style.display = "none";
  startButton.style.display = "none";
  OziByteLogo.style.display = "none";
}

export function showMenu() {
  Header.style.display = "inline";
  startButton.style.display = "inline";
  OziByteLogo.style.display = "inline";
}

// Hide/Show Cards
export function hideCards() {
  var tempCard;
  for (var i=0; i< 16; i++) {
    tempCard = document.getElementById("Card"+i);
    tempCard.style.display = "none";
  } 
}

export function showCards() {
  var tempCard;
  for (var i=0; i< 16; i++) {
    tempCard = document.getElementById("Card"+i); 
    tempCard.style.display = "inline";
  } 
}

export function showCard(cardFace, cardValue, thisCard) {
  var cardIMG = document.getElementById("Card"+thisCard);
  cardIMG.href = cardFace + "-" + cardValue + ".png";
}

export function hideCard(cardBack, thisCard) {
  var cardIMG = document.getElementById("Card"+thisCard);
  cardIMG.href = "cardBack" + "-" + cardBack + ".png";
}

export function turnOverAllCards(cardBack) {
  var tempCard;
  for (var i=0; i< 16; i++) {
    tempCard = document.getElementById("Card"+i);
    tempCard.href = "cardBack" + "-" + cardBack + ".png";
  } 
}

export function updateCardFaces(cardFace,cardArray,cardsShowingArray) {
  var tempCard;
  for (var i = 0; i < 16; i++) {
    if (cardsShowingArray[i] == true) { 
      tempCard = document.getElementById("Card"+i);
      tempCard.href = cardFace + "-" + cardArray[i] + ".png";
    }
  }
  return cardsShowingArray;
}

export function updateCardBacks(cardBack,cardsShowingArray) {
  var tempCard;
  for (var i = 0; i < 16; i++) {
    if (cardsShowingArray[i] == false) { 
      tempCard = document.getElementById("Card"+i);
      tempCard.href = "cardBack" + "-" + cardBack + ".png";
    }
  }
  return cardsShowingArray;
}