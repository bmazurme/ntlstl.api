import {
  Controller,
  Get,
  UseGuards,
  HttpStatus,
  Req,
  Post,
  Res,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { JwtGuard } from './jwt.guard';
import { OAuthService } from './oauth.service';

import { User } from 'src/users/entities/user.entity';

@Controller('oauth')
export class OAuthController {
  constructor(private readonly oauthService: OAuthService) {}

  @Get('/yandex')
  @UseGuards(AuthGuard('yandex'))
  async yandexLogin(): Promise<any> {
    return HttpStatus.OK;
  }

  @Post('/yandex/redirect')
  @UseGuards(AuthGuard('yandex'))
  async yandexLoginRedirect(
    @Req() req: Request & { user: { user: User; accessToken: string } },
    @Res({ passthrough: true }) res: any,
  ): Promise<any> {
    const jwt = await this.oauthService.signinOrSignup(req.user.user);
    res.cookie('jwt', jwt, {
      httpOnly: true,
      secure: false,
    });
    res.cookie('token', req.user.accessToken, {
      httpOnly: true,
      secure: false,
    });

    return {
      message: 'success',
    };
  }

  @UseGuards(JwtGuard)
  @Post('/logout')
  async logout(@Res({ passthrough: true }) res: any): Promise<any> {
    res.clearCookie('jwt');
    res.clearCookie('token');
    return HttpStatus.OK;
  }
}
