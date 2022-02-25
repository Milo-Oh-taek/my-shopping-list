import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { signin } from './api';

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
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .title {
    font-size: 3em;
    font-weight: bold;
  }
  .loginForm {
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
    .title {
      font-size: 2em;
    }
    img {
      margin: 10% 0;
      width: 60%;
    }
    .submit {
      width: 90%;
    }
    input {
      width: 90%;
      font-size: 1rem;
    }
  }
`;

const Login = () => {
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

  const LoginHandler = () => {
    signin({ email: emailInput, password: passwordInput })
      .then(function () {
        nagivate('/main');
      })
      .catch(function (err) {
        const message = err.response.data.message;
        setErrorString(message);
      });
  };

  return (
    <Wrapper>
      <ContentWrapper>
        <Content>
          <p className="title">My shopping list</p>
          <img src="/shoppingcart.png" />
          <div className="loginForm">
            <div>
              <input
                type="text"
                placeholder="UserId"
                onChange={e => setEmailInput(e.target.value)}
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                onChange={e => setPasswordInput(e.target.value)}
              />
            </div>
            {errorString ? <span className="error">{errorString}</span> : null}
            <div className="submit" onClick={LoginHandler}>
              Login
            </div>
            <Link to="/signup">Go to Sign up!</Link>
          </div>
        </Content>
      </ContentWrapper>
    </Wrapper>
  );
};

export default Login;
