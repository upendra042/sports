'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Match extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Match.init({
    team1: DataTypes.STRING,
    team2: DataTypes.STRING,
    date: DataTypes.DATE,
    location: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Match',
  });
  return Match;
};