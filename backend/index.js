//import modules
var express = require('express'),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    cors = require('cors');
    path = require('path');

   require('dotenv').config()

var app = express();
//http = require('http').Server(app)
var port = process.env.PORT ;
//create socket instace with http
//var io = require('socket.io')(http);


//import database connection from dbconnect.js file
//var mysql = require('./db/db');

// add listener for new connection
//io.on("connection", (socket) =>{
  //this is the socket for each request
 // console.log("User connected", socket.id)
//})

//Parse as urlencoded and json.
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//adding middleware - cors
app.use(cors());

//Http logger
app.use(morgan('dev'));

//Uncomment for production
//app.use(express.static(__dirname + '/public'));
//app.get('/*', (req,res) => res.sendFile(path.join(__dirname+'/public')));
//app.get('*', (req,res) => { 
    //res.sendFile(path.join(__dirname), (err)=> {
    //if (err) {
      //res.status(500).send(err)
    //}
  //})
//});

app.use(function (req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
    next();
});

//import routes from /routes/allRoutes.js
var allRoutes = require('./routes/allRoutes')

//adding routes
app.use('/api', allRoutes);

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, function() {console.log('Server started at http://localhost:'+port+'/');});







