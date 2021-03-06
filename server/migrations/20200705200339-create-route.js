export function up(queryInterface, Sequelize) {
  return queryInterface.createTable('routes', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      routeNumber: {
        type: Sequelize.INTEGER,
        allowNull:false,
      },
      PointA: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      PointB: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      company: {
        type: Sequelize.STRING,
        allowNull:false,
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
  return queryInterface.dropTable('routes');
}
