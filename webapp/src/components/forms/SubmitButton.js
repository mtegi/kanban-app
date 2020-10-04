import { Button } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import React from 'react';

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  position: relative;
`;

const buttonProgress = {
  position: 'absolute',
};

const buttonStyle = {
  width: '100%',
  display: 'flex',
  alignItems: 'center',
};

const SubmitButton = ({ label, onClick, loading, disabled }) => (
  <Wrapper>
    <Button
      variant="contained"
      color="secondary"
      disabled={loading || disabled}
      onClick={onClick}
      style={buttonStyle}
    >
      {label}
      {loading && <CircularProgress size={20} style={buttonProgress} />}
    </Button>
  </Wrapper>
);

SubmitButton.propTypes = {
  label: PropTypes.string.isRequired,
  loading: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

SubmitButton.defaultProps = {
  loading: false,
  disabled: false,
};

export default SubmitButton;
