const {Database} = require('../database/index');

const nameColletion = 'products';

const getAll = async()=>{

    let collection = await Database(nameColletion);
    let documentAll = await collection.find({}).toArray();

    return documentAll;
}

const getById = async (id)=>{

    let collection = await Database(nameColletion);
    let documentId = await collection.findOne({_id:id});
    return documentId;
}

const create = async (body)=>{
    let collection = await Database(nameColletion);
    let response = await collection.insertOne(body);
    response.insertedId = response.insertedId.toString();
    return response;
}

module.exports.ProductServices = {
    getAll,
    getById,
    create
}