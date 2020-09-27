import React from 'react';
import Alert from '@material-ui/lab/Alert';
import PropTypes from 'prop-types';

const GenericAlert = ({ message, severity }) => (
  <Alert
    severity={severity}
    style={{ marginTop: '0.2rem', width: 'max-content' }}
  >
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
