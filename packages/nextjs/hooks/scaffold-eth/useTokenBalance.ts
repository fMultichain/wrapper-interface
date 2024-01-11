import { useCallback, useEffect, useState } from "react";
import { useBalance } from "wagmi";
import { useGlobalState } from "~~/services/store/store";
import { getTargetNetwork } from "~~/utils/scaffold-eth";

export function useTokenBalance(account: string, token = "0xF386eB6780a1e875616b5751794f909095283860") {
  const [isBalance, setIsBalance] = useState(true);
  const [balance, setBalance] = useState<number | null>(null);
  const price = useGlobalState(state => state.nativeCurrencyPrice);

  const {
    data: fetchedBalanceData,
    isError,
    isLoading,
  } = useBalance({
    address: account,
    token, // lz-fMULTI
    watch: true,
    chainId: getTargetNetwork().id,
  });

  const onToggleBalance = useCallback(() => {
    if (price > 0) {
      setIsBalance(!isBalance);
    }
  }, [isBalance, price]);

  useEffect(() => {
    if (fetchedBalanceData?.formatted) {
      setBalance(Number(fetchedBalanceData.formatted));
    }
  }, [fetchedBalanceData]);

  return { balance, price, isError, isLoading, onToggleBalance, isBalance };
}
