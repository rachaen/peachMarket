import axios from 'axios';
import React from 'react';
import DaumPostcode from 'react-daum-postcode';

const KakaoAddress = (props) => {
  const setPopup = props.setPopup;
  const setUserRegistration = props.setUserRegistration;
  const setError = props.setError;

  const onCompleteTest = (data) => {
    setUserRegistration((userRegistration) => ({ ...userRegistration, address: data.address }));
    setPopup(false);
    const key = process.env.REACT_APP_RESTAPI;
    axios
      .get(`https://dapi.kakao.com/v2/local/search/address.json?query=${data.address}`, {
        headers: {
          Authorization: `KakaoAK ${key}`,
        },
      })
      .then((result) => {
        setUserRegistration((userRegistration) => ({ ...userRegistration, longitude: result.data.documents[0].x }));
        setUserRegistration((userRegistration) => ({ ...userRegistration, latitude: result.data.documents[0].y }));
        setError((error) => ({
          ...error,
          address: true,
        }));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const postCodeStyle = {
    display: 'block',
    position: 'absolute',
    top: '20%',
    width: '400px',
    height: '400px',
    padding: '7px',
    zIndex: 100,
  };

  return (
    <>
      <DaumPostcode style={postCodeStyle} autoClose onComplete={onCompleteTest} />
    </>
  );
};

export default KakaoAddress;
