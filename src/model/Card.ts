export const Cards = {
  ClassicAuto: "ClassicAuto",
  Home: "Home",
  BankAccount: "BankAccount",
  CoinCollection: "CoinCollection",
  Stocks: "Stocks",
  Jewels: "Jewels",
  PiggyBank: "Piggy Bank",
  StampCollection: "StampCollection",
  CashUnderTheMattress: "CashUnderTheMattress",
  BaseballCards: "BaseballCards",
  Gold: "Gold",
  Silver: "Silver",
} as const;

export type Card = (typeof Cards)[keyof typeof Cards];
