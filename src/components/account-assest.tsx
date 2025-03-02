"use client";
import { useToken } from "@/app/hooks/useToken";
import { ClipboardCheck, Copy } from "lucide-react";
import React, { useState, useEffect } from "react";

interface AccountAssetsProps {
  publicKey: string;
}

export const AccountAssets = ({ publicKey }: AccountAssetsProps) => {
  const [copied, setCopied] = useState(false);
  const { loading, tokenBalances } = useToken(publicKey);

  // Reset copied state after 2 seconds
  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  return (
    <div className="mb-4">
      <div className="flex items-center text-slate-500 mb-2">
        <svg
          className="w-5 h-5 mr-2"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="3"
            y="6"
            width="18"
            height="15"
            rx="2"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path d="M4 11H20" stroke="currentColor" strokeWidth="2" />
        </svg>
        TipLink Account Assets
      </div>

      <div className="flex justify-between items-center">
        {loading ? (
          <>
            {/* Skeleton for the balance */}
            <div className="flex items-baseline">
              <div className="h-14 w-48 bg-slate-200 animate-pulse rounded-lg"></div>
            </div>

            {/* Skeleton for the button */}
            <div className="h-10 w-40 bg-slate-200 animate-pulse rounded-full"></div>
          </>
        ) : (
          <>
            <div className="flex items-baseline">
              <span className="text-6xl font-bold text-slate-800">
                {Number(tokenBalances?.totalBalance || 0).toFixed(2)}
              </span>
              <span className="text-4xl ml-2 text-slate-400">USD</span>
            </div>

            <button
              className="flex items-center bg-slate-200 text-slate-600 px-4 py-2 rounded-full hover:bg-slate-300 transition-colors"
              onClick={() => {
                navigator.clipboard.writeText(publicKey);
                setCopied(true);
              }}
            >
              {copied ? (
                <ClipboardCheck className="w-4 h-4 mr-2" />
              ) : (
                <Copy className="w-4 h-4 mr-2" />
              )}
              Your Wallet Address
            </button>
          </>
        )}
      </div>
    </div>
  );
};
