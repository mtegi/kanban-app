import React from 'react';
import Alert from '@material-ui/lab/Alert';
import PropTypes from 'prop-types';

const style = {
  width: '100%',
  justifyContent: 'center',
};

const GenericAlert = ({ message, severity }) => (
  <Alert severity={severity} style={style}>
    {message}
  </Alert>
);

GenericAlert.propTypes = {
  message: PropTypes.string.isRequired,
  severity: PropTypes.string,
};

GenericAlert.defaultProps = {
  severity: 'error',
};

export default GenericAlert;
