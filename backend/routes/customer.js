const express = require('express');
const router = express.Router();
const nodemailer = require("nodemailer");
const SendmailTransport = require('nodemailer/lib/sendmail-transport');
const {
    database
} = require('../db/db_mysqli');

const email_Creds = require('../env/email_cred.json');
const { options } = require('./products_routes');


/*router.post('/sendmail', (req, res) => {
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

});*/

//fetch all customers and addresses
router.get("/customers", (req,res)=>{
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
    database.table('customers as c ')
        .withFields(['c.id_customer',
        'c.fname as firstName',
        'c.lname as lastName',
        'c.email',
          'c.phone as primaryPhone',
         'c.createdAt as dateJoined',
         'c.updatedAt'
          
        ])
        .slice(startValue, endValue)
        .sort({
            id_customer: .1
        })
        .getAll()
        .then(custs => {
            if (custs.length > 0) {
                res.status(200).json({
                    count: custs.length,
                    customers: custs
                });
            } else {
                res.json({
                    message: "No customers found"
                });
            }
        })
        .catch(err => console.log(err));
})


//fetch all customers and addresses



/* GET ONE CUSTOMER DETAILS no Address BY ID*/
router.get('/customers/:custId', (req, res) => {
    let customerId = req.params.custId;
    database.table('customers as c ')
    .withFields(['c.id_customer',
    'c.fname as firstName',
    'c.lname as lastName',
    'c.email',
      'c.phone as primaryPhone',
      'c.createdAt as dataJoined',
      
    ])
        .filter({
            'c.id_customer': customerId
        })
        .get()
        .then(cust => {
            console.log(cust);
            if (cust) {
                res.status(200).json(cust);
            } else {
                res.json({
                    message: `No Customer found with id ${customerId}`
                });
            }
        }).catch(err => res.json(err));
});



/* GET ONE CUSTOMER DETAILS and Address BY ID*/
router.get('/customers_add/:custId', (req, res) => {
    let customerId = req.params.custId;
    database.table('customers as c ')
    .leftJoin([{
            table: "customer_addresses as ca",
            on: `c.id_customer = ca.id_customer_fk`
        },
        
    ])
    .withFields(['c.id_customer',
    'ca.id_customer_fk',
    'c.fname as firstName',
    'c.lname as lastName',
    'c.email',
      'c.phone as primaryPhone',
      'ca.additional_phone as secondaryPhone',
      'ca.address',
      'ca.city',
      'ca.region',
      'ca.additional_info'
      
    ])
        .filter({
            'c.id_customer': customerId
        })
        .get()
        .then(cust => {
            console.log(cust);
            if (cust) {
                res.status(200).json(cust);
            } else {
                res.json({
                    message: `No Customer found with id ${customerId}`
                });
            }
        }).catch(err => res.json(err));
});








module.exports = router;