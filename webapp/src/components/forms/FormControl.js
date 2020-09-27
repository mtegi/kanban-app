import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from 'formik-material-ui';
import { Field } from 'formik';

const FormControl = ({ name, label, type, helperText }) => (
  <Field
    component={TextField}
    name={name}
    type={type}
    label={label}
    helperText={helperText}
  />
);

FormControl.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  helperText: PropTypes.string,
  name: PropTypes.string.isRequired,
};

FormControl.defaultProps = {
  type: 'plaintext',
  helperText: null,
};

export default FormControl;
