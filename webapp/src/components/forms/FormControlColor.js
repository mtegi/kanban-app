import PropTypes from 'prop-types';
import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import { Field } from 'formik';

const FormControlColor = ({ name, label, required }) => (
  <div>
    <InputLabel required={required} color="secondary">
      {label}
    </InputLabel>
    <Field name={name}>
      {({
        field, // { name, value, onChange, onBlur }
        form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
        meta,
      }) => (
        <div>
          <input value={field.value} type="color" {...field} />
          {meta.touched && meta.error && <div>{meta.error}</div>}
        </div>
      )}
    </Field>
  </div>
);

FormControlColor.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  required: PropTypes.bool,
};

FormControlColor.defaultProps = {
  name: '',
  label: '',
  required: false,
};

export default FormControlColor;
