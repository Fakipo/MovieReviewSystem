const JWT_SECRET = 'mySecretMonkeyKey';
const { tokenModel } = require('./mongooseModels');
const jwt = require("jsonwebtoken");

const isTokenBlacklisted = async (token) => {
    if (!token) {
        return false;
      }
    
      try {
        // Verify token as usual
        const blacklistedToken = await tokenModel.findOne({'token': token});
        if(blacklistedToken) {
            console.log('its blackListed');
            return false;
        }
        console.log('its not blackListed');
        return true;
      }
      catch(e){
        console.log(e);
        return false;
      }

        
};

module.exports = {
    JWT_SECRET,isTokenBlacklisted
}