import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import { useTranslation } from 'react-i18next';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Form, Formik } from 'formik';
import * as yup from 'yup';
import IconButton from '@material-ui/core/IconButton';
import CancelIcon from '@material-ui/icons/Cancel';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { useDispatch, useSelector } from 'react-redux';
import { useAsync } from 'react-async-hook';
import { Tooltip } from '@material-ui/core';
import { DialogContentWrapper } from './main/custom/styled';
import FormControl from '../forms/FormControl';
import FormControlColor from '../forms/FormControlColor';
import FormControlDateTime from '../forms/FormControlDateTime';
import { setEditOpen } from '../../redux/reducers/actions/editCardActions';
import BoardApi from '../../api/BoardApi';

const EditCardForm = ({ onEdit }) => {
  const { t } = useTranslation(['boards', 'common', 'error']);
  const dispatch = useDispatch();
  const open = useSelector((state) => state.editCard.open);
  const cardId = useSelector((state) => state.editCard.cardId);
  const data = useAsync(BoardApi.getCardDetails, [cardId]);

  const handleClose = () => {
    dispatch(setEditOpen(false));
  };

  const handleSubmit = (values) => {
    const body = { ...values, id: cardId };
    if (body.description === '') {
      delete body.lastName;
    }
    onEdit(body);
    handleClose();
  };

  const validationSchema = yup.object().shape({
    title: yup.string().trim().required(t('error:form.required')),
    description: yup.string().trim(),
    prop: yup.string().trim(),
  });

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">{t('card.edit')}</DialogTitle>
      {data.result && (
        <Formik
          enableReinitialize
          onSubmit={handleSubmit}
          initialValues={{
            title: data.result.title,
            description: data.result.description,
            deadline: data.result.deadline,
            color: data.result.color,
          }}
          validationSchema={validationSchema}
        >
          {({ submitForm, errors }) => (
            <Form onSubmit={handleSubmit} successText="register:form.success">
              <DialogContentWrapper>
                <Row>
                  <Col>
                    <FormControl
                      label={t('card.title')}
                      name="title"
                      required
                    />
                  </Col>
                  <Col md="auto">
                    <FormControlColor label={t('card.color')} name="color" />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormControl
                      label={t('card.description')}
                      name="description"
                      multiline
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormControlDateTime
                      label={t('card.deadline')}
                      name="deadline"
                      minDate={new Date()}
                    />
                  </Col>
                </Row>
              </DialogContentWrapper>
              <DialogActions>
                <Tooltip title={t('button.Cancel')}>
                  <IconButton
                    aria-label={t('button.Cancel')}
                    onClick={handleClose}
                    color="primary"
                  >
                    <CancelIcon fontSize="large" />
                  </IconButton>
                </Tooltip>
                <Tooltip title={t('card.edit')}>
                  <IconButton
                    aria-label={t('card.edit')}
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
      )}
    </Dialog>
  );
};

EditCardForm.propTypes = {
  onEdit: PropTypes.func.isRequired,
};

EditCardForm.defaultProps = {};

export default EditCardForm;
