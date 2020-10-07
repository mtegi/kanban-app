import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

const Title = styled(Col)`
  font-weight: bold;
  font-size: 2rem;
  display: flex;
  align-items: flex-start;
`;

const SwitchWrapper = styled(Col)`
  display: flex;
  justify-content: flex-end;
`;

const EditModeController = ({ title, edit, setEdit }) => {
  const handleChange = (event) => {
    setEdit(event.target.checked);
  };

  const { t } = useTranslation();

  return (
    <Row>
      {title && <Title>{title}</Title>}
      <SwitchWrapper>
        <FormControlLabel
          control={<Switch checked={edit} onChange={handleChange} />}
          label={t('editMode')}
          labelPlacement="start"
        />
      </SwitchWrapper>
    </Row>
  );
};

EditModeController.propTypes = {
  title: PropTypes.string,
  edit: PropTypes.bool,
  setEdit: PropTypes.func,
};

EditModeController.defaultProps = {
  title: null,
  edit: true,
  setEdit: () => {},
};

export default EditModeController;
