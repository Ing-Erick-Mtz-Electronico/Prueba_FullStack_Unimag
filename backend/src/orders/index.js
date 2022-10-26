const express = require('express');
const {OrderControlller} = require('./controller');

const router = express.Router();

module.exports.OrderAPI = (app)=>{
    router
        .get('/orders',OrderControlller.getOrders)
        .get('/orders/:id',OrderControlller.getOrder)
        .post('orders',OrderControlller.createOrder);

    app.use(router);
}