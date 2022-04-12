const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const redisClient = require("../../config/redis.js");
const config = require("../../config/config.js");
const { verify } = require("crypto");
const jwtUtil = {
  signIn: (user) => {
    const payload = {
      id: user.userId,
    };

    return jwt.sign(payload, config.jwt.secretKey, { expiresIn: config.jwt.expiresInSec });
  },

  verify: (token) => {
    let decoded = null;
    try {
      decoded = jwt.verify(token, config.jwt.secretKey);
      return {
        ok: true,
        id: decoded.id,
      };
    } catch (err) {
      return {
        ok: false,
      };
    }
  },

  refresh: () => {
    return jwt.sign({}, config.jwt.secretKey, { expiresIn: config.jwt.expiresInSec });
  },

  refreshVerify: async (token, userId) => {
    const getAsync = promisify(redisClient.get).bind(redisClient);

    try {
      const data = await getAsync(userId); // refrest token 가져오기
      if (token === data) {
        try {
          jwt.verify(token, config.jwt.secretKey);
          return true;
        } catch {
          return false;
        }
      } else {
        return false;
      }
    } catch (err) {
      return false;
    }
  },
};
