import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Formik } from 'formik';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import * as yup from 'yup';
import Form from '../../forms/Form';
import BasicFormContainer from '../../forms/BasicFormContainer';
import SubmitButton from '../../forms/SubmitButton';
import FormControl from '../../forms/FormControl';
import FormControlPassword from '../../forms/FormControlPassword';
import useYupHelper from '../../forms/UseYupHelper';

const Register = () => {
  const { t } = useTranslation(['register', 'common', 'error']);
  const yupHelper = useYupHelper();
  const [error, setError] = useState(null);

  const handleSubmit = async (values, { resetForm }) => {
    try {
      console.log(values);
      resetForm({});
    } catch (e) {
      setError(e);
    }
  };

  const validationSchema = yup.object().shape({
    email: yupHelper.email,
    password: yupHelper.password,
    repeatPassword: yupHelper.repeatPassword,
    firstName: yupHelper.firstName,
    lastName: yupHelper.lastName,
    username: yupHelper.username,
  });

  return (
    <BasicFormContainer>
      <Formik
        enableReinitialize
        onSubmit={handleSubmit}
        initialValues={{
          username: '',
          email: '',
          password: '',
          repeatPassword: '',
          firstName: '',
          lastName: '',
        }}
        validationSchema={validationSchema}
      >
        {({ submitForm, isSubmitting }) => (
          <Form onSubmit={handleSubmit} error={error}>
            <Row>
              <Col>
                <FormControl
                  label={t('form.username')}
                  name="username"
                  required
                />
              </Col>
              <Col>
                <FormControl
                  label={t('form.email')}
                  name="email"
                  type="email"
                  required
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <FormControl
                  label={t('form.firstName')}
                  name="firstName"
                  required
                />
              </Col>
              <Col>
                <FormControl
                  label={t('form.lastName')}
                  name="lastName"
                  required
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <FormControlPassword
                  label={t('form.password')}
                  name="password"
                  required
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <FormControlPassword
                  label={t('form.repeatPassword')}
                  name="repeatPassword"
                  required
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <SubmitButton
                  label={t('form.submit')}
                  onClick={submitForm}
                  loading={isSubmitting}
                />
              </Col>
            </Row>
          </Form>
        )}
      </Formik>
    </BasicFormContainer>
  );
};

export default Register;
