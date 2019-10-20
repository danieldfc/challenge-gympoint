import request from 'supertest';
import app from '../../../src/app';

import factory from '../../factory';
import truncate from '../../util/truncate';

describe('Student Store', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should be able create a new student', async () => {
    const user = await factory.attrs('User');
    await request(app)
      .post('/users')
      .send(user);

    const student = await factory.attrs('Student');

    const {
      body: { token },
    } = await request(app)
      .post('/sessions')
      .send({
        email: user.email,
        password: user.password,
      });

    const response = await request(app)
      .post('/students')
      .set('Authorization', `Bearer ${token}`)
      .send(student);

    expect(response.body).toHaveProperty('id');
  });

  it('should not be able create a new student with email duplicated', async () => {
    const user = await factory.attrs('User');
    await request(app)
      .post('/users')
      .send(user);

    await factory.create('Student');
    const student = await factory.attrs('Student');

    const {
      body: { token },
    } = await request(app)
      .post('/sessions')
      .send({
        email: user.email,
        password: user.password,
      });

    const response = await request(app)
      .post('/students')
      .set('Authorization', `Bearer ${token}`)
      .send(student);

    expect(response.status).toBe(400);
  });

  it('should not be able create a new students without data', async () => {
    const user = await factory.create('User');

    const {
      body: { token },
    } = await request(app)
      .post('/sessions')
      .send({
        email: user.email,
        password: user.password,
      });

    const response = await request(app)
      .post('/students')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(403);
  });

  it('should not be able create a new students without token from user', async () => {
    const response = await request(app).post('/students');

    expect(response.status).toBe(401);
  });

  it('should not be able create a new students with token invalid from user', async () => {
    const response = await request(app)
      .post('/students')
      .set('Authorization', 'Bearer 123');

    expect(response.status).toBe(401);
  });
});
