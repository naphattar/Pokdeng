import { getCard, getHand, playRound } from "../main";

jest.mock("../types/Card", () => {
    return {
      Card: jest.fn().mockImplementation((suit, rank) => {
        return {
          suit,
          rank,
          getValue: jest.fn(() => parseInt(rank)),
          print: jest.fn(() => `${rank} of ${suit}`),
        };
      }),
      CardType: { HEARTS: "Hearts", SPADES: "Spades", CLUBS: "Clubs", DIAMONDS: "Diamonds" },
      CardNumber: { TWO: "2", THREE: "3", FOUR: "4", FIVE: "5"},
    };
  });
  
  describe("Pok Deng Game", () => {
    let usedCards;
    beforeEach(() => {
      usedCards = new Set();
    });
  
    test("getCard should return a unique card", () => {
      const card1 = getCard();
      const card2 = getCard();
      expect(card1).not.toEqual(card2);
    });
  
    test("getHand should return two cards and a valid score", () => {
      const [cards, score] = getHand();
      expect(cards).toHaveLength(2);
      expect(typeof score).toBe("number");
      expect(score).toBeGreaterThanOrEqual(2);
      expect(score).toBeLessThanOrEqual(20);
    });
    
  });