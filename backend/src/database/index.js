const {MongoClient} = require('mongodb');
const {config} = require('../../../config/index');

var conection = null;
module.exports.Database = (collection)=> new Promise(async (resolve, reject) => {
    try {
        if (!conection) {
            let client = new MongoClient(config.dbURI);
            conection =await client.connect()
            console.log('Nueva conexion realizada con Mongo DB')
        }

        let db = await conection.db(config.dbName);
        resolve(await db.collection(collection)); 
        
    } catch (error) {
        reject(error);
    }
});
