import React from 'react';
import { LogTimeWrapper, TimeButton } from './styled';

const LogTimeButton = (props) => (
  <LogTimeWrapper {...props}>
    <TimeButton>&#9201;</TimeButton>
  </LogTimeWrapper>
);

export default LogTimeButton;
