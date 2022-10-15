import { PartialType } from '@nestjs/mapped-types';
import { CreateContractDto } from './create-contract.dto';

export class UpdateContractDto extends PartialType(CreateContractDto) {
  contractName: string;
  abi: string;
  bytecode: string;
  network: 'goerli' | 'maticmum' | 'mainnet' | 'polygon';
}
