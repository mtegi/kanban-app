import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';

const StyledFab = withStyles(() => ({
  root: {
    marginLeft: '1rem',
  },
}))(Fab);

const NewBoardButton = () => (
  <StyledFab color="secondary" aria-label="add" size="small">
    <AddIcon />
  </StyledFab>
);

export default NewBoardButton;
