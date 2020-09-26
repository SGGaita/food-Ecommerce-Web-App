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
//Register new Customer
router.post('/register_customer', (req, res, next) => {
    console.log("this values", req.body)
    console.log("Email values", req.body.fname)
    var newCustomer = {

        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        phone: req.body.phone,
        password: req.body.password,
        createdAt: currenttime
    }

    Customer.findOne({
            where: Sequelize.or({
                email: req.body.email
            })
        })
        .then(customer => {
            console.log("email", req.body.email)
            console.log("customer", customer)
            if (!customer) {
                const hash = bcrypt.hashSync(newCustomer.password, 10)
                newCustomer.password = hash;
                Customer.create(newCustomer)
                    .then(customer => {
                        let token = jwt.sign(customer.dataValues, process.env.SECRET_KEY, {
                            expiresIn: 3600
                        })
                        res.json({
                            token: token
                        })
                    })
                    .catch(err => {
                        res.send('error: ' + err)
                    })
            } else {
                res.json({
                    error: 'Customer already exists'
                });
            }
        })
        .catch(err => {
            console.log("Email", req.body.email)
            res.send('Error: ' + err);
        })
})


//LOGIN

router.post('/login_customer', (req, res) => {
    console.log("Request body", req.body)
    Customer.findOne({
            where: Sequelize.or({
                email: req.body.email
            })
        })
        .then(customer => {
            console.log("Customer", customer)
            if (!customer) {
                return res.status(404).send({
                    reason: `Customer email "${req.body.email}" not found in the database`
                });
            }
            var passwordIsValid = bcrypt.compareSync(req.body.password, customer.password);
            if (!passwordIsValid) {
                return res.status(401).send({
                    auth: false,
                    accessToken: null,
                    reason: 'Invalid Password'
                });
            }
            var token = jwt.sign(customer.dataValues, process.env.SECRET_KEY, {
                expiresIn: 7200
            });
            res.send({
                token: token
            })
        })
        .catch(err => {
            res.status(500).send('error: ' + err)
        });
});

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