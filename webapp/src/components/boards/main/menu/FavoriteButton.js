import PropTypes from 'prop-types';
import React from 'react';
import { Favorite, FavoriteBorder } from '@material-ui/icons';
import { Tooltip } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { StyledIconButton } from './styled';

const FavoriteButton = ({ isFavourite, onClick }) => {
  const { t } = useTranslation('boards');
  return (
    <Tooltip title={t('add-to-favourite')} placement="top-center">
      <StyledIconButton color="secondary" onClick={onClick}>
        {isFavourite ? <Favorite /> : <FavoriteBorder />}
      </StyledIconButton>
    </Tooltip>
  );
};

FavoriteButton.propTypes = {
  isFavourite: PropTypes.bool.isRequired,
  onClick: PropTypes.func,
};

FavoriteButton.defaultProps = {
  onClick: () => {},
};

export default FavoriteButton;
