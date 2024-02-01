import { useState } from "react";
import { CopyIcon } from "./assets/CopyIcon";
import { DiamondIcon } from "./assets/DiamondIcon";
import { HareIcon } from "./assets/HareIcon";
import { JSBI } from "@sushiswap/core-sdk";
import { useAccount, useContractWrite } from "wagmi";
import { ABI_LZFMULTI, ChainId, LZFMULTI_ADDRESS } from "~~/constants";
// ENDPOINT_ID
import { formatNumber } from "~~/functions/formatNumber";
import { traverseThis } from "~~/functions/traverseChains";
import { useTokenBalance } from "~~/hooks/scaffold-eth";

type TBalanceProps = {
  balance: string;
  className?: string;
};

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
  const [fromChain, setFromChain] = useState(ChainId.FANTOM);
  // const [endpointId, setEndpointId] = useState(ENDPOINT_ID[ChainId.ETHEREUM]);
  const { address } = useAccount();
  const formattedBalance = useTokenBalance(
    address ? address?.toString() : "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045", // defaults: Vitalik.eth
    LZFMULTI_ADDRESS[ChainId.FANTOM],
  );

  // const toggleEndpointId = () => {
  //   endpointId == "1 lz-fMULTI = 20,000,000 FMULTI"
  //     ? setEndpointId("0.00000005 lz-fMULTI = 1 FMULTI")
  //     : setEndpointId("1 lz-fMULTI = 20,000,000 FMULTI");
  // };
  const handleSetChains = (fromChain: ChainId, toChain: ChainId) => {
    setFromChain(fromChain);
    setToChain(toChain);
  };

  const balance = Number(formattedBalance.balance) * 1e18;

  // const ApproveButton = ({ balance, className = "" }: TBalanceProps) => {
  //   const { write } = useContractWrite({
  //     address: LZFMULTI_ADDRESS[ChainId.FANTOM],
  //     abi: ABI_LZFMULTI,
  //     functionName: "approve",
  //   });

  //   const handleApproval = () => {
  //     write({
  //       args: [LZFMULTI_ADDRESS[ChainId.FANTOM], balance],
  //     });
  //     setApproved(true);
  //     console.log('approved: %s', isApproved)
  //   };
  //   return (
  //     <div
  //       style={{
  //         display: "flex",
  //         justifyContent: "center",
  //         border: "4px solid",
  //         borderRadius: "10px",
  //         padding: "8px 6px",
  //         paddingTop: "16px",
  //         fontSize: "21px",
  //         fontWeight: "bold",
  //         backgroundColor: "#005AFF", // BLUE
  //         color: "#FFFFFF",
  //       }}
  //       onClick={() => handleApproval()}
  //       className={className}
  //     >
  //       {`Approve`}
  //     </div>
  //   );
  // };

  const ChainSelector = () => {
    return (
      // TODO: fix
      <div onClick={() => handleSetChains(ChainId.FANTOM, ChainId.AVALANCHE)}>{`Select Chain`}</div>
    );
  };

  const TraverseButton = ({ account, amount, className = "" }: TraverseProps) => {
    // const { write } = useContractWrite({
    //   address: LZFMULTI_ADDRESS[ChainId.FANTOM],
    //   abi: ABI_LZFMULTI,
    //   functionName: "approve",
    // });

    const handleTraverse = (amount: number, toChain: ChainId, fromChain: ChainId) => {
      // write({
      //   args: [LZFMULTI_ADDRESS[ChainId.FANTOM], balance],
      // });
      traverseThis(account, Number(amount), toChain, fromChain);
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
  const BridgeButton = ({ balance, className = "" }: TBalanceProps) => {
    // TODO: update this to use the new traverseChains function.
    const { write } = useContractWrite({
      address: LZFMULTI_ADDRESS[ChainId.FANTOM],
      abi: ABI_LZFMULTI,
      functionName: "deposit",
    });

    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          border: "4px solid",
          borderRadius: "10px",
          padding: "8px 4px",
          paddingTop: "16px",
          fontSize: "21px",
          fontWeight: "bold",
          backgroundColor: "#005AFF", // BLUE
          color: "#FFFFFF",
        }}
        onClick={() =>
          write({
            args: [balance],
          })
        }
        className={className}
      >
        {`Upgrade`}
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
            className={address ? `grid grid-cols-2 gap-4` : `mb-8`}
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
            {/* [TODO] LZ_FMULTI.approve(CONTRACT, balance) */}
            {/* {address && !isApproved && Number(balance) > 0 && (
              <ApproveButton balance={JSBI.BigInt(Number(balance)).toString()} />
            )} */}
            <TraverseButton
              account={address}
              amount={JSBI.BigInt(balance).toString()}
              toChain={ChainId.AVALANCHE}
              fromChain={fromChain}
            />
            {/* [WIP] Shows: Chain Selector */}
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
                <ChainSelector />
              </div>
            )}
            {address && Number(balance) > 0 && <BridgeButton balance={JSBI.BigInt(Number(balance)).toString()} />}
          </div>
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
