import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Contract {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  contractName: string;

  @Column('jsonb')
  abi: string;

  @Column()
  bytecode: string;

  @Column()
  address: string;

  @Column()
  network: 'goerli' | 'maticmum' | 'mainnet' | 'polygon';
}
