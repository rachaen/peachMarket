const express = require("express");
const authService = require("../middlewares/auth/authService.js");
const messageAuthentication = require("../middlewares/auth/messageAuthentication.js");
const isAuth = require("../middlewares/auth/auth.js");

const router = express.Router();

/**
 * 회원가입 관련
 */

/**
 * 회원가입 버튼 클릭 시
 */
router.post("/signup", authService.signup);

/**
 * 닉네임 중복 체크
 */
router.get("/nickNameDuplicateCheck", authService.nickNameDuplicateCheck);

/**
 * 이메일 중복 체크
 */
router.get("/emailDuplicateCheck", authService.emailDuplicateCheck);

/**
 * 휴대폰 번호 중복 체크
 */
router.get("/phoneNumberDuplicateCheck", authService.phoneNumberDuplicateCheck);

/**
 * 인증번호 받기
 */
router.post("/getVerificationCode", messageAuthentication.sendVerificationSMS);
/**
 * 인증번호 확인
 */
router.post("/confirmVerificationCode", messageAuthentication.confirmSms);

/**
 * 로그인
 */
router.post("/login", authService.login);

/**
 * 인증체크
 */
router.get("/me", isAuth, authService.me);

/**
 * 로그아웃
 */

module.exports = router;
