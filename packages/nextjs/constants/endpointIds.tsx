import { ChainMap } from "~~/types/ChainMap";

export const FTM_ENDPOINT = 112;
export const BASE_ENDPOINT = 184;
export const ARB_ENDPOINT = 110;
export const AVAX_ENDPOINT = 106;

export const ENDPOINT_ID: ChainMap = {
  250: FTM_ENDPOINT,
  8453: BASE_ENDPOINT,
  42161: ARB_ENDPOINT,
  43114: AVAX_ENDPOINT,
};

// FANTOM = 250,
// COINBASE = 8453,
// ARBITRUM = 42161,
// AVALANCHE = 43114
