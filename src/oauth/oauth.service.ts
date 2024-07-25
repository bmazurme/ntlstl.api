import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from '../users/users.service';

import { User } from '../users/entities/user.entity';

@Injectable()
export class OAuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signinOrSignup({ email }: User) {
    let currentUser = await this.usersService.findByEmail(email);

    if (!currentUser) {
      currentUser = await this.usersService.create({ email });
    }

    const payload = { sub: currentUser.id };

    return this.jwtService.sign(payload);
  }
}
