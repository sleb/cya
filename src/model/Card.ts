export const Cards = {
  ClassicAuto: { name: "Classic Auto", value: 15000 },
  Home: { name: "Home", value: 20000 },
  BankAccount: { name: "Bank Account", value: 10000 },
  CoinCollection: { name: "Coin Collection", value: 10000 },
  Stocks: { name: "Stocks", value: 10000 },
  Jewels: { name: "Jewels", value: 15000 },
  PiggyBank: { name: "Piggy Bank", value: 5000 },
  StampCollection: { name: "Stamp Collection", value: 5000 },
  CashUnderTheMattress: { name: "Cash Under the Mattress", value: 5000 },
  BaseballCards: { name: "Baseball Cards", value: 5000 },
  Gold: { name: "Gold", value: 50000 },
  Silver: { name: "Silver", value: 25000 },
} as const;

export type Card = (typeof Cards)[keyof typeof Cards];
