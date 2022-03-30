function required(key, defaultValue = undefined) {
  const value = process.env[key] || defaultValue;
  if (value == null) {
    throw new Error(`Key ${key} is undefined`);
  }
  return value;
}

const config = {
  kakao: {
    restapi: required("REACT_APP_RESTAPI"),
    javascript: required("REACT_APP_JAVASCRIPT"),
  },
};

module.exports = config;
