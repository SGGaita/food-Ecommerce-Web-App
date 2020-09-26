const express = require('express');
const router = express.Router();
const {
    database
} = require('../db/db_mysqli');

/*-----------Table of Contents---------------
1. Get all Orders
2. Get Single Order by ID
3. Get orders from specific supplier
4. 
5. Payment modes
*/

/* GET ALL ORDERS */
router.get('/orders', function (req, res) { // Sending Page Query Parameter is mandatory http://localhost:4200/api/orders?page=1
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
});

// Get Single Order
router.get('/order/:id', async (req, res) => {
    let orderId = req.params.id;
    console.log(orderId);

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
            'od.quantity as quantityOrdered',
            'od.order_state',
            'c.id_customer',
            'c.fname',
            'c.lname'
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
});

// Place New Order
router.post('/new', async (req, res) => {
    // let userId = req.body.userId;
    // let data = JSON.parse(req.body);
    let {
        customerId,
        products
    } = req.body;
    console.log(customerId);
    console.log(products);

    if (customerId !== null && customerId > 0 && !isNaN(customerId)) {
        database.table('orders')
            .insert({
                id_customer_fk: customerId
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
                                id_product_fk: p.id,
                                quantity: inCart,
                                order_state: order_state
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
                    message: `Order successfully placed with order id ${newOrderId}`,
                    success: true,
                    id_order: newOrderId,
                    products: products
                })
            }).catch(err => res.json(err));
    } else {
        res.json({
            message: 'New order failed',
            success: false
        });
    }

});

// Payment Gateway
router.post('/payment', (req, res) => {
    setTimeout(() => {
        res.status(200).json({
            success: true
        });
    }, 3000)
});


/****************************************/
/*       Payment Modes Crud             */
/****************************************/ 
// Get all payments

router.get('/payment-modes', (req,res) =>{
    database.table('payment_modes')
       .getAll()
        .then(modes => {
            if (modes.length > 0) {
                res.status(200).json({
                    count: modes.length,
                    modes: modes
                });
            } else {
                res.json({
                    message: "No payment modes found"
                });
            }
        })
        .catch(err => console.log(err));

})



module.exports = router;