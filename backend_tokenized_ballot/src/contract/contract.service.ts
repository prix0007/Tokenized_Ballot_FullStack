import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ethers, Contract as EContract, Wallet } from 'ethers';
import { Repository, UpdateResult } from 'typeorm';
import { CreateContractDto } from './dto/create-contract.dto';
import { UpdateContractDto } from './dto/update-contract.dto';
import { Contract } from './entities/contract.entity';

import * as contractDataERC20 from './ERC20VotableToken.json';
import * as contractTokenizedBallot from './TokenizedBallot.json';

export function resolveProviderByNetwork(network: string) {
  switch (network) {
    case 'maticmum':
      return ethers.getDefaultProvider('maticmum');
    case 'goerli':
      return ethers.getDefaultProvider('goerli');
    default:
      return ethers.getDefaultProvider('goerli');
  }
}

@Injectable()
export class ContractService {
  constructor(
    @InjectRepository(Contract)
    private readonly contractsRepository: Repository<Contract>,
  ) {}

  createDefaultERC20VotableTokenContract(): Promise<Contract> {
    console.log(contractDataERC20);
    const abi = contractDataERC20['abi'];
    const bytecode = contractDataERC20['bytecode'];
    const network = 'goerli';
    const address = '0xDA9fF3BF6a87a17f413D55a216C80659b69be423';
    const contractName = contractDataERC20['contractName'];

    const newContract = new Contract();

    newContract.abi = JSON.stringify(abi);
    newContract.bytecode = bytecode;
    newContract.network = network;
    newContract.contractName = contractName;
    newContract.address = address;

    return this.contractsRepository.save(newContract);
  }

  createDefaultTokenizedBallotContract(): Promise<Contract> {
    const abi = contractTokenizedBallot['abi'];
    const bytecode = contractTokenizedBallot['bytecode'];
    const network = 'goerli';
    const address = '0xdb96DE67554A7766C3b4Dc6c4AaC06eB1aeBF697';
    const contractName = contractTokenizedBallot['contractName'];

    const newContract = new Contract();

    newContract.abi = JSON.stringify(abi);
    newContract.bytecode = bytecode;
    newContract.network = network;
    newContract.contractName = contractName;
    newContract.address = address;

    return this.contractsRepository.save(newContract);
  }

  create(createContractDto: CreateContractDto): Promise<Contract> {
    const newContract = new Contract();

    const { abi, network, contractName, bytecode, address } = createContractDto;

    if (abi && network && contractName && bytecode && address) {
      newContract.abi = abi;
      newContract.bytecode = bytecode;
      newContract.network = network;
      newContract.contractName = contractName;
      newContract.address = address;

      return this.contractsRepository.save(newContract);
    } else {
      throw new HttpException('Malformed Body!', 400);
    }
  }

  findAll(): Promise<Contract[]> {
    return this.contractsRepository.find({});
  }

  findOne(id: number): Promise<Contract> {
    return this.contractsRepository.findOneBy({ id: id });
  }

  async update(
    id: number,
    updateContractDto: UpdateContractDto,
  ): Promise<UpdateResult> {
    const contractOld = await this.findOne(id);
    if (!contractOld) {
      throw new HttpException('Contract does not exists!!', 401);
    }
    const { abi, network, contractName, bytecode, address } = updateContractDto;

    contractOld.abi = abi;
    contractOld.bytecode = bytecode;
    contractOld.network = network;
    contractOld.contractName = contractName;
    contractOld.address = address;

    return this.contractsRepository.update(id, contractOld);
  }

  async getContractInstanceById(id: number): Promise<EContract> {
    const contract = await this.contractsRepository.findOneBy({ id: id });
    if (!contract) {
      throw new HttpException('Contract is not found.', 400);
    }

    const { abi, address, network } = contract;

    const provider = resolveProviderByNetwork(network);
    const contractInstance = new ethers.Contract(address, abi, provider);
    return contractInstance;
  }

  async getSignerViaNetwork(network): Promise<Wallet> {
    const provider = resolveProviderByNetwork(network);

    const privKey = process.env.PRIVATE_KEY;
    if(!privKey) {
      throw new HttpException("Custodial Wallet not Setup.!!", 500);
    }
    const privateKey = `0x${privKey}`;
    const signer = new Wallet(ethers.utils.hexlify(privateKey), provider);
    return signer;

  }

  remove(id: number) {
    return `This action removes a #${id} contract`;
  }
}
