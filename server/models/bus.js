export default (sequelize, DataTypes) => {
  const busses = sequelize.define('busses', {
    origin: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    destination: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    routeNumber: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    plateNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    company: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'dormant',
    },
  }, {});
  busses.associate = function(models) {
    busses.belongsTo(models.routes ,{ foreignKey:'routeNumber',targetKey:'routeNumber' })
  };
  return busses;
};