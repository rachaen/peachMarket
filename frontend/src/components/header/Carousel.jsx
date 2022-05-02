import React from "react";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import "./carousel.css";

const Carousel = (props) => {
  const BASEURL = "http://localhost:8080/public/uploads";

  return (
    <>
      <div className="arrow">
        <div className="arrow__left">
          <ArrowBackIosIcon onClick={() => props.test(props.id, props.i)} />
        </div>
        <div>
          <ArrowForwardIosIcon onClick={() => props.test2(props.id, props.i)} />
        </div>
      </div>
      <div id="slider-container" className="slider-container-transition" ref={(el) => (props.slideRef.current[props.i] = el)}>
        {props.data &&
          props.data.map((data, i) => {
            return <img src={`${BASEURL}${data}`} key={data} className="slider-item" />;
          })}
      </div>
    </>
  );
};

export default Carousel;
