import React, { useRef } from 'react';

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

  const priceOfferRef = useRef(null);
  const priceOfferLabelRef = useRef(null);

  const handleSelect = (event) => {
    getContent('category', event.target.value);
  };

  const handlePrice = (event) => {
    const keyCode = event.keyCode;
    let value = event.target.value;
    if (value === '0') {
      priceOfferLabelRef.current.innerText = '나눔 이벤트 열기';
    } else {
      priceOfferLabelRef.current.innerText = '가격제안받기';
    }
    const isValid =
      (keyCode >= 48 && keyCode <= 57) || // Numbers
      keyCode === 8; // BackSpace

    if (!isValid) {
      event.target.value = value.slice(0, -1);
      return;
    } else {
      let onlyNumber = Number(value.replaceAll(',', ''));
      const formatValue = onlyNumber.toLocaleString('ko-KR');
      if (formatValue === '0' && keyCode === 8) {
        event.target.value = '';
        getContent('price', 'false');
        priceOfferRef.current.checked = false;
        priceOfferRef.current.disabled = true;
        return;
      }
      getContent('price', onlyNumber);
      event.target.value = formatValue;
      priceOfferRef.current.disabled = false;
      return;
    }
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
      <input name="price" type="text" placeholder="가격(선택사항)" onKeyUp={handlePrice} />
      <div>
        <label for="priceOffer" ref={priceOfferLabelRef}>
          가격제안받기
        </label>
        <input
          disabled
          ref={priceOfferRef}
          id="priceOffer"
          name="priceOffer"
          type="checkbox"
          onChange={handlePriceOffer}
        />
      </div>

      <textarea
        name="contents"
        onBlur={inputBlur}
        placeholder="물품에 대한 자세한 정보를 작성하면 판매확률이 올라가요!"
      ></textarea>
    </>
  );
};

export default Content;
