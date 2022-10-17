import { BigNumber } from 'ethers';

export class CreateClaimDto {
  userId: number;
  address: string;
  amount: BigNumber;
  secret: string;
}
