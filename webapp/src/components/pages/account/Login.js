import React, { useState } from 'react';
import * as yup from 'yup';
import { Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import InputAdornment from '@material-ui/core/InputAdornment';
import AccountCircle from '@material-ui/icons/AccountCircle';
import FormControl from '../../forms/FormControl';
import BasicFormContainer from '../../forms/BasicFormContainer';
import SubmitButton from '../../forms/SubmitButton';
import AuthApi from '../../../api/AuthApi';
import Form from '../../forms/Form';
import routes from '../../../router/routes.json';
import FormControlPassword from '../../forms/FormControlPassword';
import useYupHelper from '../../forms/UseYupHelper';
import useFormStatus from '../../forms/UseFormStatus';

const LoginLink = styled(Link)`
  font-size: 1rem;
  font-weight: bold;
  color: ${(props) => props.theme.palette.secondary.main};
  &:hover {
    color: ${(props) => props.theme.palette.secondary.light};
    text-decoration: none;
  }
`;

const Login = () => {
  const { t } = useTranslation(['login', 'common', 'error']);
  const status = useFormStatus();
  const navigate = useNavigate();
  const yupHelper = useYupHelper();

  const validationSchema = yup.object().shape({
    username: yupHelper.username,
    password: yupHelper.password,
  });

  const handleSubmit = async (values) => {
    try {
      await AuthApi.login(values.username, values.password);
      navigate(routes.home.uri);
    } catch (e) {
      status.handleError(e);
    }
  };

  return (
    <BasicFormContainer>
      <Formik
        onSubmit={handleSubmit}
        initialValues={{ username: '', password: '' }}
        validationSchema={validationSchema}
      >
        {({ submitForm, isSubmitting }) => (
          <Form onSubmit={handleSubmit} error={status.error}>
            <Row>
              <Col>
                <FormControl
                  label={t('form.username')}
                  name="username"
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircle />
                      </InputAdornment>
                    ),
                  }}
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
      <Row>
        <Col>
          <LoginLink to={routes.resetPassword.uri}>
            {t(`common:${routes.resetPassword.title}`)}
          </LoginLink>
        </Col>
        <Col style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <LoginLink to={routes.register.uri}>
            {t(`common:${routes.register.title}`)}
          </LoginLink>
        </Col>
      </Row>
    </BasicFormContainer>
  );
};

export default Login;
