import React from 'react';
import styled from 'styled-components';

export interface ItemInfo {
  _id: string;
  brand: string;
  email: string;
  name: string;
  price: string;
  createdAt: string;
  updatedAt: string;
  done: boolean;
  image?: string;
  category: string;
}

interface PropsType {
  data: ItemInfo;
  updateRefresh: (itemId: string, done: boolean) => void;
  deleteRefresh: (itemId: string) => void;
}

const Wrapper = styled.div`
  .doneDiv {
    background-color: grey;
  }
  .doneSpan {
    text-decoration: line-through;
    font-weight: lighter;
  }
  .doneImg {
    filter: brightness(50%);
  }
`;

const ItemWrapper = styled.div`
  background-color: #dfe3ee;
  border-radius: 20px;
`;

const ItemLine = styled.div`
  width: 95%;
  height: 7rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1rem 1rem;
  font-size: 1.5rem;
  font-weight: bold;
  border-radius: 20px;
  img {
    width: 5rem;
    height: 5rem;
  }
  .itemName {
    width: 30%;
  }
  .itemBrand,
  .itemPrice {
    width: 20%;
  }
  @media screen and (max-width: 767px) {
    height: 5rem;
    font-size: 1rem;
    margin: 0 5px 5px 10px;
    img {
      width: 4rem;
      height: 4rem;
    }
    .itemName {
      width: 35%;
    }
    .itemBrand,
    .itemPrice {
      width: 5rem;
      font-size: 0.8rem;
    }
  }
`;

const DeleteArea = styled.div`
  float: right;
  cursor: pointer;
  margin: 5px;
  @media screen and (max-width: 767px) {
    height: 0.5rem;
    margin: 2px 5px 0 0;
    display: inline;
  }
`;

const Item = ({ data, updateRefresh, deleteRefresh }: PropsType) => {
  const done = data.done;

  const deleteHandler = () => {
    if (!data._id) return;
    if (confirm('Want to delete this item?')) {
      deleteRefresh(data._id);
    }
  };

  return (
    <Wrapper>
      <DeleteArea className="deleteDiv" onClick={deleteHandler}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="12"
          fill="currentColor"
          className="bi bi-x-square"
          viewBox="0 0 16 16"
        >
          <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
          <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
        </svg>
      </DeleteArea>
      <ItemWrapper className={`${done ? 'doneDiv' : ''}`}>
        <ItemLine>
          <span>
            <img
              src={`https://miloshoppinglist.s3.ap-northeast-2.amazonaws.com/${data.image}`}
              onError={e => {
                e.currentTarget.src = '/shoppingcart.png';
              }}
              alt="pic"
              className={`${done ? 'doneImg' : ''}`}
            />
          </span>
          <div className={'itemName ' + `${done ? 'doneSpan' : ''}`}>
            {data.name}
          </div>
          <div className={'itemBrand ' + `${done ? 'doneSpan' : ''}`}>
            {data.brand}
          </div>
          <div className={'itemPrice ' + `${done ? 'doneSpan' : ''}`}>
            {data.price}$
          </div>
          <span>
            <input
              type="checkbox"
              onChange={() => updateRefresh(data._id, !done)}
              checked={done}
            />
          </span>
        </ItemLine>
      </ItemWrapper>
    </Wrapper>
  );
};

export default Item;
