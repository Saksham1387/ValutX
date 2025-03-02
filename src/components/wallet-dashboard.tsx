"use client";
import React, { useState } from "react";
import { AccountAssets } from "./account-assest";
import { TokenAssets } from "./TokenAssests";
import { DashboardHeader } from "./dashboard-header";
import TokenSwap from "./token-swap";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface TabsComponentProps {
  publicKey: string;
}

export const WalletDashboard = ({ publicKey }: TabsComponentProps) => {
  const [activeTab, setActiveTab] = useState("send");
  const {data:session} = useSession()
  const router = useRouter();
  if(!session?.user?.email){
    router.push("/auth")
  }
  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Improved Tab Buttons */}
      <DashboardHeader />
      <AccountAssets publicKey={publicKey} />

      <div className="flex mb-6 bg-gray-100 p-2 rounded-lg">
        <button
          onClick={() => setActiveTab("send")}
          className={`flex-1 py-3 px-6 text-lg font-medium rounded-md transition-all ${
            activeTab === "send"
              ? "bg-white text-black shadow-sm"
              : "bg-transparent text-gray-500 hover:bg-gray-200"
          }`}
        >
          Send
        </button>
        <button
          onClick={() => setActiveTab("swap")}
          className={`flex-1 py-3 px-6 text-lg font-medium rounded-md transition-all ${
            activeTab === "swap"
              ? "bg-white text-black shadow-sm"
              : "bg-transparent text-gray-500 hover:bg-gray-200"
          }`}
        >
          Swaps
        </button>
      </div>

      {/* Full-width Container for Tab Content */}
      <div className="w-full">
        {/* Token Assets Tab */}
        {activeTab === "send" && (
          <div className="w-full">
            <div className="mt-4 w-full">
              <TokenAssets publicKey={publicKey} />
            </div>
          </div>
        )}

        {/* NFTs Tab */}
        {activeTab === "swap" && (
          <div className="p-8 bg-white rounded-xl text-center">
            <TokenSwap/>
          </div>
        )}
      </div>
    </div>
  );
};
