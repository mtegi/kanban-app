import styled from 'styled-components';

const BoardManagerContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
  min-height: 90vh;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  margin-top: 1rem;
  border: 3px ${(props) => props.theme.palette.secondary.main} solid;
`;

export default BoardManagerContainer;
