// Database connection string
//const mysql = require ('mysql');

//var mysqlConnection = mysql.createConnection({
  //  host     : 'localhost',
    //user     : 'root',
    //password : '',
    //database : 'capep'
//});

//mysqlConnection.connect(function(err) {
  //  if (!err)
    //      console.log('Db connection succeeded.');
      //  else
        //  console.log('DB connection failed \n Error : ' + JSON.stringify(err, undefined, 2));
//});


//mysqlConnection.end(); //closing mysql connection

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