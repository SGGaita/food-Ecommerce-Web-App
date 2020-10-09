const express = require('express');
const router = express.Router();
const {database} = require('../db/db_mysqli');

//Get all restaurants
const getAllRestaurants = (req, res) => {}
//Get restaurant by Id
const getRestaurantById = (req, res) => {}


module.exports = {getAllRestaurants, getRestaurantById};