import { useSelector } from "react-redux";
import React from "react";

const NotFound = (props) => {
  const userData = useSelector((state) => {
    return state.userReducer.userData;
  });
  return <>{userData && <div>hello</div>}</>;
};

export default NotFound;
