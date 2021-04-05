import styled from 'styled-components';
import PropTypes from 'prop-types';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React from 'react';
import { useTranslation } from 'react-i18next';
import GenericAlert from './GenericAlert';
import ProgressBar from '../misc/ProgressBar';

const StyledContainer = styled.div`
  position: absolute;
  display: grid;
  row-gap: 1rem;
  padding: 2rem;
  min-width: 26vw;
  border: 5px ${(props) => props.theme.palette.primary.dark} solid;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
`;

const BasicFormContainer = ({ loading, error, children, noProgressBar, skeleton }) => {
  const { t } = useTranslation();

  return (
    <>
      {loading && !noProgressBar && <ProgressBar />}
      <StyledContainer>
        {error && (
          <Row>
            <Col>
              <GenericAlert message={t(error.message)} />
            </Col>
          </Row>
        )}
        {loading ? skeleton : children}
      </StyledContainer>
    </>
  );
};

BasicFormContainer.propTypes = {
  loading: PropTypes.bool,
  noProgressBar: PropTypes.bool,
  children: PropTypes.node,
  skeleton: PropTypes.element,
  error: PropTypes.shape({ message: PropTypes.string.isRequired }),
};

BasicFormContainer.defaultProps = {
  skeleton: null,
  noProgressBar: false,
  loading: false,
  error: null,
  children: null,
};

export default BasicFormContainer;
