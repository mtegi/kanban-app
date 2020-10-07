import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import styled from 'styled-components';

const StyledBar = withStyles(() => ({
  root: {
    height: '3px',
    width: '100%',
    zIndex: 999,
    backgroundColor: 'rgba(0,0,0,0)',
  },
  bar: {
    borderRadius: '1rem',
    backgroundColor: '#28fc4f',
  },
}))(LinearProgress);

const Wrapper = styled.div`
  display: flex;
  position: fixed;
  top: 0;
`;

const ProgressBar = () => (
  <Wrapper style={{ width: '100%' }}>
    <StyledBar />
  </Wrapper>
);

export default ProgressBar;
