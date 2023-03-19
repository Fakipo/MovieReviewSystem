//import { dbUrl } from "../library/constants";
const { dbUrl } = require('../library/constants.js');

const dbConfig = {
    uri: dbUrl,
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    //   useCreateIndex: true,
    //   useFindAndModify: false,
    }
};

module.exports = {
    dbConfig
};