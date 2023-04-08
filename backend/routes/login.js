const app = require('../index');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { userModel } = require('../models/mongooseModels');
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require('../models/auth');
const { tokenModel } = require('../models/mongooseModels');

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
        const token = jwt.sign({ userId: user._id.toString() }, JWT_SECRET.toString(), {expiresIn: '30m'});
        res.json({ token, message });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
      }

    });

router.post('/logout' , (req,res) => {
  console.log('we are here in logout');
  const token = req.headers.authorization?.split(" ")[1];
  console.log(token);
  console.log('secret = ' + JWT_SECRET);
  const removedToken = new tokenModel({
      'token': token
    });
  removedToken.save().then(savedDoc => {
    console.log('Document saved:', savedDoc);

    if(req.session){
    req.session.destroy(() => {
      // Prevent caching of this page
      res.setHeader("Cache-Control", "no-cache, must-revalidate");
      res.setHeader("Expires", "Sat, 26 Jul 1997 05:00:00 GMT"); // Date in the past
      res.sendStatus(200); 
    
    })};
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