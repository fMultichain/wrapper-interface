import { createConfig, http } from "@wagmi/core";
import { avalanche, fantom } from "@wagmi/core/chains";

export const config = createConfig({
  chains: [fantom, avalanche],
  transports: {
    [fantom.id]: http("https://fantom.example.com"),
    [avalanche.id]: http("https://avalanche.example.com"),
  },
});
