import Sequelize from 'sequelize';

import Checkin from '../app/models/Checkin';
import Enrollment from '../app/models/Enrollment';
import HelpOrder from '../app/models/HelpOrder';
import Plan from '../app/models/Plan';
import Student from '../app/models/Student';
import User from '../app/models/User';

import dbConfig from '../config/database';

const models = [User, Student, Plan, Enrollment, Checkin, HelpOrder];

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
