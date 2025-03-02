import { TokenDetials } from "@/lib/contants";
import axios from "axios";
import { useEffect, useState } from "react";

interface TokenWithBalance extends TokenDetials {
  balance: string;
  usdBalance: string;
}
export function useToken(address: string) {
  const [tokenBalances, setTokenBalances] = useState<{
    tokenBalance: number;
    tokens: TokenDetials[];
  } | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`/api/token?address=${address}`);
      setTokenBalances(res.data);
      setLoading(false);
    };
    fetchData();
  }, []);

  return {
    loading, tokenBalances
  }
}
