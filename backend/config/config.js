<<<<<<< HEAD
const dotenv = require("dotenv");
=======
const dotenv = require('dotenv');
>>>>>>> origin/main

dotenv.config();

function required(key, defaultValue = undefined) {
  const value = process.env[key] || defaultValue;
  if (value == null) {
    throw new Error(`Key ${key} is undefined`);
  }
  return value;
}

const config = {
  db: {
<<<<<<< HEAD
    host: required("DB_HOST"),
    user: required("DB_USER"),
    database: required("DB_DATABASE"),
    password: required("DB_PASSWORD"),
=======
    host: required('DB_HOST'),
    user: required('DB_USER'),
    database: required('DB_DATABASE'),
    password: required('DB_PASSWORD'),
>>>>>>> origin/main
  },
  bcrypt: {
    saltRounds: 12,
  },
  sens: {
<<<<<<< HEAD
    accessKey: required("SENS_ACCESS"),
    secretKey: required("SENS_SECRET"),
    serviceId: required("SENS_ID"),
    callNumber: required("SENS_NUMBER"),
=======
    accessKey: required('SENS_ACCESS'),
    secretKey: required('SENS_SECRET'),
    serviceId: required('SENS_ID'),
    callNumber: required('SENS_NUMBER'),
>>>>>>> origin/main
  },
};

module.exports = config;
