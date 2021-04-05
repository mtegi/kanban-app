import PropTypes from 'prop-types';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import BoardCard from './BoardCard';
import routes from '../../../router/routes.json';
import { BoardSectionContainer, CardWrapper, Label } from './styled';

const BoardSection = ({ label, boards, icon }) => {
  const navigate = useNavigate();

  return (
    <BoardSectionContainer>
      <Label>
        {label}
        {icon}
      </Label>
      <CardWrapper>
        {boards.map((b) => (
          <BoardCard
            key={b.id}
            title={b.name}
            color={b.color}
            lastOpened={b.lastOpened}
            onClick={() =>
              navigate(`${routes.boards.uri}/${b.name}`, {
                state: { id: b.id },
              })
            }
          />
        ))}
      </CardWrapper>
    </BoardSectionContainer>
  );
};

BoardSection.propTypes = {
  label: PropTypes.string,
  icon: PropTypes.element.isRequired,
  boards: PropTypes.arrayOf(PropTypes.shape({ title: PropTypes.string, id: PropTypes.number })),
};

BoardSection.defaultProps = {
  label: '',
  boards: [],
};

export default BoardSection;
