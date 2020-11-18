import React from 'react';
import PropTypes from 'prop-types';
import { fieldToTextField } from 'formik-material-ui';
import { Field } from 'formik';
import MuiTextField from '@material-ui/core/TextField';

const CustomTextField = (props) => (
  <MuiTextField
    {...fieldToTextField(props)}
    fullWidth
    color="secondary"
    variant="filled"
  />
);

const FormControl = ({
  name,
  label,
  type,
  helperText,
  required,
  InputProps,
  disabled,
  multiline,
  rows,
}) => (
  <Field
    component={CustomTextField}
    name={name}
    type={type}
    label={label}
    helperText={helperText}
    required={required}
    InputProps={InputProps}
    disabled={disabled}
    multiline={multiline}
    rows={rows}
  />
);

FormControl.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  helperText: PropTypes.string,
  name: PropTypes.string.isRequired,
  required: PropTypes.bool,
  InputProps: PropTypes.shape({
    startAdornment: PropTypes.node,
    endAdornment: PropTypes.node,
  }),
  disabled: PropTypes.bool,
  multiline: PropTypes.bool,
  rows: PropTypes.number,
};

FormControl.defaultProps = {
  type: 'text',
  helperText: null,
  required: false,
  InputProps: null,
  disabled: false,
  multiline: false,
  rows: 4,
};

export default FormControl;
