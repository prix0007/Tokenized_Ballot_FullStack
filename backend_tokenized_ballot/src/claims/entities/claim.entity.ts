import { BigNumber } from 'ethers';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

export class ColumnBigNumberTransformer {
  public to(data: BigNumber): string {
    return data.toString();
  }

  public from(data: string): BigNumber {
    // output value, you can use Number, parseFloat variations
    // also you can add nullable condition:
    // if (!Boolean(data)) return 0;

    return BigNumber.from(data);
  }
}

@Entity()
export class Claim {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  address: string;

  @Column({ default: false })
  claimed: boolean;

  @Column({ type: 'timestamp', default: () => 'now()' })
  created: Date;

  @Column({
    type: 'string',
    default: '0',
    transformer: new ColumnBigNumberTransformer(),
  })
  amount: BigNumber;

  @Column()
  secret_hash: string;

  @Column({ nullable: true })
  claimedAt: Date;

  @Column({ nullable: true })
  txHash: string;

  @ManyToOne(() => User, (user) => user.claims)
  user: User;
}
