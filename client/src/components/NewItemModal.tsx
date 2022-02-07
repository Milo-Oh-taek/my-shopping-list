import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { createItem, createItemWithImg, uploadFile } from '../api';
import useVerifyUser from '../hooks/useVerifyUser';
import { ItemInfo } from './Item';

const ModalDiv = styled.div`
  position: absolute;
  width: 50%;
  height: 60%;
  background-color: white;
  border-radius: 20px;
  z-index: 300;
  overflow: auto;
  transform: translateY();
  .title {
    margin-top: 3rem;
    font-size: 3rem;
    font-weight: bold;
  }
  .priceInput {
    width: 120px;
    margin-right: 1rem;
  }
  .active {
    background-color: yellow;
  }
  .error {
    font-weight: bold;
    color: red;
    font-size: 1rem;
  }
  @media screen and (max-width: 767px) {
    width: 80%;
    height: 70%;
    .title {
      margin-top: 1rem;
      font-size: 2rem;
      font-weight: bold;
    }
    .priceInput {
      width: 70px;
      margin-right: 1rem;
    }
  }
`;

const Form = styled.form`
  margin-top: 5%;
  span {
    font-size: 2rem;
    font-weight: bold;
    margin-right: 1rem;
  }
  input {
    width: 200px;
    height: 40px;
    border-radius: 5px;
    border: 3px solid;
    margin-bottom: 2px;
    font-size: 1.5rem;
  }
  div {
    margin-bottom: 5%;
  }
  select {
    width: 200px;
    height: 40px;
    border: 3px solid;
    border-radius: 5px;
    font-size: 1.5rem;
  }
  @media screen and (max-width: 767px) {
    margin-top: 15%;
    span {
      font-size: 1rem;
      margin-right: 1rem;
    }
    input {
      width: 40%;
      height: 40%;
      margin-bottom: 2%;
      font-size: 1rem;
    }
    select {
      width: 40%;
      height: 40%;
      border: 3px solid;
      font-size: 1rem;
    }
  }
`;

const PriceArea = styled.div`
  display: inline;
`;

const CurrencyBtn = styled.div`
  display: inline;
  height: 40px;
  width: 30px;
  border: black 2px solid;
  font-size: 1.5rem;
  cursor: pointer;
  @media screen and (max-width: 767px) {
    height: 20px;
    width: 30px;
    font-size: 1rem;
  }
`;

const DeleteArea = styled.div`
  float: right;
  cursor: pointer;
  margin: 5px;
`;

const SubmitArea = styled.div`
  display: flex;
  justify-content: center;
  /* margin-top: 5%; */
  .submitBtn {
    width: 300px;
    height: 40px;
    background-color: #3b5998;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    border: black 3px solid;
    color: white;
    cursor: pointer;
  }
  @media screen and (max-width: 767px) {
    .submitBtn {
      width: 200px;
      height: 30px;
    }
  }
`;

const InputImage = styled.label`
  width: 100px;
  height: 100px;
  border: 2px dashed #bbbbbb;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  input {
    display: none;
  }
  img {
    width: 100%;
    height: 100%;
  }
  @media screen and (max-width: 767px) {
    width: 8em;
    height: 8em;
  }
`;

interface PropsType {
  modalToggle: () => void;
  addNewItem: (item: ItemInfo) => void;
  modalActive: boolean;
}

const NewItemModal = ({ modalToggle, addNewItem }: PropsType) => {
  const priceRef = useRef<HTMLInputElement>(null);
  const [currency, setCurrency] = useState('KRW');
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [imgFile, setImgFile] = useState<Blob>();
  const [imgBg, setImgBg] = useState('');
  const [category, setCategory] = useState('fashion');
  const [errorString, setErrorString] = useState('');

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = useVerifyUser();
    const price = priceRef.current?.value;
    if (!token || !category || !name || !brand || !price || Number.isNaN(price))
      return setErrorString('Please check the form');

    if (Number(price) < 0 || Number(price) > 99999999)
      return setErrorString('Please check the price');

    const formData = new FormData();
    formData.append('name', name);
    formData.append('brand', brand);
    formData.append('price', price);
    formData.append('token', token);
    formData.append('category', category);
    if (imgFile) {
      formData.append('image', imgFile);
    }

    createItemWithImg(formData)
      .then(res => addNewItem(res.data))
      .then(() => modalToggle())
      .catch(err => {
        const message = err.response.data.message;
        if (message) {
          setErrorString(message);
        } else {
          setErrorString('File too big');
        }
      });
  };

  const onLoadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    if (errorString) setErrorString('');

    const file = e.target.files[0];
    const reader = new FileReader();
    setImgFile(file);
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImgBg(reader.result as string);
    };
  };

  return (
    <ModalDiv>
      <DeleteArea className="deleteDiv" onClick={modalToggle}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-x-square"
          viewBox="0 0 16 16"
        >
          <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
          <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
        </svg>
      </DeleteArea>
      <div className="title">I want to buy ...</div>
      <Form onSubmit={submitHandler}>
        <div>
          <div>
            <span>Category</span>
            <select required onChange={e => setCategory(e.target.value)}>
              <option>fashion</option>
              <option>gadget</option>
              <option>household</option>
              <option>recreation</option>
              <option>food</option>
            </select>
          </div>
          <span>Name</span>
          <input
            type="text"
            value={name}
            maxLength={12}
            required
            onChange={e => setName(e.target.value)}
          />
        </div>
        <div>
          <span>Brand</span>
          <input
            type="text"
            value={brand}
            maxLength={12}
            required
            onChange={e => setBrand(e.target.value)}
          />
        </div>
        <PriceArea>
          <span>Price</span>
          <input
            type="number"
            ref={priceRef}
            max="99999999"
            required
            className="priceInput"
          />
          <CurrencyBtn
            className={`${currency === 'KRW' ? 'active' : null}`}
            onClick={() => setCurrency('KRW')}
          >
            KRW
          </CurrencyBtn>
          <CurrencyBtn
            className={`${currency === 'GBP' ? 'active' : null}`}
            onClick={() => setCurrency('GBP')}
          >
            GBP
          </CurrencyBtn>
          <CurrencyBtn
            className={`${currency === 'USD' ? 'active' : null}`}
            onClick={() => setCurrency('USD')}
          >
            USD
          </CurrencyBtn>
        </PriceArea>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '1.5rem',
          }}
        >
          <InputImage htmlFor="input-file">
            {imgFile && imgBg ? (
              <img src={imgBg} alt="file" />
            ) : (
              <>
                <div style={{ fontSize: '24px' }}>+</div>
                <div>Image</div>
              </>
            )}
            <input
              type="file"
              id="input-file"
              name="file1"
              accept="image/*"
              onChange={onLoadFile}
            />
          </InputImage>
        </div>
        {!imgFile ? (
          <div style={{ fontSize: '1rem' }}>Image: png, jpg, jpeg (~5mb)</div>
        ) : null}
        {errorString ? <span className="error">{errorString}</span> : null}
        <SubmitArea>
          <button type="submit" className="submitBtn">
            Register
          </button>
        </SubmitArea>
      </Form>
    </ModalDiv>
  );
};

export default NewItemModal;
