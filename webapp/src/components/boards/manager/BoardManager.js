import React from 'react';
import { useTranslation } from 'react-i18next';
import { Divider } from '@material-ui/core';
import BoardManagerContainer from './BoardManagerContainer';
import BoardManagerMenu from './BoardManagerMenu';
import SearchInput from './SearchInput';
import BoardSection from './BoardSection';
import NewBoardButton from './NewBoardButton';

const BoardManager = () => {
  const { t } = useTranslation();
  const last = [
    { title: 'Mój projekt', id: 1 },
    { title: 'Mój inny projekt', id: 2 },
  ];
  return (
    <BoardManagerContainer>
      <BoardManagerMenu>
        <SearchInput />
        <NewBoardButton />
      </BoardManagerMenu>
      <Divider />
      <BoardSection label={t('last')} boards={last} />
      <Divider />
      <BoardSection label={t('favourite')} />
      <Divider />
      <BoardSection label={t('all-boards')} boards={last} />
    </BoardManagerContainer>
  );
};

export default BoardManager;
