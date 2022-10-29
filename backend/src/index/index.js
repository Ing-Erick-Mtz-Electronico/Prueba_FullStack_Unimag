const express = require('express');
const {Response} = require('../common/index');
const createError = require('http-errors');

module.exports.IndexAPI = (app)=>{
    const router = express.Router();
    
    router.get('/',(req,res)=>{
        
        const menu = {
            products: `http://${req.headers.host}/products`,
            orders: `http://${req.headers.host}/orders`
        }
        Response.success(res,200,'Index',menu);
    }).post('/',(req,res)=>{
        let {body} = req;
        console.log('backend',body);
        Response.success(res,200,'Index',{ok:true});
    })

    app.use('/',router);
}

module.exports.NotFoudAPI = (app)=>{
    const router = express.Router();

    router.all('*',(req,res)=>{
        Response.error(res,new createError.NotFound());
    });

    app.use('/',router)
}
