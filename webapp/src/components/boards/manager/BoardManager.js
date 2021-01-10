import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Divider } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SearchInput from './SearchInput';
import BoardSection from './BoardSection';
import NewBoardButton from './NewBoardButton';
import routes from '../../../router/routes.json';
import ProgressBar from '../../misc/ProgressBar';
import {
  BoardManagerContainer,
  BoardManagerMenu,
  StyledAccessTimeIcon,
  StyledFavoriteIcon,
  StyledFolderIcon,
} from './styled';
import { fetchBoards } from '../../../redux/reducers/actions/boardManagerActions';

const BoardManager = () => {
  const { t } = useTranslation(['common', 'error']);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.boardManager);

  useEffect(() => {
    dispatch(fetchBoards(data.searchInput));
  }, []);

  return (
    <>
      {data.loading && <ProgressBar />}
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
          boards={data.boards.slice(0, 10)}
          icon={<StyledAccessTimeIcon />}
        />
        <Divider />
        <BoardSection
          label={t('favourite')}
          boards={data.boards.filter((val) => val.favourite)}
          icon={<StyledFavoriteIcon />}
        />
        <Divider />
        <BoardSection
          label={t('all-boards')}
          boards={data.boards}
          icon={<StyledFolderIcon />}
        />
      </BoardManagerContainer>
    </>
  );
};

export default BoardManager;
