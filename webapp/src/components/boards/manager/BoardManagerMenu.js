import styled from 'styled-components';

const BoardManagerMenu = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  background-color: ${(props) => props.theme.palette.primary.main};
  padding: 0.5rem 0.5rem 0.25rem;
`;

export default BoardManagerMenu;
