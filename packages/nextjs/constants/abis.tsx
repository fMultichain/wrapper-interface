export const ABI_LZFMULTI = [
  // approve(_spender, _value)
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
  // deposit(amount)
  {
    inputs: [{ internalType: "uint256", name: "amount", type: "uint256" }],
    name: "deposit",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export const ABI_ERC20 = [
  // approve(_spender, _value)
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

export const ABI_ENDPOINT = [
  /* estimateFees(
        _dstChainId(uint16), 
        _userApplication(address), 
        _payload(bytes), 
        _payInZRO(bool), 
        _adapterParams(bytes))
    */
  {
    inputs: [
      { internalType: "uint16", name: "_dstChainId", type: "uint16" },
      { internalType: "address", name: "_userApplication", type: "address" },
      { internalType: "bytes", name: "_payload", type: "bytes" },
      { internalType: "bool", name: "_payInZRO", type: "bool" },
      { internalType: "bytes", name: "_adapterParams", type: "bytes" },
    ],
    name: "estimateFees",
    outputs: [
      { internalType: "uint256", name: "nativeFee", type: "uint256" },
      { internalType: "uint256", name: "zroFee", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
];
