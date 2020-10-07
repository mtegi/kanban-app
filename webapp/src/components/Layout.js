import React, { Suspense } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import MenuWrapper from './menus/Wrapper';

const S = {};
S.Main = styled.main`
  min-height: 100%;
`;

const Layout = ({ menu, children }) => (
  <>
    <Suspense fallback={<MenuWrapper />}>{menu}</Suspense>
    <S.Main>
      <Suspense fallback={null}>{children}</Suspense>
    </S.Main>
  </>
);

Layout.propTypes = {
  menu: PropTypes.element.isRequired,
  children: PropTypes.node.isRequired,
};

export default Layout;
