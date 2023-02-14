import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  // SIGN UP

  it('POST - /auth/signup', () => {
    return request(app.getHttpServer())
      .post('/auth/signup')
      .send({
        email: `test${Math.random() * (100 - 0) + 0}@gmail.com`,
        password: 'test',
        firstName: 'test',
        lastName: 'test',
      })
      .expect(HttpStatus.CREATED);
  });

  it('POST - /auth/signup - email already exists', () => {
    return request(app.getHttpServer())
      .post('/auth/signup')
      .send({
        email: 'test10@gmail.com',
        password: 'test',
        firstName: 'test',
        lastName: 'test',
      })
      .expect(HttpStatus.CONFLICT);
  });

  // SIGN IN

  it('POST - /auth/signin', () => {
    return request(app.getHttpServer())
      .post('/auth/signin')
      .send({
        email: 'test@gmail.com',
        password: 'test',
      })
      .expect(HttpStatus.OK);
  });

  it('POST - /auth/signin - user not found', () => {
    return request(app.getHttpServer())
      .post('/auth/signin')
      .send({
        email: 'anna@gmail.com',
        password: 'test',
      })
      .expect(HttpStatus.NOT_FOUND);
  });

  it('POST - /auth/signin - incorrect password', () => {
    return request(app.getHttpServer())
      .post('/auth/signin')
      .send({
        email: 'test@gmail.com',
        password: 'anna',
      })
      .expect(HttpStatus.UNPROCESSABLE_ENTITY);
  });

  // LOGOUT

  // it('POST - /auth/logout', () => {
  //   return request(app.getHttpServer())
  //     .post('/auth/logout')
  //     .send({
  //       userId: 4,
  //     })
  //     .expect(HttpStatus.OK)
  //     .expect(true);
  // });
});
