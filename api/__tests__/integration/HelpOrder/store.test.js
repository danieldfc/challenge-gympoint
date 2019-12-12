import request from 'supertest';
import app from '../../../src/app';

import truncate from '../../util/truncate';
import factory from '../../factory';

describe('HelpOrder store', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should be able register a new help order', async () => {
    const user = await factory.create('User');
    const student = await factory.create('Student');
    const help_order = await factory.attrs('HelpOrder');
    const response = await request(app)
      .post(`/students/${student.id}/help-orders`)
      .set('Authorization', `Bearer ${user.generateToken()}`)
      .send(help_order);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
  });

  xit('should not be able register a new help order without student', async () => {
    const user = await factory.create('User');
    const help_order = await factory.attrs('HelpOrder');
    const response = await request(app)
      .post('/students/1/help-orders')
      .set('Authorization', `Bearer ${user.generateToken()}`)
      .send(help_order);

    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({
      error: { message: 'Student does not exists' },
    });
  });
});
