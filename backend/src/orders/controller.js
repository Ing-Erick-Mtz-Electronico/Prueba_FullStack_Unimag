const {OrderServices} = require('./services');
const {Response} = require('../common/index');
const createError = require('http-errors');

const getOrders = async (req,res)=>{
    try {
        let orders = await OrderServices.getAll();
        Response.success(res,200,'lista de ordenes',orders);

    } catch (error) {
        Response.error(res);
    }
}

const getOrder = async (req,res)=>{
    try {

        let {params:{id}} = req;
        let order = await OrderServices.getById(id);
        if (!order) {
            Response.error(res,new createError.NotFound());
        } else {
            Response.success(res,200,`orden ${id}`,order);
        }

    } catch (error) {
        Response.error(res);
    }
}

const createOrder =async (req,res)=>{
    try {
        let {body} = req;

        if ( Object.keys(body).length === 0 ) {
            Response.error(res,new createError.BadRequest());

        } else {
            let response = await OrderServices.create(body);
            Response.success(res,201,'orden Agregada',response);
        }
    } catch (error) {
        Response.error(res);
    }
}

module.exports.OrderControlller = {
    getOrders,
    getOrder,
    createOrder
}
