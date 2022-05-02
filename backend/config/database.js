const config = require("./config.js");
const mysql = require("mysql2");

const pool = mysql.createPool({
  host: config.db.host,
  user: config.db.user,
  database: config.db.database,
  password: config.db.password,
  dateStrings: "date",
});
const db = pool.promise();

module.exports = db;
