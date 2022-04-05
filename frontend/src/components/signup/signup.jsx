/*global kakao*/
import React, { useEffect, useState } from "react";
import axios from "axios";
import KakaoAddress from "./kakaoAddress";
const Signup = (props) => {
  const [userRegistration, setUserRegistration] = useState({
    userName: "",
    nickName: "",
    email: "",
    password: "",
    phoneNumber: "",
    address: "",
    birthday: "",
    latitude: "",
    longitude: "",
  });

  // true 통과
  const [error, setError] = useState({
    email: false, // 이메일 유효성
    emailDuplicate: false, // 이메일 중복
    nickName: false, // 닉네임 유효성
    nickNameDuplicate: false, // 닉네임 중복
    password: false, // 비밀번호 유효성
    password2: false, // 비밀번호 확인
    phoneNumber: false,
    phoneNumberDuplicate: false, // 휴대폰 중복
    phoneNumberVerification: false, // 휴대폰 인증
  });

  const [popup, setPopup] = useState(false);
  const [address, setAddress] = useState("");

  const [message, setMessage] = useState({
    email: "",
    nickName: "",
    password: "",
    password2: "",
    phoneNumber: "",
  });

  const [password2, setPassword2] = useState("");
  const [verificationCode, setVerificationCode] = useState("");

  const handleInput = (event) => {
    const {
      target: { name, value },
    } = event;
    setUserRegistration((userRegistration) => ({
      ...userRegistration,
      [name]: value,
    }));
  };

  const handlePassword2 = (event) => {
    const value = event.target.value;
    setPassword2(value);
  };

  const handleVerificationCode = (event) => {
    const value = event.target.value;
    setVerificationCode(value);
  };

  const emailCheck = async () => {
    setError((prevState) => {
      return {
        ...prevState,
        email: true,
      };
    });

    axios.get(`http://127.0.0.1:8080/auth/emailDuplicateCheck?email=${userRegistration.email}`).then((result) => {
      console.log(result);
      if (result.status === 200) {
        if (result.data.result) {
          setError((prevState) => {
            return {
              ...prevState,
              emailDuplicate: true,
            };
          });

          setMessage({ ...message, email: "사용가능한 이메일입니다" });
        } else {
          setError({
            ...error,
            emailDuplicate: false,
          });
          setMessage({ ...message, email: "이미 가입된 회원입니다" });
        }
      } else {
        console.log("뭔가 잘못되었당");
      }
    });
  };

  // 휴대폰 번호 인증
  const phoneNumberCheck = (event) => {
    event.preventDefault();

    let phoneNumberExp = /^\d{10,11}$/;
    if (userRegistration.phoneNumber === "" || (userRegistration.phoneNumber && phoneNumberExp.test(userRegistration.phoneNumber) === false)) {
      setError((error) => ({
        ...error,
        phoneNumber: false,
      }));
      setMessage({ ...message, phoneNumber: "휴대폰 형식을 맞춰주세요" });
      return;
    } else {
      setError((error) => ({
        ...error,
        phoneNumber: true,
      }));

      axios.get(`http://127.0.0.1:8080/auth/phoneNumberDuplicateCheck?phoneNumber=${userRegistration.phoneNumber}`).then((result) => {
        if (result.status === 200) {
          if (result.data.result) {
            setError({
              ...error,
              phoneNumberDuplicate: true,
            });
            setMessage({ ...message, phoneNumber: "인증 코드를 확인해주세요" });
            axios
              .post(`http://127.0.0.1:8080/auth/getVerificationCode`, {
                phoneNumber: userRegistration.phoneNumber,
              })
              .catch(error);
          } else {
            setError({
              ...error,
              phoneNumberDuplicate: false,
            });
            setMessage({ ...message, phoneNumber: "이미 가입된 번호입니다" });
          }
        } else {
          console.log("뭔가 잘못되었당");
        }
      });
    }
  };

  // 회원가입
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(error);
  };

  // Blur

  // 이메일 체크
  useEffect(() => {}, [error]);

  const emailCheckBlur = () => {
    console.log(userRegistration.email);
    if (userRegistration.email === "") {
      setError((error) => ({
        ...error,
        email: false,
      }));
      setMessage({ ...message, email: "이메일 작성을 해주세요" });
      return;
    }

    let emailExp = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
    if (userRegistration.email && emailExp.test(userRegistration.email) === false) {
      setError((prevState) => {
        return {
          ...prevState,
          email: false,
        };
      });

      setMessage((prevState) => {
        return {
          ...prevState,
          email: "이메일 형식을 맞춰주세요",
        };
      });
    } else {
      setError((prevState) => {
        return {
          ...prevState,
          email: true,
        };
      });
      console.log(error.email);
      if (error.email) {
        axios.get(`http://127.0.0.1:8080/auth/emailDuplicateCheck?email=${userRegistration.email}`).then((result) => {
          if (result.status === 200) {
            if (result.data.result) {
              setError({
                ...error,
                emailDuplicate: true,
              });
              setMessage({ ...message, email: "사용가능한 이메일입니다" });
            } else {
              setError({
                ...error,
                emailDuplicate: false,
              });
              setMessage({ ...message, email: "이미 가입된 회원입니다" });
            }
          } else {
            console.log("뭔가 잘못되었당");
          }
        });
      }
    }
  };

  // 비밀번호 체크

  const passwordCheckBlur = () => {
    if (userRegistration.password === "") {
      setError((error) => ({
        ...error,
        password: false,
      }));
      setMessage({ ...message, password: "비밀번호 작성을 해주세요" });
      return;
    }

    let passwordExp = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/;

    if (userRegistration.password && passwordExp.test(userRegistration.password) === false) {
      setError((error) => ({
        ...error,
        password: false,
      }));
      setMessage((message) => ({ ...message, password: "영문, 숫자, 특수기호 조합으로 8-20자리 이상 입력해주세요" }));
      return;
    } else {
      setError((error) => ({
        ...error,
        password: true,
      }));
      setMessage((message) => ({ ...message, password: "안전한 비밀번호입니다" }));
      return;
    }
  };

  //비밀번호 일치 체크
  const password2Blur = () => {
    if (password2 === "") {
      setError((error) => ({
        ...error,
        password2: false,
      }));
      setMessage({ ...message, password2: "비밀번호 작성을 해주세요" });
      return;
    }
    if (userRegistration.password !== password2) {
      setError((error) => ({
        ...error,
        password2: false,
      }));
      setMessage((message) => ({ ...message, password2: "비밀번호를 다시 확인해주세요" }));
    } else {
      setError((error) => ({
        ...error,
        password2: true,
      }));
      setMessage((message) => ({ ...message, password2: "일치합니다" }));
    }
  };

  // 닉네임 체크
  const nickNameCheckBlur = () => {
    if (userRegistration.nickName === "") {
      setError((error) => ({
        ...error,
        nickName: false,
      }));
      setMessage({ ...message, nickName: "닉네임 작성을 해주세요" });
      return;
    }

    let nickNameExp = /^[가-힣A-Za-z0-9_]{2,7}$/;

    if (userRegistration.nickName && nickNameExp.test(userRegistration.nickName) === false) {
      setError((error) => ({
        ...error,
        nickName: false,
      }));
      setMessage((message) => ({ ...message, nickName: "2자리이상 7자리미만" }));
      return;
    } else {
      setError((error) => ({
        ...error,
        nickName: true,
      }));

      axios.get(`http://127.0.0.1:8080/auth/nickNameDuplicateCheck?nickName=${userRegistration.nickName}`).then((result) => {
        if (result.status === 200) {
          if (result.data.result) {
            setError({
              ...error,
              nickNameDuplicate: true,
            });
            setMessage((message) => ({ ...message, nickName: "사용가능한 닉네임입니다" }));
          } else {
            setError({
              ...error,
              nickNameDuplicate: false,
            });
            setMessage((message) => ({ ...message, nickName: "이미 사용중인 닉네임입니다" }));
          }
        } else {
          console.log("뭔가 잘못되었당");
        }
      });
    }
  };

  const verificationCodeBlur = () => {
    if (error.phoneNumberDuplicate) {
      axios
        .post(`http://127.0.0.1:8080/auth/confirmVerificationCode`, {
          phoneNumber: userRegistration.phoneNumber,
          verificationCode: verificationCode,
        })
        .then((result) => {
          if (result.data.result) {
            setError((error) => ({ ...error, phoneNumberVerification: true }));
            setMessage((message) => ({ ...message, phoneNumber: "인증 되었습니다" }));
          } else {
            setError((error) => ({ ...error, phoneNumberVerification: false }));
            setMessage((message) => ({ ...message, phoneNumber: "다시 확인해주세요" }));
          }
        })
        .catch(error);
    }
  };

  return (
    <form>
      <div>
        <label>이메일</label>
        <input name="email" type="text" placeholder="이메일" value={userRegistration.email} onChange={handleInput} onBlur={emailCheckBlur} />
        <span>{message.email}</span>
      </div>
      <div>
        <label>비밀번호</label>
        <input
          name="password"
          type="password"
          placeholder="비밀번호"
          maxLength="20"
          value={userRegistration.password}
          onChange={handleInput}
          onBlur={passwordCheckBlur}
        />
        <span>{message.password}</span>
      </div>
      <div>
        <label>비밀번호 확인</label>
        <input
          name="password2"
          type="password"
          placeholder="비밀번호"
          maxLength="20"
          value={password2}
          onChange={handlePassword2}
          onBlur={password2Blur}
        />
        <span>{message.password2}</span>
      </div>
      <div>
        <label>휴대폰 번호</label>
        <input name="phoneNumber" type="text" placeholder="휴대폰 번호" maxLength="11" value={userRegistration.phoneNumber} onChange={handleInput} />
        <button onClick={phoneNumberCheck}>인증번호 보내기</button>
        <input
          name="verificationCode"
          type="text"
          placeholder="인증번호"
          value={verificationCode}
          onChange={handleVerificationCode}
          onBlur={verificationCodeBlur}
        />
        <span>{message.phoneNumber}</span>
      </div>
      <div>
        <label>닉네임</label>
        <input
          name="nickName"
          type="text"
          placeholder="닉네임"
          maxLength="7"
          value={userRegistration.nickName}
          onChange={handleInput}
          onBlur={nickNameCheckBlur}
        />
        <span>{message.nickName}</span>
      </div>
      <div>
        <label>주소</label>
        <input name="address" type="text" placeholder="주소" value={userRegistration.address} onChange={handleInput} />
      </div>
      <button
        onClick={(event) => {
          event.preventDefault();
          setPopup(!popup);
        }}
      >
        주소검색
        {popup && <KakaoAddress address={address} setAddress={setAddress} setPopup={setPopup}></KakaoAddress>}
        {console.log(address)}
      </button>
      <button type="submit" onClick={handleSubmit}>
        회원가입
      </button>
    </form>
  );
};

export default Signup;
