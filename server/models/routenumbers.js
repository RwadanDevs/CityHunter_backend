export default (sequelize, DataTypes) => {
  const routeNumbers = sequelize.define('routeNumbers', {
    stop_id: {
      type: DataTypes.UUID,
      allowNull:false
    },
    routeNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {});
  routeNumbers.associate = function(models) {
    routeNumbers.belongsTo(models.stops ,{ foreignKey:'stop_id',targetKey:'id' })
    routeNumbers.belongsTo(models.routes ,{ foreignKey:'routeNumber',targetKey:'routeNumber' })
  };
  return routeNumbers;
};