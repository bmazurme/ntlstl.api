import {
  Injectable,
  // NotFoundException,
  BadRequestException,
} from '@nestjs/common';

import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateUserDto } from './dto/create-user.dto';

import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { email } = createUserDto;
    const existUsers = await this.findByEmail(email);

    if (existUsers) {
      throw new BadRequestException(`user with${email} exist`);
    }

    return await this.userRepository.save(createUserDto);
  }

  findOne(id: number) {
    return this.userRepository.findOne({
      where: { id },
      select: { id: true, email: true },
    });
  }

  findByEmail(email: string) {
    return this.userRepository.findOneBy({ email });
  }
}
