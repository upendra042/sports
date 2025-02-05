'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Matches', [
      { team1: 'Team A', team2: 'Team B', date: '2025-01-15', location: 'Stadium 1', createdAt: new Date(), updatedAt: new Date() },
      { team1: 'Team C', team2: 'Team D', date: '2025-01-20', location: 'Stadium 2', createdAt: new Date(), updatedAt: new Date() },
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Matches', null, {});
  },
};
