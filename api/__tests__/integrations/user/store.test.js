import request from 'supertest';
import app from '../../../src/app';

import factory from '../../factory';
import truncate from '../../util/truncate';

describe('User Store', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should be able register new user', async () => {
    const user = await factory.attrs('User');

    const response = await request(app)
      .post('/users')
      .send(user);

    expect(response.body).toHaveProperty('id');
  });

  it('should not be able register to checked email', async () => {
    await factory.create('User', {
      email: 'daniel.test@gmail.com',
    });

    const userTwo = await factory.attrs('User', {
      email: 'daniel.test@gmail.com',
    });

    const response = await request(app)
      .post('/users')
      .send(userTwo);

    expect(response.status).toBe(401);
  });

  it('should not be able checked validators register user', async () => {
    const response = await request(app).post('/users');

    expect(response.status).toBe(403);
  });
});
