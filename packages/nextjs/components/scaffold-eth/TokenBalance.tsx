import { formatNumber } from "~~/functions/formatNumber";
import { useTokenBalance } from "~~/hooks/scaffold-eth";

type TBalanceProps = {
  account: string;
  token: string;
  className?: string;
  symbol?: string;
};

/**
 * Display token balance for a given account address.
 */
export const TokenBalance = ({ account, token, className = "", symbol }: TBalanceProps) => {
  const { balance, isError, isLoading, onToggleBalance } = useTokenBalance(account, token);

  if (!account || !token || isLoading || balance === null) {
    return (
      <div className="animate-pulse flex space-x-4">
        <div className="rounded-md bg-slate-300 h-6 w-6"></div>
        <div className="flex items-center space-y-6">
          <div className="h-2 w-28 bg-slate-300 rounded"></div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className={`border-2 border-gray-400 rounded-md px-2 flex flex-col items-center max-w-fit cursor-pointer`}>
        <div className="text-warning">Error</div>
      </div>
    );
  }

  return (
    <button
      className={`btn btn-sm btn-ghost flex flex-col font-normal items-center hover:bg-transparent ${className}`}
      onClick={onToggleBalance}
    >
      <div className="w-full flex items-center justify-center">
        <span className="text-[0.9em] sm:text-[1.0em] font-bold ml-1">{`${formatNumber(
          balance,
          false,
          true,
        )} ${symbol}`}</span>
      </div>
    </button>
  );
};
