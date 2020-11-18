import React from 'react';
import { Field } from 'formik';
import PropTypes from 'prop-types';
import enLocale from 'date-fns/locale/en-GB';
import plLocale from 'date-fns/locale/pl';
import { getI18n } from 'react-i18next';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { KeyboardDateTimePicker } from 'material-ui-formik-components';

const FormControlDateTime = ({ name, label, required, disabled, minDate }) => {
  const isPlLocale =
    getI18n().language === 'pl' || getI18n().language === 'pl-PL';
  return (
    <MuiPickersUtilsProvider
      utils={DateFnsUtils}
      locale={isPlLocale ? plLocale : enLocale}
    >
      <Field
        required={required}
        variant="inline"
        name={name}
        component={KeyboardDateTimePicker}
        label={label}
        format="dd/MM/yyyy, HH:mm"
        ampm={false}
        inputVariant="outlined"
        disabled={disabled}
        minDate={minDate}
      />
    </MuiPickersUtilsProvider>
  );
};

FormControlDateTime.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  required: PropTypes.bool,
  InputProps: PropTypes.shape({
    startAdornment: PropTypes.node,
    endAdornment: PropTypes.node,
  }),
  disabled: PropTypes.bool,
  minDate: PropTypes.instanceOf(Date),
};

FormControlDateTime.defaultProps = {
  required: false,
  InputProps: null,
  disabled: false,
  minDate: null,
};

export default FormControlDateTime;
