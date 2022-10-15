export class CreateContractDto {
  contractName: string;
  abi: string;
  bytecode: string;
  address: string;
  network: 'goerli' | 'maticmum' | 'mainnet' | 'polygon';
}
