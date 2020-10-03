import React, { useState } from 'react';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import PropTypes from 'prop-types';
import FormControl from './FormControl';

const FormControlPassword = ({ name, label, helperText, required }) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <FormControl
      label={label}
      name={name}
      type={showPassword ? 'text' : 'password'}
      helperText={helperText}
      required={required}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

FormControlPassword.propTypes = {
  label: PropTypes.string.isRequired,
  helperText: PropTypes.string,
  name: PropTypes.string.isRequired,
  required: PropTypes.bool,
};

FormControlPassword.defaultProps = {
  helperText: null,
  required: false,
};

export default FormControlPassword;
