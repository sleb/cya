export const Cards = {
  ClassicAuto: 15000,
  Home: 20000,
  BankAccount: 10000,
  CoinCollection: 10000,
  Stocks: 10000,
  Jewels: 15000,
  PiggyBank: 5000,
  StampCollection: 5000,
  CashUnderTheMattress: 5000,
  BaseballCards: 5000,
  Gold: 50000,
  Silver: 25000,
} as const;

export type Card = (typeof Cards)[keyof typeof Cards];

export const newDeck = (): Card[] => {
  return Object.entries(Cards).flatMap(([k, v]) => {
    if (k === "Gold" || k === "Silver") {
      return new Array(5).fill(v);
    }
    return new Array(10).fill(v);
  });
};

export const shuffle = (deck: Card[]) => {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
};
