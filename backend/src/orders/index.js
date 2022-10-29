const express = require('express');
const {OrderControlller} = require('./controller');

const router = express.Router();

module.exports.OrderAPI = (app)=>{
    router
        .get('/',OrderControlller.getOrders)
        .get('/:id',OrderControlller.getOrder)
        .post('/',OrderControlller.createOrder);

    app.use('/orders',router);
}