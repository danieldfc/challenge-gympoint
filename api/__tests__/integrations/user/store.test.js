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
});
