    const mongooseConn = require('./library/dbConnection.js');
    const express = require('express');
    const app = express();
    const PORT = 3001;
    const cors = require('cors');

    const corsOptions ={
      origin:'*', 
      credentials:true,            //access-control-allow-credentials:true
      optionSuccessStatus:200,
   }
    const userSchema = new mongooseConn.Schema({
        name: String,
        age: Number
      });

      const userModel = mongooseConn.model('user', userSchema, "user"); // The first parameter should be the name of the collection
    
      const myDoc = new userModel({
        name: "Ayush",
        age: 20,
    });

      myDoc.save()
        .then(savedDoc => {
          console.log('Document saved:', savedDoc);
        })
        .catch(err => {
          console.error('Error saving document:', err);
        });

        app.post('/api/formdata', (req, res) => {
          console.log('req body = ' + req.body); // form data is stored in req.body
          res.send({
            dataReceived : "true"
          });
        });

        app.use(cors(corsOptions));
        app.listen(PORT, function(err){
          if (err) console.log("Error in server setup")
          console.log("Server listening on Port", PORT);
      })




