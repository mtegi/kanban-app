import styled from 'styled-components';

const MenuWrapper = styled.nav`
  display: flex;
  align-items: center;
  min-height: 3rem;
  padding: 0.25rem 1rem;
  background-color: ${(props) => props.theme.palette.primary.main};
  justify-content: space-between;
`;

export const MenuSection = styled.div`
  display: flex;
  align-items: inherit;
`;

export default MenuWrapper;
