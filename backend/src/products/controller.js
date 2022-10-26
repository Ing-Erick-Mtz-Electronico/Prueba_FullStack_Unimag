const {ProductServices} = require('./services');
const {Response} = require('../common/index');
const createError = require('http-errors');

const getProducts = async (req,res)=>{
    try {
        let products = await ProductServices.getAll();
        Response.success(res,200,'lista de productos',products);

    } catch (error) {
        Response.error(res);
    }
}

const getProduct = async (req,res)=>{
    try {

        let {params:{id}} = req;
        let product = await ProductServices.getById(id);
        if (!product) {
            Response.error(res,new createError.NotFound());
        } else {
            Response.success(res,200,`producto ${id}`,product);
        }

    } catch (error) {
        Response.error(res);
    }
}

const createProduct =async (req,res)=>{
    try {
        let {body} = req;

        if ( Object.keys(body).length === 0 ) {
            Response.error(res,new createError.BadRequest());

        } else {
            let response = await ProductServices.create(body);
            Response.success(res,201,'Producto Agregado',response);
        }
    } catch (error) {
        Response.error(res);
    }
}

module.exports.ProductControlller = {
    getProducts,
    getProduct,
    createProduct
}
