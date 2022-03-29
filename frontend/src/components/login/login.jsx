import React from "react";
import styles from "./login.module.css";
const Login = (props) => {
  return (
    <>
      <div>
        <h1 className={styles.name}>login component</h1>
        <button className={styles.test}>회원가입</button>
      </div>
    </>
  );
};

export default Login;
