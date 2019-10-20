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
});
