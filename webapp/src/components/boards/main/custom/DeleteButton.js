import React from 'react';
import { DelButton, DeleteWrapper } from './styled';

const DeleteButton = (props) => (
  <DeleteWrapper {...props}>
    <DelButton>&#10006;</DelButton>
  </DeleteWrapper>
);

export default DeleteButton;
