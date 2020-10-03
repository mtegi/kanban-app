import React from 'react';
import { useSelector } from 'react-redux';
import GuestMainView from './main/GuestMainView';
import UserMainView from './main/UserMainView';

const Switch = (isLogged) => {
  switch (isLogged) {
    case true:
      return <UserMainView />;
    default:
      return <GuestMainView />;
  }
};

const MainController = () => {
  const isLogged = useSelector((state) => state.auth.isLogged);
  return Switch(isLogged);
};

export default MainController;
