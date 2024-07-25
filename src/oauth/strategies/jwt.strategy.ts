import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { PassportStrategy } from '@nestjs/passport';
import { Request as RequestType } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        JwtStrategy.extractJWT,
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      secretOrKey: configService.get('JWT_SECRET') ?? 'SECRET',
    });
  }

  private static extractJWT(req: RequestType): string | null {
    return req.cookies && 'jwt' in req.cookies ? req.cookies.jwt : null;
  }

  async validate(payload: { sub: number }) {
    return { id: payload.sub };
  }
}
