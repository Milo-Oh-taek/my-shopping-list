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

const TitleWrapper = styled.div`
  width: 100%;
  height: 15%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 20px;
  .title {
    font-size: 3em;
    font-weight: bold;
  }
`;
const RegisterArea = styled.div`
  display: flex;
  justify-content: end;
  margin-right: 3rem;
  .plus {
    width: 60px;
    height: 60px;
    background-color: #3b5998;
    border-radius: 50%;
    font-size: 3rem;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
const MenuWrapper = styled.div`
  display: flex;
  .bullet {
    border: 1px;
    height: 30px;
    width: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    vertical-align: middle;
    background-color: #dfe3ee;
    margin-right: 1rem;
  }
`;
const ListWrapper = styled.div`
  margin: 1rem 0;
  width: 100%;
  height: 70%;
  /* background-color: #f7f7f7; */
  display: flex;
  justify-content: center;

  .listContentArea {
    width: 90%;
    height: 100%;
    background-color: #f7f7f7;
    border-radius: 20px;
    overflow-y: scroll;
  }
`;
const ItemLine = styled.div`
  width: 95%;
  height: 7rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 1rem 1rem;
  font-size: 1.5rem;
  font-weight: bold;
  border-radius: 20px;
  img {
    width: 5rem;
    height: 5rem;
  }
`;

const addClickHandler = () => {
  console.log();
};

function Main() {
  return (
    <Wrapper>
      <ContentWrapper>
        <TitleWrapper>
          <p className="title">My shopping list</p>
          <MenuWrapper>
            <div className="bullet">All</div>
            <div className="bullet">To Buy</div>
            <div className="bullet">Bought</div>
          </MenuWrapper>
        </TitleWrapper>
        <RegisterArea>
          <div className="plus" onClick={addClickHandler}>
            +
          </div>
        </RegisterArea>
        <ListWrapper>
          <div className="listContentArea">
            <ItemLine style={{ backgroundColor: 'grey' }}>
              <span>
                <img src="/royaltoe.jpeg" alt="pic" />
              </span>
              <span
                style={{
                  textDecoration: 'line-through',
                  fontWeight: 'lighter',
                }}
              >
                Royal toe
              </span>
              <span
                style={{
                  textDecoration: 'line-through',
                  fontWeight: 'lighter',
                }}
              >
                Nike
              </span>
              <span
                style={{
                  textDecoration: 'line-through',
                  fontWeight: 'lighter',
                }}
              >
                200$
              </span>
              <span>
                <input type="checkbox" />
              </span>
            </ItemLine>
          </div>
        </ListWrapper>
      </ContentWrapper>
    </Wrapper>
  );
}

export default Main;
