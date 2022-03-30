const { v4 } = require("uuid");
const bcrypt = require("bcrypt");

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
    res.status(200).json({ message: true });
  },
};

module.exports = authService;
