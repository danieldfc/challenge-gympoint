import request from 'supertest';

import app from '../../../src/app';
import factory from '../../factory';
import truncate from '../../util/truncate';

describe('Enrollment store', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should be able enrollment a student for a plan', async () => {
    const user = await factory.create('User');
    const student = await factory.create('Student');
    const plan = await factory.create('Plan');
    const enrollment = await factory.attrs('Enrollment', {
      student_id: student.id,
      plan_id: plan.id,
    });

    const response = await request(app)
      .post(`/enrollment/${student.id}/student`)
      .set('Authorization', `Bearer ${user.generateToken()}`)
      .send(enrollment);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
  });

  it('should not be able enrollment without fields', async () => {
    const user = await factory.create('User');

    const response = await request(app)
      .post('/enrollment/1/student')
      .set('Authorization', `Bearer ${user.generateToken()}`);

    expect(response.status).toBe(401);
    expect(response.body).toMatchObject({
      error: { message: 'Validations failures.' },
    });
  });

  it('should not be able enrollment with student but without a plan', async () => {
    const user = await factory.create('User');
    const student = await factory.create('Student');
    const enrollment = await factory.attrs('Enrollment', {
      student_id: student.id,
    });

    const response = await request(app)
      .post(`/enrollment/${student.id}/student`)
      .set('Authorization', `Bearer ${user.generateToken()}`)
      .send(enrollment);

    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({
      error: { message: 'Plan does not exists' },
    });
  });
});
