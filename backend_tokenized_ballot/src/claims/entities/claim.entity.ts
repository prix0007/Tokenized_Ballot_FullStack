import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

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
    default: '0',
  })
  amount: String;

  @Column()
  secret_hash: string;

  @Column({ nullable: true })
  claimedAt: Date;

  @Column({ nullable: true })
  txHash: string;

  @ManyToOne(() => User, (user) => user.claims)
  user: User;
}
