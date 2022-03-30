import React, { useEffect, useState } from 'react';
import axios from 'axios';

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

  // true면 통과
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

  const [password2, setPassword2] = useState('');

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

  // 유효성 검사

  useEffect(() => {
    let emailExp = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
    if (userRegistration.email && emailExp.test(userRegistration.email) === false) {
      setError((error) => ({
        ...error,
        email: false,
      }));
    } else {
      setError((error) => ({
        ...error,
        email: true,
      }));
    }
  }, [userRegistration.email]);

  useEffect(() => {
    let nickNameExp = /^[가-힣A-Za-z0-9_]{2,7}$/;
    if (userRegistration.nickName && nickNameExp.test(userRegistration.nickName) === false) {
      setError((error) => ({
        ...error,
        nickName: false,
      }));
    } else {
      setError((error) => ({
        ...error,
        nickName: true,
      }));
    }
  }, [userRegistration.nickName]);

  useEffect(() => {
    let passwordExp = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/;
    if (userRegistration.password && passwordExp.test(userRegistration.password) === false) {
      setError((error) => ({
        ...error,
        password: false,
      }));
    } else {
      setError((error) => ({
        ...error,
        password: true,
      }));
    }
  }, [userRegistration.password]);

  useEffect(() => {
    let phoneNumberExp = /^\d{10,11}$/;
    if (userRegistration.password && phoneNumberExp.test(userRegistration.phoneNumber) === false) {
      setError((error) => ({
        ...error,
        phoneNumber: false,
      }));
    } else {
      setError((error) => ({
        ...error,
        phoneNumber: true,
      }));
    }
  }, [userRegistration.password]);

  // 비밀번호 일치 검사
  useEffect(() => {
    if (userRegistration.password !== password2) {
      setError((error) => ({
        ...error,
        password2: false,
      }));
    } else {
      setError((error) => ({
        ...error,
        password2: true,
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [password2]);

  // 중복검사
  const emailCheck = (event) => {
    event.preventDefault();
    if (!error.email || userRegistration.email === '') {
      alert('이메일 형식을 맞춰주세요');
      return;
    }
    axios.get(`http://127.0.0.1:8080/auth/emailDuplicateCheck?email=${userRegistration.email}`).then((result) => {
      if (result.status === 200) {
        if (result.data.result) {
          setError({
            ...error,
            emailDuplicate: true,
          });
        } else {
          setError({
            ...error,
            emailDuplicate: false,
          });
        }
      } else {
        console.log('뭔가 잘못되었당');
      }
    });
  };

  const nickNameCheck = (event) => {
    event.preventDefault();
    if (!error.nickName || userRegistration.nickName === '') {
      alert('닉네임 형식을 맞춰주세요');
      return;
    }
    axios
      .get(`http://127.0.0.1:8080/auth/phoneNumberDuplicateCheck?nickName=${userRegistration.nickName}`)
      .then((result) => {
        if (result.status === 200) {
          if (result.data.result) {
            setError({
              ...error,
              nickNameDuplicate: true,
            });
          } else {
            setError({
              ...error,
              nickNameDuplicate: false,
            });
          }
        } else {
          console.log('뭔가 잘못되었당');
        }
      });
  };

  const phoneNumberCheck = (event) => {
    event.preventDefault();
    if (!error.phoneNumber || userRegistration.phoneNumber === '') {
      alert('휴대폰 형식을 맞춰주세요');
      return;
    }
    axios
      .get(`http://127.0.0.1:8080/auth/nickNameDuplicateCheck?nickName=${userRegistration.nickName}`)
      .then((result) => {
        if (result.status === 200) {
          if (result.data.result) {
            setError({
              ...error,
              phoneNumberDuplicate: true,
            });
          } else {
            setError({
              ...error,
              phoneNumberDuplicate: false,
            });
          }
        } else {
          console.log('뭔가 잘못되었당');
        }
      });
  };

  // 회원가입
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <form>
      <div>
        <label>이메일</label>
        <input name="email" type="text" placeholder="이메일" value={userRegistration.email} onChange={handleInput} />
        <button onClick={emailCheck}>중복확인</button>
        {/* <span>{userRegistration.email && (error.email ? '' : '이메일 형식을 지켜주세요')}</span> */}
        <span>
          {userRegistration.email &&
            (error.email ? (error.emailDuplicate ? '사용 가능한 닉네임입니다.' : '') : '이메일 형식을 지켜주세요')}
        </span>
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
        />
        <span>
          {userRegistration.password &&
            (error.password ? '안전한 비밀번호 입니다.' : '영문, 숫자, 특수기호 조합으로 8-20자리 이상 입력해주세요')}
        </span>
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
        />
        <span>{password2 && (error.password2 ? '비밀번호를 다시 확인해주세요' : 'ok')}</span>
      </div>
      <div>
        <label>휴대폰 번호</label>
        <input
          name="phoneNumber"
          type="text"
          placeholder="휴대폰 번호"
          maxLength="11"
          value={userRegistration.phoneNumber}
          onChange={handleInput}
        />
        <button onClick={phoneNumberCheck}>인증하기</button>
        <span>{userRegistration.phoneNumber && (error.phoneNumberVerification ? '인증 완료' : '')}</span>
      </div>
      <div>
        <label>닉네임</label>
        <input
          name="nickName"
          type="text"
          placeholder="닉네임"
          maxlength="5"
          value={userRegistration.nickName}
          onChange={handleInput}
        />
        <button onClick={nickNameCheck}>check</button>
        <span>
          {userRegistration.nickName &&
            (error.nickName ? (error.nickNameDuplicate ? '사용 가능한 닉네임입니다.' : '') : '2자리 이상')}
        </span>
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
