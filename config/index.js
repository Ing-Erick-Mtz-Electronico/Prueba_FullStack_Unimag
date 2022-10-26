require('dotenv').config();


module.exports.config = {
    port: process.env.PORT,
    dbURI: process.env.MONGO_URI,
    dbName: process.env.MONGO_DBNAME
}
