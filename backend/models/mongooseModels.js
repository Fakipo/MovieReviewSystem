const mongooseConn = require('../library/dbConnection.js');


const userSchema = new mongooseConn.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    dateOfBirth: Date,
  });

const userModel = mongooseConn.model('user', userSchema, "user"); 


module.exports = {
    userModel,
};