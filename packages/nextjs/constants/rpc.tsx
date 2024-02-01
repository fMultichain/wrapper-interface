import { ChainMap } from "~~/types/ChainMap";

// export const FTM_RPC_URL = "https://ankr.com/fantom";
export const FTM_RPC_URL = "https://rpc.fantom.network";
export const BASE_RPC_URL = "https://rpc.ankr.com/base";
export const ARB_RPC_URL = "https://rpc.ankr.com/arbitrum";
export const AVAX_RPC_URL = "https://rpc.ankr.com/avalanche";

export const RPC: ChainMap = {
  250: FTM_RPC_URL,
  8453: BASE_RPC_URL,
  42161: ARB_RPC_URL,
  43114: AVAX_RPC_URL,
};
