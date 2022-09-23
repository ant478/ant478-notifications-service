const { DataTypes } = require('sequelize');

module.exports.Subscription = (sequelize) => {
  const Subscription = sequelize.define('Subscription', {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    receiver: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    endpoint: {
      type: DataTypes.STRING(2083),
      allowNull: false,
    },
    endpointHash: {
      field: 'endpoint_hash',
      type: 'VARBINARY(32)',
      get() {
        const value = this.getDataValue('endpointHash');
        return (value ? value.toString('base64') : null);
      },
      set(value) {
        this.setDataValue('endpointHash', Buffer.from(value, 'base64'));
      },
    },
    p256dh: {
      type: 'VARBINARY(65)',
      get() {
        const value = this.getDataValue('p256dh');
        return (value ? value.toString('base64') : null);
      },
      set(value) {
        this.setDataValue('p256dh', Buffer.from(value, 'base64'));
      },
    },
    auth: {
      type: 'VARBINARY(16)',
      get() {
        const value = this.getDataValue('auth');
        return (value ? value.toString('base64') : null);
      },
      set(value) {
        this.setDataValue('auth', Buffer.from(value, 'base64'));
      },
    },
    createdAt: {
      field: 'created_at',
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      field: 'updated_at',
      type: DataTypes.DATE,
      allowNull: false,
    },
  }, {
    tableName: 'subscriptions',
  });

  Subscription.addScope('defaultScope', {
    attributes: {
      exclude: ['endpointHash'],
    },
  });

  return Subscription;
};
