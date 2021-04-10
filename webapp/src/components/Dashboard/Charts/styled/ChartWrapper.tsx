import styled from 'styled-components';

export default styled.div`
  display: flex;
  flex-direction: column;
  width: ${({ width }) => `${width}px`};
  label {
    width: 100%;
    text-align: center;
    color: ${({ theme }) => theme.palette.secondary.main};
    font-size: 1.5rem;
    font-weight: bold;
  }
`;
