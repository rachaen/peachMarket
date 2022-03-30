const express = require('express');
const authService = require('../middlewares/auth/authService.js');
const messageAuthentication = require('../middlewares/auth/messageAuthentication.js');

const router = express.Router();

/**
 * 회원가입
 */
router.post('/signup', authService.signup);

/**
 * 닉네임 중복 체크
 */
router.get('/nickNameDuplicateCheck', authService.nickNameDuplicateCheck);

/**
 * 이메일 중복 체크
 */
router.get('/emailDuplicateCheck', authService.emailDuplicateCheck);

/**
 * 휴대폰 번호 중복 체크
 */
router.get('/phoneNumberDuplicateCheck', authService.phoneNumberDuplicateCheck);

/**
 * 인증번호 받기
 */
router.post('/getVerificationCode', messageAuthentication.sendVerificationSMS);
/**
 * 인증번호 확인
 */
router.post('/confirmVerificationCode', messageAuthentication.confirmSms);

module.exports = router;
