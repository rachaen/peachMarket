<<<<<<< HEAD
const config = require("./config.js");
const mysql = require("mysql2");
=======
const config = require('../../backend/config/config.js');
const mysql = require('mysql2');
>>>>>>> origin/main

const pool = mysql.createPool({
  host: config.db.host,
  user: config.db.user,
  database: config.db.database,
  password: config.db.password,
});
const db = pool.promise();

module.exports = db;
