const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../models/auth');
const { isTokenBlacklisted } = require('../models/auth');

router.post('/tvshows', async (req,res) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    console.log('we are here in tvshows' + token);
    if (token == null) {
        return res.sendStatus(401); // Unauthorized
      }
    if(await !isTokenBlacklisted(token)){
      console.log('blacklist error');
        return res.sendStatus(401); // Unauthorized
    }
    console.log('we are here now before jwt verify');
    jwt.verify(token, JWT_SECRET.toString(), (err, user) => {
      if (err) {
        console.log(err);
        console.log('we are here in jwt verify');
        return res.sendStatus(403); // Forbidden
      }
      console.log(req.user);
      req.user = user;
      res.json = {
        'message': 'beerus',
      }
      res.sendStatus(200);
    });
})

module.exports = router;