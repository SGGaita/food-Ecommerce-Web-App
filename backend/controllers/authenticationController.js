const express = require('express');
const router = express.Router();
var cors = require('cors')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const Customer = require('../models/customer');
router.use(cors());
var Sequelize = require('sequelize');
var nodemailer = require('nodemailer')
const emailServerController = require('../controllers/emailServerController')

var moment = require('moment');
var currenttime = new moment().format('YYYY-MM-DD HH:MM:SS');

process.env.SECRET_KEY = 'secret';

//Register new system user
const addNewUser = (req, res, next) => {
    console.log("User body information", req.body)
    var newUser = {
        fname: req.body.fname,
        lname: req.body.lname,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        roles: req.body.roles,
        status: req.body.status,
        created_at: currenttime
    }

    console.log("New user", )

    User.findOne({
            where: Sequelize.or({
                email: req.body.email
            }, {
                username: req.body.username
            })
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
                        res.json({
                            token: token
                        })
                    })
                    .catch(err => {
                        res.send('error: ' + err)
                    })
            } else {
                res.json({
                    error: 'User already exists'
                });
            }
        })
        .catch(err => {
            res.send('error: ' + err);
            console.log("error", err)
        })
}

//Login User
const loginUser = (req, res) => {
    User.findOne({
            where: {
                username: req.body.username
            }
        })
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    reason: 'User Not Found'
                });
            }
            var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
            if (!passwordIsValid) {
                return res.status(401).send({
                    auth: false,
                    accessToken: null,
                    reason: 'Invalid Password'
                });
            }
            var token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
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

//Register new customer
const addNewCustomer = async (req, res, next) => {

            let _acc_state = 0
            console.log("Date of birth", req.body.dob)
            var newCustomer = {

                fname: req.body.fname,
                lname: req.body.lname,
                email: req.body.email,
                phone: req.body.phone,
                dob: new moment(req.body.dob).format('YYYY-MM-DD HH:MM:SS'),
                password: req.body.password,
                acc_state: _acc_state,
                createdAt: currenttime
            }

            console.log("new customer", newCustomer)

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
                                .then(async (customer) => {

                                            let _id_customer = customer.dataValues.id_customer

                                            console.log("Let this customer be customer", customer.dataValues.id_customer)

                                            var transporter = nodemailer.createTransport({
                                                    host: "mail.maungano.com",
                                                    port: 465,
                                                    secure: true, // use TLS
                                                    auth: {
                                                        user: "order@maungano.com",
                                                        pass: "admin2020"
                                                    }
                                                    })

                                                    // verify connection configuration
transporter.verify(function(error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log("Server is ready to take our messages");
    }
  });

                                                // var transporter = nodemailer.createTransport({
                                                //     service: 'gmail',
                                                //     auth: {
                                                //         user: 'gingergait06@gmail.com',
                                                //         pass: 'Waxmangme86'
                                                //     }
                                                // });

                                                const mailOptions = {
                                                    from: 'Maungano <order@maungano.com>', // sender address
                                                    to: req.body.email, // list of receivers
                                                    subject: `Account activation for ${req.body.email} `, // Subject line
                                                    html: `<html>

                            <head>
                                <title></title>
                                <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
                                <meta name="viewport" content="width=device-width, initial-scale=1">
                                <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                                <style type="text/css">
                                    @media screen {
                                        @font-face {
                                            font-family: 'Lato';
                                            font-style: normal;
                                            font-weight: 400;
                                            src: local('Lato Regular'), local('Lato-Regular'), url(https://fonts.gstatic.com/s/lato/v11/qIIYRU-oROkIk8vfvxw6QvesZW2xOQ-xsNqO47m55DA.woff) format('woff');
                                        }
                            
                                        @font-face {
                                            font-family: 'Lato';
                                            font-style: normal;
                                            font-weight: 700;
                                            src: local('Lato Bold'), local('Lato-Bold'), url(https://fonts.gstatic.com/s/lato/v11/qdgUG4U09HnJwhYI-uK18wLUuEpTyoUstqEm5AMlJo4.woff) format('woff');
                                        }
                            
                                        @font-face {
                                            font-family: 'Lato';
                                            font-style: italic;
                                            font-weight: 400;
                                            src: local('Lato Italic'), local('Lato-Italic'), url(https://fonts.gstatic.com/s/lato/v11/RYyZNoeFgb0l7W3Vu1aSWOvvDin1pK8aKteLpeZ5c0A.woff) format('woff');
                                        }
                            
                                        @font-face {
                                            font-family: 'Lato';
                                            font-style: italic;
                                            font-weight: 700;
                                            src: local('Lato Bold Italic'), local('Lato-BoldItalic'), url(https://fonts.gstatic.com/s/lato/v11/HkF_qI1x_noxlxhrhMQYELO3LdcAZYWl9Si6vvxL-qU.woff) format('woff');
                                        }
                                    }
                            
                                    /* CLIENT-SPECIFIC STYLES */
                                    body,
                                    table,
                                    td,
                                    a {
                                        -webkit-text-size-adjust: 100%;
                                        -ms-text-size-adjust: 100%;
                                    }

                                    h1{
                                        font-size:28px !important;
                                    }
                            
                                    table,
                                    td {
                                        mso-table-lspace: 0pt;
                                        mso-table-rspace: 0pt;
                                    }
                            
                                    img {
                                        -ms-interpolation-mode: bicubic;
                                    }
                            
                                    /* RESET STYLES */
                                    img {
                                        border: 0;
                                        height: auto;
                                        line-height: 100%;
                                        outline: none;
                                        text-decoration: none;
                                    }
                            
                                    table {
                                        border-collapse: collapse !important;
                                    }
                            
                                    body {
                                        height: 100% !important;
                                        margin: 0 !important;
                                        padding: 0 !important;
                                        width: 100% !important;
                                    }
                            
                                    /* iOS BLUE LINKS */
                                    a[x-apple-data-detectors] {
                                        color: inherit !important;
                                        text-decoration: none !important;
                                        font-size: inherit !important;
                                        font-family: inherit !important;
                                        font-weight: inherit !important;
                                        line-height: inherit !important;
                                    }
                            
                                    /* MOBILE STYLES */
                                    @media screen and (max-width:600px) {
                                        h1 {
                                            font-size: 32px !important;
                                            line-height: 32px !important;
                                        }
                                    }
                            
                                    /* ANDROID CENTER FIX */
                                    div[style*="margin: 16px 0;"] {
                                        margin: 0 !important;
                                    }
                                </style>
                                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
                                            integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
                            </head>
                            
                            <body style="background-color: #f4f4f4; margin: 0 !important; padding: 0 !important;">
                                <!-- HIDDEN PREHEADER TEXT -->
                                <div style="display: none; font-size: 1px; color: #fefefe; line-height: 1px; font-family: 'Lato', Helvetica, Arial, sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;"> We're thrilled to have you here! Get ready to dive into your new account. </div>
                                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                    <!-- LOGO -->
                                    <tr>
                                        <td bgcolor="#cf0810" align="center">
                                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                                                <tr>
                                                    <td align="center" valign="top" style="padding: 40px 10px 40px 10px;"> </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td bgcolor="#cf0810" align="center" style="padding: 0px 10px 0px 10px;">
                                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                                                <tr>
                                                    <td bgcolor="#ffffff" align="center" valign="top" style="padding: 40px 20px 20px 20px; border-radius: 4px 4px 0px 0px; color: #111111; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 48px; font-weight: 400; letter-spacing: 4px; line-height: 48px;">
                                                        <h1 style="font-size: 28px !important; font-weight:800 text-transform="uppercase" ; margin: 2;">Welcome to Maungano Food Express!</h1> 
                                                        
                                                        <img src=""  />
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;">
                                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                                                <tr>
                                                    <td bgcolor="#ffffff" align="left" style="padding: 20px 30px 40px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 25px;">
                                                        <p style="margin: 0; text-align: center">We're excited to have you get started. First, you need to confirm your account. Just press the button below.</p>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td bgcolor="#ffffff" align="left">
                                                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                            <tr>
                                                                <td bgcolor="#ffffff" align="center" style="padding: 20px 30px 60px 30px;">
                                                                    <table border="0" cellspacing="0" cellpadding="0">
                                                                        <tr>
                                                                            <td align="center" style="border-radius: 3px;" bgcolor="#cf0810"><a href="http://localhost:4200/customer/verification/${_id_customer}" target="_blank" style="font-size: 15px; font-family: Helvetica, Arial, sans-serif; color: #ffffff; text-decoration: none; color: #ffffff; text-decoration: none; padding: 15px 25px; border-radius: 2px; border: 1px solid #cf0810; display: inline-block;">Confirm Account</a></td>
                                                                        </tr>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr> <!-- COPY -->
                                                <tr>
                                                    <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 0px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                                        <p style="margin: 0;">If that doesn't work, copy and paste the following link in your browser:</p>
                                                    </td>
                                                </tr> <!-- COPY -->
                                                <tr>
                                                    <td bgcolor="#ffffff" align="left" style="padding: 20px 30px 20px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 25px;">
                                                        <p style="margin: 0;"><a href="http://localhost:4200/customer/verification/${_id_customer}" target="_blank" style="color: #cf0810;">http://localhost:4200/customer/verification/${_id_customer}</a></p>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                  
                                </table>
                            </body>
                            
                            </html>` // plain text body
                                                };

                                                await transporter.sendMail(mailOptions, function (err, info) {
                                                    if (err)
                                                        console.log("Error is", err)
                                                    else
                                                        console.log("console log", info);


                                                });

                                                //end send email



                                                // let token = jwt.sign(customer.dataValues, process.env.SECRET_KEY, {
                                                //    expiresIn: 3600
                                                // })
                                                res.json({
                                                    message: `${req.body.email} `,
                                                })
                                            })
                                        .catch(err => {
                                            res.send('error: ' + err)
                                        })
                                }
                            else {
                                res.json({
                                    error: 'Customer already exists'
                                });
                            }
                        })
                    .catch(err => {

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
                    .then(async (customer) => {
                        console.log("Customer returns", customer)


                        if (!customer) {
                            return res.status(404).send({
                                reason: `Customer email ${req.body.email} not found in the database`
                            });
                        }
                        let _acc_state = +customer.dataValues.acc_state
                        console.log('customer id', _acc_state)
                        //check account state

                        if (_acc_state == 0) { //If account state is inactive, send an activation email to customer email
                            let _id_customer = customer.dataValues.id_customer

                            console.log("Let this customer be customer", customer.dataValues.id_customer)

                            var transporter = nodemailer.createTransport({
                                service: 'gmail',
                                auth: {
                                    user: 'gingergait06@gmail.com',
                                    pass: 'Waxmangme86'
                                }
                            });

                            const mailOptions = {
                                from: 'Tosungana <steveggaita@gmail.com>', // sender address
                                to: req.body.email, // list of receivers
                                subject: 'Account activation link', // Subject line
                                html: `<html>

                    <head>
                        <title></title>
                        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
                        <meta name="viewport" content="width=device-width, initial-scale=1">
                        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                        <style type="text/css">
                            @media screen {
                                @font-face {
                                    font-family: 'Lato';
                                    font-style: normal;
                                    font-weight: 400;
                                    src: local('Lato Regular'), local('Lato-Regular'), url(https://fonts.gstatic.com/s/lato/v11/qIIYRU-oROkIk8vfvxw6QvesZW2xOQ-xsNqO47m55DA.woff) format('woff');
                                }
                    
                                @font-face {
                                    font-family: 'Lato';
                                    font-style: normal;
                                    font-weight: 700;
                                    src: local('Lato Bold'), local('Lato-Bold'), url(https://fonts.gstatic.com/s/lato/v11/qdgUG4U09HnJwhYI-uK18wLUuEpTyoUstqEm5AMlJo4.woff) format('woff');
                                }
                    
                                @font-face {
                                    font-family: 'Lato';
                                    font-style: italic;
                                    font-weight: 400;
                                    src: local('Lato Italic'), local('Lato-Italic'), url(https://fonts.gstatic.com/s/lato/v11/RYyZNoeFgb0l7W3Vu1aSWOvvDin1pK8aKteLpeZ5c0A.woff) format('woff');
                                }
                    
                                @font-face {
                                    font-family: 'Lato';
                                    font-style: italic;
                                    font-weight: 700;
                                    src: local('Lato Bold Italic'), local('Lato-BoldItalic'), url(https://fonts.gstatic.com/s/lato/v11/HkF_qI1x_noxlxhrhMQYELO3LdcAZYWl9Si6vvxL-qU.woff) format('woff');
                                }
                            }
                    
                            /* CLIENT-SPECIFIC STYLES */
                            body,
                            table,
                            td,
                            a {
                                -webkit-text-size-adjust: 100%;
                                -ms-text-size-adjust: 100%;
                            }

                            h1{
                                font-size:28px !important;
                            }
                    
                            table,
                            td {
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                            }
                    
                            img {
                                -ms-interpolation-mode: bicubic;
                            }
                    
                            /* RESET STYLES */
                            img {
                                border: 0;
                                height: auto;
                                line-height: 100%;
                                outline: none;
                                text-decoration: none;
                            }
                    
                            table {
                                border-collapse: collapse !important;
                            }
                    
                            body {
                                height: 100% !important;
                                margin: 0 !important;
                                padding: 0 !important;
                                width: 100% !important;
                            }
                    
                            /* iOS BLUE LINKS */
                            a[x-apple-data-detectors] {
                                color: inherit !important;
                                text-decoration: none !important;
                                font-size: inherit !important;
                                font-family: inherit !important;
                                font-weight: inherit !important;
                                line-height: inherit !important;
                            }
                    
                            /* MOBILE STYLES */
                            @media screen and (max-width:600px) {
                                h1 {
                                    font-size: 32px !important;
                                    line-height: 32px !important;
                                }
                            }
                    
                            /* ANDROID CENTER FIX */
                            div[style*="margin: 16px 0;"] {
                                margin: 0 !important;
                            }
                        </style>
                    </head>
                    
                    <body style="background-color: #f4f4f4; margin: 0 !important; padding: 0 !important;">
                        <!-- HIDDEN PREHEADER TEXT -->
                        <div style="display: none; font-size: 1px; color: #fefefe; line-height: 1px; font-family: 'Lato', Helvetica, Arial, sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;"> We're thrilled to have you here! Get ready to dive into your new account. </div>
                        <table border="0" cellpadding="0" cellspacing="0" width="100%">
                            <!-- LOGO -->
                            <tr>
                                <td bgcolor="#cf0810" align="center">
                                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                                        <tr>
                                            <td align="center" valign="top" style="padding: 40px 10px 40px 10px;"> </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td bgcolor="#cf0810" align="center" style="padding: 0px 10px 0px 10px;">
                                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                                        <tr>
                                            <td bgcolor="#ffffff" align="center" valign="top" style="padding: 40px 20px 20px 20px; border-radius: 4px 4px 0px 0px; color: #111111; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 48px; font-weight: 400; letter-spacing: 4px; line-height: 48px;">
                                                <h1 style="font-size: 28px !important; font-weight:800 text-transform="uppercase" ; margin: 2;">Welcome to Tosungana!</h1> 
                                                
                                                <img src=""  />
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;">
                                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                                        <tr>
                                            <td bgcolor="#ffffff" align="left" style="padding: 20px 30px 40px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                                <p style="margin: 0;">We're excited to have you get started. First, you need to confirm your account. Just press the button below.</p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td bgcolor="#ffffff" align="left">
                                                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                    <tr>
                                                        <td bgcolor="#ffffff" align="center" style="padding: 20px 30px 60px 30px;">
                                                            <table border="0" cellspacing="0" cellpadding="0">
                                                                <tr>
                                                                    <td align="center" style="border-radius: 3px;" bgcolor="#cf0810"><a href="http://localhost:4200/customer/verification/${_id_customer}" target="_blank" style="font-size: 20px; font-family: Helvetica, Arial, sans-serif; color: #ffffff; text-decoration: none; color: #ffffff; text-decoration: none; padding: 15px 25px; border-radius: 2px; border: 1px solid #cf0810; display: inline-block;">Confirm Account</a></td>
                                                                </tr>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr> <!-- COPY -->
                                        <tr>
                                            <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 0px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                                <p style="margin: 0;">If that doesn't work, copy and paste the following link in your browser:</p>
                                            </td>
                                        </tr> <!-- COPY -->
                                        <tr>
                                            <td bgcolor="#ffffff" align="left" style="padding: 20px 30px 20px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                                <p style="margin: 0;"><a href="http://localhost:4200/customer/verification/${_id_customer}" target="_blank" style="color: #cf0810;">http://localhost:4200/customer/verification/${_id_customer}</a></p>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                          
                        </table>
                    </body>
                    
                    </html>` // plain text body
                            };

                            await transporter.sendMail(mailOptions, function (err, info) {
                                if (err)
                                    console.log("Error is", err)
                                else
                                    console.log("console log", info);

                                res.json({
                                    info: info
                                })
                            });

                            return res.status(403).send({
                                reason: `<h5>Inactive account. An activation link has been sent to email account: <strong>${req.body.email}</strong></h5>`
                            });
                        } else { //If account state is active, allow authentication to continue
                            var passwordIsValid = bcrypt.compareSync(req.body.password, customer.password);
                            if (!passwordIsValid) { //If password is invalid send error message
                                return res.status(401).send({
                                    auth: false,
                                    accessToken: null,
                                    reason: 'Invalid Password'
                                });
                            } //else generate a token
                            var token = jwt.sign(customer.dataValues, process.env.SECRET_KEY, {
                                expiresIn: 7200
                            });
                            res.send({
                                token: token
                            })
                        }
                    })
                    .catch(err => {
                        res.status(500).send('error: ' + err)
                    });
            }



            const accountActivationCustomer = (req, res) => {
                let _id_customer = req.params.custID

                Customer.findOne({
                        where: {
                            id_customer: _id_customer
                        }
                    })
                    .then(async (customer) => {

                        await Customer.update({
                                acc_state: 1
                            }, {
                                where: {
                                    id_customer: _id_customer
                                }
                            })
                            .then(data => {
                                console.log("update state", data)
                                res.status(200).send({
                                    message: `${customer.dataValues.email}`
                                })
                            }).catch(err => {
                                res.send('error: ' + err)
                            })

                    })
            }


            module.exports = {
                addNewCustomer,
                loginCustomer,
                accountActivationCustomer,
                addNewUser,
                loginUser
            }