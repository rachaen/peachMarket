const { v4 } = require('uuid');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const cookie = require('cookie-parser');

const authRepository = require('./authRepository.js');
const config = require('../../config/config.js');
// const redisClient = require("../../config/redis.js");

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
      res.status(409).json({ result: false });
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
      res.status(409).json({ result: false });
    }
    res.status(200).json({ result: true });
  },

  /**
   * 닉네임 중복 체크
   */
  nickNameDuplicateCheck: async (req, res) => {
    const findByNickName = await authRepository.findByNickName(req.query.nickName);
    if (findByNickName) {
      return res.status(409).json({ result: false });
    }
    return res.status(200).json({ result: true });
  },

  /**
   * 이메일 중복 체크
   */
  emailDuplicateCheck: async (req, res) => {
    const findByEmail = await authRepository.findByEmail(req.query.email);
    if (findByEmail) {
      return res.status(409).json({ result: false });
    }
    return res.status(200).json({ result: true });
  },

  /**
   * 휴대폰 번호 중복 체크
   */
  phoneNumberDuplicateCheck: async (req, res) => {
    const findByPhoneNumber = await authRepository.findPhoneNumber(req.query.phoneNumber);
    if (findByPhoneNumber) {
      return res.status(409).json({ result: false });
    }
    return res.status(200).json({ result: true });
  },

  me: async (req, res) => {
    const userId = req.userId;
    const findUser = await authRepository.findById(userId);
    if (!findUser) {
      return res.status(401).json({ data: '로그인된 유저가 아닙니다' });
    }
    return res.status(200).json({ userInfo: findUser });
  },

  logout: async (req, res) => {},

  /**
   * 로그인
   */
  login: async (req, res) => {
    const refreshTokenId = v4();
    const { email, password } = req.body;
    const findUser = await authRepository.findByEmail(req.body.email);
    if (!findUser) {
      return res.status(401).json({ result: false });
    }
    const passwordCompareResult = await bcrypt.compare(password, findUser.password);
    if (!passwordCompareResult) {
      return res.status(401).json({ message: '아이디 또는 비밀번호를 확인하세요' });
    }

    const token = createJwtToken(findUser.userId);
    const refreshToken = createRefreshToken();
    /*     if (!redisClient.isOpen)
      redisClient.connect().then((result) => {
        redisClient.set(refreshTokenId, refreshToken);
      }); */
    setToken(res, token);
    res.status(200).json({ token: token, refreshTokenId: refreshToken });
  },
};

function setToken(res, token) {
  const options = {
    maxAge: config.jwt.expiresInSec * 1000,
    httpOnly: true,
  };

  res.cookie('token', token);
}

function createJwtToken(userId) {
  return jwt.sign({ userId }, config.jwt.secretKey, { expiresIn: config.jwt.expiresInSec });
}

function createRefreshToken() {
  return jwt.sign({}, config.jwt.secretKey, { expiresIn: config.jwt.expiresInSec });
}

module.exports = authService;
