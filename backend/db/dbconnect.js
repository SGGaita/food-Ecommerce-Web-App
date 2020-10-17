const Sequelize = require('sequelize');
const mysqlConnection = {}
const sequelize = new Sequelize('ecommerce_tos', 'root', '', {
  host: 'localhost', 
  dialect: 'mysql',

  operatorAliases: false,
  
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000

  },

});



mysqlConnection.sequelize = sequelize;
mysqlConnection.Sequelize = Sequelize;


module.exports = mysqlConnection; //exporting the connection