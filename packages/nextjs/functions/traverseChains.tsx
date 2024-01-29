import Web3 from "web3";
import { ABI_ENDPOINT, ENDPOINT_ID } from "~~/constants";
import { ABI_LZFMULTI, ChainId, ENDPOINT_ADDRESS, LZFMULTI_ADDRESS } from "~~/constants";

// web3 send() of traversing chains
export async function traverseThis(amount: number, toChain: ChainId) {
  // web3
  // todo: verify provider works.
  const provider = new Web3(Web3.givenProvider);
  const web3 = new Web3(provider);

  // Get account of the connected wallet (refresh)
  const accounts = await web3.eth.getAccounts();
  const selectedAccount = accounts[0];

  // set contracts
  const endpointContract = await new web3.eth.Contract(ABI_ENDPOINT, ENDPOINT_ADDRESS[toChain]);
  // todo: verify LZFMULTI_ADDRESS[toChain] is correct.
  const tokenContract = await new web3.eth.Contract(ABI_LZFMULTI, LZFMULTI_ADDRESS[toChain]);

  // bytes to send
  const payload = web3.eth.abi.encodeParameters(["address", "uint256"], [selectedAccount, amount]);
  console.log("The payload is", payload);
  const version = 1;

  // gas required to do transaction on destination chain
  const number = await tokenContract.methods.currentLZGas().call();
  if (!number) {
    console.log("currentLZGas().call() from", LZFMULTI_ADDRESS[toChain], "failed");
  }
  console.log("Current LZ Gas from contract is", number);

  // this is the adapter settings for L0
  const adapterParams = web3.utils.encodePacked({ value: version, type: "uint16" }, { value: number, type: "uint256" });
  console.log("Adapter Params is", adapterParams);

  // this is the payable amount to send
  const amountToSend = await endpointContract.methods
    .estimateFees(ENDPOINT_ID[toChain], LZFMULTI_ADDRESS[toChain], payload, false, adapterParams)
    .call();
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
    .traverseChains(toChain, amount)
    .send({
      from: selectedAccount,
      gasPrice: estimatedGas,
      value: amountToSend ? amountToSend[0] : "0",
    })
    .on("transactionHash", function (hash: any) {
      console.log(hash);
    });
  if (!value) {
    console.log("traverseChains().send() from", selectedAccount, "failed");
  }
}
