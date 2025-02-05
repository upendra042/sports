const { DataTypes } = require('sequelize');
const sequelize = require('../config');

const Event = sequelize.define('Event', {
  title: { type: DataTypes.STRING, allowNull: false },
  date: { type: DataTypes.DATEONLY, allowNull: false },
  time: { type: DataTypes.TIME, allowNull: false },
  venue: { type: DataTypes.STRING, allowNull: false },
  team_limit: { type: DataTypes.INTEGER, allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: true },
  adminId: { type: DataTypes.INTEGER, allowNull: false },
});

module.exports = Event;
