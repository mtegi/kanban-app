import React from 'react';
import { useTranslation } from 'react-i18next';
import { Field, Formik } from 'formik';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import useYupHelper from '../../forms/UseYupHelper';
import useFormStatus from '../../forms/UseFormStatus';
import BasicFormContainer from '../../forms/BasicFormContainer';
import Form from '../../forms/Form';
import FormControl from '../../forms/FormControl';
import SubmitButton from '../../forms/SubmitButton';
import BoardApi from '../../../api/BoardApi';
import routes from '../../../router/routes.json';
import FormControlColor from '../../forms/FormControlColor';

const BoardCreator = () => {
  const { t } = useTranslation(['boards', 'common', 'error']);
  const { boardHelper } = useYupHelper();
  const status = useFormStatus();
  const navigate = useNavigate();

  const handleSubmit = async (values, { resetForm }) => {
    try {
      await BoardApi.createBoardFromTemplate(values);
      resetForm({});
      status.handleSuccess();
      setTimeout(() => navigate(routes.boards.uri), 250);
    } catch (e) {
      status.handleError(e);
    }
  };

  const validationSchema = yup.object().shape({
    name: boardHelper.name,
  });

  return (
    <BasicFormContainer>
      <Formik
        enableReinitialize
        onSubmit={handleSubmit}
        initialValues={{
          name: '',
          color: '#ff7f50',
        }}
        validationSchema={validationSchema}
      >
        {({ submitForm, isSubmitting, errors, values }) => (
          <Form
            onSubmit={handleSubmit}
            error={status.error}
            success={status.success}
            successText={t('form.create.success')}
          >
            <Row>
              <Col>
                <FormControl label={t('form.name')} name="name" required />
              </Col>
            </Row>
            <Row>
              <Col>
                <FormControlColor label={t('form.color')} name="color" />
              </Col>
            </Row>
            <Row>
              <Col>
                <SubmitButton
                  label={t('form.create.submit')}
                  onClick={submitForm}
                  loading={isSubmitting}
                  disabled={Object.keys(errors).length !== 0}
                />
              </Col>
            </Row>
          </Form>
        )}
      </Formik>
    </BasicFormContainer>
  );
};

export default BoardCreator;
