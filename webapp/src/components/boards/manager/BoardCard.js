import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const Card = styled.div`
  width: 12rem;
  height: 6rem;
  padding: 0.1rem 0.5rem;
  background-color: coral;
  border-radius: 0.2rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: box-shadow 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  &:hover {
    filter: brightness(0.85);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  }
  &:focus {
    filter: brightness(0.85);
    outline: none;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  }
`;

const CardTitle = styled.span`
  font-weight: bold;
  font-size: 1.2rem;
  user-select: none;
`;

const BoardCard = ({ title, onClick }) => (
  <Card role="button" onClick={onClick}>
    <CardTitle>{title}</CardTitle>
  </Card>
);

BoardCard.propTypes = {
  title: PropTypes.string,
  onClick: PropTypes.func,
};

BoardCard.defaultProps = {
  title: '',
  onClick: () => {},
};

export default BoardCard;
