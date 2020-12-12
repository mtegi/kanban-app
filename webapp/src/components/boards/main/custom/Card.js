import React from 'react';
import PropTypes from 'prop-types';
import { CardHeader, CardRightContent, CardTitle, Detail, MovableCardWrapper } from './styled';
import DeleteButton from './DeleteButton';
import { parseDate } from '../../../../utils/date-utils';

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

  return (
    <MovableCardWrapper
      data-id={id}
      onClick={onClick}
      className={className}
      color={color}
    >
      <CardHeader>
        <CardTitle draggable>{title}</CardTitle>
        {deadline && <CardRightContent>{parseDeadline()}</CardRightContent>}
        {showDeleteButton && <DeleteButton onClick={handleDelete} />}
      </CardHeader>
      <Detail>{description}</Detail>
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
};

Card.defaultProps = {
  showDeleteButton: true,
  onDelete: () => {},
  onClick: () => {},
  description: '',
  deadline: null,
  color: '#ffffff',
  className: '',
};

export default Card;
