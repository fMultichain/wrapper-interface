import { useState } from "react";
import { CopyIcon } from "./assets/CopyIcon";
import { DiamondIcon } from "./assets/DiamondIcon";
import { HareIcon } from "./assets/HareIcon";
import { JSBI } from "@sushiswap/core-sdk";
import { useAccount, useChainId, useContractWrite } from "wagmi";
import { ABI_LZFMULTI, ChainId, ChainName, ENDPOINT_ID, LZFMULTI_ADDRESS } from "~~/constants";
// ENDPOINT_ID
import { formatNumber } from "~~/functions/formatNumber";
import { getBridgeData } from "~~/functions/getBridgeData";
import { useTokenBalance } from "~~/hooks/scaffold-eth";

// import { ChainMap } from "~~/types/ChainMap";

type TraverseProps = {
  account: any;
  amount: string | number;
  toChain: ChainId;
  fromChain: ChainId;
  className?: string;
};

export const BridgeInteraction = () => {
  // const [isApproved, setApproved] = useState(false);
  const [toChain, setToChain] = useState(ChainId.AVALANCHE);
  const { address } = useAccount();

  const _fromChain = useChainId();
  const fromChain: ChainId = _fromChain as ChainId;
  const formattedBalance = useTokenBalance(
    address ? address?.toString() : "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045", // defaults: Vitalik.eth
    LZFMULTI_ADDRESS[fromChain],
  );
  // console.log('thisChain: %s', chainId)

  const balance = Number(formattedBalance.balance) * 1e18;

  const ChainSelector = () => {
    const toChains = [ChainId.FANTOM, ChainId.COINBASE, ChainId.ARBITRUM, ChainId.AVALANCHE].filter(
      (chain: ChainId) => chain !== fromChain,
    );
    // console.log('toChains: %s', toChains)
    return (
      <div className="grid grid-cols-3 gap-2">
        {toChains.map((chain: ChainId) => (
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
    );
  };

  const TraverseButton = ({ account, amount, className = "" }: TraverseProps) => {
    const { write } = useContractWrite({
      address: LZFMULTI_ADDRESS[fromChain],
      abi: ABI_LZFMULTI,
      functionName: "traverseChains",
    });

    const handleTraverse = async (amount: number, toChain: ChainId, fromChain: ChainId) => {
      const estimatedGas = await (await getBridgeData(account, Number(amount), toChain, fromChain)).at(0);
      // const estimatedGas = JSBI.BigInt(_estimatedGas)
      const payableAmount = await (await getBridgeData(account, Number(amount), toChain, fromChain)).at(1);
      console.log("estimatedGas: %s", estimatedGas);
      console.log("payableAmount: %s", payableAmount);
      write({
        // args: chainId, amount
        args: [ENDPOINT_ID[toChain], amount],
        gasPrice: BigInt(estimatedGas ? estimatedGas : "0"),
        value: BigInt(payableAmount ? payableAmount : "0"),
        // send: {
        //   from: account,
        //   gasPrice: estimatedGas,
        //   value: amountToSend ? amountToSend[0] : "0",
        // }
      });
      // traverseThis(account, Number(amount), toChain, fromChain);

      console.log("traversing: %s on %s", amount, toChain);
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
        onClick={() => handleTraverse(Number(amount), toChain, fromChain)}
        className={className}
      >
        {`Traverse`}
      </div>
    );
  };

  // TODO: invalid
  // const BridgeButton = ({ balance, className = "" }: TBalanceProps) => {
  //   // TODO: update this to use the new traverseChains function.
  //   const { write } = useContractWrite({
  //     address: LZFMULTI_ADDRESS[fromChain],
  //     abi: ABI_LZFMULTI,
  //     functionName: "deposit",
  //   });

  //   return (
  //     <div
  //       style={{
  //         display: "flex",
  //         justifyContent: "center",
  //         border: "4px solid",
  //         borderRadius: "10px",
  //         padding: "8px 4px",
  //         paddingTop: "16px",
  //         fontSize: "21px",
  //         fontWeight: "bold",
  //         backgroundColor: "#005AFF", // BLUE
  //         color: "#FFFFFF",
  //       }}
  //       onClick={() =>
  //         write({
  //           args: [balance],
  //         })
  //       }
  //       className={className}
  //     >
  //       {`Upgrade`}
  //     </div>
  //   );
  // };

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
