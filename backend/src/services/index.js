const {Database} = require('../database/index');
const {ObjectId} = require('mongodb');


const getAll = async(nameColletion)=>{

    let collection = await Database(nameColletion);
    let documentAll = await collection.find({}).toArray();

    return documentAll;
}

const getById = async (nameColletion,id)=>{

    let collection = await Database(nameColletion);
    let documentId = await collection.findOne({_id:ObjectId(id)});

    return documentId;
}

const create = async (nameColletion,body)=>{
    let collection = await Database(nameColletion);
    let response = await collection.insertOne(body);
    response.insertedId = response.insertedId.toString();
    return response;
}


