/* eslint-disable */
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import KakaoAddress from "./kakaoAddress";

const Signup = (props) => {
  const navigate = useNavigate();
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
    userName: false, //이름
    email: false, // 이메일 유효성
    emailDuplicate: false, // 이메일 중복
    nickName: false, // 닉네임 유효성
    nickNameDuplicate: false, // 닉네임 중복
    password: false, // 비밀번호 유효성
    password2: false, // 비밀번호 확인
    phoneNumber: false,
    phoneNumberDuplicate: false, // 휴대폰 중복
    phoneNumberVerification: false, // 휴대폰 인증
    birthday: false,
    address: false,
  });

  const [popup, setPopup] = useState(false);

  const [message, setMessage] = useState({
    userName: "",
    email: "",
    nickName: "",
    password: "",
    password2: "",
    phoneNumber: "",
    birthday: "",
    signup: "",
  });

  const [password2, setPassword2] = useState("");
  const [verificationCode, setVerificationCode] = useState("");

  const userNameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const password2Ref = useRef(null);
  const phoneNumberRef = useRef(null);
  const verificationCodeRef = useRef(null);
  const birthdayRef = useRef(null);
  const nickNameRef = useRef(null);
  const addressRef = useRef(null);

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

      axios.get(`/auth/phoneNumberDuplicateCheck?phoneNumber=${userRegistration.phoneNumber}`).then((result) => {
        if (result.status === 200) {
          if (result.data.result) {
            setError((error) => ({
              ...error,
              phoneNumberDuplicate: true,
            }));
            setMessage({ ...message, phoneNumber: "인증 코드를 확인해주세요" });
            axios
              .post(`/auth/getVerificationCode`, {
                phoneNumber: userRegistration.phoneNumber,
              })
              .catch(error);
          } else {
            setError((error) => ({
              ...error,
              phoneNumberDuplicate: false,
            }));
            setMessage({ ...message, phoneNumber: "이미 가입된 번호입니다" });
          }
        } else {
          setError({
            ...error,
            phoneNumberDuplicate: false,
          });
          setMessage({ ...message, phoneNumber: "이미 가입된 번호입니다" });
        }
      });
    }
  };

  // 회원가입
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!error.userName) {
      setMessage((message) => ({ ...message, signup: "이름을 확인해주세요" }));
      userNameRef.current.focus();
      return;
    } else if (!error.email || !error.emailDuplicate) {
      setMessage((message) => ({ ...message, signup: "이메일을 확인해주세요" }));
      emailRef.current.focus();
      return;
    } else if (!error.password) {
      setMessage((message) => ({ ...message, signup: "비밀번호를 확인해주세요" }));
      passwordRef.current.focus();
      return;
    } else if (!error.password2) {
      setMessage((message) => ({ ...message, signup: "비밀번호를 확인해주세요" }));
      password2Ref.current.focus();
      return;
    } else if (!error.phoneNumber || !error.phoneNumberDuplicate) {
      setMessage((message) => ({ ...message, signup: "번호를 확인해주세요" }));
      phoneNumberRef.current.focus();
      return;
    } else if (!error.phoneNumberVerification) {
      setMessage((message) => ({ ...message, signup: "인증번호를 확인해주세요" }));
      verificationCodeRef.current.focus();
      return;
    } else if (!error.birthday) {
      setMessage((message) => ({ ...message, signup: "생년월일을 확인해주세요" }));
      birthdayRef.current.focus();
      return;
    } else if (!error.nickName || !error.nickNameDuplicate) {
      setMessage((message) => ({ ...message, signup: "닉네임을 확인해주세요" }));
      nickNameRef.current.focus();
      return;
    } else if (!error.address) {
      setMessage((message) => ({ ...message, signup: "주소를 확인해주세요" }));
      addressRef.current.focus();
      return;
    } else {
      axios
        .post(`/auth/signup`, {
          userName: userRegistration.userName,
          nickName: userRegistration.nickName,
          email: userRegistration.email,
          password: userRegistration.password,
          phoneNumber: userRegistration.phoneNumber,
          address: userRegistration.address,
          birthday: userRegistration.birthday,
          latitude: userRegistration.latitude,
          longitude: userRegistration.longitude,
        })
        .then((result) => {
          if (result.status === 200) {
            if (result.data.result) {
              alert("회원가입 완료");
              navigate("/login");
            }
          } else {
            alert("회원가입 실패");
          }
        })
        .catch(error);
    }
  };

  // Blur

  // 사용자 이름 체크
  const userNameBlur = () => {
    let userNameExp = /^[가-힣]{2,15}$/;
    if (userRegistration.userName === "") {
      setError((error) => ({ ...error, userName: false }));
      setMessage({ ...message, userName: "이름 작성을 해주세요" });
      return;
    } else if (userRegistration.userName && userNameExp.test(userRegistration.userName) === false) {
      setError((error) => ({ ...error, userName: false }));
      setMessage({ ...message, userName: "이름을 확인해주세요" });
      return;
    } else {
      setError((error) => ({ ...error, userName: true }));
      setMessage({ ...message, userName: "" });
      return;
    }
  };

  // 이메일 체크
  const emailCheckBlur = () => {
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
      setError((error) => ({
        ...error,
        email: true,
      }));
      axios.get(`/auth/emailDuplicateCheck?email=${userRegistration.email}`).then((result) => {
        if (result.status === 200) {
          if (result.data.result) {
            setError((error) => ({
              ...error,
              emailDuplicate: true,
            }));
            setMessage({ ...message, email: "사용가능한 이메일입니다" });
          } else {
            setError((error) => ({
              ...error,
              emailDuplicate: false,
            }));
            setMessage({ ...message, email: "이미 가입된 회원입니다" });
          }
        } else {
          console.log("뭔가 잘못되었당");
        }
      });
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

  // 생년월일
  const birthdayBlur = () => {
    let birthdayExp = /^[0-9]{6}$/;
    if (userRegistration.birthday === "") {
      setError((error) => ({
        ...error,
        birthday: false,
      }));
      setMessage({ ...message, birthday: "생년월일을 작성해주세요" });
      return;
    } else if (userRegistration.birthday && birthdayExp.test(userRegistration.birthday) === false) {
      setError((error) => ({
        ...error,
        birthday: false,
      }));
      setMessage({ ...message, birthday: "생년월일을 확인해주세요" });
      return;
    } else {
      setError((error) => ({
        ...error,
        birthday: true,
      }));
      setMessage({ ...message, birthday: "" });
      return;
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

      axios
        .get(`/auth/nickNameDuplicateCheck?nickName=${userRegistration.nickName}`)
        .then((result) => {
          console.log(result);
          if (result.status === 200) {
            if (result.data.result) {
              setError((error) => ({
                ...error,
                nickNameDuplicate: true,
              }));
              setMessage((message) => ({ ...message, nickName: "사용가능한 닉네임입니다" }));
            } else {
              setError((error) => ({
                ...error,
                nickNameDuplicate: false,
              }));
              setMessage((message) => ({ ...message, nickName: "이미 사용중인 닉네임입니다" }));
            }
          } else {
            console.log("뭔가 잘못되었당");
          }
        })
        .catch((error) => {
          console.log(error.response.status);
          console.log("중복실패");
        });
    }
  };

  const verificationCodeBlur = () => {
    if (error.phoneNumberDuplicate) {
      axios
        .post(`/auth/confirmVerificationCode`, {
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
        <label>이름</label>
        <input
          ref={userNameRef}
          name="userName"
          type="text"
          placeholder="이름"
          value={userRegistration.userName}
          onChange={handleInput}
          onBlur={userNameBlur}
        />
        <span>{message.userName}</span>
      </div>
      <div>
        <label>이메일</label>
        <input
          ref={emailRef}
          name="email"
          type="text"
          placeholder="이메일"
          value={userRegistration.email}
          onChange={handleInput}
          onBlur={emailCheckBlur}
        />
        <span>{message.email}</span>
      </div>
      <div>
        <label>비밀번호</label>
        <input
          ref={passwordRef}
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
          ref={password2Ref}
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
        <input
          ref={phoneNumberRef}
          name="phoneNumber"
          type="text"
          placeholder="휴대폰 번호"
          maxLength="11"
          value={userRegistration.phoneNumber}
          onChange={handleInput}
        />
        <button onClick={phoneNumberCheck}>인증번호 보내기</button>
        <input
          ref={verificationCodeRef}
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
        <label>생년월일</label>
        <input
          ref={birthdayRef}
          name="birthday"
          type="text"
          maxLength="8"
          placeholder="생일"
          value={userRegistration.birthday}
          onChange={handleInput}
          onBlur={birthdayBlur}
        />
        <span>{message.birthday}</span>
      </div>
      <div>
        <label>닉네임</label>
        <input
          ref={nickNameRef}
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
        ref={addressRef}
        onClick={(event) => {
          event.preventDefault();
          setPopup(!popup);
        }}
      >
        주소검색
        {popup && <KakaoAddress setPopup={setPopup} setUserRegistration={setUserRegistration} setError={setError}></KakaoAddress>}
      </button>
      <button type="submit" onClick={handleSubmit}>
        회원가입
      </button>
      <span>{message.signup}</span>
    </form>
  );
};

export default Signup;
