const express = require('express');
const router = express.Router();
const axios = require('axios')
const {
    database
} = require('../db/db_mysqli');
require('dotenv').config()

const datetime = require('node-datetime')
const passkey = process.env.PASSKEY
const shortcode = process.env.SHORTCODE
const consumerKey = process.env.CONSUMERKEY
const consumerSecret = process.env.CONSUMERSECRET

const dt = datetime.create();
const formattedDate = dt.format('YmdHMS')

//Get timestamp
const timeStamp = () => {
    const dt = datetime.create();
    const formattedDate = dt.format('YmdHMS')

    return formattedDate
}

//Generate new Mpesa password
const newPassword = () => {


    const passString = shortcode + passkey + timeStamp()
    const base64EncodedPassword = Buffer.from(passString).toString('base64')

    return base64EncodedPassword
}

//Generate Mpesa password
const mpesaPassword = (req, res) => {
    res.send(newPassword())
}

//Generate Mpesa token
const mpesaToken = (req, res, next) => {

    const url = "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials"
    const auth = 'Basic ' + Buffer.from(consumerKey + ":" + consumerSecret).toString("base64");
    const headers = {
        Authorization: auth,
    };

    axios.get(url, {
            headers: headers,
        })
        .then((response) => {
            let data = response.data
            let access_token = data.access_token
            req.token = access_token;
            next();
        })
        .catch((error) => console.log(error));
}

const mpesaSTKPush = (req, res) => {
    const token = req.token
   // res.send(token)
    const headers = {
        Authorization: 'Bearer ' + token
    };

    const stkURL = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest"

    let data = {
        "BusinessShortCode": '174379',
        "Password": newPassword(),
        "Timestamp": timeStamp(),
        "TransactionType": "CustomerPayBillOnline",
        "Amount": '2',
        "PartyA": '254723272915',
        "PartyB": '174379',
        "PhoneNumber": '254723272915',
        "CallBackURL": "https://maungano.com",
        "AccountReference": "Mosaic Designs",
        "TransactionDesc": 'Lipa Na M-Pesa'
    }

    axios.post(stkURL, data, {
            headers: headers
        })
        .then((response) => {
            return res.send(response.data)
        })
        .catch((error) => console.log(error));

}

//Get all payment modes
const getAllPaymentModes = (req, res) => {
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

}

//fake payment
const paymentGetway = (req, res) => {
    setTimeout(() => {
        res.status(200).json({
            success: true
        })
    }, 3000)
}

module.exports = {
    getAllPaymentModes,
    mpesaPassword,
    mpesaToken,
    mpesaSTKPush,
    paymentGetway
}