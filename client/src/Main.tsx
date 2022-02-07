import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { deleteItem, getItemList, updateItem } from './api';
import Item from './components/Item';
import { ItemInfo } from './components/Item';
import Dimmer from './components/Dimmer';
import NewItemModal from './components/NewItemModal';
import useVerifyUser from './hooks/useVerifyUser';
import DoughnutChart, { doughnutData } from './components/DoughnutChart';

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #3b5998;
  z-index: 100;
`;

const ContentWrapper = styled.div`
  width: 70vw;
  height: 85vh;
  background-color: white;
  border-radius: 20px;
  @media screen and (max-width: 1023px) {
    width: 80vw;
    height: 80vh;
  }

  @media screen and (max-width: 767px) {
    width: 90vw;
    height: 90vh;
  }
`;

const TitleWrapper = styled.div`
  width: 100%;
  height: 30%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 20px;
  .title {
    font-size: 3em;
    font-weight: bold;

    @media screen and (max-width: 767px) {
      font-size: 2em;
      font-weight: bold;
    }
  }
`;
const RegisterArea = styled.div`
  display: flex;
  justify-content: end;
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
    cursor: pointer;
    margin-right: 3rem;
    @media screen and (max-width: 767px) {
      width: 40px;
      height: 40px;
      margin-right: 0rem;
    }
  }
`;
const MenuWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 1rem;
  .bullet {
    border: 1px;
    height: 30px;
    width: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    vertical-align: middle;
    background-color: #dfe3ee;
    margin: 0 1rem 0.5rem 1rem;
    padding: 0 1rem;
    cursor: pointer;
  }
  .active {
    background-color: #8b9dc3;
  }
`;
const ListWrapper = styled.div`
  /* margin: 1rem 0; */
  width: 100%;
  height: 60%;
  background-color: #f7f7f7;
  display: flex;
  justify-content: center;
  align-items: center;

  .listContentArea {
    width: 90%;
    height: 100%;
    background-color: #f7f7f7;
    border-radius: 20px;
    overflow-y: scroll;
    @media screen and (max-width: 767px) {
      width: 95%;
    }
  }
  .graphContentArea {
    width: 35%;
    height: 100%;
    margin-top: 3rem;
    border-radius: 20px;
    overflow-y: auto;
    @media screen and (max-width: 767px) {
      width: 95%;
    }
  }
  .emptyContentArea {
    font-weight: bold;
    font-size: 2rem;
  }
`;

function Main() {
  const nagivate = useNavigate();
  const token = useVerifyUser();
  const [isModalOn, setIsModalOn] = useState(false);
  const [filter, setFilter] = useState('all');
  const [doughnutData, setDoughnutData] = useState<doughnutData>();
  const [itemList, setItemList] = useState<ItemInfo[]>([]);
  const [filteredList, setFilteredList] = useState<ItemInfo[]>([]);

  useEffect(() => {
    if (!token) {
      return nagivate('/');
    }
    getItemList(token).then(res => {
      setItemList(res.data);
    });
  }, []);

  useEffect(() => {
    switch (filter) {
      case 'all':
        setFilteredList(itemList);
        break;
      case 'yet':
        setFilteredList(itemList.filter(i => i.done === false));
        break;
      case 'bought':
        setFilteredList(itemList.filter(i => i.done === true));
        break;
      case 'doughnut':
        makeDoughnutData();
        break;
      default:
        alert('Error occured!');
    }
  }, [filter, itemList]);

  const makeDoughnutData = () => {
    type ObjType = {
      [index: string]: number;
    };
    const collect: ObjType = {};
    for (let i = 0; i < itemList.length; i++) {
      const item = itemList[i];
      const cate = item.category;
      if (!collect[cate]) collect[cate] = 0;
      collect[cate] = collect[cate] + Number(item.price);
    }

    const chartData = {
      datasets: [
        {
          data: Object.values(collect),
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(255, 159, 64)',
          ],
          options: {
            responsive: true,
          },
        },
      ],
      labels: Object.keys(collect),
    };

    setDoughnutData(chartData);
  };

  const updateRefreshHandler = (_id: string, done: boolean) => {
    updateItem({ _id, done, token })
      .then(() => {
        setItemList(
          itemList.map(item =>
            item._id !== _id ? item : { ...item, done: !item.done }
          )
        );
      })
      .catch(err => {
        const message = err.response.data.message;
        alert(message);
      });
  };

  const deleteRefreshHandler = (itemId: string) => {
    deleteItem(itemId)
      .then(() => setItemList(itemList.filter(item => item._id != itemId)))
      .catch(err => {
        const message = err.response.data.message;
        alert(message);
      });
  };

  const modalToggle = () => {
    setIsModalOn(!isModalOn);
  };

  const addNewItem = (item: ItemInfo) => {
    setItemList([item, ...itemList]);
  };

  return (
    <>
      <Wrapper>
        <ContentWrapper>
          <TitleWrapper>
            <p className="title">My shopping list</p>
            <MenuWrapper>
              <div
                className={'bullet ' + `${filter === 'all' ? 'active' : null}`}
                onClick={() => setFilter('all')}
              >
                All({itemList?.length})
              </div>
              <div
                className={'bullet ' + `${filter === 'yet' ? 'active' : null}`}
                onClick={() => setFilter('yet')}
              >
                To Buy({itemList.filter(i => i.done === false).length})
              </div>
              <div
                className={
                  'bullet ' + `${filter === 'bought' ? 'active' : null}`
                }
                onClick={() => setFilter('bought')}
              >
                Bought({itemList.filter(i => i.done === true).length})
              </div>
              <br />
              <div
                className={
                  'bullet ' + `${filter === 'doughnut' ? 'active' : null}`
                }
                onClick={() => setFilter('doughnut')}
              >
                My spending
              </div>
            </MenuWrapper>
          </TitleWrapper>
          <RegisterArea>
            <div className="plus" onClick={modalToggle}>
              +
            </div>
          </RegisterArea>
          <ListWrapper>
            {filter === 'doughnut' && doughnutData ? (
              <div className="graphContentArea">
                <DoughnutChart chartData={doughnutData} />
              </div>
            ) : filteredList && filteredList.length !== 0 ? (
              <div className="listContentArea">
                {filteredList?.map(item => (
                  <Item
                    data={item}
                    key={item._id}
                    updateRefresh={updateRefreshHandler}
                    deleteRefresh={deleteRefreshHandler}
                  />
                ))}
              </div>
            ) : (
              <div className="emptyContentArea">Empty</div>
            )}
          </ListWrapper>
        </ContentWrapper>
        {isModalOn ? (
          <NewItemModal
            modalToggle={modalToggle}
            addNewItem={addNewItem}
            modalActive={isModalOn}
          />
        ) : null}
      </Wrapper>
      {isModalOn ? <Dimmer /> : null}
    </>
  );
}

export default Main;
