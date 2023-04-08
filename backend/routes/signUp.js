const mongooseConn = require('../library/dbConnection.js');
const app = require('../index');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { userModel } = require('../models/mongooseModels');

console.log(app);


// const checkSignup = (req) => {
//     console.log('email = ' , req['email']);
//     userModel.findOne({
//       email: req['email']
//     }).then(user => {
//       if(!user){
//         return false;
//       }
//       console.log('User already exists');
//       return true;
//     }).catch(error => {
//       console.error(error);
//     });
// }

const checkSignup = async (req) => {
  try{
    const user = await userModel.findOne({email: req['email']});
    if(!user){
      console.log('User does not exist');
      return false;
    }
    console.log('User already exists in the system');
    return true;
  }
  catch (error) {
    console.error(error);
    return false;
  }
}

router.post('/signup', async (req,res) =>  {
    console.log('we are here 1')

    const retrievedData = req.body;

    let checkingSignupValue = await (checkSignup(retrievedData));

    console.log('checking signup value  =' , checkingSignupValue);
    if(checkingSignupValue){
        res.send({
          success: false,
          message : "This email is already registered with us, please login or sign up with a different email"})
        return;
      }
    const hashedPassword = await bcrypt.hash(retrievedData['password'], 10);
    const userDoc = new userModel({
        firstName: retrievedData['firstName'],
        lastName: retrievedData['lastName'],
        email: retrievedData['email'],
        password: hashedPassword,
        dateOfBirth: retrievedData['dateOfBirth']
    });
    userDoc.save()
    .then(savedDoc => {
      console.log('Document saved:', savedDoc);
    })
    .catch(err => {
      console.error('Error saving document:', err);
    });
    res.send({
        success : true,
        message: "user successfully registered"
    })
});

module.exports = router;