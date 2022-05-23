import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { createStore } from "redux";
import reducer from "../../_reducers/index";
import ArticlesTemp from "./articlesTemp";
import AxiosConfig from "../loading/axiosConfig";
import { useNavigate } from "react-router-dom";

const Articles = () => {
  const navigate = useNavigate();
  let { postId } = useParams();
  let store = createStore(reducer);
  let axiosConfig = new AxiosConfig();

  const [postItems, setPostItems] = useState({
    category: "",
    contents: "",
    currentSlide: "",
    imgPath: "",
    likeCount: "",
    postId: postId,
    price: "",
    priceOffer: "",
    regDate: "",
    state: "",
    title: "",
    userId: "",
    viewCount: "",
  });

  useEffect(() => {
    // store.dispatch({ type: 'visibleSpinner', containerName: 'articles' });
    store.dispatch({ type: "visibleSpinner" });
    console.log(store.getState());
    axiosConfig.initInterceptor();
    axios
      .get(`/post/getDetailPost?postId=${postId}`)
      .then((result) => {
        let data = result.data.result;
        if (result.status === 200) {
          setPostItems((item) => ({
            ...item,
            nickName: data.nickName,
            address: data.address,
            category: data.category,
            contents: data.contents,
            currentSlide: data.currentSlide,
            imgPath: data.imgPath,
            likeCount: data.likeCount,
            price: data.price,
            priceOffer: data.priceOffer,
            regDate: data.regDate,
            state: data.state,
            title: data.title,
            userId: data.userId,
            viewCount: data.viewCount,
          }));
        } else {
          console.log(result);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // 수정버튼클릭 이벤트
  const handleModify = (event) => {
    console.log(postItems);
    navigate(`/modifyArticle/${postId}`, { state: { postItems: postItems } });
  };
  return (
    <>
      <ArticlesTemp postItems={postItems} />
      <button onClick={handleModify}>수정하기</button>
    </>
  );
};

export default Articles;
