import React from "react";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

const SingleCarousel = (props) => {
  const BASEURL = "http://localhost:8080/public/uploads";
  return (
    <>
      <div className="postDetail__arrow">
        <div className="postDetail__arrow__left">
          <ArrowBackIosIcon />
        </div>
        <div>
          <ArrowForwardIosIcon />
        </div>
      </div>
      <div id="slider-container" className="slider-container-transition">
        {props.imgPath &&
          props.imgPath.map((data, i) => {
            return <img src={`${BASEURL}${data}`} key={data} className="slider-item" />;
          })}
      </div>
    </>
  );
};

export default SingleCarousel;
