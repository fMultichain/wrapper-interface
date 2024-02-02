import { useState } from "react";
import { CopyIcon } from "./assets/CopyIcon";
import { DiamondIcon } from "./assets/DiamondIcon";
import { HareIcon } from "./assets/HareIcon";
import { JSBI } from "@sushiswap/core-sdk";
import { readContract, writeContract } from "@wagmi/core";
// import { getPayload } from "~~/functions/getPayload";
// import { getParameters } from "~~/functions/getParameters";
import { encodeAbiParameters, encodePacked, parseGwei } from "viem";
import { useAccount, useChainId } from "wagmi";
// useFeeData
// import { encodeAbiParameters, encodePacked } from "viem";
// import { encodeFunctionData } from 'viem'
// import { parseEther } from 'viem'
// import Web3 from "web3";
import {
  ABI_ENDPOINT,
  ABI_LZFMULTI,
  ChainId,
  ChainName,
  ENDPOINT_ADDRESS,
  ENDPOINT_ID,
  LZFMULTI_ADDRESS,
} from "~~/constants";
import { formatNumber } from "~~/functions/formatNumber";
// import { getBridgeData } from "~~/functions/getBridgeData";
import { useTokenBalance } from "~~/hooks/scaffold-eth";

// import getGasPrice from "viem";
// import { wagmiConfig } from "~~/services/web3/wagmiConfig";

// import { traverseThis } from "~~/functions/traverseChains";
// import { ChainMap } from "~~/types/ChainMap";
// import { wagmiConfig } from "~~/services/web3/wagmiConfig";

type TraverseProps = {
  account: any;
  amount: string | number;
  toChain: ChainId;
  fromChain: ChainId;
  className?: string;
};

export const BridgeInteraction = () => {
  const { address } = useAccount();
  const account = address ? address?.toString() : "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045"; // defaults: Vitalik.eth
  const _fromChain = useChainId();
  const fromChain: ChainId = _fromChain as ChainId;
  const toChains = [ChainId.FANTOM, ChainId.COINBASE, ChainId.ARBITRUM, ChainId.AVALANCHE].filter(
    (chain: ChainId) => chain !== fromChain,
  );
  const [toChain, setToChain] = useState(toChains[0]);
  const chains = toChains.filter((chain: ChainId) => chain !== toChain);
  const formattedBalance = useTokenBalance(account, LZFMULTI_ADDRESS[fromChain]);

  const balance = Number(formattedBalance.balance) * 1e18;

  const ChainSelector = () => {
    const [showChains, setShowChains] = useState(false);
    const toggleShow = () => {
      setShowChains(!showChains);
    };
    return (
      <div>
        <div className={"grid grid-cols-1"}>
          <div
            onClick={() => toggleShow()}
            style={{
              display: "flex",
              justifyContent: "center",
              border: "4px solid",
              borderRadius: "10px",
              padding: "8px 4px",
              fontWeight: "bold",
              backgroundColor: "#005AFF", // BLUE
              color: "#FFFFFF",
            }}
          >
            {`${ChainName[toChain]}`}
          </div>
        </div>
        {showChains && (
          <div onClick={() => toggleShow()} className="grid grid-cols-2 gap-2">
            {chains.map((chain: ChainId) => (
              <div
                key={chain}
                onClick={() => {
                  setToChain(chain);
                }}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  border: "4px solid",
                  borderRadius: "10px",
                  // padding: "8px 4px",
                  fontWeight: "bold",
                  backgroundColor: "#005AFF", // BLUE
                  color: "#FFFFFF",
                }}
              >
                {ChainName[chain]}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const TraverseButton = ({ account, amount, className = "" }: TraverseProps) => {
    const handleTraverseThis = async (account: any, amount: number, toChain: ChainId, fromChain: ChainId) => {
      const bigAmount = BigInt(amount);
      const version = 1;
      const payload = encodeAbiParameters(
        [
          { name: "account", type: "address" },
          { name: "amount", type: "uint" },
        ],
        [account, bigAmount],
      );
      console.log("Payload: %s", payload);
      console.log("Version: %s", version);
      console.log("Destination: %s", toChain);

      // gas required to do transaction on destination chain.
      const gas = BigInt(250_000); // (await tokenContract.methods.currentLZGas().call()) ?? 250000;
      if (!gas) {
        console.log("currentLZGas().call() from", LZFMULTI_ADDRESS[fromChain], "failed");
      }
      console.log("Current LZ Gas from contract is", gas);

      // this is the adapter settings for L0
      const adapterParams = encodePacked(["uint16", "uint256"], [version, gas]);
      console.log("Adapter Params is", adapterParams);

      // this is the payable amount to send
      const _gasEstimate = await readContract({
        abi: ABI_ENDPOINT,
        address: ENDPOINT_ADDRESS[fromChain],
        functionName: "estimateFees",
        args: [ENDPOINT_ID[fromChain], LZFMULTI_ADDRESS[fromChain], payload, false, adapterParams],
      });

      const gasEstimate_ = _gasEstimate?.toString().split(",") ?? "0";
      const gasEstimate = Number(gasEstimate_[0]) / 1e18; // BigInt(gasEstimate_[0])

      console.log("gasEstimate: %s", gasEstimate);

      // if (!amountToSend) {
      //   console.log("estimateFees().call() from", ENDPOINT_ADDRESS[toChain], "failed");
      // }
      // console.log("Estimated fees are", amountToSend);

      //   // current gas estimate
      // let estimatedGas;
      // await web3.eth.getGasPrice().then((result: any) => {
      //   console.log("Estimated gas is", web3.utils.fromWei(result, "ether"));
      //   estimatedGas = result;
      // });

      //   // the transaction
      //   const value = await tokenContract.methods
      //     .traverseChains(ENDPOINT_ID[fromChain], amount)
      //     .send({
      //       from: account,
      //       gasPrice: estimatedGas ? estimatedGas : "0",
      //       gas: gas ? web3.utils.fromWei(gas, "wei") : "0",
      //       value: amountToSend ? amountToSend[0] : "0",
      //     })
      //     .on("transactionHash", function (hash: any) {
      //       console.log(hash);
      //     });
      //   if (!value) {
      //     console.log("traverseChains().send() from", account, "failed");
      //   }

      try {
        await writeContract({
          abi: ABI_LZFMULTI,
          address: LZFMULTI_ADDRESS[fromChain],
          functionName: "traverseChains",
          args: [ENDPOINT_ID[fromChain], amount],
          account: account,
          gas: parseGwei(gasEstimate.toString(), "wei"),
          // gasPrice: parseGwei(gasEstimate.toString(), 'wei'),
          // value: parseGwei(gasEstimate.toString(), 'wei'),
          // value: parseEther('0.01'), // amountToSend,
          // todo: verify
          // gas: parseGwei('10'), //amountToSend,
          // maxFeePerGas: parseGwei('20'),
          // maxPriorityFeePerGas: parseGwei('2'),
          // gasPrice: estimatedGas ? estimatedGas : "0",
        });
      } catch (e) {
        // @ts-ignore
        console.log(e.message);
      }
    };

    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          border: "4px solid",
          borderRadius: "10px",
          padding: "8px 6px",
          paddingTop: "16px",
          fontSize: "21px",
          fontWeight: "bold",
          backgroundColor: "#005AFF", // BLUE
          color: "#FFFFFF",
        }}
        // onClick={() => handleTraverse(Number(amount), toChain, fromChain)}
        onClick={() => handleTraverseThis(account, Number(amount), toChain, fromChain)}
        className={className}
      >
        {`Bridge to ${ChainName[toChain]}`}
      </div>
    );
  };

  return (
    <div className="flex bg-base-300 relative pb-10">
      <DiamondIcon className="absolute top-24" />
      <CopyIcon className="absolute bottom-0 left-36" />
      <HareIcon className="absolute right-0 bottom-24" />
      <div className="flex flex-col w-full mx-5 sm:mx-8 2xl:mx-20">
        <div className="flex flex-col mt-6 px-7 py-8 bg-base-200 opacity-80 rounded-2xl shadow-lg border-4 border-[#005AFF]">
          <div
            className={address ? `grid grid-cols-1 gap-4` : `mb-8`}
            style={{
              justifyContent: "center",
            }}
          >
            {/* [√] DISCONNECTED : SHOW DISCONNECTED */}
            {!address && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  border: "4px solid",
                  borderRadius: "10px",
                  borderColor: "#FF0000", // RED
                  padding: "2px 16px",
                  // marginTop: "32px",
                  fontSize: "21px",
                  animation: "pulse 2s infinite",
                }}
              >
                {`Disconnected`}
              </div>
            )}

            {/* Shows: Chain Selector */}
            {address && (
              <div
                className={"grid grid-cols-1 sm:text-md text-center w-full"}
                style={{
                  justifyContent: "center",
                  border: "4px solid",
                  borderRadius: "10px",
                  borderColor: "#005AFF", // BLUE
                  padding: "8px 4px",
                  fontWeight: "bold",
                }}
              >
                {/* TODO */}
                <ChainSelector />
              </div>
            )}
            {/* {address && Number(balance) > 0 && <BridgeButton balance={JSBI.BigInt(Number(balance)).toString()} />} */}
          </div>
          {/* [√] CONNECTED : SHOW BALANCE */}
          {address && (
            <div
              className={"grid grid-cols-1 sm:text-md text-center w-full"}
              style={{
                // display: "flex",
                justifyContent: "center",
                border: "4px solid",
                borderRadius: "10px",
                borderColor: "#005AFF", // BLUE
                padding: "8px 4px",
                fontWeight: "bold",
              }}
            >
              <div>
                {`${
                  !balance || Number(formattedBalance.balance) == 0
                    ? "0"
                    : balance && Number(formattedBalance.balance) > 0.01
                    ? formatNumber(Number(formattedBalance.balance), false, true)
                    : "< 0.01"
                }`}
              </div>
              <div> {`lz-fMULTI`} </div>
            </div>
          )}
          <TraverseButton
            account={address}
            amount={JSBI.BigInt(balance).toString()}
            toChain={toChain}
            fromChain={fromChain}
          />
        </div>
        {/* <div className="mt-12 flex justify-center gap-2 items-start">
          <div
            className="badge badge-warning"
            style={{
              display: "flex",
              position: "absolute",
              justifyContent: "center",
              border: "2px solid",
              borderRadius: "10px",
              borderColor: "#ADADAD", // GREY
              backgroundColor: "#005AFF", // BLUE
              fontSize: "18px",
              paddingBottom: "16px",
              paddingTop: "16px",
              color: "#FFFFFF",
            }}
            onClick={() => toggleEndpointId()}
          >
            {endpointId}
          </div>
        </div> */}
      </div>
    </div>
  );
};
