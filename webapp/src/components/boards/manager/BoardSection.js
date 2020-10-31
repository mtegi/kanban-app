import PropTypes from 'prop-types';
import styled from 'styled-components';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import BoardCard from './BoardCard';
import routes from '../../../router/routes.json';

const BoardSectionContainer = styled.div`
  width: 100%;
  min-height: 14rem;
  padding: 0.2rem 0.5rem;
`;

const Label = styled.span`
  font-size: 3rem;
  font-weight: bold;
  user-select: none;
`;

const CardWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-column-gap: 0.7rem;
  grid-row-gap: 0.5rem;
  grid-template-columns: repeat(auto-fill, minmax(200px, min-content));
`;

const BoardSection = ({ label, boards }) => {
  const navigate = useNavigate();

  return (
    <BoardSectionContainer>
      <Label>{label}</Label>
      <CardWrapper>
        {boards.map((b) => (
          <BoardCard
            key={b.id}
            title={b.name}
            color={b.color}
            onClick={() => navigate(`${routes.boards.uri}/${b.name}`)}
          />
        ))}
      </CardWrapper>
    </BoardSectionContainer>
  );
};

BoardSection.propTypes = {
  label: PropTypes.string,
  boards: PropTypes.arrayOf(
    PropTypes.shape({ title: PropTypes.string, id: PropTypes.number })
  ),
};

BoardSection.defaultProps = {
  label: '',
  boards: [],
};

export default BoardSection;
