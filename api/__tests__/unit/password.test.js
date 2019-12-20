import bcrypt from 'bcryptjs';

import factory from '../factory';
import truncate from '../util/truncate';

describe('Password encrypt', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should encrypt user password', async () => {
    const user = await factory.create('User', {
      password: '123456',
    });

    const compareHash = await bcrypt.compare('123456', user.password_hash);

    expect(compareHash).toBe(true);
  });

  it('should not be able encrypt password with new user created', async () => {
    const user = await factory.create('User', {
      password: '123456',
    });

    const compareHash = await bcrypt.compare('123123', user.password_hash);

    expect(compareHash).toBe(false);
  });
});
