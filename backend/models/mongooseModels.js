const mongooseConn = require('../library/dbConnection.js');


const userSchema = new mongooseConn.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    dateOfBirth: Date,
  });

const userModel = mongooseConn.model('user', userSchema, "user"); // First parameter defines the name of the collection, second defines the schema and third one defines the name we want to insert to in our schema

const token = new mongooseConn.Schema({
   token: String,
});

const tokenModel = mongooseConn.model('blacklistedTokens', token, "blacklistedTokens");

module.exports = {
    userModel,
    tokenModel
};