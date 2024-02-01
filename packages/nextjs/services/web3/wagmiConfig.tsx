// import { createConfig } from "wagmi";
// import { appChains, wagmiConnectors } from "~~/services/web3/wagmiConnectors";
// export const wagmiConfig = createConfig({
//   autoConnect: false,
//   connectors: wagmiConnectors,
//   publicClient: appChains.publicClient,
// });
import { createConfig, http } from "@wagmi/core";
import { avalanche, fantom } from "@wagmi/core/chains";

export const wagmiConfig = createConfig({
  chains: [fantom, avalanche],
  transports: {
    [fantom.id]: http("https://fantom.example.com"),
    [avalanche.id]: http("https://avalanche.example.com"),
  },
});
