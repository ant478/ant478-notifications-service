const { Sequelize } = require('sequelize');
const config = require('../../config/database.json')[process.env.NODE_ENV];

const { Subscription } = require('./Subscription');

const sequelize = new Sequelize(config.database, config.username, config.password, config);

const models = [Subscription].reduce((acc, defineCall) => {
  const model = defineCall(sequelize);

  acc[model.name] = model;

  return acc;
}, {});

module.exports = models;
