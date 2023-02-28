import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { NextFunction } from 'express';
import { AuthService } from 'src/common/entities/auth/auth.service';
import { UsersService } from '../entities/users/users.service';
import { RequestModel } from '../../shared/types';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
  ) {}

  async use(req: RequestModel, res: Response, next: NextFunction) {
    try {
      const authHeader: string = req.headers['authorization'];
      const tokenArray: string[] = authHeader.split(' ');
      const decodedToken = await this.authService.verifyUser(tokenArray[1]);

      const user = await this.userService.findById(decodedToken.sub);
      if (!user) {
        throw new UnauthorizedException('User is unauthorized');
      }

      req.user = user;
      next();
    } catch (error) {
      throw new UnauthorizedException('User is unauthorized');
    }
  }
}
