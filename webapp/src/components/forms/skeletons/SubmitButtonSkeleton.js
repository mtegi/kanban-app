import { withStyles } from '@material-ui/core/styles';
import { Skeleton } from '@material-ui/lab';

const SubmitButtonSkeleton = withStyles(() => ({
  root: {
    height: '36px',
  },
}))(Skeleton);

export default SubmitButtonSkeleton;
