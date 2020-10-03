import { Form } from 'formik';
import styled from 'styled-components';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import GenericAlert from './GenericAlert';

const StyledForm = styled(Form)`
  width: 100%;
  display: grid;
  row-gap: 2rem;
`;

const FormWrapper = ({ error, onSubmit, children }) => {
  const { t } = useTranslation('error');
  return (
    <StyledForm onSubmit={onSubmit}>
      {children}
      {error && (
        <Row>
          <Col>
            <GenericAlert message={t(error.message)} />
          </Col>
        </Row>
      )}
    </StyledForm>
  );
};

FormWrapper.propTypes = {
  onSubmit: PropTypes.func,
  children: PropTypes.node.isRequired,
  error: PropTypes.shape({ message: PropTypes.string.isRequired }),
};

FormWrapper.defaultProps = {
  onSubmit: () => {},
  error: null,
};

export default FormWrapper;
