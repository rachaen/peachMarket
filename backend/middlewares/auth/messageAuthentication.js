const config = require("../../config/config.js");
const cryptojs = require("crypto-js");
const axios = require("axios");
const Cache = require("memory-cache");
const authRepository = require("./authRepository.js");

const messageAuthentication = {
  sendVerificationSMS: async (req, res) => {
    try {
      console.log(req.body);
      const phoneNumber = req.body.phoneNumber;
      const user = await authRepository.findPhoneNumber(phoneNumber);
      if (user) {
        return res.status(409).json({ result: false });
      }
      Cache.del(phoneNumber);
      const date = Date.now().toString();
      //6자리 인증코드 생성
      const verificationCode = Math.floor(Math.random() * (999999 - 100000)) + 100000;
      //캐시에 넣어서
      Cache.put(phoneNumber, verificationCode.toString());
      //환경 변수
      const sens_service_id = config.sens.serviceId;
      const sens_access_key = config.sens.accessKey;
      const sens_secret_key = config.sens.secretKey;
      const sens_call_number = config.sens.callNumber;
      //URL 관련 함수 선언.
      const method = "POST";
      const space = " ";
      const newLine = "\n";
      const url = `https://sens.apigw.ntruss.com/sms/v2/services/${sens_service_id}/messages`;
      const url2 = `/sms/v2/services/${sens_service_id}/messages`;
      //암호화
      const hmac = cryptojs.algo.HMAC.create(cryptojs.algo.SHA256, sens_secret_key);
      hmac.update(method);
      hmac.update(space);
      hmac.update(url2);
      hmac.update(newLine);
      hmac.update(date);
      hmac.update(newLine);
      hmac.update(sens_access_key);
      const hash = hmac.finalize();
      const signature = hash.toString(cryptojs.enc.Base64);

      const smsRes = await axios({
        method: method,
        url: url,
        headers: {
          "Contenc-type": "application/json; charset=utf-8",
          "x-ncp-iam-access-key": sens_access_key,
          "x-ncp-apigw-timestamp": date,
          "x-ncp-apigw-signature-v2": signature,
        },
        data: {
          type: "SMS",
          countryCode: "82",
          from: sens_call_number,
          content: `인증번호는 [${verificationCode}] 입니다.`,
          messages: [{ to: `${phoneNumber}` }],
        },
      });
      return res.status(200).json({ result: true });
    } catch (error) {
      return res.status(409).json({ result: false });
    }
  },
  confirmSms: (req, res) => {
    const { phoneNumber, verificationCode } = req.body;
    const CacheData = Cache.get(phoneNumber);
    console.log(CacheData);
    if (!CacheData) {
      return res.status(409).json({ result: false });
    } else if (CacheData != verificationCode) {
      return res.status(409).json({ result: false });
    } else {
      Cache.del(phoneNumber);
      return res.status(200).json({ result: true });
    }
  },
};

module.exports = messageAuthentication;
