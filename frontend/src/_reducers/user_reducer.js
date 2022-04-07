import { AUTH_USER, LOGIN_USER } from "../_actions/types";
const userReducer = (previousState = {}, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return { ...previousState, loginSuccess: action.payload };
      break;
    case AUTH_USER:
      return { ...previousState, userData: action.payload };
      break;
    default:
      return previousState;
  }
};

export default userReducer;
