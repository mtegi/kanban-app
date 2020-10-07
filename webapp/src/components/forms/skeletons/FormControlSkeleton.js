import { withStyles } from '@material-ui/core/styles';
import { Skeleton } from '@material-ui/lab';

const FormControlSkeleton = withStyles(() => ({
  root: {
    height: 'calc(27px + 10px + 1.1876em)',
  },
}))(Skeleton);

export default FormControlSkeleton;
