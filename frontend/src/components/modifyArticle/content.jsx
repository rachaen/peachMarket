import React, { useRef, useState } from 'react';

const Content = ({ getContent, originalData }) => {
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

  const priceRef = useRef(null);
  const priceOfferRef = useRef(null);
  const priceOfferLabelRef = useRef(null);

  const handleSelect = (event) => {
    getContent('category', event.target.value);
  };

  const handlePrice = (event) => {
    if (
      (event.keyCode > 47 && event.keyCode < 58) ||
      event.keyCode === 8 || //backspace
      event.keyCode === 37 ||
      event.keyCode === 39 || //방향키 →, ←
      event.keyCode === 46 //delete키
    ) {
      return;
    } else {
      event.preventDefault();
    }
  };

  const priceModify = (event) => {
    let data = event.nativeEvent.data;
    let value = priceRef.current.value;
    if (value === '') {
      priceOfferRef.current.checked = false;
      priceOfferRef.current.disabled = true;
      getContent('price', 'false');
      getContent('priceOffer', 'false');
      return;
    } else if (value === '0') {
      priceOfferLabelRef.current.innerText = '나눔 이벤트 열기';
      priceRef.current.disabled = true;
      priceRef.current.value = '나눔';
      priceOfferRef.current.disabled = false;
      priceOfferRef.current.checked = true;
      getContent('price', 'giveaway');
      getContent('priceOffer', 'true');
      return;
    } else {
      priceOfferRef.current.disabled = false;
    }
    if (data >= 0 && data <= 9) {
      let onlyNumber = Number(value.replaceAll(',', ''));
      const formatValue = onlyNumber.toLocaleString('ko-KR');
      getContent('price', onlyNumber);
      priceRef.current.value = formatValue;
    } else {
      let priceExp = /^[,0-9]/g;
      if (!priceExp.test(data)) {
        const formatValue = value.replaceAll(/[^,0-9]/g, '');
        priceRef.current.value = formatValue;
      }
    }
  };

  const handlePriceOffer = (event) => {
    if (priceRef.current.value === '나눔' && !event.target.checked) {
      priceRef.current.disabled = false;
      priceRef.current.value = '';
      priceOfferLabelRef.current.innerText = '가격제안받기';
      priceOfferRef.current.disabled = true;
      getContent('price', 'false');
    }
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
      <input name="title" onBlur={inputBlur} placeholder="글 제목" defaultValue={originalData.title} />
      <select onChange={handleSelect}>
        <option defaultValue={originalData.category}>{originalData.category}</option>
        {categoryList.map(
          (item) =>
            item !== originalData.category && (
              <option defaultValue={item} key={item}>
                {item}
              </option>
            )
        )}
      </select>

      <div>
        <input
          ref={priceRef}
          name="price"
          type="text"
          placeholder="가격(선택사항)"
          maxLength="12"
          onKeyDown={handlePrice}
          onChange={priceModify}
          defaultValue={originalData.price}
        />
        <label htmlFor="priceOffer" ref={priceOfferLabelRef} defaultValue={originalData.priceOffer}>
          가격제안받기
        </label>
        <input
          disabled
          ref={priceOfferRef}
          id="priceOffer"
          name="priceOffer"
          type="checkbox"
          onChange={handlePriceOffer}
          defaultValue={originalData.priceOffer}
        />
      </div>

      <textarea
        name="contents"
        onBlur={inputBlur}
        placeholder="물품에 대한 자세한 정보를 작성하면 판매확률이 올라가요!"
        defaultValue={originalData.contents}
      ></textarea>
    </>
  );
};

export default Content;
