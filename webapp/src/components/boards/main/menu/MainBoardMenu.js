import React, { useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import FavoriteButton from './FavoriteButton';
import NavButton from '../../../misc/NavButton';
import routes from '../../../../router/routes.json';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 0.25rem 0.5rem;
  background-color: ${(props) => props.color};
  border-bottom: 2px solid ${(props) => props.theme.palette.secondary.dark};
`;

const MainBoardMenu = ({ name, favourite, color, handler }) => {
  const { t } = useTranslation();
  const [title, setTitle] = useState(name);
  const [isFavourite, setIsFavourite] = useState(favourite);

  const handleFavourite = () => {
    const val = !isFavourite;
    setIsFavourite(val);
    handler.onFavourite(val);
  };

  return (
    <Wrapper color={color}>
      <TextField
        color="secondary"
        variant="filled"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        inputProps={{
          style: { padding: '10px 12px 10px', fontWeight: 'bold' },
        }}
      />
      <FavoriteButton isFavourite={isFavourite} onClick={handleFavourite} />
      <NavButton to={routes.dashboard.uri}>{t('dashboard')}</NavButton>
    </Wrapper>
  );
};

MainBoardMenu.propTypes = {
  name: PropTypes.string,
  favourite: PropTypes.bool,
  color: PropTypes.string,
  handler: PropTypes.shape({
    onCardAdd: PropTypes.func,
    subscribe: PropTypes.func,
    onCardMoveAcrossLanes: PropTypes.func,
    onCardDelete: PropTypes.func,
    onLaneUpdate: PropTypes.func,
    onBoardOpen: PropTypes.func,
    onFavourite: PropTypes.func,
  }).isRequired,
};

MainBoardMenu.defaultProps = {
  name: '',
  favourite: false,
  color: '#ff7f50',
};

export default MainBoardMenu;
