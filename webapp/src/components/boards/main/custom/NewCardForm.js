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
import Form from '../../../forms/Form';
import FormControl from '../../../forms/FormControl';
import { DialogContentWrapper } from './styled';

const NewCardForm = ({ onCancel, onAdd }) => {
  const [open, setOpen] = React.useState(true);

  const { t } = useTranslation(['boards', 'common', 'error']);

  const handleSubmit = (values) => {
    const body = { ...values };
    if (body.description === '') {
      delete body.lastName;
    }
    onAdd(body);
  };

  const handleClose = () => {
    setOpen(false);
    onCancel();
  };

  const validationSchema = yup.object().shape({
    title: yup.string().trim().required(t('error:form.required')),
    description: yup.string().trim(),
  });

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">{t('button.Add card')}</DialogTitle>
      <Formik
        enableReinitialize
        onSubmit={handleSubmit}
        initialValues={{
          title: '',
          description: '',
        }}
        validationSchema={validationSchema}
      >
        {({ submitForm, errors }) => (
          <Form onSubmit={handleSubmit} successText="register:form.success">
            <DialogContentWrapper>
              <Row>
                <Col>
                  <FormControl
                    label={t('placeholder.title')}
                    name="title"
                    required
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormControl
                    label={t('placeholder.description')}
                    name="description"
                    multiline
                  />
                </Col>
              </Row>
            </DialogContentWrapper>
            <DialogActions>
              <IconButton
                aria-label={t('button.Cancel')}
                onClick={handleClose}
                color="primary"
              >
                <CancelIcon fontSize="large" />
              </IconButton>
              <IconButton
                aria-label={t('button.Add card')}
                onClick={submitForm}
                color="primary"
                disabled={Object.keys(errors).length !== 0}
              >
                <AddCircleIcon fontSize="large" />
              </IconButton>
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
