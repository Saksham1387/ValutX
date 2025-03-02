import { WalletDashboard } from "@/components/wallet-dashboard";
import prisma from "@/db";
import { authConfig } from "@/lib/authConfig";
import { getServerSession } from "next-auth";



async function getUserWallet() {
  const session = await getServerSession(authConfig);

  const userWallet = await prisma.solWallet.findFirst({
    where: {
      userId: session?.user.uid,
    },
    select: {
      publicKey: true,
    },
  });

  if (!userWallet) {
    return {
      error: " No Solana Wallet found associated with this user",
    };
  }

  return { error: null, userWallet };
}

export default async function Home() {
  const userWaller = await getUserWallet()
  return (
    <main className="min-h-screen bg-slate-50 p-4 md:p-8">
      <WalletDashboard publicKey={userWaller.userWallet?.publicKey || ""}/>
    </main>
  )
}

