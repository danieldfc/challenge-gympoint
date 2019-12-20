import request from 'supertest';

import app from '../../../src/app';
import factory from '../../factory';
import truncate from '../../util/truncate';

describe('Student store', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should be able register a new student', async () => {
    const user = await factory.create('User');
    const student = await factory.attrs('Student');

    const response = await request(app)
      .post('/students')
      .set('Authorization', `Bearer ${user.generateToken()}`)
      .send(student);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
  });

  it('should not be able register a new student without fields', async () => {
    const user = await factory.create('User');

    const response = await request(app)
      .post('/students')
      .set('Authorization', `Bearer ${user.generateToken()}`);

    expect(response.status).toBe(401);
    expect(response.body).toMatchObject({
      error: { message: 'Validation failure.' },
    });
  });

  it('should not be able register a student duplicated', async () => {
    const user = await factory.create('User');
    const student = await factory.attrs('Student');

    await request(app)
      .post('/students')
      .set('Authorization', `Bearer ${user.generateToken()}`)
      .send(student);

    const response = await request(app)
      .post('/students')
      .set('Authorization', `Bearer ${user.generateToken()}`)
      .send(student);

    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({
      error: { message: 'Student already exists.' },
    });
  });

  it('should not be able register student without authentication', async () => {
    const student = await factory.attrs('Student');

    const response = await request(app)
      .post('/students')
      .send(student);

    expect(response.status).toBe(401);
    expect(response.body).toMatchObject({
      error: { message: 'Token not found' },
    });
  });

  it('should not be able register student with authentication invalidated', async () => {
    const student = await factory.attrs('Student');

    const response = await request(app)
      .post('/students')
      .set('Authorization', 'Bearer 123')
      .send(student);

    expect(response.status).toBe(401);
    expect(response.body).toMatchObject({
      error: { message: 'Token invalidate.' },
    });
  });
});
