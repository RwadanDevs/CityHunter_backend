export default (sequelize, DataTypes) => {
  const stops = sequelize.define('stops', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull:false
    },
    name: {
      type: DataTypes.STRING,
      allowNull:false,
    },
    route_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    longitude:{
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    latitude:{
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  }, {});
  stops.associate = function(models) {
    stops.belongsTo(models.users ,{ foreignKey:'route_id',targetKey:'id' })
  };
  return stops;
};