import Sequeilize, { Model } from 'sequelize';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequeilize.STRING,
        email: Sequeilize.STRING,
        password_hash: Sequeilize.STRING,
        provider: Sequeilize.BOOLEAN,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default User;
