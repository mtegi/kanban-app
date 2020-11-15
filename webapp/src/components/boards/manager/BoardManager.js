import React from 'react';
import { useTranslation } from 'react-i18next';
import { Divider } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import { useAsync } from 'react-async-hook';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import BoardManagerContainer from './BoardManagerContainer';
import BoardManagerMenu from './BoardManagerMenu';
import SearchInput from './SearchInput';
import BoardSection from './BoardSection';
import NewBoardButton from './NewBoardButton';
import routes from '../../../router/routes.json';
import ProgressBar from '../../misc/ProgressBar';
import AsyncStatus from '../../constants/AsyncStatus';
import PopUp from '../../misc/PopUp';
import BoardApi from '../../../api/BoardApi';

const BoardManager = () => {
  const { t } = useTranslation(['common', 'error']);
  const navigate = useNavigate();

  const data = useAsync(BoardApi.getBoardsForManager, []);

  return (
    <>
      {data.loading && <ProgressBar />}
      {data.status === AsyncStatus.SUCCESS && (
        <BoardManagerContainer>
          <BoardManagerMenu>
            <SearchInput />
            <NewBoardButton
              onClick={() => navigate(routes.boards.create.uri)}
            />
          </BoardManagerMenu>
          <Divider />
          <BoardSection label={t('last')} boards={data.result.slice(0, 10)} />
          <Divider />
          <BoardSection label={t('favourite')} />
          <Divider />
          <BoardSection label={t('all-boards')} boards={data.result} />
        </BoardManagerContainer>
      )}
      {data.error && <PopUp text={t(data.error.message)} />}
    </>
  );
};

export default BoardManager;
