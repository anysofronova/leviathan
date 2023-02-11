import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import * as env from 'env-var';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { TPayload } from '../types';

@Injectable()
export class RtStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: env.get('RT_SECRET').asString(),
      passReqToCallback: true,
    });
  }

  validate = async (req: Request, payload: TPayload) => {
    const refreshToken = req.get('authorization').replace('Bearer', '').trim();
    return { ...payload, refreshToken };
  };
}
