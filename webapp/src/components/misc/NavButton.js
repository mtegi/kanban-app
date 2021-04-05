import React from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import PropTypes from 'prop-types';

const StyledButton = withStyles(() => ({
  root: {
    '&:focus': {
      outline: 'none',
    },
  },
}))(Button);

const NavButton = ({ to, children, disabled, fullWidth }) => (
  <Link to={to} style={{ textDecoration: 'none' }}>
    <StyledButton disabled={disabled} variant="contained" color="secondary" fullWidth={fullWidth}>
      {children}
    </StyledButton>
  </Link>
);

NavButton.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node,
  disabled: PropTypes.bool,
  fullWidth: PropTypes.bool,
};

NavButton.defaultProps = {
  children: null,
  disabled: false,
  fullWidth: false,
};

export default NavButton;
