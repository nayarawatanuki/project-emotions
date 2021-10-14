'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('activities', { 
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      kid_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'kids', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      emotion: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      image: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      response1: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      response2: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      response3: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      respCorrect: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('activities');
  }
};