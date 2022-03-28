const db = require('../../config/database.js');

const authRepository = {
    signup : async(req) => {
        console.log(req);
        console.log(db);
    }
}


module.exports = authRepository;