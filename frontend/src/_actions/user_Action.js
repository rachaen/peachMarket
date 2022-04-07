import axios from "axios";
import { LOGIN_USER, AUTH_USER } from "./types";

export const loginUser = (dataToSubmit) => {
  const request = axios.post("/auth/login", dataToSubmit).then((response) => {
    console.log(response);
    return response.data;
  });

  return {
    type: LOGIN_USER,
    payload: request,
  };
};

export const auth = () => {
  console.log("실행");
  const request = axios
    .get("/auth/me")
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
  return {
    type: AUTH_USER,
    payload: request,
  };
};
