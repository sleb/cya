import BankAccount from "../assets/bank-account.webp";
import BaseballCards from "../assets/baseball-cards.webp";
import CashUnderTheMattress from "../assets/cache-under-the-mattress.webp";
import Back from "../assets/card-back.webp";
import ClassicAuto from "../assets/classic-auto.webp";
import CoinCollection from "../assets/coin-collection.webp";
import Gold from "../assets/gold.webp";
import Home from "../assets/home.webp";
import Jewels from "../assets/jewels.webp";
import PiggyBank from "../assets/piggy-bank.webp";
import Silver from "../assets/silver.webp";
import StampCollection from "../assets/stamp-collection.webp";
import Stocks from "../assets/stocks.webp";
import { Card, Cards } from "../model/Card";

export const cardImage = (card: Card | undefined): string => {
  if (!card) {
    return Back;
  }

  switch (card) {
    case Cards.BankAccount:
      return BankAccount;
    case Cards.BaseballCards:
      return BaseballCards;
    case Cards.CashUnderTheMattress:
      return CashUnderTheMattress;
    case Cards.ClassicAuto:
      return ClassicAuto;
    case Cards.CoinCollection:
      return CoinCollection;
    case Cards.Gold:
      return Gold;
    case Cards.Home:
      return Home;
    case Cards.Jewels:
      return Jewels;
    case Cards.PiggyBank:
      return PiggyBank;
    case Cards.Silver:
      return Silver;
    case Cards.StampCollection:
      return StampCollection;
    case Cards.Stocks:
      return Stocks;
  }
};
