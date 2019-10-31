import Sequelize, { Model } from 'sequelize';

class Registration extends Model {
  static init(sequelize) {
    super.init(
      {
        price: Sequelize.FLOAT,
        start_date: Sequelize.DATE,
        end_date: Sequelize.DATE,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsToMany(models.Student, {
      foreignKey: 'student_id',
      as: 'student',
    });
    this.belongsToMany(models.PlanManagement, {
      foreignKey: 'plan_id',
      as: 'plans',
    });
  }
}

export default Registration;
