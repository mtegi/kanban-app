import PropTypes from 'prop-types';
import React from 'react';
import { Favorite, FavoriteBorder } from '@material-ui/icons';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';

const StyledIconButton = withStyles(() => ({
  root: {
    '&:focus': {
      outline: 'none',
    },
  },
}))(IconButton);

const FavoriteButton = ({ isFavourite, onClick }) => (
  <StyledIconButton color="secondary" onClick={onClick}>
    {isFavourite ? <Favorite /> : <FavoriteBorder />}
  </StyledIconButton>
);

FavoriteButton.propTypes = {
  isFavourite: PropTypes.bool.isRequired,
  onClick: PropTypes.func,
};

FavoriteButton.defaultProps = {
  onClick: () => {},
};

export default FavoriteButton;
