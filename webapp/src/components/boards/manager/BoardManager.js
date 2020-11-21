import React from 'react';
import { useTranslation } from 'react-i18next';
import { Divider } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import { useAsync } from 'react-async-hook';
import SearchInput from './SearchInput';
import BoardSection from './BoardSection';
import NewBoardButton from './NewBoardButton';
import routes from '../../../router/routes.json';
import ProgressBar from '../../misc/ProgressBar';
import AsyncStatus from '../../constants/AsyncStatus';
import PopUp from '../../misc/PopUp';
import BoardApi from '../../../api/BoardApi';
import {
  BoardManagerContainer,
  BoardManagerMenu,
  StyledAccessTimeIcon,
  StyledFavoriteIcon,
  StyledFolderIcon,
} from './styled';

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
          <BoardSection
            label={t('last')}
            boards={data.result.slice(0, 10)}
            icon={<StyledAccessTimeIcon />}
          />
          <Divider />
          <BoardSection
            label={t('favourite')}
            boards={data.result.filter((val) => val.favourite)}
            icon={<StyledFavoriteIcon />}
          />
          <Divider />
          <BoardSection
            label={t('all-boards')}
            boards={data.result}
            icon={<StyledFolderIcon />}
          />
        </BoardManagerContainer>
      )}
      {data.error && <PopUp text={t(data.error.message)} />}
    </>
  );
};

export default BoardManager;
