import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AxiosConfig from '../loading/axiosConfig';

import './home.css';

const Home = (props) => {
  const navigate = useNavigate();
  const BASEURL = 'http://localhost:8080/public/uploads';
  const slideRef = useRef([]);
  const [postData, setPostData] = useState();
  const [imgData, setImgData] = useState();
  let axiosConfig = new AxiosConfig();
  useEffect(() => {
    axiosConfig.initInterceptor();
    axios.get('/post/getPosts').then((result) => {
      setPostData(result.data.result);
    });
  }, []);

  useEffect(() => {}, [postData]);

  const test = (postId, i) => {
    let copyArray = [...postData];
    const findIndex = postData.findIndex((data) => data.postId == postId);
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
      slideRef.current[i].style.transition = 'all 0.5s ease-in-out';
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
      console.log(currentSlide);

      if (currentSlide >= copyArray[findIndex].imgPath.length - 1) {
        currentSlide = 0;
        copyArray[findIndex] = { ...copyArray[findIndex], currentSlide: currentSlide };
      } else {
        currentSlide = currentSlide + 1;
        copyArray[findIndex] = { ...copyArray[findIndex], currentSlide: copyArray[findIndex].currentSlide + 1 };
      }
      slideRef.current[i].style.transition = 'all 0.5s ease-in-out';
      slideRef.current[i].style.transform = `translateX(-${currentSlide}00%)`;
      setPostData(copyArray);
    }
  };

  const goToArticle = (postId) => {
    return navigate(`/articles/${postId}`);
  };
  return (
    <>
      <main className="grid">
        {postData &&
          postData.map((data, i) => {
            return (
              <article key={data.postId} onClick={() => goToArticle(data.postId)}>
                <div className="window">
                  <label className="left" onClick={() => test(data.postId, i)}>
                    왼쪽화살표
                  </label>
                  <div className="carosel" ref={(el) => (slideRef.current[i] = el)}>
                    {data.imgPath &&
                      data.imgPath.map((data) => {
                        return <img src={`${BASEURL}${data}`} key={data} className="grid__img" />;
                      })}
                  </div>
                  <label className="right" onClick={() => test2(data.postId, i)}>
                    오른쪽화살표
                  </label>
                </div>
                <div className="text">
                  <h3>Seamlessly visualize quality</h3>
                  <p>Collaboratively administrate empowered markets via plug-and-play networks.</p>
                  <button>Here's why</button>
                </div>
              </article>
            );
          })}
        <article>
          <div className="window">
            <label className="left" onClick={test}>
              왼쪽화살표
            </label>
            <div className="carosel" ref={slideRef}>
              <div>
                <img
                  src="https://lwi.nexon.com/maplestory/banner/2022/0113/main_bn_220113_7C33P42WS640P057.jpg"
                  alt="Sample photo"
                  className="grid__img"
                />
              </div>
              <img
                src="https://lwi.nexon.com/maplestory/banner/2022/0310/main_bn_220310_659EDD3B5E9ED26A.jpg"
                alt="Sample photo"
                className="grid__img"
              />
            </div>
            <label className="right">오른쪽화살표</label>
          </div>
          <div className="text">
            <h3>Seamlessly visualize quality</h3>
            <p>Collaboratively administrate empowered markets via plug-and-play networks.</p>
            <button>Here's why</button>
          </div>
        </article>
        <article>
          <div className="text">
            <h3>Completely Synergize</h3>
            <p>
              Dramatically engage seamlessly visualize quality intellectual capital without superior collaboration and
              idea-sharing.
            </p>
            <button>Here's how</button>
          </div>
        </article>
        <article>
          <img src="/pix/samples/22l.jpg" alt="Sample photo" />
          <div className="text">
            <h3>Dynamically Procrastinate</h3>
            <p>Completely synergize resource taxing relationships via premier niche markets.</p>
            <button>Read more</button>
          </div>
        </article>
        <article>
          <img src="/pix/samples/15l.jpg" alt="Sample photo" />
          <div className="text">
            <h3>Best in class</h3>
            <p>Imagine jumping into that boat, and just letting it sail wherever the wind takes you...</p>
            <button>Just do it...</button>
          </div>
        </article>
        <article>
          <img src="/pix/samples/25m.jpg" alt="Sample photo" />
          <div className="text">
            <h3>Dynamically innovate supply chains</h3>
            <p>Holisticly predominate extensible testing procedures for reliable supply chains.</p>
            <button>Here's why</button>
          </div>
        </article>
        <article>
          <img src="/pix/samples/16l.jpg" alt="Sample photo" />
          <div className="text">
            <h3>Sanity check</h3>
            <p>Objectively innovate empowered manufactured products whereas parallel platforms.</p>
            <button>Stop here</button>
          </div>
        </article>
      </main>
    </>
  );
};

export default Home;
