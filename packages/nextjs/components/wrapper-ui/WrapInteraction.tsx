import { useState } from "react";
import { config } from "./Config";
import { CopyIcon } from "./assets/CopyIcon";
import { DiamondIcon } from "./assets/DiamondIcon";
import { HareIcon } from "./assets/HareIcon";
import { JSBI } from "@sushiswap/core-sdk";
// useContractWrite
// import { sendTransaction } from '@wagmi/core'
import { writeContract } from "@wagmi/core";
import { useAccount } from "wagmi";
import { ABI_ERC20, ABI_LZFMULTI, ChainId, FMULTI_ADDRESS, LZFMULTI_ADDRESS } from "~~/constants";
import { formatNumber } from "~~/functions/formatNumber";
// import { ArrowSmallRightIcon } from "@heroicons/react/24/outline"
import { useTokenBalance } from "~~/hooks/scaffold-eth";

// import { parseEther } from "viem";

type TBalanceProps = {
  balance: string;
  className?: string;
};

export const WrapInteraction = () => {
  const [isApproved, setApproved] = useState(false);
  const [conversionRate, setConversionRate] = useState("lz-fMULTI = 20,000,000 FMULTI");
  const { address } = useAccount();
  const formattedBalance = useTokenBalance(
    address ? address?.toString() : "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045", // defaults: Vitalik.eth
    FMULTI_ADDRESS[ChainId.FANTOM],
  );

  const toggleConversionRate = () => {
    conversionRate == "1 lz-fMULTI = 20,000,000 FMULTI"
      ? setConversionRate("0.00000005 lz-fMULTI = 1 FMULTI")
      : setConversionRate("1 lz-fMULTI = 20,000,000 FMULTI");
  };

  const balance = Number(formattedBalance.balance) * 1e18;
  const convertedBalance = Number(formattedBalance.balance) * 0.00000005;

  const ApproveButton = ({ balance, className = "" }: TBalanceProps) => {
    // const { write } = useContractWrite({
    //   address: FMULTI_ADDRESS[ChainId.FANTOM],
    //   abi: ABI_ERC20,
    //   functionName: "approve",
    // });

    const handleApproval = async () => {
      // write({
      //   args: [LZFMULTI_ADDRESS[ChainId.FANTOM], balance],
      // });
      await writeContract(config, {
        to: FMULTI_ADDRESS[ChainId.FANTOM],
        abi: ABI_ERC20,
        functionName: "approve",
        args: [LZFMULTI_ADDRESS[ChainId.FANTOM], balance],
      });
      setApproved(true);
      // console.log('approved: %s', isApproved)
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
        onClick={() => handleApproval()}
        className={className}
      >
        {` Approve`}
      </div>
    );
  };

  const DepositButton = ({ balance, className = "" }: TBalanceProps) => {
    // const { write } = useContractWrite({
    //   address: LZFMULTI_ADDRESS[ChainId.FANTOM],
    //   abi: ABI_LZFMULTI,
    //   functionName: "deposit",
    // });
    const handleDeposit = async () => {
      await writeContract(config, {
        to: LZFMULTI_ADDRESS[ChainId.FANTOM],
        abi: ABI_LZFMULTI,
        functionName: "deposit",
        args: [balance],
        // value: parseEther('0.01'),
      });
    };

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
        onClick={() => handleDeposit()}
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
                <div> {`FMULTI`} </div>
              </div>
            )}
            {/* [√] FMULTI.approve(LZ_FMULTI, balance) */}
            {address && !isApproved && Number(balance) > 0 && (
              <ApproveButton balance={JSBI.BigInt(Number(balance)).toString()} />
            )}
            {address && !isApproved && (
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
                <div>
                  {`${
                    !balance || Number(formattedBalance.balance) == 0
                      ? "0"
                      : balance && Number(formattedBalance.balance) > 0.01
                      ? formatNumber(convertedBalance, false, true)
                      : "< 0.01"
                  }`}
                </div>
                <div> {`lz-fMULTI`} </div>
              </div>
            )}
            {address && Number(balance) > 0 && <DepositButton balance={JSBI.BigInt(Number(balance)).toString()} />}
          </div>
        </div>
        <div className="mt-12 flex justify-center gap-2 items-start">
          {/* <span className="text-sm leading-tight">Conversion Rate:</span> */}
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
            onClick={() => toggleConversionRate()}
          >
            {conversionRate}
          </div>
        </div>
      </div>
    </div>
  );
};
