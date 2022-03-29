const authRepository = require("./authRepository");

const authService = {
  signup: async (req, res) => {
    authRepository.signup(1);
  },
};

module.exports = authService;
