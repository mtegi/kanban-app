import React, { useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import { Favorite, FavoriteBorder } from '@material-ui/icons';
import FavoriteButton from './FavoriteButton';
import NavButton from '../../../misc/NavButton';
import routes from '../../../../router/routes.json';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 0.25rem 0.5rem;
  background-color: white;
`;

const MainBoardMenu = () => {
  const { t } = useTranslation();
  const [title, setTitle] = useState('Mój projekt');
  const [favourite, setFavourite] = useState(false);

  return (
    <Wrapper>
      <TextField
        color="secondary"
        variant="filled"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        inputProps={{
          style: { padding: '10px 12px 10px', fontWeight: 'bold' },
        }}
      />
      <FavoriteButton
        isFavourite={favourite}
        onClick={() => setFavourite(!favourite)}
      />
      <NavButton to={routes.dashboard.uri}>{t('dashboard')}</NavButton>
    </Wrapper>
  );
};

export default MainBoardMenu;
