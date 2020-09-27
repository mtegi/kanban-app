import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import { Form, Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FormControl from './forms/FormControl';
import BasicForm from './forms/BasicForm';
import SubmitButton from './forms/SubmitButton';
import AuthApi from '../api/AuthApi';
import GenericAlert from './forms/GenericAlert';

const Login = () => {
  const { t } = useTranslation(['login', 'common', 'error']);
  const [error, setError] = useState(null);

  const validationSchema = yup.object().shape({
    login: yup.string().required(t('error')),
    password: yup.string().required(t('error')).min(8, t('error')),
  });

  const handleSubmit = async (values) => {
    try {
      await AuthApi.login(values.login, values.password);
    } catch (e) {
      setError(e);
    }
  };

  return (
    <BasicForm>
      <Formik
        onSubmit={handleSubmit}
        initialValues={{ login: '', password: '' }}
        validationSchema={validationSchema}
      >
        {({ submitForm, isSubmitting }) => (
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col>
                <FormControl label={t('login')} name="login" />
              </Col>
            </Row>
            <Row>
              <Col>
                <FormControl
                  label={t('password')}
                  name="password"
                  type="password"
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <SubmitButton
                  label={t('login')}
                  onClick={submitForm}
                  loading={isSubmitting}
                />
              </Col>
            </Row>
            {error && (
              <Row>
                <Col>
                  <GenericAlert message={t(error.message)} />
                </Col>
              </Row>
            )}
          </Form>
        )}
      </Formik>
    </BasicForm>
  );
};

export default Login;
