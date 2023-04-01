const app = require('../index');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { userModel } = require('./mongooseModels');
const jwt = require("jsonwebtoken");

// const {  userModel } = require('./signUp');

// const userSchema = new mongooseConn.Schema({
//     firstName: String,
//     lastName: String,
//     email: String,
//     password: String,
//     dateOfBirth: Date,
//   });

// const userModel = mongooseConn.model('user', userSchema, "user"); 

router.post('/login', async (req,res) =>  {
    console.log('we are here');
    const JWT_SECRET = 'mySecretMonkeyKey';
    const { email, password } = req.body;
    console.log('email ', email);
    console.log('password ', password);
    try {
        // Find user by email
        const user = await userModel.findOne({ email });
        if (!user) {
            // res.send({
            //     success: false,
            //     message : "This email does not exist"})
            //   return;
            return res.status(401).json({ message: 'Email is not registered, please register email' });
        }
        console.log(user);
        if (!password || !user.password) {
            // res.send({
            //     success: false,
            //     message : "Incorrect Password"})
            //   return;
            return res.status(401).json({ message: 'Wrong Password' });
          }
        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            // res.send({
            //     success: false,
            //     message : "Invalid Username or Password"})
            //   return;
          return res.status(401).json({ message: 'Invalid email or password' });
        }
    
        // Create and send JWT token
        const message = 'Succesfully logged in';
        const token = jwt.sign({ userId: user._id.toString() }, JWT_SECRET);
        res.json({ token, message });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
      }

    });

module.exports = router