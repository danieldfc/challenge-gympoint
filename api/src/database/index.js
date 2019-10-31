import Sequelize from 'sequelize';

import User from '../app/models/User';
import Student from '../app/models/Student';
import PlanManagement from '../app/models/PlanManagement';
import Registration from '../app/models/Registration';

import dbConfig from '../config/database';

const models = [User, Student, PlanManagement, Registration];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(dbConfig);
    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
