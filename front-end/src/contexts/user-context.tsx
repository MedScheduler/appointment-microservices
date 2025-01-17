'use client';

import React, { ReactNode, useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';

const UserContext = React.createContext({});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState({});

  const updateUser = () => {
    const userCookie = Cookies.get('user');
    if (!userCookie) {
      return setUser({});
    }
    setUser(JSON.parse(userCookie));
  };

  const logoutUser = () => {
    Cookies.remove('user');
    setUser({});
  };

  useEffect(() => {
    updateUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, updateUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserInfo = () => useContext(UserContext);
