import React from 'react';
import PropTypes from 'prop-types';
import { AvatarGroup } from '@material-ui/lab';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { Tooltip } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { CardHeader, CardRightContent, CardTitle, Detail, MovableCardWrapper } from './styled';
import DeleteButton from './DeleteButton';
import { parseDate } from '../../../../utils/date-utils';
import BoardAvatar from '../../AvatarGroup/Avatar';
import LogTimeButton from './LogTimeButton';
import { setLogTime } from '../../../../redux/reducers/actions/logTimeActions';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(1),
    display: 'flex',
    justifyContent: 'flex-end',
    zIndex: 999,
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
}));

const Card = ({
  showDeleteButton,
  onDelete,
  onClick,
  className,
  id,
  title,
  deadline,
  description,
  color,
  members,
}) => {
  const handleDelete = (e) => {
    onDelete();
    e.stopPropagation();
  };

  const parseDeadline = () => {
    if (deadline) {
      return deadline instanceof Date
        ? parseDate(deadline.toISOString(), 'do MMM Y p')
        : parseDate(deadline, 'do MMM Y p');
    }
    return '';
  };

  const classes = useStyles();
  const dispatch = useDispatch();

  const onLogTimeClick = (e) => {
    dispatch(setLogTime(true, id));
    e.stopPropagation();
  };

  return (
    <MovableCardWrapper data-id={id} onClick={onClick} className={className} color={color}>
      <CardHeader>
        <CardTitle draggable>{title}</CardTitle>
        {deadline && <CardRightContent>{parseDeadline()}</CardRightContent>}
        {showDeleteButton && <DeleteButton onClick={handleDelete} />}
        <LogTimeButton onClick={onLogTimeClick} />
      </CardHeader>
      <Detail>{description}</Detail>
      <AvatarGroup max={4} className={classes.root}>
        {members &&
          members.map((m) => (
            <Tooltip key={m.username} title={m.name} placement="top">
              <BoardAvatar username={m.username} className={classes.small} />
            </Tooltip>
          ))}
      </AvatarGroup>
    </MovableCardWrapper>
  );
};

Card.propTypes = {
  showDeleteButton: PropTypes.bool,
  onDelete: PropTypes.func,
  onClick: PropTypes.func,
  className: PropTypes.string,
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  deadline: PropTypes.oneOf([PropTypes.string, PropTypes.instanceOf(Date)]),
  description: PropTypes.string,
  color: PropTypes.string,
  // eslint-disable-next-line
  members: PropTypes.arrayOf<PropTypes.shape>({ username: PropTypes.string.isRequired, name: PropTypes.string.isRequired })
};

Card.defaultProps = {
  showDeleteButton: true,
  onDelete: () => {},
  onClick: () => {},
  description: '',
  deadline: null,
  color: '#ffffff',
  className: '',
  members: [],
};

export default Card;
