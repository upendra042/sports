module.exports = (sequelize, DataTypes) => {
    const Sport = sequelize.define('Sport', {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
    return Sport;
  };
  