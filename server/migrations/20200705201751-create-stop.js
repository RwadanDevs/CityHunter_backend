export function up(queryInterface, Sequelize) {
  return queryInterface.createTable('stops', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      name: {
        type: Sequelize.STRING,
        allowNull:false,
      },
      route_id: {
        type:Sequelize.UUID,
        allowNull: false,
      },
      longitude:{
        type:Sequelize.FLOAT,
        allowNull: false,
      },
      latitude:{
        type:Sequelize.FLOAT,
        allowNull: false,
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
  return queryInterface.dropTable('stops');
}