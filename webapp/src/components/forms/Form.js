import { Form } from 'formik';
import styled from 'styled-components';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import GenericAlert from './GenericAlert';
import PopUp from '../misc/PopUp';

const StyledForm = styled(Form)`
  width: 100%;
  display: grid;
  row-gap: 2rem;
`;

const FormWrapper = ({ error, onSubmit, children, success, successText }) => {
  const { t } = useTranslation();

  return (
    <>
      <StyledForm onSubmit={onSubmit}>{children}</StyledForm>
      {error && (
        <Row>
          <Col>
            <GenericAlert message={t(error.message)} />
          </Col>
        </Row>
      )}
      {success && <PopUp text={t(successText)} />}
    </>
  );
};

FormWrapper.propTypes = {
  onSubmit: PropTypes.func,
  children: PropTypes.node.isRequired,
  error: PropTypes.shape({ message: PropTypes.string.isRequired }),
  success: PropTypes.bool,
  successText: PropTypes.string,
};

FormWrapper.defaultProps = {
  onSubmit: () => {},
  error: null,
  success: false,
  successText: 'common:success',
};

export default FormWrapper;
