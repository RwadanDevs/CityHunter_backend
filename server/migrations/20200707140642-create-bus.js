export function up(queryInterface, Sequelize) {
  return queryInterface.createTable('busses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      origin: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      destination: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      routeNumber: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      plateNumber: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      company: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      status: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  }
export function down(queryInterface) {
  return queryInterface.dropTable('busses');
}