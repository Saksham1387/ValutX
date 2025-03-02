"use client";
import { useState, useEffect } from "react";
import { ArrowLeft, ChevronDown, RefreshCw, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import axios from "axios";

interface TokenDetails {
  name: string;
  mint: string;
  native: boolean;
  price: string;
  decimal: number;
  image: string;
  balance?: number;
}

export const SUPPORTED_TOKENS: TokenDetails[] = [
  {
    name: "USDC",
    mint: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
    native: false,
    price: "1",
    image:
      "https://png.pngtree.com/png-vector/20220709/ourmid/pngtree-usd-coin-usdc-digital-stablecoin-icon-technology-pay-web-vector-png-image_37843734.png",
    balance: 0,
    decimal: 6,
  },
  {
    name: "USDT",
    mint: "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB",
    native: false,
    price: "1",
    image:
      "https://img.freepik.com/premium-psd/tether-coin-logo-cryptocurrency-high-resolution-3d-render-transparant_513203-250.jpg",
    balance: 0,
    decimal: 6,
  },
  {
    name: "SOL",
    mint: "So11111111111111111111111111111111111111112",
    native: true,
    price: "1",
    image:
      "https://www.chainalysis.com/wp-content/uploads/2022/08/shutterstock-2176242673-scaled-1-1500x970.jpg",
    balance: 0,
    decimal: 9,
  },
];

export default function TokenSwap() {
  const [payToken, setPayToken] = useState<TokenDetails>(SUPPORTED_TOKENS[0]);
  const [receiveToken, setReceiveToken] = useState<TokenDetails>(
    SUPPORTED_TOKENS[1]
  );
  const [payAmount, setPayAmount] = useState<number>(0);
  const [receiveAmount, setReceiveAmount] = useState<number>(0);
  const [showPayTokenList, setShowPayTokenList] = useState(false);
  const [showReceiveTokenList, setShowReceiveTokenList] = useState(false);
  const [swapDetails, setSwapDetails] = useState(false);
  const [quote, setQuote] = useState();

  useEffect(() => {
    const fetchQuote = async () => {
      const res = await axios.get(
        `https://api.jup.ag/swap/v1/quote?inputMint=${
          payToken.mint
        }&outputMint=${receiveToken.mint}&amount=${
          Number(payAmount) * 10 ** payToken.decimal
        }&slippageBps=50&restrictIntermediateTokens=true`
      );
      console.log(res.data);
      setReceiveAmount(res.data.outAmount / 10 ** receiveToken.decimal);
      setQuote(res.data);
    };
    fetchQuote();
  }, [payAmount]);

  // Log selected tokens and amount whenever they change
  useEffect(() => {
    console.log("Pay Token:", payToken);
    console.log("Receive Token:", receiveToken);
    console.log("Amount:", payAmount);
  }, [payToken, receiveToken, payAmount]);

  // Mock exchange rate - in a real app this would come from an API
  const getExchangeRate = (from: string, to: string) => {
    const rates: Record<string, Record<string, number>> = {
      SOL: { USDC: 100, USDT: 100, SOL: 1 },
      USDC: { SOL: 0.01, USDT: 1, USDC: 1 },
      USDT: { SOL: 0.01, USDC: 1, USDT: 1 },
    };
    return rates[from][to];
  };

  // Handle pay amount change
  const handlePayAmountChange = (value: number) => {
    setPayAmount(value);
    if (value === 0) {
      setReceiveAmount(0);
      return;
    }

    const numValue = Number(value);
    if (!isNaN(numValue)) {
      const rate = getExchangeRate(payToken.name, receiveToken.name);
      setReceiveAmount(numValue * rate);
    }
  };

  const handleSwap = async () => {
    const res = await axios.post("api/swap", { quote });
    if (res.status == 200) {
      alert("Swap Completed check your wallet!");
    }
    if (res.status == 400) {
      alert("Swap Failed");
    }
  };
  // Handle max button click
  const handleMaxClick = () => {
    const balance = payToken.balance || 0;
    setPayAmount(balance);
    handlePayAmountChange(balance);
  };

  // Swap tokens positions
  const swapTokenPositions = () => {
    const temp = payToken;
    setPayToken(receiveToken);
    setReceiveToken(temp);

    // Update amounts based on new positions
    if (payAmount) {
      const rate = getExchangeRate(receiveToken.name, payToken.name);
      setPayAmount(receiveAmount);
      setReceiveAmount(Number(payAmount) * rate);
    }
  };

  // Select pay token
  const selectPayToken = (token: TokenDetails) => {
    setPayToken(token);
    setShowPayTokenList(false);
    if (payAmount) {
      handlePayAmountChange(payAmount);
    }
  };

  // Select receive token
  const selectReceiveToken = (token: TokenDetails) => {
    setReceiveToken(token);
    setShowReceiveTokenList(false);
    if (payAmount) {
      handlePayAmountChange(payAmount);
    }
  };

  // Token selection dropdown
  const TokenDropdown = ({
    tokens,
    onSelect,
    show,
    onClose,
  }: {
    tokens: TokenDetails[];
    onSelect: (token: TokenDetails) => void;
    show: boolean;
    onClose: () => void;
  }) => {
    if (!show) return null;

    return (
      <div className="absolute top-full left-0 mt-1 w-full bg-white rounded-lg shadow-lg z-10 border">
        <div className="p-2">
          {SUPPORTED_TOKENS.map((token) => (
            <div
              key={token.mint}
              className="flex items-center p-2 hover:bg-gray-100 rounded cursor-pointer"
              onClick={() => onSelect(token)}
            >
              <img
                src={token.image || "/placeholder.svg"}
                alt={token.name}
                className="w-6 h-6 mr-2"
              />
              <span>{token.name}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-md mx-auto p-4">
      {/* Header */}
      <div className="flex items-center mb-4">
        <Button variant="ghost" className="p-0 mr-2">
          <ArrowLeft className="h-5 w-5 text-gray-500" />
        </Button>
        <h1 className="text-3xl font-medium text-gray-700">Swap Tokens</h1>
      </div>

      {/* Main Card */}
      <Card className="mb-4">
        <CardContent className="p-6">
          {/* You Pay Section */}
          <div className="mb-6">
            <div className="text-lg font-medium mb-2">You Pay:</div>
            <div className="flex items-center bg-gray-100 rounded-lg p-2 mb-2">
              <div className="relative">
                <Button
                  variant="ghost"
                  className="flex items-center gap-2 p-2 h-auto"
                  onClick={() => setShowPayTokenList(!showPayTokenList)}
                >
                  <img
                    src={payToken.image || "/placeholder.svg"}
                    alt={payToken.name}
                    className="w-6 h-6"
                  />
                  <span className="font-semibold">{payToken.name}</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
                <TokenDropdown
                  tokens={SUPPORTED_TOKENS}
                  onSelect={selectPayToken}
                  show={showPayTokenList}
                  onClose={() => setShowPayTokenList(false)}
                />
              </div>
              <Input
                type="number"
                placeholder="0"
                value={payAmount}
                onChange={(e) => handlePayAmountChange(Number(e.target.value))}
                className="border-none bg-transparent text-right text-4xl font-light focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            </div>
            <div className="flex justify-between items-center text-sm text-gray-500">
              <div>
                Current Balance: {payToken.balance || 0} {payToken.name}
              </div>
              <Button
                variant="outline"
                size="sm"
                className="h-7 rounded-full"
                onClick={handleMaxClick}
              >
                Max
              </Button>
            </div>
          </div>

          {/* Swap Direction Button */}
          <div className="flex justify-center -my-3 relative z-10">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-white h-12 w-12 border-2"
              onClick={swapTokenPositions}
            >
              <RefreshCw className="h-5 w-5" />
            </Button>
          </div>

          {/* You Receive Section */}
          <div className="mt-6">
            <div className="text-lg font-medium mb-2">You Receive:</div>
            <div className="flex items-center bg-gray-100 rounded-lg p-2 mb-2">
              <div className="relative">
                <Button
                  variant="ghost"
                  className="flex items-center gap-2 p-2 h-auto"
                  onClick={() => setShowReceiveTokenList(!showReceiveTokenList)}
                >
                  <img
                    src={receiveToken.image || "/placeholder.svg"}
                    alt={receiveToken.name}
                    className="w-6 h-6"
                  />
                  <span className="font-semibold">{receiveToken.name}</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
                <TokenDropdown
                  tokens={SUPPORTED_TOKENS}
                  onSelect={selectReceiveToken}
                  show={showReceiveTokenList}
                  onClose={() => setShowReceiveTokenList(false)}
                />
              </div>
              <Input
                type="text"
                placeholder="0"
                value={receiveAmount}
                readOnly
                className="border-none bg-transparent text-right text-4xl font-light focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            </div>
            <div className="text-sm text-gray-500">
              Current Balance: {receiveToken.balance || 0} {receiveToken.name}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bottom Actions */}
      <div className="flex justify-between items-center mb-4">
        <Button
          variant="ghost"
          className="text-gray-600 font-medium flex items-center gap-1"
          onClick={() => setSwapDetails(!swapDetails)}
        >
          <span>View Swap Details</span>
          <ChevronDown
            className={`h-4 w-4 transition-transform ${
              swapDetails ? "rotate-180" : ""
            }`}
          />
        </Button>
        <Button variant="ghost" className="text-gray-600">
          <Settings className="h-5 w-5" />
          <span className="ml-1">Settings</span>
        </Button>
      </div>

      {/* Swap Details Panel */}
      {swapDetails && (
        <Card className="mb-4">
          <CardContent className="p-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Rate</span>
                <span className="text-sm">
                  1 {payToken.name} ={" "}
                  {getExchangeRate(payToken.name, receiveToken.name)}{" "}
                  {receiveToken.name}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Fee</span>
                <span className="text-sm">0.3%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Route</span>
                <span className="text-sm">Jupiter (Best)</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Action Buttons */}
      <div className="flex gap-4">
        <Button variant="outline" className="flex-1 py-6">
          Cancel
        </Button>
        <Button
          onClick={handleSwap}
          className="flex-1 bg-gray-200 text-gray-500 hover:bg-gray-300 py-6"
          disabled={!payAmount || Number(payAmount) <= 0}
        >
          Confirm & Swap
        </Button>
      </div>
    </div>
  );
}
