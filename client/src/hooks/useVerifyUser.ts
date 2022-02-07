import React from 'react';
import { Cookies } from 'react-cookie';

const useVerifyUser = () => {
  const cookies = new Cookies();
  const token: string = cookies.get('shoppingUser');
  return token;
};

export default useVerifyUser;
