import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { auth } from "../_actions/user_Action.js";
import { useNavigate } from "react-router-dom";

export default function (WrappedComponent, option, adminRoute = null) {
  function AuthenticationCheck(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(auth()).then((response) => {
        if (!response.payload) {
          if (option) {
            navigate("/login");
          }
        } else {
          if (option === false) {
            navigate("/");
          }
        }
      });
    }, []);

    return WrappedComponent;
  }

  return <AuthenticationCheck />;
}
