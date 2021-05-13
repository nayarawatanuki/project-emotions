'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('kid_activities', { 
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
        OnDelete: 'CASCADE',
      },
      activities_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'activities', key: 'id' },
        onUpdate: 'CASCADE',
        OnDelete: 'CASCADE',
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
    await queryInterface.dropTable('kid_activities');
  }
};
