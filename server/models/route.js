export default (sequelize, DataTypes) => {
  const routes = sequelize.define('routes', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull:false
    },
    routeNumber:{
      type: DataTypes.INTEGER,
      allowNull:false,
    },
    PointA: {
      type: DataTypes.STRING,
      allowNull:false,
    },
    PointB: {
      type: DataTypes.STRING,
      allowNull:false,
    },
    company: {
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
    routes.hasMany(models.routeNumbers,{
      foreignKey:'routeNumber',
      as: 'routeStop',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    })

    routes.hasMany(models.busses,{
      foreignKey:'routeNumber',
      as: 'busRoute',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    })
    
  };
  return routes;
};