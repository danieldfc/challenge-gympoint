import request from 'supertest';
import app from '../../../src/app';

import factory from '../../factory';
import truncate from '../../util/truncate';

describe('Student Store', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should be able to store a student when authenticated', async () => {
    const user = await factory.create('User', {
      email: 'test@test.com',
      password: '123456',
    });
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

    console.log(response.body);

    expect(response.body).toHaveProperty('id');
  });

  it('should not be able to store a student without jwt token', async () => {
    const student = await factory.attrs('Student');

    const response = await request(app)
      .post('/students')
      .send(student);

    expect(response.status).toBe(401);
    expect(response.body).toMatchObject({ error: 'Token not provided' });
  });

  it('should not be able to store a student with invalid jwt token', async () => {
    const student = await factory.attrs('Student');

    const response = await request(app)
      .post('/students')
      .set('Authorization', `Bearer 123456`)
      .send(student);

    expect(response.status).toBe(401);
    expect(response.body).toMatchObject({ error: 'Token invalid' });
  });

  it('should not be able to store a student with duplicated email', async () => {
    const user = await factory.create('User');
    const student = await factory.attrs('Student');

    const {
      body: { token },
    } = await request(app)
      .post('/sessions')
      .send({
        email: user.email,
        password: user.password,
      });

    await request(app)
      .post('/students')
      .set('Authorization', `Bearer ${token}`)
      .send(student);

    const response = await request(app)
      .post('/students')
      .set('Authorization', `Bearer ${token}`)
      .send(student);

    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({
      error: { message: 'Student already exists.' },
    });
  });

  it('should be not be able to store a student when required data is missing', async () => {
    const user = await factory.create('User');
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
      .post(`/students`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        ...student,
        name: '',
        email: '',
        age: undefined,
        weight: undefined,
        height: undefined,
      });

    expect(response.status).toBe(403);
  });
});
