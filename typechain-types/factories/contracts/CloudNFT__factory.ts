/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../common";
import type { CloudNFT, CloudNFTInterface } from "../../contracts/CloudNFT";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_marketplaceAddress",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "approved",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "getApproved",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
    ],
    name: "giveAway",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "isApprovedForAll",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "marketplaceAddress",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "ownerOf",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "tokenByIndex",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "tokenOfOwnerByIndex",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "tokenURI",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x60806040523480156200001157600080fd5b506040516200393a3803806200393a83398181016040528101906200003791906200017b565b6040518060400160405280600881526020017f436c6f75644e46540000000000000000000000000000000000000000000000008152506040518060400160405280600581526020017f434c4f55440000000000000000000000000000000000000000000000000000008152508160009081620000b4919062000427565b508060019081620000c6919062000427565b50505080600c60006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550506200050e565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000620001438262000116565b9050919050565b620001558162000136565b81146200016157600080fd5b50565b60008151905062000175816200014a565b92915050565b60006020828403121562000194576200019362000111565b5b6000620001a48482850162000164565b91505092915050565b600081519050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b600060028204905060018216806200022f57607f821691505b602082108103620002455762000244620001e7565b5b50919050565b60008190508160005260206000209050919050565b60006020601f8301049050919050565b600082821b905092915050565b600060088302620002af7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8262000270565b620002bb868362000270565b95508019841693508086168417925050509392505050565b6000819050919050565b6000819050919050565b60006200030862000302620002fc84620002d3565b620002dd565b620002d3565b9050919050565b6000819050919050565b6200032483620002e7565b6200033c62000333826200030f565b8484546200027d565b825550505050565b600090565b6200035362000344565b6200036081848462000319565b505050565b5b8181101562000388576200037c60008262000349565b60018101905062000366565b5050565b601f821115620003d757620003a1816200024b565b620003ac8462000260565b81016020851015620003bc578190505b620003d4620003cb8562000260565b83018262000365565b50505b505050565b600082821c905092915050565b6000620003fc60001984600802620003dc565b1980831691505092915050565b6000620004178383620003e9565b9150826002028217905092915050565b6200043282620001ad565b67ffffffffffffffff8111156200044e576200044d620001b8565b5b6200045a825462000216565b620004678282856200038c565b600060209050601f8311600181146200049f57600084156200048a578287015190505b62000496858262000409565b86555062000506565b601f198416620004af866200024b565b60005b82811015620004d957848901518255600182019150602085019450602081019050620004b2565b86831015620004f95784890151620004f5601f891682620003e9565b8355505b6001600288020188555050505b505050505050565b61341c806200051e6000396000f3fe608060405234801561001057600080fd5b50600436106101165760003560e01c80636352211e116100a2578063a22cb46511610071578063a22cb46514610305578063b88d4fde14610321578063c87b56dd1461033d578063daa17f491461036d578063e985e9c51461038b57610116565b80636352211e1461026b57806370a082311461029b57806395d89b41146102cb5780639e240785146102e957610116565b806318160ddd116100e957806318160ddd146101b557806323b872dd146101d35780632f745c59146101ef57806342842e0e1461021f5780634f6ccce71461023b57610116565b806301ffc9a71461011b57806306fdde031461014b578063081812fc14610169578063095ea7b314610199575b600080fd5b61013560048036038101906101309190612064565b6103bb565b60405161014291906120ac565b60405180910390f35b6101536103cd565b6040516101609190612157565b60405180910390f35b610183600480360381019061017e91906121af565b61045f565b604051610190919061221d565b60405180910390f35b6101b360048036038101906101ae9190612264565b6104a5565b005b6101bd6105bc565b6040516101ca91906122b3565b60405180910390f35b6101ed60048036038101906101e891906122ce565b6105c9565b005b61020960048036038101906102049190612264565b610629565b60405161021691906122b3565b60405180910390f35b610239600480360381019061023491906122ce565b6106ce565b005b610255600480360381019061025091906121af565b6106ee565b60405161026291906122b3565b60405180910390f35b610285600480360381019061028091906121af565b61075f565b604051610292919061221d565b60405180910390f35b6102b560048036038101906102b09190612321565b610810565b6040516102c291906122b3565b60405180910390f35b6102d36108c7565b6040516102e09190612157565b60405180910390f35b61030360048036038101906102fe9190612321565b610959565b005b61031f600480360381019061031a919061237a565b610a14565b005b61033b600480360381019061033691906124ef565b610a2a565b005b610357600480360381019061035291906121af565b610a8c565b6040516103649190612157565b60405180910390f35b610375610a9e565b604051610382919061221d565b60405180910390f35b6103a560048036038101906103a09190612572565b610ac4565b6040516103b291906120ac565b60405180910390f35b60006103c682610b58565b9050919050565b6060600080546103dc906125e1565b80601f0160208091040260200160405190810160405280929190818152602001828054610408906125e1565b80156104555780601f1061042a57610100808354040283529160200191610455565b820191906000526020600020905b81548152906001019060200180831161043857829003601f168201915b5050505050905090565b600061046a82610bd2565b6004600083815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050919050565b60006104b08261075f565b90508073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1603610520576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161051790612684565b60405180910390fd5b8073ffffffffffffffffffffffffffffffffffffffff1661053f610c1d565b73ffffffffffffffffffffffffffffffffffffffff16148061056e575061056d81610568610c1d565b610ac4565b5b6105ad576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016105a490612716565b60405180910390fd5b6105b78383610c25565b505050565b6000600980549050905090565b6105da6105d4610c1d565b82610cde565b610619576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610610906127a8565b60405180910390fd5b610624838383610d73565b505050565b600061063483610810565b8210610675576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161066c9061283a565b60405180910390fd5b600760008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600083815260200190815260200160002054905092915050565b6106e983838360405180602001604052806000815250610a2a565b505050565b60006106f86105bc565b8210610739576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610730906128cc565b60405180910390fd5b6009828154811061074d5761074c6128ec565b5b90600052602060002001549050919050565b6000806002600084815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1603610807576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016107fe90612967565b60405180910390fd5b80915050919050565b60008073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603610880576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610877906129f9565b60405180910390fd5b600360008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b6060600180546108d6906125e1565b80601f0160208091040260200160405190810160405280929190818152602001828054610902906125e1565b801561094f5780601f106109245761010080835404028352916020019161094f565b820191906000526020600020905b81548152906001019060200180831161093257829003601f168201915b5050505050905090565b6000610965600b610fd9565b905060006040518060a001604052806074815260200161337360749139905061098e8383610fe7565b6109988282611005565b6109c5600c60009054906101000a900473ffffffffffffffffffffffffffffffffffffffff166001610a14565b610a056040518060400160405280601581526020017f4d696e74656420746f6b656e20257320746f20257300000000000000000000008152508385611072565b610a0f600b611111565b505050565b610a26610a1f610c1d565b8383611127565b5050565b610a3b610a35610c1d565b83610cde565b610a7a576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610a71906127a8565b60405180910390fd5b610a8684848484611293565b50505050565b6060610a97826112ef565b9050919050565b600c60009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000600560008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16905092915050565b60007f780e9d63000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19161480610bcb5750610bca82611401565b5b9050919050565b610bdb816114e3565b610c1a576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610c1190612967565b60405180910390fd5b50565b600033905090565b816004600083815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550808273ffffffffffffffffffffffffffffffffffffffff16610c988361075f565b73ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45050565b600080610cea8361075f565b90508073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff161480610d2c5750610d2b8185610ac4565b5b80610d6a57508373ffffffffffffffffffffffffffffffffffffffff16610d528461045f565b73ffffffffffffffffffffffffffffffffffffffff16145b91505092915050565b8273ffffffffffffffffffffffffffffffffffffffff16610d938261075f565b73ffffffffffffffffffffffffffffffffffffffff1614610de9576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610de090612a8b565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603610e58576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610e4f90612b1d565b60405180910390fd5b610e6383838361154f565b610e6e600082610c25565b6001600360008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254610ebe9190612b6c565b925050819055506001600360008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254610f159190612ba0565b92505081905550816002600083815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550808273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef60405160405180910390a4610fd483838361155f565b505050565b600081600001549050919050565b611001828260405180602001604052806000815250611564565b5050565b61100e826114e3565b61104d576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161104490612c46565b60405180910390fd5b8060066000848152602001908152602001600020908161106d9190612e12565b505050565b61110c83838360405160240161108a93929190612ee4565b6040516020818303038152906040527f1c7ec448000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff83818316178352505050506115bf565b505050565b6001816000016000828254019250508190555050565b8173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1603611195576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161118c90612f6e565b60405180910390fd5b80600560008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055508173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c318360405161128691906120ac565b60405180910390a3505050565b61129e848484610d73565b6112aa848484846115d9565b6112e9576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016112e090613000565b60405180910390fd5b50505050565b60606112fa82610bd2565b600060066000848152602001908152602001600020805461131a906125e1565b80601f0160208091040260200160405190810160405280929190818152602001828054611346906125e1565b80156113935780601f1061136857610100808354040283529160200191611393565b820191906000526020600020905b81548152906001019060200180831161137657829003601f168201915b5050505050905060006113a4611760565b905060008151036113b95781925050506113fc565b6000825111156113ee5780826040516020016113d692919061305c565b604051602081830303815290604052925050506113fc565b6113f784611777565b925050505b919050565b60007f80ac58cd000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191614806114cc57507f5b5e139f000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916145b806114dc57506114db826117df565b5b9050919050565b60008073ffffffffffffffffffffffffffffffffffffffff166002600084815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614159050919050565b61155a838383611849565b505050565b505050565b61156e838361195b565b61157b60008484846115d9565b6115ba576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016115b190613000565b60405180910390fd5b505050565b6115d6816115ce611b34611b55565b63ffffffff16565b50565b60006115fa8473ffffffffffffffffffffffffffffffffffffffff16611b60565b15611753578373ffffffffffffffffffffffffffffffffffffffff1663150b7a02611623610c1d565b8786866040518563ffffffff1660e01b815260040161164594939291906130d5565b6020604051808303816000875af192505050801561168157506040513d601f19601f8201168201806040525081019061167e9190613136565b60015b611703573d80600081146116b1576040519150601f19603f3d011682016040523d82523d6000602084013e6116b6565b606091505b5060008151036116fb576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016116f290613000565b60405180910390fd5b805181602001fd5b63150b7a0260e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916817bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191614915050611758565b600190505b949350505050565b606060405180602001604052806000815250905090565b606061178282610bd2565b600061178c611760565b905060008151116117ac57604051806020016040528060008152506117d7565b806117b684611b83565b6040516020016117c792919061305c565b6040516020818303038152906040525b915050919050565b60007f01ffc9a7000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916149050919050565b611854838383611ce3565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff16036118965761189181611ce8565b6118d5565b8173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff16146118d4576118d38382611d31565b5b5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16036119175761191281611e9e565b611956565b8273ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1614611955576119548282611f6f565b5b5b505050565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16036119ca576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016119c1906131af565b60405180910390fd5b6119d3816114e3565b15611a13576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611a0a9061321b565b60405180910390fd5b611a1f6000838361154f565b6001600360008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254611a6f9190612ba0565b92505081905550816002600083815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550808273ffffffffffffffffffffffffffffffffffffffff16600073ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef60405160405180910390a4611b306000838361155f565b5050565b60006a636f6e736f6c652e6c6f679050600080835160208501845afa505050565b611fee819050919050565b6000808273ffffffffffffffffffffffffffffffffffffffff163b119050919050565b606060008203611bca576040518060400160405280600181526020017f30000000000000000000000000000000000000000000000000000000000000008152509050611cde565b600082905060005b60008214611bfc578080611be59061323b565b915050600a82611bf591906132b2565b9150611bd2565b60008167ffffffffffffffff811115611c1857611c176123c4565b5b6040519080825280601f01601f191660200182016040528015611c4a5781602001600182028036833780820191505090505b5090505b60008514611cd757600182611c639190612b6c565b9150600a85611c7291906132e3565b6030611c7e9190612ba0565b60f81b818381518110611c9457611c936128ec565b5b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a905350600a85611cd091906132b2565b9450611c4e565b8093505050505b919050565b505050565b600980549050600a600083815260200190815260200160002081905550600981908060018154018082558091505060019003906000526020600020016000909190919091505550565b60006001611d3e84610810565b611d489190612b6c565b9050600060086000848152602001908152602001600020549050818114611e2d576000600760008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600084815260200190815260200160002054905080600760008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600084815260200190815260200160002081905550816008600083815260200190815260200160002081905550505b6008600084815260200190815260200160002060009055600760008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008381526020019081526020016000206000905550505050565b60006001600980549050611eb29190612b6c565b90506000600a6000848152602001908152602001600020549050600060098381548110611ee257611ee16128ec565b5b906000526020600020015490508060098381548110611f0457611f036128ec565b5b906000526020600020018190555081600a600083815260200190815260200160002081905550600a6000858152602001908152602001600020600090556009805480611f5357611f52613314565b5b6001900381819060005260206000200160009055905550505050565b6000611f7a83610810565b905081600760008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600083815260200190815260200160002081905550806008600084815260200190815260200160002081905550505050565b611ff6613343565b565b6000604051905090565b600080fd5b600080fd5b60007fffffffff0000000000000000000000000000000000000000000000000000000082169050919050565b6120418161200c565b811461204c57600080fd5b50565b60008135905061205e81612038565b92915050565b60006020828403121561207a57612079612002565b5b60006120888482850161204f565b91505092915050565b60008115159050919050565b6120a681612091565b82525050565b60006020820190506120c1600083018461209d565b92915050565b600081519050919050565b600082825260208201905092915050565b60005b838110156121015780820151818401526020810190506120e6565b60008484015250505050565b6000601f19601f8301169050919050565b6000612129826120c7565b61213381856120d2565b93506121438185602086016120e3565b61214c8161210d565b840191505092915050565b60006020820190508181036000830152612171818461211e565b905092915050565b6000819050919050565b61218c81612179565b811461219757600080fd5b50565b6000813590506121a981612183565b92915050565b6000602082840312156121c5576121c4612002565b5b60006121d38482850161219a565b91505092915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000612207826121dc565b9050919050565b612217816121fc565b82525050565b6000602082019050612232600083018461220e565b92915050565b612241816121fc565b811461224c57600080fd5b50565b60008135905061225e81612238565b92915050565b6000806040838503121561227b5761227a612002565b5b60006122898582860161224f565b925050602061229a8582860161219a565b9150509250929050565b6122ad81612179565b82525050565b60006020820190506122c860008301846122a4565b92915050565b6000806000606084860312156122e7576122e6612002565b5b60006122f58682870161224f565b93505060206123068682870161224f565b92505060406123178682870161219a565b9150509250925092565b60006020828403121561233757612336612002565b5b60006123458482850161224f565b91505092915050565b61235781612091565b811461236257600080fd5b50565b6000813590506123748161234e565b92915050565b6000806040838503121561239157612390612002565b5b600061239f8582860161224f565b92505060206123b085828601612365565b9150509250929050565b600080fd5b600080fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6123fc8261210d565b810181811067ffffffffffffffff8211171561241b5761241a6123c4565b5b80604052505050565b600061242e611ff8565b905061243a82826123f3565b919050565b600067ffffffffffffffff82111561245a576124596123c4565b5b6124638261210d565b9050602081019050919050565b82818337600083830152505050565b600061249261248d8461243f565b612424565b9050828152602081018484840111156124ae576124ad6123bf565b5b6124b9848285612470565b509392505050565b600082601f8301126124d6576124d56123ba565b5b81356124e684826020860161247f565b91505092915050565b6000806000806080858703121561250957612508612002565b5b60006125178782880161224f565b94505060206125288782880161224f565b93505060406125398782880161219a565b925050606085013567ffffffffffffffff81111561255a57612559612007565b5b612566878288016124c1565b91505092959194509250565b6000806040838503121561258957612588612002565b5b60006125978582860161224f565b92505060206125a88582860161224f565b9150509250929050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b600060028204905060018216806125f957607f821691505b60208210810361260c5761260b6125b2565b5b50919050565b7f4552433732313a20617070726f76616c20746f2063757272656e74206f776e6560008201527f7200000000000000000000000000000000000000000000000000000000000000602082015250565b600061266e6021836120d2565b915061267982612612565b604082019050919050565b6000602082019050818103600083015261269d81612661565b9050919050565b7f4552433732313a20617070726f76652063616c6c6572206973206e6f7420746f60008201527f6b656e206f776e6572206e6f7220617070726f76656420666f7220616c6c0000602082015250565b6000612700603e836120d2565b915061270b826126a4565b604082019050919050565b6000602082019050818103600083015261272f816126f3565b9050919050565b7f4552433732313a2063616c6c6572206973206e6f7420746f6b656e206f776e6560008201527f72206e6f7220617070726f766564000000000000000000000000000000000000602082015250565b6000612792602e836120d2565b915061279d82612736565b604082019050919050565b600060208201905081810360008301526127c181612785565b9050919050565b7f455243373231456e756d657261626c653a206f776e657220696e646578206f7560008201527f74206f6620626f756e6473000000000000000000000000000000000000000000602082015250565b6000612824602b836120d2565b915061282f826127c8565b604082019050919050565b6000602082019050818103600083015261285381612817565b9050919050565b7f455243373231456e756d657261626c653a20676c6f62616c20696e646578206f60008201527f7574206f6620626f756e64730000000000000000000000000000000000000000602082015250565b60006128b6602c836120d2565b91506128c18261285a565b604082019050919050565b600060208201905081810360008301526128e5816128a9565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f4552433732313a20696e76616c696420746f6b656e2049440000000000000000600082015250565b60006129516018836120d2565b915061295c8261291b565b602082019050919050565b6000602082019050818103600083015261298081612944565b9050919050565b7f4552433732313a2061646472657373207a65726f206973206e6f74206120766160008201527f6c6964206f776e65720000000000000000000000000000000000000000000000602082015250565b60006129e36029836120d2565b91506129ee82612987565b604082019050919050565b60006020820190508181036000830152612a12816129d6565b9050919050565b7f4552433732313a207472616e736665722066726f6d20696e636f72726563742060008201527f6f776e6572000000000000000000000000000000000000000000000000000000602082015250565b6000612a756025836120d2565b9150612a8082612a19565b604082019050919050565b60006020820190508181036000830152612aa481612a68565b9050919050565b7f4552433732313a207472616e7366657220746f20746865207a65726f2061646460008201527f7265737300000000000000000000000000000000000000000000000000000000602082015250565b6000612b076024836120d2565b9150612b1282612aab565b604082019050919050565b60006020820190508181036000830152612b3681612afa565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000612b7782612179565b9150612b8283612179565b9250828203905081811115612b9a57612b99612b3d565b5b92915050565b6000612bab82612179565b9150612bb683612179565b9250828201905080821115612bce57612bcd612b3d565b5b92915050565b7f45524337323155524953746f726167653a2055524920736574206f66206e6f6e60008201527f6578697374656e7420746f6b656e000000000000000000000000000000000000602082015250565b6000612c30602e836120d2565b9150612c3b82612bd4565b604082019050919050565b60006020820190508181036000830152612c5f81612c23565b9050919050565b60008190508160005260206000209050919050565b60006020601f8301049050919050565b600082821b905092915050565b600060088302612cc87fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82612c8b565b612cd28683612c8b565b95508019841693508086168417925050509392505050565b6000819050919050565b6000612d0f612d0a612d0584612179565b612cea565b612179565b9050919050565b6000819050919050565b612d2983612cf4565b612d3d612d3582612d16565b848454612c98565b825550505050565b600090565b612d52612d45565b612d5d818484612d20565b505050565b5b81811015612d8157612d76600082612d4a565b600181019050612d63565b5050565b601f821115612dc657612d9781612c66565b612da084612c7b565b81016020851015612daf578190505b612dc3612dbb85612c7b565b830182612d62565b50505b505050565b600082821c905092915050565b6000612de960001984600802612dcb565b1980831691505092915050565b6000612e028383612dd8565b9150826002028217905092915050565b612e1b826120c7565b67ffffffffffffffff811115612e3457612e336123c4565b5b612e3e82546125e1565b612e49828285612d85565b600060209050601f831160018114612e7c5760008415612e6a578287015190505b612e748582612df6565b865550612edc565b601f198416612e8a86612c66565b60005b82811015612eb257848901518255600182019150602085019450602081019050612e8d565b86831015612ecf5784890151612ecb601f891682612dd8565b8355505b6001600288020188555050505b505050505050565b60006060820190508181036000830152612efe818661211e565b9050612f0d60208301856122a4565b612f1a604083018461220e565b949350505050565b7f4552433732313a20617070726f766520746f2063616c6c657200000000000000600082015250565b6000612f586019836120d2565b9150612f6382612f22565b602082019050919050565b60006020820190508181036000830152612f8781612f4b565b9050919050565b7f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560008201527f63656976657220696d706c656d656e7465720000000000000000000000000000602082015250565b6000612fea6032836120d2565b9150612ff582612f8e565b604082019050919050565b6000602082019050818103600083015261301981612fdd565b9050919050565b600081905092915050565b6000613036826120c7565b6130408185613020565b93506130508185602086016120e3565b80840191505092915050565b6000613068828561302b565b9150613074828461302b565b91508190509392505050565b600081519050919050565b600082825260208201905092915050565b60006130a782613080565b6130b1818561308b565b93506130c18185602086016120e3565b6130ca8161210d565b840191505092915050565b60006080820190506130ea600083018761220e565b6130f7602083018661220e565b61310460408301856122a4565b8181036060830152613116818461309c565b905095945050505050565b60008151905061313081612038565b92915050565b60006020828403121561314c5761314b612002565b5b600061315a84828501613121565b91505092915050565b7f4552433732313a206d696e7420746f20746865207a65726f2061646472657373600082015250565b60006131996020836120d2565b91506131a482613163565b602082019050919050565b600060208201905081810360008301526131c88161318c565b9050919050565b7f4552433732313a20746f6b656e20616c7265616479206d696e74656400000000600082015250565b6000613205601c836120d2565b9150613210826131cf565b602082019050919050565b60006020820190508181036000830152613234816131f8565b9050919050565b600061324682612179565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff820361327857613277612b3d565b5b600182019050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b60006132bd82612179565b91506132c883612179565b9250826132d8576132d7613283565b5b828204905092915050565b60006132ee82612179565b91506132f983612179565b92508261330957613308613283565b5b828206905092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052605160045260246000fdfe68747470733a2f2f686c666b6c676371703266376f74707574767170346e66706b786e7371726c747a656478786d7077356e6277706f666d326a62712e617277656176652e6e65742f4f73716c6d46422d695f644e394a31675f6a53765664736f5258504a42337578397574445a376973306b4da2646970667358221220f081f82e944b460efc9c420e68500be5e0e97bf4c79ad70a6f1dad563526957364736f6c63430008110033";

type CloudNFTConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: CloudNFTConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class CloudNFT__factory extends ContractFactory {
  constructor(...args: CloudNFTConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    _marketplaceAddress: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<CloudNFT> {
    return super.deploy(
      _marketplaceAddress,
      overrides || {}
    ) as Promise<CloudNFT>;
  }
  override getDeployTransaction(
    _marketplaceAddress: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_marketplaceAddress, overrides || {});
  }
  override attach(address: string): CloudNFT {
    return super.attach(address) as CloudNFT;
  }
  override connect(signer: Signer): CloudNFT__factory {
    return super.connect(signer) as CloudNFT__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): CloudNFTInterface {
    return new utils.Interface(_abi) as CloudNFTInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): CloudNFT {
    return new Contract(address, _abi, signerOrProvider) as CloudNFT;
  }
}
