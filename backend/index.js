const express = require('express');
const {config} = require('../config/index');
const {Response} = require('./src/common/index');
const {ProductAPI} = require('./src/products/index');
const {OrderAPI} = require('./src/orders/index');

const app = express();

app.use(express.json());

app.get('/',(req,res)=>{
    let menu = {
        producs:'api'
    }
    Response.success(res,200,'lista de productos',menu);
})
OrderAPI(app);
ProductAPI(app);


app.listen(()=>{
    console.log(`Servisor en el puerto ${config.port}`)
},config.port)
