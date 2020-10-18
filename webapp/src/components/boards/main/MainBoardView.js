import React from 'react';
import Board from 'react-trello';
import { useTranslation } from 'react-i18next';
import data from './data.json';
import MainBoardMenu from './menu/MainBoardMenu';

const MainBoardView = () => {
  const { t } = useTranslation();
  return (
    <>
      <MainBoardMenu />
      <Board data={data} />
    </>
  );
};

export default MainBoardView;
