const { v4 } = require("uuid");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookie = require("cookie-parser");

const authRepository = require("./authRepository");
const config = require("../../config/config.js");

const authService = {
  /**
   * 회원가입
   */
  signup: async (req, res) => {
    const userId = v4();
    const { userName, nickName, email, password, phoneNumber, address, birthday, latitude, longitude } = req.body;

    const findNickName = await authRepository.findByNickName(nickName);
    const findByEmail = await authRepository.findByEmail(email);
    const findPhoneNumber = await authRepository.findPhoneNumber(phoneNumber);
    if (findByEmail && findNickName && findPhoneNumber) {
      res.status(409).json({ message: "회원 가입에 실패했습니다. 중복체크를 다시 확인해주세요" });
    }
    const hashed = await bcrypt.hash(password, config.bcrypt.saltRounds);
    const signupResult = await authRepository.signup({
      userId,
      userName,
      nickName,
      email,
      password: hashed,
      phoneNumber,
      address,
      birthday,
      latitude,
      longitude,
    });
    if (!signupResult) {
      res.status(401).json({ result: false });
    }
    res.status(200).json({ result: true });
  },

  /**
   * 닉네임 중복 체크
   */
  nickNameDuplicateCheck: async (req, res) => {
    const findByNickName = await authRepository.findByNickName(req.query.nickName);
    if (findByNickName) {
      res.status(200).json({ result: false });
    }
    res.status(200).json({ result: true });
  },

  /**
   * 이메일 중복 체크
   */
  emailDuplicateCheck: async (req, res) => {
    const findByEmail = await authRepository.findByEmail(req.query.email);
    if (findByEmail) {
      res.status(200).json({ result: false });
    }
    res.status(200).json({ result: true });
  },

  /**
   * 휴대폰 번호 중복 체크
   */
  phoneNumberDuplicateCheck: async (req, res) => {
    const findByPhoneNumber = await authRepository.findPhoneNumber(req.query.phoneNumber);
    if (findByPhoneNumber) {
      res.status(200).json({ result: false });
    }
    res.status(200).json({ result: true });
  },

  /**
   * 로그인
   */
  login: async (req, res) => {
    const { email, password } = req.body;
    const findUser = await authRepository.findByEmail(req.body.email);
    if (!findUser) {
      return res.status(401).json({ result: false });
    }
    const passwordCompareResult = await bcrypt.compare(password, findUser.password);
    if (!passwordCompareResult) {
      return res.status(401).json({ message: "아이디 또는 비밀번호를 확인하세요" });
    }

    const token = createJwtToken(findUser.userId);
    setToken(res, token);
    res.status(200).json({ token });
  },

  me: async (req, res) => {
    const findUser = await authRepository.fin;
  },

  logout: async (req, res) => {},
};

function setToken(res, token) {
  const options = {
    maxAge: config.jwt.expiresInSec * 1000,
    httpOnly: true,
  };

  res.cookie("token", token);
}

function createJwtToken(userId) {
  return jwt.sign({ userId }, config.jwt.secretKey, { expiresIn: config.jwt.expiresInSec });
}

module.exports = authService;
