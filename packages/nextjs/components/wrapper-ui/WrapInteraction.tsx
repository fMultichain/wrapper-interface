// import { useState } from "react"
import { CopyIcon } from "./assets/CopyIcon";
import { DiamondIcon } from "./assets/DiamondIcon";
import { HareIcon } from "./assets/HareIcon";
import { JSBI } from "@sushiswap/core-sdk";
import { useAccount, useContractWrite } from "wagmi";
import { formatNumber } from "~~/functions/formatNumber";
// import { ArrowSmallRightIcon } from "@heroicons/react/24/outline"
import { useTokenBalance } from "~~/hooks/scaffold-eth";

const LZFMULTI_ADDRESS = "0xF386eB6780a1e875616b5751794f909095283860";
const FMULTI_ADDRESS = "0x6CEbb8cD66Fca7E6aca65841Ae3A04B7884F4de8";

const ABI_FMULTI = [
  {
    inputs: [
      { internalType: "address", name: "_spender", type: "address" },
      { internalType: "uint256", name: "_value", type: "uint256" },
    ],
    name: "approve",
    outputs: [{ internalType: "bool", name: "success", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
];

// const ABI_LZ_FMULTI = [
//   { "inputs": [{ "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "deposit", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }
// ]

type TBalanceProps = {
  balance: string;
  className?: string;
};

export const ApproveButton = ({ balance, className = "" }: TBalanceProps) => {
  const { write } = useContractWrite({
    address: FMULTI_ADDRESS,
    // @ts-ignore
    abi: ABI_FMULTI,
    // inputs: [{
    //     reciever: address, // state: false,
    // }],
    // outputs: [],
    functionName: "approve", // setPaused
  });

  return (
    <div
      style={{
        display: "flex",
        // width: '100%',
        // fontColor: '#FFFFFF',
        border: "4px solid",
        borderRadius: "10px",
        borderColor: "#004EE5", // fMULTI BLUE
        padding: "8px 64px",
        marginTop: "32px",
        fontSize: "24px",
        // hoveredBorder: '2px solid',
      }}
      onClick={() =>
        write({
          args: [LZFMULTI_ADDRESS, balance],
          // value: "1000000000000000000" // 1 ETH
        })
      }
      className={className}
    >
      Approve
    </div>
  );
};

// export const WrapButton = ({ balance, className = "" }: TBalanceProps) => {
//   const { write } = useContractWrite({
//     address: FMULTI_ADDRESS,
//     // @ts-ignore
//     abi: ABI_FMULTI,
//     // inputs: [{
//     //     reciever: address, // state: false,
//     // }],
//     // outputs: [],
//     functionName: 'approve', // setPaused
//   })

//   return (
//     <div
//       style={{
//         display: 'flex',
//         // width: '100%',
//         // fontColor: '#FFFFFF',
//         border: '4px solid',
//         borderRadius: '10px',
//         borderColor: '#004EE5', // fMULTI BLUE
//         padding: '8px 64px',
//         marginTop: '32px',
//         fontSize: '24px',
//         // hoveredBorder: '2px solid',
//       }}
//       onClick={() => write({
//         args: [LZFMULTI_ADDRESS, balance],
//         // value: "1000000000000000000" // 1 ETH
//       })}
//     >
//       Approve
//     </div>
//   )
// }

export const WrapInteraction = () => {
  // const [depositAmount, setDepositAmount] = useState("")
  // const { address } = useAccount()
  // const { data } = useBalance({ address })
  // const balance = Number(data?.formatted)
  const { address } = useAccount();
  const formattedBalance = useTokenBalance(
    address ? address?.toString() : "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
    FMULTI_ADDRESS,
  );

  const balance = Number(formattedBalance.balance) * 1e18;

  // // let FMULTI = await new web3.eth.Contract(ABI_FMULTI, FMULTI_ADDRESS);
  // // let LZFMULTI = await new web3.eth.Contract(ABI_LZ_FMULTI, LZFMULTI_ADDRESS);
  // // const insufficientBalance = balance < 1

  //   // console.log(w,h)
  //   const { write } = useContractWrite({
  //     // @ts-ignore
  //     address: rareAddress(),
  //     // @ts-ignore
  //     abi: ABI_FMULTI,
  //     // inputs: [{
  //     //     reciever: address, // state: false,
  //     // }],
  //     // outputs: [],
  //     functionName: 'approve', // setPaused
  //   })

  // const { writeAsync, isLoading } = useScaffoldContractWrite({
  //   contractName: "YourContract",
  //   functionName: "deposit", // todo
  //   args: [depositAmount],
  //   value: "0.01", // todo
  //   onBlockConfirmation: txnReceipt => {
  //     console.log("📦 Transaction blockHash", txnReceipt.blockHash);
  //   },
  // });

  return (
    <div className="flex bg-base-300 relative pb-10">
      <DiamondIcon className="absolute top-24" />
      <CopyIcon className="absolute bottom-0 left-36" />
      <HareIcon className="absolute right-0 bottom-24" />
      <div className="flex flex-col w-full mx-5 sm:mx-8 2xl:mx-20">
        <div className="flex flex-col mt-6 px-7 py-8 bg-base-200 opacity-80 rounded-2xl shadow-lg border-2 border-primary">
          {/* <span 
            className="text-center text-2xl sm:text-6xl text-black"
          >
            {`Upgrade to lz-fMULTI`}
          </span> */}
          {/* <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-5"> */}
          <div
            style={{
              justifyContent: "center",
            }}
          >
            {!address && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  // width: '100%',
                  // fontColor: '#FFFFFF',
                  border: "4px solid",
                  borderRadius: "10px",
                  borderColor: "#FF0000", // fMULTI BLUE
                  padding: "2px 16px",
                  marginTop: "32px",
                  fontSize: "24px",
                  animation: "pulse 2s infinite",
                  // hoveredBorder: '2px solid',
                }}
              >
                {`Wallet Disconnected`}
              </div>
            )}
            {address && (
              <div
                style={{
                  display: "flex",
                  // width: '100%',
                  // fontColor: '#FFFFFF',
                  border: "4px solid",
                  borderRadius: "10px",
                  borderColor: "#004EE5", // fMULTI BLUE
                  padding: "8px 64px",
                  marginTop: "32px",
                  fontSize: "24px",
                  // hoveredBorder: '2px solid',
                }}
                className={""}
              >
                {`${balance ? formatNumber(balance, false, true) : "0.0"} FMULTI`}
              </div>
            )}
            {/* [√] FMULTI.approve(LZ_FMULTI, balance) */}
            {address && <ApproveButton balance={JSBI.BigInt(Number(balance)).toString()} />}
            {/* {isLoading ? (
                    <span className="loading loading-spinner loading-sm"></span>
                  ) : (
                    <>
                      Upgrade <ArrowSmallRightIcon className="w-3 h-3 mt-0.5" />
                    </>
                  )} */}
            {/* </button> */}
          </div>

          <div className="mt-4 flex gap-2 items-start">
            <span className="text-sm leading-tight">Conversion Rate:</span>
            <div className="badge badge-warning">lz-fMULTI = 20,000,000 FMULTI (?)</div>
          </div>
        </div>
      </div>
    </div>
  );
};
