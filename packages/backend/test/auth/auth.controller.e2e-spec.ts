import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../../src/app/app.module';
import { AuthService } from '../../src/common/entities/auth/auth.service';
import { AuthController } from '../../src/common/entities/auth/auth.controller';
import { SignUpDto } from '../../src/common/entities/auth/dto/signUp.dto';
import { SignInDto } from '../../src/common/entities/auth/dto/signIn.dto';

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  let authService: AuthService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    authService = moduleFixture.get<AuthService>(AuthService);
    authController = moduleFixture.get<AuthController>(AuthController);

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  describe('POST /auth/signup', () => {
    it('should return 201 status code and create a new user', async () => {
      const signUpDto: SignUpDto = {
        email: 'test@example.com',
        password: '123456',
        firstName: 'Test',
        lastName: 'User',
      };

      const response = await request(app.getHttpServer())
        .post('/auth/signup')
        .send(signUpDto)
        .expect(HttpStatus.CREATED);

      expect(response.body).toEqual({
        message: 'User created',
        user: expect.any(String),
      });
    });
  });

  describe('POST /auth/signin', () => {
    it('should return 200 status code and authenticate user', async () => {
      const signInDto: SignInDto = {
        email: 'test@example.com',
        password: '123456',
      };

      const response = await request(app.getHttpServer())
        .post('/auth/signin')
        .send(signInDto)
        .expect(HttpStatus.OK);

      expect(response.body).toEqual({
        access_token: expect.any(String),
        refresh_token: expect.any(String),
      });
    });
  });

  describe('POST /auth/refresh', () => {
    it('should return 200 status code and refresh tokens', async () => {
      const tokens = await authService.signIn({
        email: 'test@example.com',
        password: '123456',
      });

      const response = await request(app.getHttpServer())
        .post('/auth/refresh')
        .send({
          userId: tokens.user.id,
          refresh_token: tokens.refresh_token,
        })
        .expect(HttpStatus.OK);

      expect(response.body).toEqual({
        access_token: expect.any(String),
        refresh_token: expect.any(String),
      });
    });

    it('should return 403 status code when refresh token is invalid', async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/refresh')
        .send({
          userId: 1,
          refresh_token: 'invalid_token',
        })
        .expect(HttpStatus.FORBIDDEN);

      expect(response.body).toEqual({
        statusCode: HttpStatus.FORBIDDEN,
        message: 'Cookie Denied',
        error: 'Forbidden',
      });
    });
  });
});
