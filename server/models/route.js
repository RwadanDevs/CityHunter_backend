export default (sequelize, DataTypes) => {
  const routes = sequelize.define('routes', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull:false
    },
    PointA: {
      type: DataTypes.STRING,
      allowNull:false,
    },
    PointB: {
      type: DataTypes.STRING,
      allowNull:false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'active',
    },
  }, {});
  routes.associate = function(models) {
    routes.hasMany(models.stops,{
      foreignKey:'route_id',
      as: 'routeStop',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    })
  };
  return routes;
};