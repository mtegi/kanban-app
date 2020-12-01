import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';

export const StyledIconButton = withStyles(() => ({
  root: {
    '&:focus': {
      outline: 'none',
    },
  },
}))(IconButton);
