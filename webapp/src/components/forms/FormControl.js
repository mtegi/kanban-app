import React from 'react';
import PropTypes from 'prop-types';
import { fieldToTextField } from 'formik-material-ui';
import { Field } from 'formik';
import MuiTextField from '@material-ui/core/TextField';
import styled from 'styled-components';

const StyledTextField = styled(MuiTextField)`
  &.root {
    width: 100%;
    height: 3rem;
  }
`;

const inputLabelStyle = { fontSize: '1.5rem' };
const inputStyle = { fontSize: '1rem' };

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
}) => (
  <Field
    component={CustomTextField}
    name={name}
    type={type}
    label={label}
    helperText={helperText}
    required={required}
    InputProps={InputProps}
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
};

FormControl.defaultProps = {
  type: 'text',
  helperText: null,
  required: false,
  InputProps: null,
};

export default FormControl;
