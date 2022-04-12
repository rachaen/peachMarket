const { createClient } = require("redis");
const config = require("./config.js");

const redisClient = createClient(config.redis.port);

module.exports = redisClient;
