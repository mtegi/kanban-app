import styled from 'styled-components';

const BasicFormContainer = styled.div`
  position: absolute;
  display: grid;
  row-gap: 1rem;
  padding: 3rem;
  min-width: 25vw;
  border: 5px ${(props) => props.theme.palette.primary.dark} solid;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
`;

export default BasicFormContainer;
