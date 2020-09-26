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

//USER
//Register new user
router.post('/register', (req, res, next) => {
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
})


//LOGIN

router.post('/login', (req, res) => {
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
});

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