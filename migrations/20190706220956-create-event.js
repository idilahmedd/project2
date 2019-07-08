'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('events', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      type: {
        type: Sequelize.STRING
      },
      location: {
        type: Sequelize.STRING
      },
      time: {
        type: Sequelize.TIME
      },
      with: {
        type: Sequelize.STRING
      },
      reason: {
        type: Sequelize.STRING
      },
      kidId: {
        type: Sequelize.INTEGER
      },
      docId: {
        type: Sequelize.STRING
      },
      playId: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('events');
  }
};