import Web3 from "web3";
import { ABI_ENDPOINT, ENDPOINT_ID } from "~~/constants";
import { ABI_LZFMULTI, ChainId, ENDPOINT_ADDRESS, LZFMULTI_ADDRESS, RPC } from "~~/constants";

// web3 send() of traversing chains
// const { address } = useAccount();
// const account = address

export async function traverseThis(account: any, amount: number, toChain: ChainId, fromChain: ChainId) {
  // web3
  // todo: verify provider works.
  // const provider = new Web3(Web3.givenProvider);
  const provider = new Web3(
    Web3.givenProvider || new Web3.providers.HttpProvider(RPC[fromChain]),
    // "http://rpc.ankr.fantom"
  );
  const web3 = new Web3(provider);

  // Get account of the connected wallet (refresh)
  // console.log('account: %s', account);

  // set contracts
  const endpointContract = await new web3.eth.Contract(ABI_ENDPOINT, ENDPOINT_ADDRESS[fromChain]);
  console.log("Endpoint Contract: %s", ENDPOINT_ADDRESS[fromChain]);
  // todo: verify LZFMULTI_ADDRESS[fromChain] is correct.
  const tokenContract = await new web3.eth.Contract(ABI_LZFMULTI, LZFMULTI_ADDRESS[fromChain]);

  // bytes to send
  const payload = web3.eth.abi.encodeParameters(["address", "uint256"], [account, amount]);
  console.log("The payload is", payload);
  const version = 1;

  console.log("destination chain: %s", toChain);

  // gas required to do transaction on destination chain
  const number = (await tokenContract.methods.currentLZGas().call()) ?? 250000;
  if (!number) {
    console.log("currentLZGas().call() from", LZFMULTI_ADDRESS[toChain], "failed");
  }
  console.log("Current LZ Gas from contract is", number);

  // this is the adapter settings for L0
  const adapterParams = web3.utils.encodePacked({ value: version, type: "uint16" }, { value: number, type: "uint256" });
  console.log("Adapter Params is", adapterParams);

  // this is the payable amount to send
  const amountToSend = await endpointContract.methods
    .estimateFees(
      // '1', '0xF386eB6780a1e875616b5751794f909095283860',
      // '0x000000000000000000000000fd63bf84471bc55dd9a83fdfa293ccbd27e1f4c80000000000000000000000000000000000000000000031b3c4e48cbbe8000000',
      //  '0',
      //  '0x0001000000000000000000000000000000000000000000000000000000000003d090'
      ENDPOINT_ID[toChain],
      LZFMULTI_ADDRESS[toChain],
      payload,
      false,
      adapterParams,
    )
    .call();

  console.log("amountToSend is %s", amountToSend);

  if (!amountToSend) {
    console.log("estimateFees().call() from", ENDPOINT_ADDRESS[toChain], "failed");
  }
  console.log("Estimated fees are", amountToSend);

  // current gas estimate
  let estimatedGas;
  await web3.eth.getGasPrice().then((result: any) => {
    console.log("Estimated gas is", web3.utils.fromWei(result, "ether"));
    estimatedGas = result;
  });

  // the transaction
  const value = await tokenContract.methods
    .traverseChains(ENDPOINT_ID[toChain], amount)
    .send({
      from: account,
      gasPrice: estimatedGas,
      value: amountToSend ? amountToSend[0] : "0",
    })
    .on("transactionHash", function (hash: any) {
      console.log(hash);
    });
  if (!value) {
    console.log("traverseChains().send() from", account, "failed");
  }
}
