"use strict";

const BASE_URL = "https://deckofcardsapi.com/api/deck";
const DECK_COUNT = 1;

let cardsRemaining = 52;
let deckId = "";

/** Function draws a card from the deck using the Deck of Cards API
 *  If a deck id does not exist, then a new deck is used
 *  Returns card as an object like 
 *  {
 *    code: "KH"
 *    image: "https://..."
 *    images: {svg: "https://..."}
 *    suit: "HEARTS"
 *    value: "KING", 
 *  }
*/
async function getACard(){
  const response = await axios({
    method: "GET",
    url: `${BASE_URL}/${deckId ? deckId: 'new'}/draw/?count=1`
  });
  const card = response.data.cards[0];

  if (card) {
    cardsRemaining = response.data.remaining;
    deckId = response.data.deck_id;
  }

  return card;
}

/** Function displays card to DOM. */
function displayCard(card){
  const newImage = document.createElement("img");
  let degreeRotate = Math.random() * 90 - 45;
  let x = Math.random() * 40 - 20;
  let y = Math.random() * 40 - 20;

  newImage.src = card.image;
  newImage.style.transform = `translate(${x}px, ${y}px) rotate(${degreeRotate}deg`;
  document.getElementById('card-area').appendChild(newImage);
}

/** Function draws and displays a card if button is clicked. */
async function drawAndDisplayCard(evt){
  const card = await getACard(deckId);
  displayCard(card);

  // If all 52 cards for current deck have been drawn, remove event listener
  if (!cardsRemaining){
    button.removeEventListener('click', drawAndDisplayCard);
    button.disabled = true;
  }
}

const button = document.querySelector('button');
button.addEventListener('click', drawAndDisplayCard);
