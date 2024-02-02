import { useState } from "react";
import { CopyIcon } from "./assets/CopyIcon";
import { DiamondIcon } from "./assets/DiamondIcon";
import { HareIcon } from "./assets/HareIcon";
import { JSBI } from "@sushiswap/core-sdk";
import { useAccount, useChainId } from "wagmi";
// import { parseEther } from 'viem'
// import Web3 from "web3";
import {
  // ABI_ENDPOINT,
  // ABI_LZFMULTI,
  ChainId,
  ChainName, // ENDPOINT_ADDRESS,
  // ENDPOINT_ID,
  LZFMULTI_ADDRESS,
} from "~~/constants";
// ENDPOINT_ID
import { formatNumber } from "~~/functions/formatNumber";
// import { getBridgeData } from "~~/functions/getBridgeData";
import { useTokenBalance } from "~~/hooks/scaffold-eth";

// import { traverseThis } from "~~/functions/traverseChains";

// import { ChainMap } from "~~/types/ChainMap";

type TraverseProps = {
  account: any;
  amount: string | number;
  toChain: ChainId;
  fromChain: ChainId;
  className?: string;
};

export const BridgeInteraction = () => {
  const { address } = useAccount();

  const _fromChain = useChainId();
  const fromChain: ChainId = _fromChain as ChainId;
  const toChains = [ChainId.FANTOM, ChainId.COINBASE, ChainId.ARBITRUM, ChainId.AVALANCHE].filter(
    (chain: ChainId) => chain !== fromChain,
  );
  const [toChain, setToChain] = useState(toChains[0]);
  const chains = toChains.filter((chain: ChainId) => chain !== toChain);
  const formattedBalance = useTokenBalance(
    address ? address?.toString() : "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045", // defaults: Vitalik.eth
    LZFMULTI_ADDRESS[fromChain],
  );
  // console.log('thisChain: %s', chainId)

  const balance = Number(formattedBalance.balance) * 1e18;

  // const { sendTransaction } = useSendTransaction()

  const ChainSelector = () => {
    const [showChains, setShowChains] = useState(false);
    const toggleShow = () => {
      setShowChains(!showChains);
    };
    // console.log('toChains: %s', toChains)
    return (
      <div>
        <div className={"grid grid-cols-1"}>
          {/* <div
        style={{
          // display: "flex",
          justifyContent: "center",
          // border: "4px solid",
          borderRadius: "10px",
          padding: "8px 4px",
          fontWeight: "bold",
          backgroundColor: "#005AFF", // BLUE
          color: "#FFFFFF",
        }}
      >
        {`TO`}
        </div> */}
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
    // const { write } = useContractWrite({
    //   address: LZFMULTI_ADDRESS[fromChain],
    //   abi: ABI_LZFMULTI,
    //   functionName: "traverseChains",
    // });

    // const handleTraverse = async (amount: number, toChain: ChainId, fromChain: ChainId) => {
    //   const estimatedGas = await (await getBridgeData(account, Number(amount), toChain, fromChain)).at(0);
    //   // const estimatedGas = JSBI.BigInt(_estimatedGas)
    //   // const estimatedGas = (Number(_estimatedGas / 1E18))?.toString();
    //   // const estimatedGas = (Number(_estimatedGas) / 1E18)?.toString();
    //   const _payableAmount = await (await getBridgeData(account, Number(amount), toChain, fromChain)).at(1);
    //   const payableAmount = (Number(_payableAmount) / 1E18)?.toString();
    //   console.log("estimatedGas: %s", estimatedGas);
    //   console.log("payableAmount: %s", payableAmount);
    //   write({
    //     // args: chainId, amount
    //     args: [ENDPOINT_ID[toChain], amount],
    //     // gas: parseGwei(estimatedGas ? estimatedGas : "0"), // BigInt(estimatedGas ? estimatedGas : "0"),
    //     gasPrice: estimatedGas ?? '0', // BigInt(estimatedGas ? estimatedGas : "0"),
    //     value: parseEther(payableAmount ?? '0', 'wei'),
    //     // send: {
    //     //   from: account,
    //     //   gasPrice: estimatedGas,
    //     //   value: amountToSend ? amountToSend[0] : "0",
    //     // }
    //   });
    //   // traverseThis(account, Number(amount), toChain, fromChain);

    //   console.log("traversing: %s on %s", amount, toChain);
    // };

    const handleTraverseThis = async (account: any, amount: number, toChain: ChainId, fromChain: ChainId) => {
      account;
      amount;
      toChain;
      fromChain;
      return null;
      //   const web3 = new Web3(window.ethereum);

      //   // Get account of the connected wallet (refresh)
      //   // console.log('accounts: %s', accounts[0]);
      //   console.log("account: %s", account);

      //   // set contracts
      //   const endpointContract = await new web3.eth.Contract(ABI_ENDPOINT, ENDPOINT_ADDRESS[fromChain]);
      //   console.log("Endpoint Contract: %s", ENDPOINT_ADDRESS[fromChain]);
      //   // todo: verify LZFMULTI_ADDRESS[fromChain] is correct.
      //   const tokenContract = await new web3.eth.Contract(ABI_LZFMULTI, LZFMULTI_ADDRESS[fromChain]);

      //   // bytes to send
      //   const payload = web3.eth.abi.encodeParameters(["address", "uint256"], [account, amount]);
      //   console.log("The payload is", payload);
      //   const version = 1;

      //   console.log("destination chain: %s", toChain);

      //   // gas required to do transaction on destination chain
      //   const gas = 250000; // (await tokenContract.methods.currentLZGas().call()) ?? 250000;
      //   if (!gas) {
      //     console.log("currentLZGas().call() from", LZFMULTI_ADDRESS[fromChain], "failed");
      //   }
      //   console.log("Current LZ Gas from contract is", gas);

      //   // this is the adapter settings for L0
      //   const adapterParams = web3.utils.encodePacked(
      //     { value: version, type: "uint16" },
      //     { value: gas, type: "uint256" },
      //   );
      //   console.log("Adapter Params is", adapterParams);

      //   // this is the payable amount to send
      //   const amountToSend = await endpointContract.methods
      //     .estimateFees(ENDPOINT_ID[fromChain], LZFMULTI_ADDRESS[fromChain], payload, false, adapterParams)
      //     .call();

      //   console.log("amountToSend is %s", amountToSend);

      //   if (!amountToSend) {
      //     console.log("estimateFees().call() from", ENDPOINT_ADDRESS[toChain], "failed");
      //   }
      //   console.log("Estimated fees are", amountToSend);

      //   // current gas estimate
      //   let estimatedGas;
      //   await web3.eth.getGasPrice().then((result: any) => {
      //     console.log("Estimated gas is", web3.utils.fromWei(result, "ether"));
      //     estimatedGas = result;
      //   });

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
