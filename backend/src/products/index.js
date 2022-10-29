const express = require('express');
const {ProductControlller} = require('./controller');

const router = express.Router();

module.exports.ProductAPI = (app)=>{
    router
        .get('/',ProductControlller.getProducts)
        .get('/:id',ProductControlller.getProduct)
        .post('/',ProductControlller.createProduct);

    app.use('/products',router);
}