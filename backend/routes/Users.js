//import modules express and router
var express = require('express');
var router = express.Router();
var cors = require('cors')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
router.use(cors());
var Sequelize = require('sequelize');


var moment = require('moment');
var currenttime = new moment().format('YYYY-MM-DD HH:MM:SS');

process.env.SECRET_KEY = 'secret';


//LOGIN

router.post('/login', );

//PROFILE
router.get('/profile', (req, res) => {
    var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)
    User.findOne({
        where: {
            user_id: decoded.user_id
        }
    })
        .then(user => {
            if (user) {
                res.json(user)
            } else {
                res.send('User does not exist')
                res.send('error: ' + err)
            }
        })
})

module.exports = router;