import prisma from "@/db";
import { authConfig } from "@/lib/authConfig";
import { connection } from "@/lib/contants";
import { Keypair, VersionedTransaction } from "@solana/web3.js";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

// Body
// {
//    quote,
// }

export async function POST(req: NextRequest) {
  const session = await getServerSession(authConfig);
  if (!session) {
    return NextResponse.json({
      message: "Unauthorized",
    });
  }

  const user = await prisma.user.findFirst({
    where: {
      id: session.user.uid,
    },
    include: {
      solWallet: true,
    },
  });

  if (!user) {
    return NextResponse.json({
      message: "User not found",
    });
  }
  const publicKey = user?.solWallet?.publicKey;
  const body = await req.json();
  const quoteResponse = body.quote;
  const privateKey = user.solWallet?.privateKey;

  if (!publicKey) {
    return NextResponse.json({
      message: "No public key Found",
    });
  }

  const swapResponse = await (
    await fetch("https://api.jup.ag/swap/v1/swap", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.JUPITER_API || "",
      },
      body: JSON.stringify({
        quoteResponse,
        userPublicKey: publicKey.toString(),
      }),
    })
  ).json();
  const transactionBase64 = swapResponse.swapTransaction;
  const transaction = VersionedTransaction.deserialize(
    Buffer.from(transactionBase64, "base64")
  );
  console.log(transaction);
  const arr = privateKey?.split(",").map((x) => Number(x));
  const privateKeyUintArr = Uint8Array.from(arr);
  const keyPair = Keypair.fromSecretKey(privateKeyUintArr);
  transaction.sign([keyPair]);
  const transactionBinary = transaction.serialize();
  console.log(transactionBinary);

  const signature = await connection.sendRawTransaction(transactionBinary, {
    maxRetries: 2,
    skipPreflight: true,
  });
  const confirmation = await connection.confirmTransaction(
    { signature },
    "finalized"
  );

  if (confirmation.value.err) {
    // throw new Error(
    //   `Transaction failed: ${JSON.stringify(
    //     confirmation.value.err
    //   )}\nhttps://solscan.io/tx/${signature}/`
    // );
    return NextResponse.json(
      {
        message: "Swap Failed",
      },
      { status: 400 }
    );
  } else {
    console.log(`Transaction successful: https://solscan.io/tx/${signature}/`);
    return NextResponse.json(
      {
        message: "Swap done",
      },
      { status: 200 }
    );
  }
}
