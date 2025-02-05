const { DataTypes } = require('sequelize');
const sequelize = require('../config');

const PlayerEvent = sequelize.define('PlayerEvent', {
  playerId: { type: DataTypes.INTEGER, allowNull: false },
  eventId: { type: DataTypes.INTEGER, allowNull: false },
});

module.exports = PlayerEvent;
