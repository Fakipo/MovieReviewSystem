const app = require('../index');
const express = require('express');
const router = express.Router();

console.log(app);

router.post('/signup', (req,res) => {
    const retrievedData = JSON.stringify(req.body);
    console.log('retrieved data = ' + retrievedData);
    res.send({
        status : "working fine"
    })
});

module.exports = router;