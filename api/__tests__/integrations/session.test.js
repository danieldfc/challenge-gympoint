import request from 'supertest';
import app from '../../src/app';

import factory from '../factory';
import truncate from '../util/truncate';

describe('Session Store', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should be able create a new session to user', async () => {
    const user = await factory.create('User');

    const response = await request(app)
      .post('/sessions')
      .send({
        email: user.email,
        password: user.password,
      });

    expect(response.body).toHaveProperty('token');
  });

  it('should not be able create a new session without user', async () => {
    const response = await request(app)
      .post('/sessions')
      .send({
        email: 'test@test.com',
        password: 'test123',
      });

    expect(response.status).toBe(400);
  });

  it('should not be able create a new session with password invalid', async () => {
    const user = await factory.create('User', {
      password: '123456',
    });

    const response = await request(app)
      .post('/sessions')
      .send({
        email: user.email,
        password: '1234567',
      });

    expect(response.status).toBe(401);
  });

  it('should not be able create a new session to user', async () => {
    const response = await request(app).post('/sessions');

    expect(response.status).toBe(403);
  });
});
