const express = require('express');
const router = express.Router();

const {database} = require('../db/db_mysqli');


const getEmailOrderVariables = (res,req)=>{
    let emailId = 2;

    database.table('email_server_settings')
    .filter({
        id: emailId
    })
    .get()
    .then(email => {
        console.log(email);
        const main_domain = email.main_domain
        const stmp_server = email.stmp_server
        const stmp_username = email.stmp_username
        const smtp_password = email.smtp_password
        const port = email.port
    }).catch(err => res.json(err));

}




module.exports ={getEmailOrderVariables}