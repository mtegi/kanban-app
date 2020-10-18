import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import PropTypes from 'prop-types';

const PopUp = ({ severity, text, autoHideDuration, vertical, horizontal }) => {
  const [state, setState] = React.useState({
    open: true,
  });
  const { open } = state;
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setState({ ...state, open: false });
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={handleClose}
      anchorOrigin={{ vertical, horizontal }}
    >
      <Alert onClose={handleClose} severity={severity}>
        {text}
      </Alert>
    </Snackbar>
  );
};

PopUp.propTypes = {
  severity: PropTypes.oneOf(['success', 'error', 'warning', 'info']),
  text: PropTypes.string.isRequired,
  autoHideDuration: PropTypes.number,
  vertical: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
  horizontal: PropTypes.oneOf(['top', 'bottom', 'left', 'right', 'center']),
};

PopUp.defaultProps = {
  severity: 'success',
  autoHideDuration: 5000,
  vertical: 'top',
  horizontal: 'center',
};

export default PopUp;
