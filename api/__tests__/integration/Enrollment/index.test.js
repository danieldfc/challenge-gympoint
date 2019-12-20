import request from 'supertest';

import app from '../../../src/app';
import factory from '../../factory';
import truncate from '../../util/truncate';

describe('Enrollment index', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should be able show all enrollment a student for a plan', async () => {
    const user = await factory.create('User');
    const student = await factory.create('Student');
    const plan = await factory.create('Plan');
    const enrollment = await factory.create('Enrollment', {
      student_id: student.id,
      plan_id: plan.id,
    });

    const response = await request(app)
      .get('/enrollment')
      .set('Authorization', `Bearer ${user.generateToken()}`);

    expect(response.status).toBe(200);
    expect(response.body[0].id).toEqual(enrollment.id);
  });
});
