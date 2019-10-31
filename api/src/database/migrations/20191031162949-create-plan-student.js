module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('plan_user', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      student_id: {
        type: Sequelize.INTEGER,
        references: { model: 'students', key: 'id' },
        allowNull: true,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      plan_id: {
        type: Sequelize.INTEGER,
        references: { model: 'plans', key: 'id' },
        allowNull: true,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      start_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      end_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      price: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('plan_user');
  },
};
