import React from "react";
import SingleCarousel from "../header/singleCarousel";
import "../header/singleCarousel.css";

const ArticlesTemp = (props) => {
  return (
    <>
      {console.log(props.postItems.imgPath)}
      <article className="postDetail">
        <section id="slider-container-outer">
          <SingleCarousel imgPath={props.postItems.imgPath} />
        </section>

        <section className="postDetail__profile">
          <div>
            <img src="https://t1.daumcdn.net/cfile/tistory/24283C3858F778CA2E" alt="" className="postDetail__profile__img" />
          </div>
          <div>
            <div className="postDetail__profile__nickname">{props.postItems.nickName}</div>
            <div className="postDetail__profile__address">{props.postItems.address}</div>
          </div>
        </section>
      </article>
    </>
  );
};

export default ArticlesTemp;
