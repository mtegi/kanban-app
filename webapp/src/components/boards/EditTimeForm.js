import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import { useTranslation } from 'react-i18next';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Formik } from 'formik';
import * as yup from 'yup';
import IconButton from '@material-ui/core/IconButton';
import CancelIcon from '@material-ui/icons/Cancel';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { useDispatch, useSelector } from 'react-redux';
import { Tooltip } from '@material-ui/core';
import { useLocation } from 'react-router-dom';
import { DialogContentWrapper } from './main/custom/styled';
import Form from '../forms/Form';
import { setLogTimeOpen } from '../../redux/reducers/actions/logTimeActions';
import FormControlDateTime from '../forms/FormControlDateTime';
import useFormStatus from '../forms/UseFormStatus';
import TimeEntryApi from '../../api/TimeEntryApi';

const EditTimeForm = () => {
  const { t } = useTranslation(['boards', 'common', 'error']);
  const dispatch = useDispatch();
  const open = useSelector((state) => state.logTime.open);
  const cardId = useSelector((state) => state.logTime.cardId);
  const location = useLocation();
  const boardId = location.state.id;
  const status = useFormStatus();

  const handleClose = () => {
    dispatch(setLogTimeOpen(false));
  };

  const handleSubmit = async (values) => {
    const body = { ...values, cardId, boardId };
    try {
      await TimeEntryApi.create(body);
      status.handleSuccess();
      handleClose();
    } catch (e) {
      status.handleError(e);
    }
  };

  const validationSchema = yup.object().shape({
    from: yup.date().required(t('error:form.required')),
    to: yup.date().min(yup.ref('from'), t('time.dateError')).required(t('error:form.required')),
  });

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      disableBackdropClick
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">{t('time.log')}</DialogTitle>
      <Formik
        validationSchema={validationSchema}
        enableReinitialize
        onSubmit={handleSubmit}
        initialValues={{
          from: null,
          to: null,
        }}
      >
        {({ submitForm, errors }) => (
          <Form onSubmit={handleSubmit}>
            <DialogContentWrapper>
              <Row>
                <Col>
                  <FormControlDateTime label={t('time.from')} name="from" />
                </Col>
                <Col>
                  <FormControlDateTime label={t('time.to')} name="to" />
                </Col>
              </Row>
            </DialogContentWrapper>
            <DialogActions>
              <Tooltip title={t('button.Cancel')}>
                <IconButton aria-label={t('button.Cancel')} onClick={handleClose} color="primary">
                  <CancelIcon fontSize="large" />
                </IconButton>
              </Tooltip>
              <Tooltip title={t('time.log')}>
                <IconButton
                  aria-label={t('time.log')}
                  onClick={submitForm}
                  color="primary"
                  disabled={Object.keys(errors).length !== 0}
                >
                  <CheckCircleIcon fontSize="large" />
                </IconButton>
              </Tooltip>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

// EditTimeForm.propTypes = {
//   onEdit: PropTypes.func.isRequired,
// };
//
// EditTimeForm.defaultProps = {};

export default EditTimeForm;
