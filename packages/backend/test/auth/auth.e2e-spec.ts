import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { AppModule } from '../../src/app/app.module';
import request from 'supertest';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  const BASE_URL = '/auth';
  const user = {
    email: `test${Math.random() * 100}@gmail.com`,
    password: 'test',
    firstName: 'test',
    lastName: 'test',
  };
  let token = '';

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    const response = await request(app.getHttpServer())
      .post(`${BASE_URL}/signin`)
      .send({
        email: user.email,
        password: user.password,
      });

    token = response.body.access_token;
  });

  // SIGN UP
  it('POST - /auth/signup', async () => {
    const response = await request(app.getHttpServer())
      .post(`${BASE_URL}/signup`)
      .send(user);

    expect(response.status).toBe(HttpStatus.CREATED);
  });

  it('POST - /auth/signup - email already exists', async () => {
    const response = await request(app.getHttpServer())
      .post(`${BASE_URL}/signup`)
      .send(user);

    expect(response.status).toBe(HttpStatus.CONFLICT);
  });

  // SIGN IN
  it('POST - /auth/signin', async () => {
    const response = await request(app.getHttpServer())
      .post(`${BASE_URL}/signin`)
      .send({
        email: user.email,
        password: user.password,
      });

    expect(response.status).toBe(HttpStatus.OK);
  });

  it('POST - /auth/signin - user not found', async () => {
    const { email, password } = user;

    const response = await request(app.getHttpServer())
      .post(`${BASE_URL}/signin`)
      .send({
        email,
        password,
      });

    expect(response.status).toBe(HttpStatus.NOT_FOUND);
  });

  it('POST - /auth/signin - incorrect password', async () => {
    const { email, password } = user;

    const response = await request(app.getHttpServer())
      .post(`${BASE_URL}/signin`)
      .send({
        email,
        password: 'wrong_password',
      });

    expect(response.status).toBe(HttpStatus.UNPROCESSABLE_ENTITY);
  });

  // LOGOUT
  it('POST - /auth/logout', async () => {
    const response = await request(app.getHttpServer())
      .post(`${BASE_URL}/logout`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(HttpStatus.OK);
  });

  afterAll(async () => {
    await app.close();
  });
});
