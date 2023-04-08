// import { dbConfig } from '../config/dbConfig';
const { dbConfig } = require('../config/dbConfig');
const mongooseConn = require('mongoose');
console.log("we are here + " , dbConfig.uri);
mongooseConn.connect(String(dbConfig.uri), dbConfig.options)
.then(() => {
  console.log('Connected to database');
})
.catch((error) => {
  console.log('Error connecting to database: ', error);
});


mongooseConn.connection.on('error', (err) => {
  console.log('Mongoose default connection error: ' + err);
});

module.exports = mongooseConn;

