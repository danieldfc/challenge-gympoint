import request from 'supertest';

import app from '../../../src/app';
import factory from '../../factory';
import truncate from '../../util/truncate';

describe('HelpOrder index', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should be able register a new plan', async () => {
    const user = await factory.create('User');
    const student = await factory.create('Student');
    const help_order = await factory.create('HelpOrder', {
      student_id: student.id,
    });
    const response = await request(app)
      .get(`/students/${student.id}/help-orders`)
      .set('Authorization', `Bearer ${user.generateToken()}`);

    expect(response.status).toBe(200);
    expect(response.body[0].id).toEqual(help_order.id);
  });
});
