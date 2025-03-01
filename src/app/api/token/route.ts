import {
  connection,
  getSupportedTokens,
} from "@/lib/contants";
import {
  getAccount,
  getAssociatedTokenAddress,
  getMint,
} from "@solana/spl-token";
import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const address = searchParams.get("address") as unknown as string;
  const supported_token = await getSupportedTokens();
  const balances = await Promise.all(
    supported_token.map((token) => getAccountBalance(token, address))
  );

  return NextResponse.json({
    token: supported_token.map((token, index) => ({
      ...token,
      balance: balances[index],
    })),
  });
}

async function getAccountBalance(
  token: {
    name: string;
    mint: string;
    native: boolean;
  },
  address: string
) {
  if (token.native) {
    let balance = await connection.getBalance(new PublicKey(address));
    return balance / LAMPORTS_PER_SOL;
  }
  const ata = await getAssociatedTokenAddress(
    new PublicKey(token.mint),
    new PublicKey(address)
  );

  try {
    const account = await getAccount(connection, ata);
    const mint = await getMint(connection, new PublicKey(token.mint));
    return Number(account.amount) / 10 ** mint.decimals;
  } catch (e) {
    return 0;
  }
}
