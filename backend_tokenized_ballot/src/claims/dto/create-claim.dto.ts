import { BigNumber } from 'ethers';

export class CreateClaimDto {
  userId: number;
  address: string;
  amount: string;
  secret: string;
}
