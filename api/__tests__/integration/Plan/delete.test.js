import request from 'supertest';
import app from '../../../src/app';

import truncate from '../../util/truncate';
import factory from '../../factory';

describe('Plan delete', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should be able to delete a plan', async () => {
    const user = await factory.create('User');
    const plan = await factory.create('Plan');
    const response = await request(app)
      .delete(`/plans/${plan.id}`)
      .set('Authorization', `Bearer ${user.generateToken()}`);

    expect(response.status).toBe(200);
  });

  it('should not be able to delete a plan not found', async () => {
    const user = await factory.create('User');
    const response = await request(app)
      .delete('/plans/1')
      .set('Authorization', `Bearer ${user.generateToken()}`);

    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({
      error: { message: 'Plan  not found.' },
    });
  });
});
