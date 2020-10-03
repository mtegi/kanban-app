import styled from 'styled-components';

const MenuWrapper = styled.nav`
  display: flex;
  align-items: center;
  min-height: 3rem;
  padding: 0.5rem 1rem;
  background-color: ${(props) => props.theme.palette.primary.main};
`;

export default MenuWrapper;
