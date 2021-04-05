import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import PropTypes from 'prop-types';

const ControlledPopUp = ({
  severity,
  text,
  autoHideDuration,
  vertical,
  horizontal,
  open,
  setOpen,
}) => {
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <Snackbar
      open={open && text !== ''}
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

ControlledPopUp.propTypes = {
  severity: PropTypes.oneOf(['success', 'error', 'warning', 'info']),
  text: PropTypes.string.isRequired,
  autoHideDuration: PropTypes.number,
  vertical: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
  horizontal: PropTypes.oneOf(['top', 'bottom', 'left', 'right', 'center']),
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
};

ControlledPopUp.defaultProps = {
  severity: 'success',
  autoHideDuration: 5000,
  vertical: 'top',
  horizontal: 'center',
};

export default ControlledPopUp;
