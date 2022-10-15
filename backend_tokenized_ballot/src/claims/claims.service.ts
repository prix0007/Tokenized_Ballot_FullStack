import { Injectable } from '@nestjs/common';
import { CreateClaimDto } from './dto/create-claim.dto';
import { InjectRepository } from '@nestjs/typeorm';

import { Claim } from './entities/claim.entity';
import { Repository, UpdateResult } from 'typeorm';
import { ethers } from 'ethers';

@Injectable()
export class ClaimsService {
  constructor(
    @InjectRepository(Claim)
    private readonly claimsRepository: Repository<Claim>,
  ) {}

  createRaw(claim: Claim): Promise<Claim> {
    return this.claimsRepository.save(claim);
  }

  udpateRaw(claim: Claim): Promise<UpdateResult> {
    return this.claimsRepository.update(claim.id, claim);
  }

  findAll() {
    return this.claimsRepository.find();
  }

  findOne(id: number) {
    return this.claimsRepository.findOneBy({ id: id });
  }
}
