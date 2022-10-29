const express = require('express');
const {config} = require('../config/index');
const {ProductAPI} = require('./src/products/index');
const {OrderAPI} = require('./src/orders/index');
const {IndexAPI,NotFoudAPI} = require('./src/index/index')
const cors = require('cors');


const app = express();

app.use(cors({origi:['http://127.0.0.1:5500/frontend/products/index.html']}));
app.use(express.json());


IndexAPI(app);
ProductAPI(app);
OrderAPI(app);
NotFoudAPI(app);

app.listen(config.port,()=>{
    console.log(`Servidor en el puerto ${config.port}`);
});
