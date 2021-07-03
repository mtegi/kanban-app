import React from 'react';
import PropTypes from 'prop-types';
import { fieldToSelect } from 'formik-material-ui';
import { Field } from 'formik';
import { FormControl, Input, InputLabel, Select } from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';

const useStyles = makeStyles(() => ({
  root: {
    width: 'inherit',
  },
}));

const CustomSelect = (props) => {
  const classes = useStyles();
  return (
    <Select
      label={<InputLabel>hello</InputLabel>}
      {...fieldToSelect(props)}
      autoWidth
      className={classes.root}
    />
  );
};

const FormControlSelect = ({
  name,
  label,
  required,
  disabled,
  renderValue,
  multiple,
  children,
  onChange,
  onReset,
}) => (
  <FormControl fullWidth>
    <InputLabel>{label}</InputLabel>
    <Field
      component={CustomSelect}
      name={name}
      required={required}
      disabled={disabled}
      multiple={multiple}
      input={
        <Input
          endAdornment={
            <InputAdornment position="end" style={{ marginRight: 8 }}>
              <IconButton style={{ outline: 'none' }} aria-label="reset" onClick={onReset}>
                <ClearIcon />
              </IconButton>
            </InputAdornment>
          }
        />
      }
      onChange={onChange}
      renderValue={renderValue}
    >
      {children}
    </Field>
  </FormControl>
);

FormControlSelect.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  multiple: PropTypes.bool,
  children: PropTypes.node.isRequired,
  onChange: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
  renderValue: PropTypes.func,
};

FormControlSelect.defaultProps = {
  required: false,
  disabled: false,
  multiple: false,
};

export default FormControlSelect;
