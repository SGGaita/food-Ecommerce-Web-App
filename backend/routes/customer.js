const express = require('express');
const router = express.Router();
const nodemailer = require("nodemailer");
const SendmailTransport = require('nodemailer/lib/sendmail-transport');
const {
    database
} = require('../db/db_mysqli');

const email_Creds = require('../env/email_cred.json');
const { options } = require('./products_routes');


router.post('/sendmail', (req, res) => {
    console.log("You have hit the server", req.body)
    let user = req.body;

    console.log("email configs", email_Creds.password, "+", email_Creds.name)

   const output = `
   <p>You have been successfully registered</p>
   <h3>Details are </h3>
   <ul>
   <li>${user.fname}</li>
   <li>${user.lname}</li>
   <li>${user.email}</li>
   <li>${user.phone}</li>
   </ul>`;

   let transporter = nodemailer.createTransport({
    host: 'mail.notreforce.org',
    port: 587,
    secure: false, //true for 465, false for other ports
    auth: {
        name: email_Creds.name,
        pass: email_Creds.password,
        
    },
    tls:{
        rejectUnauthorized: false
    }
});

let mailOptions = {
    from: '"Nguvu yetu" <test@notreforce.org>', //sender address
    to: user.email, //list of receivers
    subject: "Email verification",
    text: `Hi ${user.fname}. Thanks for joining us`,
    html: output,
    
};

//send mail with defined transport object
transporter.sendMail(mailOptions,(error, info)=>{
    if (error){
        return console.log(error);
    }
    console.log(`Message sent ${info.messageId}`)
    res.status(200).json({msg:"Email has been sent"})
})

});







module.exports = router;