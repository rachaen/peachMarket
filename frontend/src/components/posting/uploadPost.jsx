import axios from 'axios';
import React, { useState } from 'react';
import Content from './content';
import Images from './images';

const UploadePost = (props) => {
  const [postImages, setPostImages] = useState([]); // 서버로 보낼 이미지 데이터
  const [detailImages, setDetailImages] = useState([]); // 프리뷰 보여줄 이미지 데이터
  const [postTextItems, setPostTextItems] = useState({
    title: '',
    category: '',
    price: '',
    priceOffer: '',
    contents: '',
  }); // 서버로 보낼 text데이터
  const formData = new FormData();

  const uploadFile = (event) => {
    let fileArr = event.target.files; //  사용자가 선택한 파일들
    setPostImages(Array.from(fileArr)); //
    let fileURLs = [];
    let filesLength = fileArr.length > 10 ? 10 : fileArr.length; // 최대 10개

    // 프리뷰
    for (let i = 0; i < filesLength; i++) {
      let file = fileArr[i];
      let reader = new FileReader();
      reader.onload = () => {
        fileURLs[i] = reader.result;
        setDetailImages([...fileURLs]);
      };
      reader.readAsDataURL(file); // 파일을 읽어 버퍼에 저장
    }
  };

  const getContent = (key, value) => {
    setPostTextItems((item) => ({ ...item, [key]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (postTextItems.title === '' || postTextItems.category === '' || postTextItems.contents === '') {
      alert('제목, 카테고리, 내용은 필수 입니다');
    } else {
      // 이미지 파일
      postImages?.map((eachfile) => {
        return formData.append('json', JSON.stringify({ img: eachfile }));
      });
      // postTextItems
      formData.append(
        'json',
        JSON.stringify({
          title: postTextItems.title,
          category: postTextItems.category,
          price: postTextItems.price,
          priceOffer: postTextItems.priceOffer,
          contents: postTextItems.contents,
        })
      );
      await axios({
        method: 'post',
        url: '/post/createPost',
        data: formData,
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    }
  };

  return (
    <>
      <input id="upload-file" type="file" accept="image/*, video/*" multiple onChange={uploadFile}></input>
      <label htmlFor="upload-file">파일선택</label>
      <Images detailImages={detailImages} />
      <Content getContent={getContent} />
      <button type="submit" onClick={handleSubmit}>
        제출하기
      </button>
    </>
  );
};

export default UploadePost;
