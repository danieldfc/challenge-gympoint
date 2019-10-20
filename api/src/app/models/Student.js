import Sequeilize, { Model } from 'sequelize';

class Student extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequeilize.STRING,
        email: Sequeilize.STRING,
        age: Sequeilize.INTEGER,
        weight: Sequeilize.DOUBLE,
        height: Sequeilize.DOUBLE,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default Student;
