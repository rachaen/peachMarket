const express = require("express");
const authService = require("../middlewares/auth/authService.js");

const router = express.Router();

router.post("/signup", authService.signup);
module.exports = router;
