const express = require('express');
const router = express.Router();
var cors = require('cors')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Customer = require('../models/customer');
router.use(cors());
var Sequelize = require('sequelize');

var moment = require('moment');
var currenttime = new moment().format('YYYY-MM-DD HH:MM:SS');

process.env.SECRET_KEY = 'secret';

//Register new system user
const addNewUser = (req, res, next) => {
    var newUser = {
        staff_id_fk: req.body.staff_id_fk,
        userName: req.body.userName,
        email: req.body.email,
        password: req.body.password,
        roles: req.body.roles,
        created_at: currenttime
    }

    User.findOne({
        where: Sequelize.or({ email: req.body.email }, { userName: req.body.userName })
    })
        .then(user => {
            if (!user) {
                const hash = bcrypt.hashSync(newUser.password, 10)
                newUser.password = hash;
                User.create(newUser)
                    .then(user => {
                        let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
                            expiresIn: 3600
                        })
                        res.json({ token: token })
                    })
                    .catch(err => {
                        res.send('error: ' + err)
                    })
            } else {
                res.json({ error: 'User already exists' });
            }
        })
        .catch(err => {
            res.send('error: ' + err);
        })
}

//Login User
const loginUser = (req, res) => {
    User.findOne({
        where: Sequelize.or({ email: req.body.email }, { userName: req.body.userName })
    }
    )
        .then(user => {
            if (!user) {
                return res.status(404).send({reason: 'User Not Found'});
            }
            var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
            if (!passwordIsValid) {
                return res.status(401).send({ auth: false, accessToken: null, reason: 'Invalid Password' });
            }
            var token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
                expiresIn: 7200
            });
            res.send({ token: token })
        })
        .catch(err => {
            res.status(500).send('error: ' + err)
        });
}

//Register new customer
const addNewCustomer = (req, res, next) => {
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
}

//Login Customer
const loginCustomer = (req, res) => {
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
                    reason: `Customer email ${req.body.email} not found in the database`
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
}


module.exports = {addNewCustomer, loginCustomer, addNewUser, loginUser}