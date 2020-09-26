// Database connection string
var mysql = require('mysql');

var mysqlConnection = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  port: '', //3306 on remote server
  user: 'root', //
  password: '',  //
  database: 'ecommerce_tos'
});

mysqlConnection.getConnection((err, connection) => {
  if (err) {
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      console.error('Database connection was closed.');
    }
    if (err.code === 'ER_CON_COUNT_ERROR') {
      console.error('Database has too many connections.');
    }
    if (err.code === 'ECONNREFUSED') {
      console.error('Database connection was refused.');
    }
  }
  if (connection) connection.release();
  return;
})



module.exports = mysqlConnection; //exporting the connection