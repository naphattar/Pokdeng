enum CardType {
    Spades = "Spades",
    Hearts = "Hearts",
    Diamonds = "Diamonds",
    Clubs = "Clubs"
}

enum CardNumber {
    Ace = "Ace",
    Two = "2",
    Three = "3",
    Four = "4",
    Five = "5",
    Six = "6",
    Seven = "7",
    Eight = "8",
    Nine = "9",
    Ten = "10",
    Jack = "Jack",
    Queen = "Queen",
    King = "King"
}

class Card {
    private cardType: CardType
    private cardNumber: CardNumber

    constructor(
        cardType: CardType,
        cardNumber: CardNumber
    ) {
        this.cardType =  cardType;
        this.cardNumber = cardNumber;
    }
    
    print() : string{
        return this.cardType + '-' + this.cardNumber;
    }
    getValue(): number {
        if (this.cardNumber === CardNumber.Ace) return 1;
        if ([CardNumber.Jack, CardNumber.Queen, CardNumber.King, CardNumber.Ten].includes(this.cardNumber)) return 0;
        return parseInt(this.cardNumber);
    }
}

export { Card, CardType, CardNumber };
