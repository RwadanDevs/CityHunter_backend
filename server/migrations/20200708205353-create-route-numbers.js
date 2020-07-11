export function up(queryInterface, Sequelize) {
  return queryInterface.createTable('routeNumbers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      stop_id: {
        type: Sequelize.UUID,
        allowNull:false,
      },
      routeNumber: {
        type: Sequelize.INTEGER,
        allowNull: true,
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
  return queryInterface.dropTable('routeNumbers');
}