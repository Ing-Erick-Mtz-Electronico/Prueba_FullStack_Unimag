const express = require('express');
const {ProductControlller} = require('./controller');

const router = express.Router();

module.exports.ProductAPI = (app)=>{
    router
        .get('/products',ProductControlller.getProducts)
        .get('/products/:id',ProductControlller.getProduct)
        .post('products',ProductControlller.createProduct);

    app.use(router);
}