import { Connection } from "@solana/web3.js";
import axios from "axios";

let LAST_UPDATED: number | null = null;
const TOKEN_PRICE_UPDATE_INTERVAL = 60 * 1000;
let prices: { [key: string]: { price: string } } = {};

export interface TokenDetials {
  name: string;
  mint: string;
  native: boolean;
  price: string;
  image: string;
  decimals: number;
}

export const SUPPORTED_TOKENS: TokenDetials = [
  {
    name: "USDC",
    mint: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
    native: false,
    price: "1",
    image:
      "https://png.pngtree.com/png-vector/20220709/ourmid/pngtree-usd-coin-usdc-digital-stablecoin-icon-technology-pay-web-vector-png-image_37843734.png",
    decimals: 6,
  },
  {
    name: "USDT",
    mint: "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB",
    native: false,
    price: "1",
    image:
      "https://img.freepik.com/premium-psd/tether-coin-logo-cryptocurrency-high-resolution-3d-render-transparant_513203-250.jpg",
    decimals: 9,
  },
  {
    name: "SOL",
    mint: "So11111111111111111111111111111111111111112",
    native: true,
    price: "1",
    image:
      "https://www.chainalysis.com/wp-content/uploads/2022/08/shutterstock-2176242673-scaled-1-1500x970.jpg",
    decimals: 9,
  },
];

export const connection = new Connection("https://api.mainnet-beta.solana.com");

export async function getSupportedTokens() {
  if (
    !LAST_UPDATED ||
    new Date().getTime() - LAST_UPDATED < TOKEN_PRICE_UPDATE_INTERVAL
  ) {
    try {
      const response = await axios.get(
        "https://api.jup.ag/price/v2?ids=Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB,EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v,So11111111111111111111111111111111111111112&showExtraInfo=true"
      );
      prices = response.data.data;
      LAST_UPDATED = new Date().getTime();
    } catch (e) {
      console.log(e);
    }
  }
  console.log(prices);
  return SUPPORTED_TOKENS.map((s) => ({
    ...s,
    price: prices[s.mint].price,
  }));
}
