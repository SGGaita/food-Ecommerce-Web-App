//import modules express and router
var express = require('express');
var router = express.Router();
var cors = require('cors')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Customer = require('../models/customer');
router.use(cors());
var Sequelize = require('sequelize');


var moment = require('moment');
var currenttime = new moment().format('YYYY-MM-DD HH:MM:SS');

process.env.SECRET_KEY = 'secret';

//Customer



//LOGIN

router.post('/login_customer', );

//PROFILE
router.get('/profile', verifyToken, (req, res) => {
    //var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)

      jwt.verify(req.token, process.env.SECRET_KEY, (err, authData)=>{
          if(err){
              res.sendStatus(403);
          }else{
           //find customer profile 
            Customer.findOne({
                where: {
                    id_customer: decoded.id_customer
                }
            })
                .then(customer => {
                    if (customer) {
                        res.json(customer, authData)
                    } else {
                        res.send('Customer does not exist')
                        res.send('error: ' + err)
                    }
                })

          }
      })

    
})

//Verify Token
function verifyToken(req, res, next) {
    //Get auth header value
    var decoded = req.headers['authorization'];
    //check if decoded is undefined
    if (typeof decoded !== 'undefined') {
        //Split at the space
        var decoded_bearer = decoded.split('');
        // Get token from array
        var decodedToken = decoded_bearer[1];
        //Set the token
        req.token = decodedToken;
        //Next middleware
        next();
    } else {
        res.sendStatus(403)
    }
}


module.exports = router;