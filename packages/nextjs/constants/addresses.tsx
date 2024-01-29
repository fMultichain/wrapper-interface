import { ChainMap } from "~~/types/ChainMap";

export const FMULTI_ADDRESS = {
  1: undefined,
  250: "0x6CEbb8cD66Fca7E6aca65841Ae3A04B7884F4de8",
};

export const ETH_ENDPOINT_ADDRESS = "0x66A71Dcef29A0fFBDBE3c6a460a3B5BC225Cd675";
export const FTM_ENDPOINT_ADDRESS = "0xb6319cC6c8c27A8F5dAF0dD3DF91EA35C4720dd7";
export const BASE_ENDPOINT_ADDRESS = "0xb6319cC6c8c27A8F5dAF0dD3DF91EA35C4720dd7";
export const ARB_ENDPOINT_ADDRESS = "0x3c2269811836af69497E5F486A85D7316753cf62";
export const AVAX_ENDPOINT_ADDRESS = "0x3c2269811836af69497E5F486A85D7316753cf62";

export const ENDPOINT_ADDRESS: ChainMap = {
  1: ETH_ENDPOINT_ADDRESS,
  250: FTM_ENDPOINT_ADDRESS,
  8453: BASE_ENDPOINT_ADDRESS,
  42161: ARB_ENDPOINT_ADDRESS,
  43114: AVAX_ENDPOINT_ADDRESS,
};

export const LZFMULTI_ADDRESS: ChainMap = {
  1: "0xF386eB6780a1e875616b5751794f909095283860",
  250: "0xF386eB6780a1e875616b5751794f909095283860",
  8453: "0xF386eB6780a1e875616b5751794f909095283860",
  42161: "0xF386eB6780a1e875616b5751794f909095283860",
  43114: "0xF386eB6780a1e875616b5751794f909095283860",
};
