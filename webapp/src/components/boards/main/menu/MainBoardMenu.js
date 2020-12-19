import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import FavoriteButton from './FavoriteButton';
import NavButton from '../../../misc/NavButton';
import routes from '../../../../router/routes.json';
import { useBoardDispatch, useBoardState } from '../../context/BoardContext';
import InviteManager from '../../InviteManager';
import BoardAvatarGroup from '../../AvatarGroup';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 0.25rem 0.5rem;
  background-color: ${(props) => props.color};
  border-bottom: 2px solid ${(props) => props.theme.palette.secondary.dark};
`;

const MainBoardMenu = ({ handler }) => {
  const { t } = useTranslation();
  const boardState = useBoardState();
  const boardDispatch = useBoardDispatch();

  const handleFavourite = () => {
    const val = !boardState.favourite;
    boardDispatch({ type: 'TOGGLE_FAVOURITE' });
    handler.onFavourite(val);
  };

  const handleTitle = (e) => {
    handler.onNameUpdate(e.target.value);
    boardDispatch({ type: 'UPDATE_BOARD_NAME', payload: e.target.value });
  };

  return (
    <Wrapper color={boardState.color}>
      <TextField
        color="secondary"
        variant="filled"
        value={boardState.name}
        onChange={handleTitle}
        inputProps={{
          style: { padding: '10px 12px 10px', fontWeight: 'bold' },
        }}
      />
      <FavoriteButton
        isFavourite={boardState.favourite}
        onClick={handleFavourite}
      />
      <InviteManager onInviteLinkUpdate={handler.onInviteLinkUpdate} />
      <NavButton to={routes.dashboard.uri}>{t('dashboard')}</NavButton>
      <BoardAvatarGroup />
    </Wrapper>
  );
};

MainBoardMenu.propTypes = {
  handler: PropTypes.shape({
    onCardAdd: PropTypes.func,
    subscribe: PropTypes.func,
    onCardMoveAcrossLanes: PropTypes.func,
    onCardDelete: PropTypes.func,
    onLaneUpdate: PropTypes.func,
    onBoardOpen: PropTypes.func,
    onFavourite: PropTypes.func,
    onNameUpdate: PropTypes.func,
    onDataChange: PropTypes.func,
    onInviteLinkUpdate: PropTypes.func,
  }).isRequired,
};

export default MainBoardMenu;
