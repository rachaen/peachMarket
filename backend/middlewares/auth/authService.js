const authRepository = require("./authRepository");
const { v4 } = require("uuid");

const authService = {
  signup: async (req, res) => {
    const userId = v4();
    console.log(userId);
    const { user } = req.body;
  },
};

module.exports = authService;
