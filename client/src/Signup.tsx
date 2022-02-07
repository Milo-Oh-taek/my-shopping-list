import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { signup } from './api';

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #3b5998;
`;

const ContentWrapper = styled.div`
  width: 70vw;
  height: 70vh;
  background-color: white;
  border-radius: 20px;
  @media screen and (max-width: 767px) {
    width: 80vw;
    height: 80vh;
  }
`;

const Content = styled.div`
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #dfe3ee;
  border-radius: 5px;
  .title {
    font-size: 3em;
    font-weight: bold;
  }
  .form {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-top: 5%;
    width: 80%;
  }
  .submit {
    width: 250px;
    height: 40px;
    color: white;
    background-color: #3b5998;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    border: black 3px solid;
    cursor: pointer;
  }
  .error {
    font-weight: bold;
    color: red;
  }
  input {
    width: 250px;
    height: 40px;
    border-radius: 5px;
    border: 3px solid;
    margin-bottom: 2px;
    font-size: 1.5rem;
  }
  img {
    margin-top: 2rem;
    width: 250px;
  }
  @media screen and (max-width: 767px) {
    input {
      width: 90%;
      font-size: 1rem;
    }
    .submit {
      width: 90%;
    }
  }
`;

const Signup = () => {
  const nagivate = useNavigate();
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [errorString, setErrorString] = useState('');

  useEffect(() => {
    if (!errorString) {
      return;
    }
    setErrorString('');
  }, [emailInput, passwordInput]);

  const submitHandler = () => {
    //email, password 빈값 검사
    if (!emailInput || !passwordInput) {
      return setErrorString('Need to fill out the forms');
    }
    //email, password 유효성 검사
    const passLength = passwordInput.length;
    if (passLength < 6 || passLength > 8 || !validateEmail(emailInput)) {
      return setErrorString('Invalid forms');
    }

    signup({ email: emailInput, password: passwordInput })
      .then(function (res) {
        alert('Registered!');
        nagivate('/', { replace: true });
      })
      .catch(function (err) {
        const message = err.response.data.message;
        setErrorString(message);
      });
  };

  // Email 유효성 검사 정규표현식
  const validateEmail = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  return (
    <Wrapper>
      <ContentWrapper>
        <Content>
          <p className="title">Sign up</p>
          <div className="form">
            <div>
              <input
                type="email"
                placeholder="UserEmail"
                maxLength={30}
                onChange={e => setEmailInput(e.target.value)}
              />
            </div>
            <div>
              <input
                type="password"
                maxLength={30}
                placeholder="Password(6~8)"
                onChange={e => setPasswordInput(e.target.value)}
              />
            </div>
            {errorString ? <span className="error">{errorString}</span> : null}
            <div className="submit" onClick={submitHandler}>
              Sign up
            </div>
          </div>
        </Content>
      </ContentWrapper>
    </Wrapper>
  );
};

export default Signup;
