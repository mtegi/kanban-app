import PropTypes from 'prop-types';
import React from 'react';
import { Favorite, FavoriteBorder } from '@material-ui/icons';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import { Tooltip } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

const StyledIconButton = withStyles(() => ({
  root: {
    '&:focus': {
      outline: 'none',
    },
  },
}))(IconButton);

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
