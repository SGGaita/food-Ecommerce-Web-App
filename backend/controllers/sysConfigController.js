const express = require('express');
const router = express.Router();
const {database} = require('../db/db_mysqli');

//Database functions for application configuration
//1. General store settings 

//Fetch store info
const getStoreInfo = (req,res)=>{
    database.table('store_settings')
    .getAll()
        .then(store => {
            res.send(store);
            } 
        )
        .catch(err => console.log(err));

}

//Update store info
const updateStoreInfo = async(req,res)=>{

}


//2. Timezone settings

//Fetch timezone info
const getTimezoneInfo = (req,res)=>{
    database.table('timezone_settings')
    .getAll()
        .then(timezone => {
            res.json(timezone);
            } 
        )
        .catch(err => console.log(err));

}

//Update timezone info
const updateTimezoneInfo = async(req,res)=>{
    
}


//3. Social media settings

//Fetch social media info
const getSocialInfo = (req,res)=>{
    database.table('social_settings')
    .getAll()
        .then(social => {
            res.json(social);
            } 
        )
        .catch(err => console.log(err));

}

//Update social media info
const updateSocialInfo = async(req,res)=>{
    
}



module.exports = {getStoreInfo, updateStoreInfo, getTimezoneInfo, updateTimezoneInfo, getSocialInfo, updateSocialInfo}