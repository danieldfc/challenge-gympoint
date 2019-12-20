import request from 'supertest';

import app from '../../../src/app';
import factory from '../../factory';
import truncate from '../../util/truncate';

describe('Answer store', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should be able to answer a student with a request for help', async () => {
    const user = await factory.create('User');
    const student = await factory.create('Student');
    const help_order = await factory.create('HelpOrder', {
      student_id: student.id,
    });

    const response = await request(app)
      .post(`/help-orders/${help_order.id}/answer`)
      .set('Authorization', `Bearer ${user.generateToken()}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
  });

  it('should not be able to answer a student without a request for help', async () => {
    const user = await factory.create('User');
    const response = await request(app)
      .post('/help-orders/1/answer')
      .set('Authorization', `Bearer ${user.generateToken()}`);

    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({
      error: { message: 'Help Order does not exists!' },
    });
  });

  it('should not be able to answer a student with a request for help already exists', async () => {
    const user = await factory.create('User');
    const student = await factory.create('Student');
    const help_order = await factory.create('HelpOrder', {
      student_id: student.id,
      answer: 'Resposta para estudante',
      answer_at: new Date(),
    });

    const response = await request(app)
      .post(`/help-orders/${help_order.id}/answer`)
      .set('Authorization', `Bearer ${user.generateToken()}`);

    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({
      error: { message: 'Help Order already answered!' },
    });
  });
});
