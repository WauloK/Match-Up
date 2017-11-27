// Set all card values in array to zero
export function initializeCardArray(cardArray) {
  for (var i = 0; i < 16; i++) {
    cardArray[i] = 0;
  }
  return cardArray;
}

export function initializeCardsShowingArray(cardsShowingArray) {
  for (var i = 0; i < 16; i++) {
    cardsShowingArray[i] = false;
  }
  return cardsShowingArray;
}

// Execute start game functions
export function startGame(cardArray) {
  // Assign random Cards to array
  randomizeCards(cardArray);
  return cardArray;
}

// Pick cards randomly and assign values
function randomizeCards(cardArray) {
  for (var faceNo = 1; faceNo < 9; faceNo++) {
    let cardNo = pickCard(cardArray);
    cardArray[cardNo] = faceNo;
    let cardNo = pickCard(cardArray);
    cardArray[cardNo] = faceNo;
  }
  return cardArray;
}

// Pick a card with no value to return
function pickCard(cardArray) {
  do {
    let pickedCard = Math.floor(Math.random() * 16); 
  }
  while (cardArray[pickedCard] != 0)
   // console.log("Picked="+pickedCard);
  return pickedCard;
}