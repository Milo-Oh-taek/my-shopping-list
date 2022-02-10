import axios, { AxiosResponse } from 'axios';

const PORT = `${process.env.REACT_APP_SERVER}`;
const instance = axios.create({
  headers: {
    'Access-Control-Allow-Origin': PORT,
  },
  baseURL: PORT,
  withCredentials: true,
});

interface User {
  email: string;
  password: string;
}

interface newItem {
  name: string;
  brand: string;
  price: string;
  token: string;
  _id?: string;
  done?: boolean;
}
type modifyItem = Pick<newItem, '_id' | 'done' | 'token'>;

export const signup = async (data: User): Promise<AxiosResponse> => {
  return await instance.post('user', data);
};

export const signin = async (data: User): Promise<AxiosResponse> => {
  return await instance.post('user/login', data);
};

export const getItemList = async (token: string): Promise<AxiosResponse> => {
  return await instance.get(`item?token=${token}`);
};

export const deleteItem = async (token: string): Promise<AxiosResponse> => {
  return await instance.delete(`item/${token}`);
};

export const createItem = async (data: newItem): Promise<AxiosResponse> => {
  return await instance.post(`item`, data);
};

export const createItemWithImg = async (
  data: FormData
): Promise<AxiosResponse> => {
  return await instance.post(`item`, data);
};

export const updateItem = async (data: modifyItem): Promise<AxiosResponse> => {
  return await instance.patch(`item/${data._id}`, data);
};

export const uploadFile = async (data: FormData): Promise<AxiosResponse> => {
  return await instance.post(`item/image`, data, {
    headers: { 'content-type': 'multipart/form-data' },
  });
};
