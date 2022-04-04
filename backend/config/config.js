const dotenv = require('dotenv');

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
    host: required('DB_HOST'),
    user: required('DB_USER'),
    database: required('DB_DATABASE'),
    password: required('DB_PASSWORD'),
  },
  bcrypt: {
    saltRounds: 12,
  },
  sens: {
    accessKey: required('SENS_ACCESS'),
    secretKey: required('SENS_SECRET'),
    serviceId: required('SENS_ID'),
    callNumber: required('SENS_NUMBER'),
  },
};

module.exports = config;
