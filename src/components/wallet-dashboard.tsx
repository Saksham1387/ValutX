import { Plus } from "lucide-react";
import { DashboardHeader } from "./dashboard-header";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/authConfig";
import prisma from "@/db";
import { AccountAssest } from "./account-assest";

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

export default async function WalletDashboard() {
  // const [activeTab, setActiveTab] = useState("Tokens");
  const userWallet = await getUserWallet();
  if (userWallet.error) {
    return <div>No Solana wallet found</div>;
  }
  return (
    <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm overflow-hidden">
      {/* Header with profile */}

      <DashboardHeader />

      <div className="p-6">
        {/* Account assets */}
       <AccountAssest publicKey={userWallet.userWallet?.publicKey || ""}/>

        {/* Action buttons */}
        <div className="grid grid-cols-4 gap-4 mt-6">
          <button className="bg-blue-500 text-white py-3 rounded-md font-medium">
            Send
          </button>
          <button className="bg-blue-50 text-blue-500 py-3 rounded-md font-medium">
            Add Funds
          </button>
          <button className="bg-blue-50 text-blue-500 py-3 rounded-md font-medium">
            Withdraw
          </button>
          <button className="bg-blue-50 text-blue-500 py-3 rounded-md font-medium">
            Swap
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-t border-slate-200">
        {/* <div className="flex border-b border-slate-200">
          {["Tokens", "NFTs", "Activity"].map((tab) => (
            <button
              key={tab}
              className={`px-8 py-4 font-medium ${
                activeTab === tab
                  ? "text-blue-500 border-b-2 border-blue-500"
                  : "text-slate-600"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div> */}

        {/* Empty state */}
        <div className="py-16 flex flex-col items-center justify-center">
          <h2 className="text-2xl font-medium text-slate-700 mb-2">
            You don't have any assets yet!
          </h2>
          <p className="text-slate-500 mb-6">
            Start by buying or depositing funds:
          </p>
          <button className="bg-blue-500 text-white px-6 py-3 rounded-md font-medium flex items-center">
            <Plus className="w-5 h-5 mr-2" />
            Add Funds
          </button>
        </div>
      </div>
    </div>
  );
}
