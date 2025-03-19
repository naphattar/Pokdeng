import readline from "readline";
import { Card, CardNumber, CardType } from "./types/Card";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const suits = Object.values(CardType);
const ranks = Object.values(CardNumber);

let chips = 5;
let usedCards = new Set<string>();

function getCard(): Card {
  let card: Card;
  do {
    const suit = suits[Math.floor(Math.random() * suits.length)] as CardType;
    const rank = ranks[Math.floor(Math.random() * ranks.length)] as CardNumber;
    card = new Card(suit, rank);
  } while (usedCards.has(card.print()));
  
  usedCards.add(card.print());
  return card;
}

function getHand(): [Card[], number] {
  const card1 = getCard();
  const card2 = getCard();
  const score = (card1.getValue() + card2.getValue()) % 10;
  return [[card1, card2], score];
}

function playRound(bet: number) {
  if (bet > chips || bet <= 0) {
    console.log("Invalid bet amount.");
    return startGame();
  }
  if(usedCards.size === 52){
    console.log("Card decks is out of card");
    return startGame();
  }

  const [playerCards, playerScore] = getHand();
  const [dealerCards, dealerScore] = getHand();

  console.log(`\nYour cards: ${playerCards.map(card => card.print()).join(", ")} (Score: ${playerScore})`);
  console.log(`Dealer's cards: ${dealerCards.map(card => card.print()).join(", ")} (Score: ${dealerScore})`);

  if (playerScore > dealerScore) {
    console.log("You win!");
    chips += bet;
  } else if (playerScore < dealerScore) {
    console.log("You lose!");
    chips -= bet;
  } else {
    console.log("It's a tie!");
  }

  console.log(`Chips remaining: ${chips}\n`);
  if (chips <= 0) {
    console.log("You're out of chips! Game over.");
    return rl.close();
  }

  askContinue();
}

function askContinue() {
  rl.question("Do you want to play another round? (yes/no): ", (answer) => {
    if (answer.toLowerCase() === "yes") {
      startGame();
    } else {
      console.log(`Game over! You finished with ${chips} chips.`);
      rl.close();
    }
  });
}

function startGame() {
  rl.question("Enter your bet: ", (bet) => {
    const betAmount = parseInt(bet);
    if (isNaN(betAmount)) {
      console.log("Invalid input. Please enter a number.");
      return startGame();
    }
    playRound(betAmount);
  });
}

console.log("Welcome to Pok-Deng Game");
console.log(`You start with ${chips} chips.`);

startGame();
