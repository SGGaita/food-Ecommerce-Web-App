const express = require('express');
const router = express.Router();
const {database} = require('../db/db_mysqli');

//Get all users
const getAllUsers = (req, res)=> { // Sending Page Query Parameter is mandatory http://localhost:3636/api/products?page=1
    let page = (req.query.page !== undefined && req.query.page !== 0) ? req.query.page : 1;
    const limit = (req.query.limit !== undefined && req.query.limit !== 0) ? req.query.limit : 10; // set limit of items per page
    let startValue;
    let endValue;
    if (page > 0) {
        startValue = (page * limit) - limit; // 0, 10, 20, 30
        endValue = page * limit; // 10, 20, 30, 40
    } else {
        startValue = 0;
        endValue = 10;
    }
    database.table('users')
        .withFields(['id_user',
        'fname',
        'lname',
        'username',
        'email',
        'roles',
        'status'
])
        .slice(startValue, endValue)
        .sort({
            id_user: .1
        })
        .getAll()
        .then(user => {
            if (user.length > 0) {
                res.status(200).json({
                    count: user.length,
                    users: user
                });
            } else {
                res.json({
                    message: "No user accounts found"
                });
            }
        })
        .catch(err => console.log(err));
}

//Get user by user id
const getUserById = (req, res) => {
    
    let userId = req.params.userId;
    console.log("user id", userId)
    database.table('users')
    .withFields(['id_user',
    'fname',
    'lname',
    'username',
    'email',
    'roles',
    'status'
    ])
        .filter({
            'id_user': userId
        })
        .get()
        .then(user => {
            console.log(user);
            if (user) {
                res.status(200).json(user);
            } else {
                res.json({
                    message: `No user found with id ${userId}`
                });
            }
        }).catch(err => res.json(err));
}



module.exports = {getAllUsers, getUserById}