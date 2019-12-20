import request from 'supertest';

import app from '../../../src/app';
import factory from '../../factory';
import truncate from '../../util/truncate';

describe('Student update', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should be able update a student', async () => {
    const user = await factory.create('User');
    const student = await factory.create('Student', {
      email: 'daniel@test.com',
    });

    const response = await request(app)
      .put(`/students/${student.id}`)
      .set('Authorization', `Bearer ${user.generateToken()}`)
      .send({
        name: 'test name',
        email: 'test@test.com',
        age: 20,
        weight: 80,
        height: 1.8,
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
  });

  it('should not be able update a student without fields', async () => {
    const user = await factory.create('User');
    const student = await factory.create('Student');

    const response = await request(app)
      .put(`/students/${student.id}`)
      .set('Authorization', `Bearer ${user.generateToken()}`);

    expect(response.status).toBe(401);
    expect(response.body).toMatchObject({
      error: { message: 'Validation failure.' },
    });
  });

  it('should not be able update a student with email already existing', async () => {
    const user = await factory.create('User');
    const student = await factory.create('Student', {
      email: 'daniel@test.com',
    });
    await factory.create('Student', {
      email: 'test@test.com',
    });

    const response = await request(app)
      .put(`/students/${student.id}`)
      .set('Authorization', `Bearer ${user.generateToken()}`)
      .send({
        name: student.name,
        email: 'test@test.com',
        age: student.age,
        weight: student.weight,
        height: student.height,
      });

    expect(response.status).toBe(401);
    expect(response.body).toMatchObject({
      error: { message: 'Student already exists with this email.' },
    });
  });

  it('should not be able update a student not found', async () => {
    const user = await factory.create('User');

    const response = await request(app)
      .put('/students/1')
      .set('Authorization', `Bearer ${user.generateToken()}`)
      .send({
        name: 'Test',
        email: 'test@test.com',
        age: 20,
        weight: 75.3,
        height: 1.93,
      });

    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({
      error: { message: 'Student not found.' },
    });
  });
});
