'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable(
    'subscriptions', {
      id: {
        type: Sequelize.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      receiver: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      endpoint: {
        type: Sequelize.DataTypes.STRING(2083),
        allowNull: false,
      },
      endpoint_hash: {
        type: 'VARBINARY(32) GENERATED ALWAYS AS (UNHEX(SHA2(endpoint, 256))) STORED',
        unique: true,
        allowNull: false,
      },
      p256dh: {
        type: 'VARBINARY(65)',
      },
      auth: {
        type: 'VARBINARY(16)',
      },
      created_at: {
        type: Sequelize.DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
        allowNull: false,
      },
    },
  ).then(() =>
    queryInterface.addIndex('subscriptions', {
      fields: ['receiver'],
      name: 'receiver_index',
    }),
  ),

  down: queryInterface => queryInterface.dropTable('subscriptions'),
};
