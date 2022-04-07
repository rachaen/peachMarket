import { useSelector } from "react-redux";

const NotFound = (props) => {
  const userData = useSelector((state) => {
    console.log(state.userReducer.userData);
    return state.userReducer.userData;
  });
  {
    console.log(userData);
  }
  return <>{userData && <div>hello</div>}</>;
};

export default NotFound;
