import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { TPayload, TPayloadWithRt } from '../types';

@Injectable()
export class RtStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('RT_SECRET'),
      passReqToCallback: true,
    });
  }

  validate(req: Request, payload: TPayload): TPayloadWithRt {
    const refreshToken = req.get('Authorization').replace('Bearer', '').trim();

    if (!refreshToken)
      throw new HttpException('Refresh token error', HttpStatus.UNAUTHORIZED);

    return { ...payload, refreshToken };
  }
}
