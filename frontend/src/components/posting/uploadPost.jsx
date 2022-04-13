import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Content from './content';
import Images from './images';
import * as resize from './resize.js';

const UploadePost = (props) => {
  const navigate = useNavigate();
  const [imageList, setImageList] = useState([]); //{id, file, url};

  const [postTextItems, setPostTextItems] = useState({
    title: '',
    category: '',
    price: false,
    priceOffer: false,
    contents: '',
  }); // 서버로 보낼 text데이터
  const formData = new FormData();

  const uploadFile = async (event) => {
    let fileArr = event.target.files; //  사용자가 선택한 파일들
    let imageListLength = imageList.length;
    let filesLength = fileArr.length > 10 ? 10 : fileArr.length; // 최대 10개
    if (imageListLength + filesLength > 10) {
      alert('이미지는 10장을 초과할 수 없습니다.');
      return;
    }

    // resize해서 파일 처리하기
    for (let i = 0; i < filesLength; i++) {
      let newImage = await resize.handleResize(fileArr[i]);
      setImageList((imageList) => [...imageList, newImage]);
    }
    event.target.value = '';
  };

  const getContent = (key, value) => {
    setPostTextItems((item) => ({ ...item, [key]: value }));
  };

  const getImageList = (newImageList) => {
    setImageList(newImageList);
  };

  const handleSubmit = async (event) => {
    if (postTextItems.title === '' || postTextItems.category === '' || postTextItems.contents === '') {
      alert('제목, 카테고리, 내용은 필수 입니다');
      return;
    } else {
      // 이미지 파일
      imageList?.map((eachfile) => {
        return formData.append('img', eachfile.file);
      });
      // postTextItems
      formData.append('title', postTextItems.title);
      formData.append('category', postTextItems.category);
      formData.append('price', postTextItems.price);
      formData.append('priceOffer', postTextItems.priceOffer);
      formData.append('contents', postTextItems.contents);
      await axios({
        method: 'post',
        url: '/post/createPost',
        data: formData,
        headers: { 'Content-Type': 'multipart/form-data' },
      })
        .then((result) => {
          if (result.status === 200) {
            alert('작성 완료');
            navigate('/');
          } else {
            alert('작성 실패');
          }
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <>
      <input id="upload-file" type="file" accept="image/*" multiple onChange={uploadFile}></input>
      <label htmlFor="upload-file">파일선택</label>
      <Images imageList={imageList} getImageList={getImageList} />
      <Content getContent={getContent} />
      <button type="submit" onClick={handleSubmit}>
        제출하기
      </button>
    </>
  );
};

export default UploadePost;
