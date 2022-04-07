import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../_actions/user_Action";

const Login = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const onEmailHandler = (event) => {
    setEmail(event.target.value);
  };

  const onPasswordHandler = (event) => {
    setPassword(event.target.value);
  };

  const onLoginHandler = () => {
    const body = {
      email: email,
      password: password,
    };

    dispatch(loginUser(body)).then((response) => {
      console.log(response);
      if (response.payload.token) {
        navigate("/");
      }
    });
  };
  return (
    <>
      <input type="text" onChange={onEmailHandler} />
      <input type="text" onChange={onPasswordHandler} />
      <button onClick={onLoginHandler}>로그인</button>
    </>
  );
};

export default Login;
