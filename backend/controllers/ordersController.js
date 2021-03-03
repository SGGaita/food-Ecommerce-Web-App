const express = require('express');
const router = express.Router();
const {
    database
} = require('../db/db_mysqli');
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
        .catch(err => console.log(err));
}

// Get single order
const getOrderById = async (req, res) => {
    let orderId = req.params.id;
    console.log("Order ID in controller", orderId);

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
            'o.id_order': orderId
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
    console.log("Customer ID in controller", customerID);

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
    // let userId = req.body.userId;
    //let data = JSON.parse(req.body);

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
            }).then((newOrderId) => {
                console.log("new order id", newOrderId)

                if (newOrderId > 0) {
                    products.forEach(async (p) => {
                        console.log('products', p)
                        let data = await database.table('product').filter({
                            id_product: p.id
                        }).withFields(['quantity']).get().catch(err => console.log(err));

                        console.log("Data", data)



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
                            }).then(newId => {
                                database.table('product')
                                    .filter({
                                        id_product: p.id_product
                                    })
                                    .update({
                                        quantity: data.quantity
                                    }).then(successNum => {}).catch(err => console.log(err));
                            }).catch(err => console.log(err));
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

const cancelOrder = async (req, res) => {
    console.log("Cancel body", req.body)
    database.table('order_details')
        .filter({
            id_order_fk: req.body.id_order
        })
        .update({
            order_state: req.body.order_state,
            cancelledAt: currenttime,
            cancelledBy: req.body.cancelledBy,
            
        })
        .then(successNum => {
            console.log(successNum)
        }).catch(err => console.log(err))
}


module.exports = {
    getAllOrders,
    getAllDistinctOrders,
    getOrderById,
    getLatestOrders,
    addNewOrder,
    cancelOrder
}