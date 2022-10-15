import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  ParseIntPipe,
  Put,
} from '@nestjs/common';
import { CreateClaimDto } from 'src/claims/dto/create-claim.dto';
import { ClaimDto } from 'src/claims/dto/create-claim.dto copy';
import { Claim } from 'src/claims/entities/claim.entity';
import { UpdateResult } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Put(':id')
  updateOne(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UpdateResult> {
    return this.usersService.update(id, updateUserDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.usersService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.usersService.remove(id);
  }

  @Post('/createClaim')
  createClaim(@Body() createClaimDto: CreateClaimDto): Promise<Claim> {
    return this.usersService.createClaim(createClaimDto);
  }

  @Post('/claim')
  claim(@Body() claimDto: ClaimDto): Promise<UpdateResult> {
    return this.usersService.claim(claimDto);
  }
}
