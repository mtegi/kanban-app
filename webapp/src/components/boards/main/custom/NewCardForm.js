import React from 'react';
import PropTypes from 'prop-types';
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
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { Tooltip } from '@material-ui/core';
import Form from '../../../forms/Form';
import FormControl from '../../../forms/FormControl';
import { DialogContentWrapper } from './styled';
import FormControlDateTime from '../../../forms/FormControlDateTime';
import FormControlColor from '../../../forms/FormControlColor';

const NewCardForm = ({ onCancel, onAdd }) => {
  const [open, setOpen] = React.useState(true);

  const { t } = useTranslation(['boards', 'common', 'error']);

  const handleSubmit = (values) => {
    const body = { ...values };
    if (body.description === '') {
      delete body.lastName;
    }
    console.log(body);
    onAdd(body);
  };

  const handleClose = () => {
    setOpen(false);
    onCancel();
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
      disableBackdropClick
    >
      <DialogTitle id="form-dialog-title">{t('button.Add card')}</DialogTitle>
      <Formik
        enableReinitialize
        onSubmit={handleSubmit}
        initialValues={{
          title: '',
          description: '',
          deadline: null,
          color: '#ffffff',
        }}
        validationSchema={validationSchema}
      >
        {({ submitForm, errors }) => (
          <Form onSubmit={handleSubmit} successText="register:form.success">
            <DialogContentWrapper>
              <Row>
                <Col>
                  <FormControl label={t('card.title')} name="title" required />
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
              <Tooltip title={t('button.Add card')}>
                <IconButton
                  aria-label={t('button.Add card')}
                  onClick={submitForm}
                  color="primary"
                  disabled={Object.keys(errors).length !== 0}
                >
                  <AddCircleIcon fontSize="large" />
                </IconButton>
              </Tooltip>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

NewCardForm.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
};

NewCardForm.defaultProps = {};

export default NewCardForm;
