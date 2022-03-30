import React, { useEffect, useState } from 'react';

const Signup = (props) => {
  const [userRegistration, setUserRegistration] = useState({
    userName: '',
    nickName: '',
    email: '',
    password: '',
    phoneNumber: '',
    address: '',
    birthday: '',
    latitude: '',
    longitude: '',
  });

  const [error, setError] = useState({
    email: false, // 이메일 유효성
    emailDuplicate: false, // 이메일 중복
    nickNameDuplicate: false, // 닉네임 중복
    password: false, // 비밀번호 유효성
    password2: false, // 비밀번호 확인
    phoneVerification: false, // 휴대폰 인증
  });

  const [password2, setPassword2] = useState('');

  const handleInput = (event) => {
    const {
      target: { name, value },
    } = event;
    setUserRegistration((userRegistration) => ({ ...userRegistration, [name]: value }));
  };

  const handlePassword2 = (event) => {
    const value = event.target.value;
    setPassword2(value);
  };

  // 유효성 검사

  useEffect(() => {
    let emailExp = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
    if (userRegistration.email && emailExp.test(userRegistration.email) === false) {
      setError((error) => ({ ...error, email: true }));
    } else {
      setError((error) => ({ ...error, email: false }));
    }
  }, [userRegistration.email]);

  useEffect(() => {
    let passwordExp = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,12}$/;
    if (userRegistration.password && passwordExp.test(userRegistration.password) === false) {
      setError((error) => ({ ...error, password: true }));
    } else {
      setError((error) => ({ ...error, password: false }));
    }
  }, [userRegistration.password]);

  // 비밀번호 일치 검사
  useEffect(() => {
    if (userRegistration.password !== password2) {
      setError((error) => ({ ...error, password2: true }));
    } else {
      setError((error) => ({ ...error, password2: false }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [password2]);

  const nickNameCheck = (event) => {};

  const emailCheck = (event) => {};

  const phoneNumberCheck = (event) => {};

  // 회원가입
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <form>
      <div>
        <label>이메일</label>
        <input name="email" type="text" placeholder="이메일" required value={userRegistration.email} onChange={handleInput} />
        <button onClick={emailCheck}>중복확인</button>
        <span>{userRegistration.email && (error.email ? '유효성 불통' : '유효성 통')}</span>
      </div>
      <div>
        <label>비밀번호</label>
        <input name="password" type="password" placeholder="비밀번호" required value={userRegistration.password} onChange={handleInput} />
        <span>{userRegistration.password && (error.password ? '유효성 불통' : '유효성 통')}</span>
      </div>
      <div>
        <label>비밀번호 확인</label>
        <input name="password2" type="password" placeholder="비밀번호" required value={password2} onChange={handlePassword2} />
        {/* <span>{passwordMessage()}</span> */}
        {/* {message.password2 && <span>{message.password2}</span>} */}
        <span>{password2 && (error.password2 ? '안돼' : '됨')}</span>
      </div>
      <div>
        <label>휴대폰 번호</label>
        <input name="phoneNumber" type="text" placeholder="휴대폰 번호" required value={userRegistration.name} onChange={handleInput} />
        <button onClick={phoneNumberCheck}>인증하기</button>
      </div>
      <div>
        <label>닉네임</label>
        <input name="nickName" type="text" placeholder="닉네임" value={userRegistration.nickName} onChange={handleInput} />
        <button onClick={nickNameCheck}>check</button>
      </div>
      <div>
        <label>주소</label>
        <input name="address" type="text" placeholder="주소" value={userRegistration.address} onChange={handleInput} />
      </div>
      <button type="submit" onClick={handleSubmit}>
        회원가입
      </button>
    </form>
  );
};

export default Signup;
