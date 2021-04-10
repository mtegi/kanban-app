import styled from 'styled-components';

export default styled.div`
  display: flex;
  flex-direction: column;
  width: ${({ width }) => `${width}px`};
  label {
    width: 100%;
    text-align: center;
    color: ${({ theme }) => theme.palette.secondary.main};
    font-size: ${({ width }) => `${width * 0.05}px`};
    font-weight: bold;
  }
`;
