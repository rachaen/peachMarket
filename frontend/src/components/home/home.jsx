import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import Carousel from "../header/Carousel";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";

import "./home.css";

const Home = (props) => {
  const navigate = useNavigate();
  const BASEURL = "http://localhost:8080/public/uploads";
  const slideRef = useRef([]);
  const [postData, setPostData] = useState();
  const [imgData, setImgData] = useState();
  let axiosConfig = new AxiosConfig();
  useEffect(() => {
    axiosConfig.initInterceptor();
    axios.get("/post/getPosts").then((result) => {
      setPostData(result.data.result);
    });
  }, []);

  useEffect(() => {}, [postData]);

  const test = (postId, i) => {
    let copyArray = [...postData];
    const findIndex = postData.findIndex((data) => data.postId === postId);
    let currentSlide;
    if (findIndex != -1) {
      currentSlide = copyArray[findIndex].currentSlide;
      if (currentSlide === 0) {
        currentSlide = copyArray[findIndex].imgPath.length - 1;
        copyArray[findIndex] = { ...copyArray[findIndex], currentSlide: currentSlide };
      } else {
        currentSlide = currentSlide - 1;
        copyArray[findIndex] = { ...copyArray[findIndex], currentSlide: copyArray[findIndex].currentSlide - 1 };
      }
      slideRef.current[i].style.transition = "all 0.5s ease-in-out";
      slideRef.current[i].style.transform = `translateX(-${currentSlide}00%)`;
      setPostData(copyArray);
    }
  };

  const test2 = (postId, i) => {
    let copyArray = [...postData];
    const findIndex = postData.findIndex((data) => data.postId == postId);
    let currentSlide;
    if (findIndex != -1) {
      currentSlide = copyArray[findIndex].currentSlide;
      if (currentSlide >= copyArray[findIndex].imgPath.length - 1) {
        currentSlide = 0;
        copyArray[findIndex] = { ...copyArray[findIndex], currentSlide: currentSlide };
      } else {
        currentSlide = currentSlide + 1;
        copyArray[findIndex] = { ...copyArray[findIndex], currentSlide: copyArray[findIndex].currentSlide + 1 };
      }
      slideRef.current[i].style.transition = "all 0.5s ease-in-out";
      slideRef.current[i].style.transform = `translateX(-${currentSlide}00%)`;
      setPostData(copyArray);
    }
  };

  const goToArticle = (postId) => {
    return navigate(`/articles/${postId}`);
  };
  return (
    <>
      <article className="grid">
        {postData &&
          postData.map((data, i) => {
            return (
              <section id="slider-container-outer" key={data.postId}>
                <Carousel data={data.imgPath} id={data.postId} test={test} test2={test2} i={i} slideRef={slideRef} />
                <div className="text">
                  <h3>{data.title}</h3>
                  <p>가격 : {data.price}</p>
                </div>
                <div className="good">
                  <div className="material-icons">
                    <FavoriteBorder></FavoriteBorder>
                    <div>5555</div>
                  </div>
                  <div>{data.regDate}</div>
                </div>
              </section>
            );
          })}
      </article>
    </>
  );
};

export default Home;
