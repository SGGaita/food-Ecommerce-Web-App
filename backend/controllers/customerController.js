const express = require('express');
const router = express.Router();
const {
    database
} = require('../db/db_mysqli');

//Get all customers
const getAllCustomers = (req, res) => {
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
            'c.dob',
            'c.acc_state',
            'ca.additional_phone as secondaryPhone',
            'ca.address',
            'ca.city',
            'ca.region',
            'ca.additional_info'

        ])
        .getAll()
        .then(cust => {
            console.log(cust);
            if (cust.length > 0) {
                res.status(200).json({
                    count: cust.length,
                    customers: cust
                });
            } else {
                res.json({
                    message: "No customers to display "
                });
            }
        }).catch(err => res.json(err));
}
//Get customer by Id
const getCustomerById = (req, res) => {
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
            'c.dob',
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
}


const updateCustomer = (req, res) => {
    console.log(req.body)


    database.table('customers')
        .filter({
            id_customer: req.body.id_customer
        })
        .update({
            fname: req.body.fname,
            lname: req.body.lname,
            email: req.body.email,
            phone: req.body.primaryPhone,
            dob: req.body.dob
        }).then(async (successNum) => {

            await database.table('customer_addresses').
            filter({
                    id_customer_fk: req.body.id_customer
                })
                .update({
                    address: req.body.address,
                    city: req.body.city,
                    region: req.body.region,
                    additional_phone: req.body.secondaryPhone,
                    additional_info: req.body.additional_info
                }).then(successNum => {
                    res.status(200).json(successNum)
                })
        }).catch(err => console.log(err));

}


module.exports = {
    getAllCustomers,
    getCustomerById,
    updateCustomer
};