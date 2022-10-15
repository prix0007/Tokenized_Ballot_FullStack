import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ethers } from 'ethers';
import { ClaimsService } from 'src/claims/claims.service';
import { CreateClaimDto } from 'src/claims/dto/create-claim.dto';
import { ClaimDto } from 'src/claims/dto/create-claim.dto copy';
import { Claim } from 'src/claims/entities/claim.entity';
import { Repository, UpdateResult } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private claimsService: ClaimsService,
  ) {}

  create(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();
    user.firstName = createUserDto.firstName;
    user.lastName = createUserDto.lastName;

    return this.usersRepository.save(user);
  }

  update(id: number, updateUserDto: UpdateUserDto): Promise<UpdateResult> {
    const user = new User();
    user.firstName = updateUserDto.firstName;
    user.lastName = updateUserDto.lastName;

    return this.usersRepository.update(id, user);
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find({ relations: { claims: true } });
  }

  findOne(id: number): Promise<User> {
    return this.usersRepository.findOneBy({ id: id });
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async createClaim(createClaimDto: CreateClaimDto): Promise<Claim> {
    const newClaim = new Claim();
    try {
      newClaim.address = createClaimDto.address;
      newClaim.amount = createClaimDto.amount;
      newClaim.secret_hash = ethers.utils.hashMessage(createClaimDto.secret);
    } catch (e) {
      throw new HttpException('Malformed Input Body', 400);
    }

    // Check if userId Exists
    const user = await this.findOne(createClaimDto.userId);

    if (!user) {
      throw new HttpException("UserId doesn't Exists", 401);
    }

    newClaim.user = user;

    return this.claimsService.createRaw(newClaim);
  }

  async claim(claimDto: ClaimDto) {
    const claimId = claimDto.claimId;
    if (!claimId) {
      throw new HttpException('`claimId` is not supplied', 400);
    }

    const signatureSupplied = claimDto.signature;
    if (!signatureSupplied) {
      throw new HttpException('`signature` is not Supplied!!', 400);
    }

    const claim = await this.claimsService.findOne(claimId);

    if (!claim) {
      throw new HttpException('Claim not found', 400);
    } else if (claim.claimed) {
      throw new HttpException(
        'Claim is Already Claimed!! Cannot claim again',
        401,
      );
    }

    const signingSignatureAddress = ethers.utils.verifyMessage(claim.secret_hash, signatureSupplied);

    if (signingSignatureAddress === claim.address) {
      // Process the Claim and Update the Record.

      const updatedClaim = claim;
      claim.claimed = true;

      return this.claimsService.udpateRaw(updatedClaim);
    } else {
      throw new HttpException('Claiming Secret is Wrong!!', 401);
    }
  }
}
