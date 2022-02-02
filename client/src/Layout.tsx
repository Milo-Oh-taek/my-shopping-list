import React from 'react';
import styled from 'styled-components';

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
`;

// eslint-disable-next-line react/prop-types
const Layout = ({ child }: any) => {
  return (
    <Wrapper>
      <ContentWrapper>{child}</ContentWrapper>
    </Wrapper>
  );
};

export default Layout;
