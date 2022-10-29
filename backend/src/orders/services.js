const {Database} = require('../database/index');
const {ObjectId} = require('mongodb');

const nameColletion = 'ordes';

const getAll = async()=>{

    let collection = await Database(nameColletion);
    let documentAll = await collection.find({}).toArray();

    return documentAll;
}

const getById = async (id)=>{

    let collection = await Database(nameColletion);
    let documentId = await collection.findOne({_id:ObjectId(id)});
    return documentId;
}

const create = async (body)=>{
    let collection = await Database(nameColletion);
    let response = await collection.insertOne(body);
    
    return response;
}

module.exports.OrderServices = {
    getAll,
    getById,
    create
}