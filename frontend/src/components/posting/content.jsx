import React from 'react';

const Content = ({ getContent }) => {
  const categoryList = [
    '디지털기기',
    '생활가전',
    '가구/인테리어',
    '유아동',
    '생활/가공식품',
    '유아도서',
    '스포츠/레저',
    '여성잡화',
    '여성의류',
    '남성패션/잡화',
    '게임/취미',
    '뷰티/미용',
    '반려동물용품',
    '도서/티켓/음반',
    '식물',
    '기타중고물품',
    '삽니다',
  ];

  const handleSelect = (event) => {
    getContent('category', event.target.value);
  };

  const handlePriceOffer = (event) => {
    getContent('priceOffer', event.target.checked);
  };

  const inputBlur = (event) => {
    const {
      target: { name, value },
    } = event;
    getContent(name, value);
  };

  return (
    <>
      <input name="title" onBlur={inputBlur} placeholder="글 제목" />
      <select onChange={handleSelect}>
        <option value="">선택</option>
        {categoryList.map((item) => (
          <option value={item} key={item}>
            {item}
          </option>
        ))}
      </select>
      <input name="price" placeholder="가격(선택사항)" onChange={handlePriceOffer} />
      <label>
        <input name="priceOffer" type="checkbox" onChange={handlePriceOffer} />
        가격제안받기
      </label>
      <textarea
        name="contents"
        onBlur={inputBlur}
        placeholder="물품에 대한 자세한 정보를 작성하면 판매확률이 올라가요!"
      ></textarea>
    </>
  );
};

export default Content;
