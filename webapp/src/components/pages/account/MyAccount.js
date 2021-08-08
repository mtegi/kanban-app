import React from 'react';
import { useTranslation } from 'react-i18next';
import { Formik } from 'formik';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import * as yup from 'yup';
import { useAsync } from 'react-async-hook';
import Form from '../../forms/Form';
import BasicFormContainer from '../../forms/BasicFormContainer';
import SubmitButton from '../../forms/SubmitButton';
import FormControl from '../../forms/FormControl';
import useYupHelper from '../../forms/UseYupHelper';
import AccountApi from '../../../api/AccountApi';
import useFormStatus from '../../forms/UseFormStatus';
import EditModeController from '../../forms/EditModeController';
import useEditMode from '../../forms/UseEditMode';
import FormSkeletonContainer from '../../forms/skeletons/FormSkeletonContainer';
import FormControlSkeleton from '../../forms/skeletons/FormControlSkeleton';
import SubmitButtonSkeleton from '../../forms/skeletons/SubmitButtonSkeleton';

const MyAccount = () => {
  const { t } = useTranslation(['register', 'my-account', 'common', 'error']);
  const yupHelper = useYupHelper();
  const status = useFormStatus();
  const { edit, setEdit } = useEditMode();
  const data = useAsync(AccountApi.getOwnAccountDetails, []);

  const handleSubmit = async (values) => {
    try {
      data.result = await AccountApi.updateOwnAccountDetails(values);
      status.handleSuccess();
    } catch (e) {
      status.handleError(e);
    }
  };

  const validationSchema = yup.object().shape({
    email: yupHelper.email,
    firstName: yupHelper.firstName,
    lastName: yupHelper.lastName,
    username: yupHelper.username,
  });

  const FormSkeleton = () => (
    <FormSkeletonContainer>
      <EditModeController title={t('common:my-account')} edit={edit} setEdit={setEdit} />
      <Row>
        <Col>
          <FormControlSkeleton />
        </Col>
        <Col>
          <FormControlSkeleton />
        </Col>
      </Row>
      <Row>
        <Col>
          <FormControlSkeleton />
        </Col>
        <Col>
          <FormControlSkeleton />
        </Col>
      </Row>
      <Row>
        <Col>
          <SubmitButtonSkeleton />
        </Col>
      </Row>
    </FormSkeletonContainer>
  );

  return (
    <BasicFormContainer error={data.error} loading={data.loading} skeleton={<FormSkeleton />}>
      {data.result && (
        <Formik
          enableReinitialize
          onSubmit={handleSubmit}
          initialValues={{
            username: data.result.username,
            email: data.result.email,
            firstName: data.result.firstName,
            lastName: data.result.lastName,
          }}
          validationSchema={validationSchema}
        >
          {({ submitForm, isSubmitting, errors, values }) => (
            <Form onSubmit={handleSubmit} error={status.error} success={status.success}>
              <EditModeController title={t('common:my-account')} edit={edit} setEdit={setEdit} />
              <Row>
                <Col>
                  <FormControl
                    label={t('form.username')}
                    name="username"
                    required
                    disabled
                    value={values.username}
                  />
                </Col>
                <Col>
                  <FormControl
                    label={t('form.email')}
                    name="email"
                    type="email"
                    required
                    disabled
                    value={values.email}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormControl
                    label={t('form.firstName')}
                    name="firstName"
                    disabled={!edit}
                    value={values.firstName}
                  />
                </Col>
                <Col>
                  <FormControl
                    label={t('form.lastName')}
                    name="lastName"
                    disabled={!edit}
                    value={values.lastName}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <SubmitButton
                    label={t('common:confirmEdit')}
                    onClick={submitForm}
                    loading={isSubmitting}
                    disabled={Object.keys(errors).length !== 0 || !edit}
                  />
                </Col>
              </Row>
            </Form>
          )}
        </Formik>
      )}
    </BasicFormContainer>
  );
};

export default MyAccount;
