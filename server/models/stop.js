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
    stops.hasMany(models.routeNumbers,{
      foreignKey:'stop_id',
      as: 'routeStop',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    })
  };
  return stops;
};