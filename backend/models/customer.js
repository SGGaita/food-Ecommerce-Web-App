const { STRING } = require('sequelize');
var Sequelize = require('sequelize');
var mysqlConnection = require('../db/dbconnect');

module.exports = mysqlConnection.sequelize.define(
  'customers', {
    id_customer: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    fname: {
        type: Sequelize.STRING
      },
    lname: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    phone:{
        type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING,
    },
    createdAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    },
    updatedAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    }
  }
);