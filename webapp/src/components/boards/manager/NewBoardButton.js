import PropTypes from 'prop-types';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { Tooltip } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

const StyledFab = withStyles(() => ({
  root: {
    marginLeft: '1rem',
  },
}))(Fab);

const NewBoardButton = ({ onClick }) => {
  const { t } = useTranslation('boards');
  return (
    <Tooltip title={t('create')}>
      <StyledFab
        color="secondary"
        aria-label="add"
        size="small"
        onClick={onClick}
      >
        <AddIcon />
      </StyledFab>
    </Tooltip>
  );
};

NewBoardButton.propTypes = {
  onClick: PropTypes.func,
};

NewBoardButton.defaultProps = {
  onClick: () => {},
};

export default NewBoardButton;
