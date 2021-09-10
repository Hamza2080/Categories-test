let mongoose = require('mongoose');
require('dotenv').config()

const server = process.env.dbAddress || 'localhost:27017';
const database = process.env.dbName || 'CategoriesDB';

class Database {
  constructor() {
    this._connect()
  }

_connect() {
     mongoose.connect(`mongodb://${server}/${database}` ,{ useNewUrlParser : true , useUnifiedTopology : true })
       .then(() => {
         console.log(`Successfully connected to DB ${database}`);
       })
       .catch(err => {
           console.log(err)
         console.error('Error connecting to database');
       })
  }
}

module.exports = new Database()