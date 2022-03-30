/*global kakao*/

import React, { useEffect, useState } from "react";
const Kakaomap = () => {
  useEffect(() => {
    const container = document.getElementById("map");
    const options = {
      center: new kakao.maps.LatLng(37.365264512305174, 127.10676860117488),
      level: 3,
    };
    const map = new kakao.maps.Map(container, options);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const latitude = position.coords.latitude;
        const longtitude = position.coords.longitude;
        const locPosition = new kakao.maps.LatLng(latitude, longtitude);
        const message = "<div>이 위치가 맞나요?</div>";
        displayMarker(locPosition, message, map);
      });
    } else {
      const locPosition = new kakao.maps.LatLng(33.450701, 126.570667);
      const message = "<div>geolocation을 사용할 수 없어요</div>";
      const marker = new kakao.maps.Marker({
        map: map,
        position: locPosition,
      });

      const iwContent = message;
      const iwRemoveable = true;

      const infowindow = new kakao.maps.InfoWindow({
        content: iwContent,
        removable: iwRemoveable,
      });

      infowindow.open(map, marker);
      console.log(map);
      map.setCenter(locPosition);
      displayMarker(locPosition, message, map);
    }
  }, []);

  const displayMarker = (locPosition, message, map) => {
    const marker = new kakao.maps.Marker({
      map: map,
      position: locPosition,
    });

    const iwContent = message;
    const iwRemoveable = true;

    const infowindow = new kakao.maps.InfoWindow({
      content: iwContent,
      removable: iwRemoveable,
    });

    infowindow.open(map, marker);
    map.setCenter(locPosition);
  };

  return (
    <div>
      <div id="map" style={{ width: "500px", height: "400px" }}></div>
    </div>
  );
};

export default Kakaomap;
