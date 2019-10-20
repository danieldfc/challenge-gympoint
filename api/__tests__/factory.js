import { factory } from 'factory-girl';
import faker from 'faker';

import User from '../src/app/models/User';
import Student from '../src/app/models/Student';

factory.define('User', User, {
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
});

factory.define('Student', Student, {
  name: faker.name.findName(),
  email: faker.internet.email(),
  age: faker.random.number(),
  weight: 80.5,
  height: 1.8,
});

export default factory;
