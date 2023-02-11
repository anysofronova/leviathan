import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import * as env from 'env-var';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { TPayload } from '../types';

@Injectable()
export class AtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: env.get('AT_SECRET').asString(),
    });
  }

  validate = async (payload: TPayload) => payload;
}
