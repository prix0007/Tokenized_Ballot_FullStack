import { Column, Entity, PrimaryGeneratedColumn, OneToMany, JoinTable } from 'typeorm';

import { Claim } from 'src/claims/entities/claim.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: 0 })
  claimsCount: number;

  @OneToMany(() => Claim, (claim) => claim.user)
  @JoinTable()
  claims: Claim
}
