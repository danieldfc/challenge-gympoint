import request from 'supertest';

import app from '../../../src/app';
import factory from '../../factory';
import truncate from '../../util/truncate';

describe('Enrollment delete', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should be able delete enrollment of a student for a plan', async () => {
    const user = await factory.create('User');
    const student = await factory.create('Student');
    const plan = await factory.create('Plan');
    const enrollment = await factory.create('Enrollment', {
      student_id: student.id,
      plan_id: plan.id,
    });

    const response = await request(app)
      .delete(`/enrollment/${enrollment.id}`)
      .set('Authorization', `Bearer ${user.generateToken()}`);

    expect(response.status).toBe(200);
  });

  it('should not be able delete without enrollment of a student for a plan', async () => {
    const user = await factory.create('User');
    const response = await request(app)
      .delete('/enrollment/1')
      .set('Authorization', `Bearer ${user.generateToken()}`);

    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({
      error: { message: 'Enrollment does not exists' },
    });
  });
});
