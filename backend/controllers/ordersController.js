const express = require('express');
const router = express.Router();
const {
    database
} = require('../db/db_mysqli');
var nodemailer = require('nodemailer')
var moment = require('moment');
var currenttime = new moment().format('YYYY-MM-DD HH:mm:ss');

//generate random string for reference number
var randomString = function getRandomString(length) {
    var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var result = '';
    for (var i = 0; i < length; i++) {
        result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    return result;
}

//get all orders using query
const getAllDistinctOrders = (req, res) => {
    database.query('SELECT DISTINCT od.id_order_dets, od.id_order_fk,od.order_reference,\
    o.id_customer_fk,o.total,od.id_payment_fk,pm.payment_name,s.supplier_name,c.fname,\
    c.lname,ca.address,ca.city,od.order_state,\
    GROUP_CONCAT( product_name SEPARATOR ",") as product_name \
    FROM order_details as od LEFT JOIN orders as o ON od.id_order_fk = o.id_order \
    LEFT JOIN product as p ON od.id_product_fk = p.id_product \
    LEFT JOIN suppliers as s ON s.id_supplier = p.id_supplier_fk\
    LEFT JOIN customers as c ON c.id_customer = o.id_customer_fk \
    LEFT JOIN customer_addresses as ca ON ca.id_customer_fk = c.id_customer \
    LEFT JOIN payment_modes as pm ON pm.id_payment = od.id_payment_fk GROUP BY od.order_reference\
    ').then(orders => {
        if (orders.length > 0) {
            res.status(200).json({
                count: orders.length,
                orders: orders
            });
        } else {
            res.json({
                message: "No orders found"
            });
        }
    }).catch(err => res.json(err));
}

// Get all orders
const getAllOrders = (req, res) => { // Sending Page Query Parameter is mandatory http://localhost:4200/api/orders?page=1
    database.table('order_details as od')
        .join([{
                table: "orders as o",
                on: `o.id_order = od.id_order_fk`
            },
            {
                table: 'product as p',
                on: `p.id_product = od.id_product_fk`
            },
            {
                table: 'customers as c',
                on: `c.id_customer = o.id_customer_fk`
            }

        ])
        .withFields(['o.id_order',
            'od.order_reference',
            'p.product_name',
            'p.product_description',
            'p.product_price',
            'c.id_customer',
            'c.fname',
            'c.lname',
            'c.email'
        ]).getAll()
        .then(orders => {
            if (orders.length > 0) {
                res.status(200).json({
                    count: orders.length,
                    orders: orders
                });
            } else {
                res.json({
                    message: "No orders found"
                });
            }
        })
        .catch(err => res.json(err));
}

// Get single order
const getOrderById = async (req, res) => {
    let orderId = req.params.id;

    database.table('order_details as od')
        .join([{
                table: "orders as o",
                on: `o.id_order = od.id_order_fk`
            },
            {
                table: 'product as p',
                on: `p.id_product = od.id_product_fk`
            },
            {
                table: 'customers as c',
                on: `c.id_customer = o.id_customer_fk`
            },
            {
                table: 'customer_addresses as ca',
                on: `ca.id_customer_fk = c.id_customer`
            },
            {
                table: 'payment_modes as pm',
                on: `pm.id_payment = od.id_payment_fk`
            }
        ])
        .withFields(['o.id_order',
            'o.total',
            'p.product_name',
            'p.product_description',
            'p.product_price',
            'p.image',
            'od.order_reference',
            'od.quantity as quantityOrdered',
            'od.order_state',
            'c.id_customer',
            'c.fname',
            'c.lname',
            'ca.address',
            'ca.city',
            'ca.region',
            'ca.additional_phone',
            'pm.payment_name'
        ])
        .filter({
            id_order: orderId
        })
        .getAll()
        .then(orders => {
            console.log(orders);
            if (orders.length > 0) {
                res.json(orders);
            } else {
                res.json({
                    message: "No orders found"
                });
            }
        }).catch(err => res.json(err));
}

//get latest order by customer id
const getLatestOrders = async (req, res) => {
    let customerID = req.params.id

    database.table('order_details as od')
        .join([{
                table: "orders as o",
                on: `o.id_order = od.id_order_fk`
            },
            {
                table: 'product as p',
                on: `p.id_product = od.id_product_fk`
            },
            {
                table: 'customers as c',
                on: `c.id_customer = o.id_customer_fk`
            }
        ])
        .withFields(['o.id_order',
            'p.product_name',
            'p.product_description',
            'p.product_price',
            'p.image',
            'od.order_reference',
            'od.quantity as quantityOrdered',
            'od.order_state',
            'od.createdAt as orderTime',
            'od.acceptedAt as acceptedTime'
        ])
        .filter({
            'c.id_customer': customerID
        })
        .getAll()
        .then(orders => {
            console.log(orders);
            if (orders.length > 0) {
                res.json(orders);
            } else {
                res.json({
                    message: "No orders found"
                });
            }
        }).catch(err => res.json(err));
}

// Add new order
const addNewOrder = async (req, res) => {

    newReference = randomString(10)
    console.log("Reference number", newReference)
    let {
        customerId,
        paymentId,
        total,
        products
    } = req.body;
    console.log("customer id", customerId);
    console.log("products", products);
    console.log("Total", total);

    if (customerId !== null && customerId > 0 && !isNaN(customerId)) {
        database.table('orders')
            .insert({
                id_customer_fk: customerId,
                total: total
            }).then(async (newOrderId) => {

                console.log(`why new orderid insert order ${newOrderId}`)

                //get customer details to be attached to the email
                let CustomerData = await database.table('customers as c')
                .join([{
                    table: "customer_addresses as ca",
                    on: `c.id_customer = ca.id_customer_fk`
                }, ])
                .withFields(['c.fname',
                    'c.lname',
                    'c.phone',
                    ' c.email',
                    'ca.address',
                    'ca.city',
                    'ca.region'
                ])
                .filter({
                    id_customer: customerId
                })
                .get().catch(err => console.log(err));
               //End get customer details to be attached to the 

                 console.log(`customer data ${CustomerData}`)
                if (newOrderId > 0) {
                    console.log(`why new orderid after if >0 ${newOrderId}`)
                    products.forEach(async (p) => {
                        console.log('products', p)
                        let data = await database.table('product').filter({
                                id_product: p.id
                            }).withFields(['quantity'])
                            .get().catch(err => console.log(err));

                        let inCart = parseInt(p.incart);

                        // Deduct the number of pieces ordered from the quantity in database
                        if (data.quantity > 0) {
                            data.quantity = data.quantity - inCart;

                            if (data.quantity < 0) {
                                data.quantity = 0;
                            }
                        } else {
                            data.quantity = 0;
                        }
                        // Insert order details w.r.t the newly created order Id
                        let order_state = 0
                        database.table('order_details')
                            .insert({
                                id_order_fk: newOrderId,
                                order_reference: newReference,
                                id_product_fk: p.id,
                                id_payment_fk: paymentId,
                                quantity: inCart,
                                order_state: order_state,
                                createdAt: currenttime
                            }).then(async (newId) => {
                                console.log(`why new id nit show ${newId}`)
                                console.log(`why new orderid after inserting order details ${newOrderId}`)

                                 await database.table('order_details as od')
                                .join([{
                                        table: "orders as o",
                                        on: `o.id_order = od.id_order_fk`
                                    },
                                    {
                                        table: 'product as p',
                                        on: `p.id_product = od.id_product_fk`
                                    },
                                    {
                                        table: 'customers as c',
                                        on: `c.id_customer = o.id_customer_fk`
                                    },
                                    {
                                        table: 'customer_addresses as ca',
                                        on: `ca.id_customer_fk = c.id_customer`
                                    },
                                    {
                                        table: 'payment_modes as pm',
                                        on: `pm.id_payment = od.id_payment_fk`
                                    }
                                ])
                                .withFields(['o.id_order',
                                    'o.total',
                                    'p.product_name',
                                    'p.product_description',
                                    'p.product_price',
                                    'p.image',
                                    'od.order_reference',
                                    'od.quantity as quantityOrdered',
                                    'od.order_state',
                                    'c.id_customer',
                                    'c.fname',
                                    'c.lname',
                                    'ca.address',
                                    'ca.city',
                                    'ca.region',
                                    'ca.additional_phone',
                                    'pm.payment_name'
                                ])
                                .filter({
                                    order_reference: newReference
                                })
                                .get()
                                .then(orders => {
                                    console.log("Orderdata inside", orders)
                                    }
                                ).catch(err => res.json(err));
                        
                                //console.log("Orderdata", OrderData)

                               

                               

                                var transporter = nodemailer.createTransport({
                                    host: "mail.maungano.com",
                                    port: 465,
                                    secure: true, // use TLS
                                    auth: {
                                        user: "order@maungano.com",
                                        pass: "admin2020"
                                    }
                                    })

                                const mailOptions = {
                                    from: 'Maungano Food Express <order@maungano.com>', // sender address
                                    to: CustomerData.email, // list of receivers
                                    subject: `Order confirmation: Reference #${newReference} `, // Subject line
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
                                    
                                            h1 {
                                                font-size: 28px !important;
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
                                    
                                    <body style="background-color: #f4f4f4; margin: 10px !important; padding: 0 !important;">
                                        <!-- HIDDEN PREHEADER TEXT -->
                                        <div
                                            style="display: none; font-size: 1px; color: #fefefe; line-height: 1px; font-family: 'Lato', Helvetica, Arial, sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;">
                                            We're thrilled to have you here! </div>
                                        <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                            <!-- LOGO -->
                                            <tr>
                                                <td bgcolor="#cf0810" align="center">
                                                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                                                        <tr>
                                                            <td align="center" valign="top" style="padding: 10px 10px 10px 10px;">
                                    
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td bgcolor="#cf0810" align="center" style="padding: 0px 10px 0px 10px;">
                                                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                                                        <tr>
                                                            <td bgcolor="#ffffff" align="center" valign="top"
                                                                style="padding: 40px 20px 20px 20px; border-radius: 4px 4px 0px 0px; color: #111111; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 48px; font-weight: 400; letter-spacing: 4px; line-height: 48px;">
                                                                <img src="logo.jpg" alt="">
                                                                <h1
                                                                    style="font-size: 20px !important; font-weight:800; text-transform:uppercase ; margin: 2;">
                                                                    Thanks for your order.</h1>
                                    
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;">
                                                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                                                        <tr>
                                                            <td bgcolor="#ffffff" align="left"
                                                                style="padding: 10px 30px 20px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 25px;">
                                                                <p style="margin: 0; text-align: center">You'll receive an email when your items are
                                                                    shipped. If you have any questions, Call us +243 0000000 </p>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td bgcolor="#ffffff" align="left">
                                                                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                                    <tr>
                                                                        <td bgcolor="#ffffff" align="center" style="padding: 20px 30px 30px 30px;">
                                                                            <table border="0" cellspacing="0" cellpadding="0">
                                                                                <tr>
                                                                                    <td align="center" style="border-radius: 3px;" bgcolor="#cf0810"><a
                                                                                            href="http://localhost:4200/customer/profile" target="_blank"
                                                                                            style="font-size: 15px; font-family: Helvetica, Arial, sans-serif; color: #ffffff; text-decoration: none; color: #ffffff; text-decoration: none; padding: 15px 25px; border-radius: 2px; border: 1px solid #cf0810; display: inline-block;">View
                                                                                            order status</a></td>
                                                                                </tr>
                                                                            </table>
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                        <!-- Order Details -->
                                                        <tr>
                                                            <td bgcolor="#ffffcc" align="left"
                                                                style="padding: 0px 30px 0px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                    
                                                                <table border="0" cellpadding="2" cellspacing="0" width="100%">
                                                                    <tr>
                                                                        <td style="font-size: 15px; text-transform: uppercase; font-weight:600; padding: 10px 0;"
                                                                            width="100%">Summary</td>
                                                                        
                                                                    </tr>
                                    
                                                                    <tr>
                                                                        <td>
                                                                            <table border="0" cellpadding="2" cellspacing="0" width="100%">
                                                                                <tr>
                                                                                    <td style="font-size: 15px; font-size:15px; font-weight:600;">
                                                                                        Name:
                                                                                    </td>
                                                                                    <td style="text-transform:capitalize;font-size: 14px;" >${CustomerData.fname} ${CustomerData.lname}</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td style="font-size: 15px; font-size:15px; font-weight:600;">
                                                                                       Phone:
                                                                                    </td>
                                                                                    <td style="font-size: 14px;">${CustomerData.phone} / ${CustomerData.phone}</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td style="font-size: 15px; font-size:15px; font-weight:600;">
                                                                                        Address:
                                                                                     </td>
                                                                                    <td style="font-size: 14px;">${CustomerData.address} <br> ${CustomerData.city}, ${CustomerData.region}</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td style="padding-top:20px; font-size: 15px; font-size:15px; font-weight:600;">
                                                                                        Order #:
                                                                                    </td>
                                                                                    <td style="font-size: 14px;">
                                                                                        ${newReference}
                                                                                    </td>
                                    
                                                                                </tr>
                                                                                <tr>
                                                                                    <td style="font-size: 15px; font-size:15px; font-weight:600;">
                                                                                        Order Date:
                                                                                    </td>
                                                                                    <td style="font-size: 14px;">
                                                                                        ${currenttime}
                                                                                    </td>
                                                                                </tr>
                                    
                                                                                <tr>
                                                                                    <td style="font-size: 15px; font-size:15px; font-weight:600;">
                                                                                        Order Total:
                                                                                    </td>
                                                                                    <td style="font-size: 14px;">
                                                                                    CDF. ${total}
                                                                                    </td>
                                                                                </tr>
                                                                            </table>
                                                                        </td>
                                    
                                                                       </tr>
                                                                </table>
                                    
                                                               
                                    
                                                            </td>
                                                        </tr>
                                                        <!-- Itemised list -->
                                                        <tr>
                                                            <td bgcolor="#ffffff" align="left"
                                                                style="padding: 20px 30px 0px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                    
                                                                <table border="0" cellpadding="2" cellspacing="0" width="100%">
                                                                    <tr style="font-weight: 600;
                                                                    text-align: left;
                                                                    background: black;
                                                                    color: white;
                                                                    font-size: 14px;">
                                                                        <td width="55%" >Item</td>
                                                                        <td >Quantity</td>
                                                                        <td width="30%" >Price</td>
                                                                    </tr>
                                    
                                                                    <tr style="text-align: left;">
                                                                        <td style="font-size: 14px;">Product name</td>
                                                                        <td style="font-size: 14px;">2</td>
                                                                        <td style="font-size: 14px;"> $1000</td>
                                                                    </tr>
                                    
                                                                </table>
                                    
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td bgcolor="#ffffff" align="left"
                                                                style="padding: 20px 30px 20px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                                                <table width="100%"  style="border-top:#111111 1px solid">
                                                                    <tr>
                                                                        <td width="75%">
                                                                         
                                                                        </td>
                                                                        <td>
                                                                            <table>
                                                                                <tr>
                                                                                   <td style="font-weight: 600; font-size:15px">Subtotal: </td>
                                                                                   <td style="font-size:14px">CDF. ${total}</td>
                                                                                </tr>
                                                                                <tr>
                                                                                  <td style="font-weight: 600; font-size:15px">Total: </td>
                                                                                  <td style="font-size:14px">CDF. ${total}</td>
                                                                               </tr>
                                                                            </table>
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                               
                                                            </td>
                                                        </tr>
                                                        <!--Footer-->
                                                        <tr style="text-align: center;">
                                                            <td 
                                                            style="background-color: #1d1d1d;padding: 20px 30px 20px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                                                <span width="100%">
                                    
                                                                    <span > <a style=" color:white ; margin: auto;"
                                                                            href="http://www.food.maungano.com">www.food.maungano.com</a> </span>
                                                                </span>
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
                                        console.log('no err', err);

                                    else
                                        console.log("console log", info);
                                    console.log("These products", products)
                                });





                                //end send email



                                // database.table('product')
                                //     .filter({
                                //         id_product: p.id_product
                                //     })
                                //     .update({
                                //         quantity: data.quantity
                                //     }).then(successNum => {}).catch(err => res.json(err));
                            }).catch(err => res.json(err));
                    });

                } else {
                    res.json({
                        message: 'New order failed while adding order details',
                        success: false
                    });
                }
                res.json({
                    message: `Order successfully placed with Reference ${newReference}`,
                    success: true,
                    order_id: newOrderId,
                    order_reference: newReference,
                    products: products
                })
            }).catch(err => res.json(err));
    } else {
        res.json({
            message: 'New order failed',
            success: false
        });
    }
}

//Update order state
const UpdateOrderState = (req, res) => {
    database.table('order_details')
        .filter({
            id_order_fk: req.body.id_order
        })
        .update({
            order_state: req.body.order_state,
            updatedAt: currenttime,
            comments: req.body.comment

        })
        .then(successNum => {
            res.status(200).json({
                message: "Order state successfully updated",
                success: true,
                records: successNum
            })
        }).catch(err => {
            res.status(200).json({
                message: "Order state successfully updated",
                success: true,
                errorMsg: err
            })
        })
}

//Cancel orders
const cancelOrder = (req, res) => {
    database.table('order_details')
        .filter({
            id_order_fk: req.body.id_order
        })
        .update({
            order_state: req.body.order_state,
            updatedAt: currenttime,
            cancelledBy: req.body.cancelledBy,
        })
        .then(successNum => {
            res.status(200).json({
                message: "Order successfully cancelled",
                success: true,
                records: successNum
            })
        }).catch(err => console.log(err))
}

//get order states
const getAllOrderStates = (req, res) => {
    database.table('order_state')
        .withFields([
                'id_order_state',
                'state_name',
                'state_rep'
            ]

        )
        .getAll()
        .then(orders => {
            console.log(orders)
        })
}


module.exports = {
    getAllOrders,
    getAllDistinctOrders,
    getOrderById,
    getLatestOrders,
    addNewOrder,
    UpdateOrderState,
    cancelOrder,
    getAllOrderStates
}