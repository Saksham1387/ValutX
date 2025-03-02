"use client";
import { useToken } from "@/app/hooks/useToken";
import { Plus, RefreshCw } from "lucide-react";

interface AccountAssetsProps {
  publicKey: string;
}

export const TokenAssets = ({ publicKey }: AccountAssetsProps) => {
  const { loading, tokenBalances } = useToken(publicKey);
  
  return (
    <div className="py-8 w-full max-w-2xl mx-auto rounded-xl bg-white shadow-sm">
      <div className="flex justify-between items-center px-6 pb-4 border-b border-gray-100">
        <h2 className="text-xl font-bold text-gray-800">Token Assets</h2>
        <button className="flex items-center text-sm text-blue-600 hover:text-blue-800 transition-colors">
          <Plus size={16} className="mr-1" />
          Add Token
        </button>
      </div>
      
      {loading ? (
        <div className="flex flex-col items-center justify-center py-12">
          <RefreshCw size={24} className="text-gray-400 animate-spin mb-2" />
          <p className="text-gray-500">Loading your tokens...</p>
        </div>
      ) : tokenBalances?.token && tokenBalances.token.length > 0 ? (
        <div className="divide-y divide-gray-100">
          {tokenBalances.token.map((token, index) => (
            <div key={token.mint || index} className="flex items-center justify-between p-4 px-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100 flex-shrink-0 border border-gray-200">
                  <img 
                    src={token.image} 
                    alt={`${token.name} logo`} 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/placeholder-token.png";
                    }}
                  />
                </div>
                <div>
                  <div className="font-medium text-gray-900">{token.name}</div>
                  <div className="text-xs text-gray-500 truncate max-w-xs">
                    {`1 ${token.name} = ${parseFloat(token.price || "0").toFixed(2)} USD`}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-medium text-gray-900">${parseFloat(token.price || "0").toFixed(2)}</div>
                <div className="text-sm text-gray-500">
                  {token.native ? (
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                      Native
                    </span>
                  ) : (
                    `${parseFloat(token.amount || "0").toFixed(4)} ${token.name}`
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-gray-500">
          <p>No tokens found in this wallet</p>
          <button className="mt-3 text-sm text-blue-600 hover:text-blue-800 underline">
            Import tokens
          </button>
        </div>
      )}
    </div>
  );
};