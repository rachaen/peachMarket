import axios from "axios";
import React, { useState } from "react";
import styles from "./login.module.css";

const baseURL = process.env.REACT_APP_BASE_URL;

const Login = (props) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const onEmailHandler = (event) => {
    setEmail(event.target.value);
  };

  const onPasswordHandler = (event) => {
    setPassword(event.target.value);
  };

  const onLoginHandler = () => {
    console.log("hi");
    const body = {
      email: email,
      password: password,
    };
    console.log(body);
    axios
      .post(`/auth/login`, body, { withCredentials: true, credentials: "include" })
      .then((result) => {
        console.log("hi3");
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        console.log("hi");
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
