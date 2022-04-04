import axios from "axios";
import React from "react";
import DaumPostcode from "react-daum-postcode";

const KakaoAddress = (props) => {
  const address = props.address;
  const setAddress = props.setAddress;
  const setPopup = props.setPopup;

  const onCompleteTest = (data) => {
    setAddress(data.address);
    setPopup(false);
    const key = process.env.REACT_APP_RESTAPI;
    const encoded = encodeURIComponent(data.address);
    axios
      .get(`https://dapi.kakao.com/v2/local/search/address.json?query=${data.address}`, {
        headers: {
          Authorization: `KakaoAK ${key}`,
        },
      })
      .then((result) => {
        console.log(`longitude: ${result.data.documents[0].x}`);
        console.log(`latitude:${result.data.documents[0].y}`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const postCodeStyle = {
    display: "block",
    position: "absolute",
    top: "20%",
    width: "400px",
    height: "400px",
    padding: "7px",
    zIndex: 100,
  };

  return (
    <>
      {console.log(props.address)}
      <DaumPostcode style={postCodeStyle} autoClose onComplete={onCompleteTest} />
    </>
  );
};

export default KakaoAddress;
