import { combineReducers } from "redux"; // store에 리듀서가 여러가지 있을 수 있다.
import userReducer from "./user_reducer";
//combineReducer는 여러가지 reducer를 하나로 합쳐주는 것.
const rootReducer = combineReducers({
  userReducer,
});

export default rootReducer;
