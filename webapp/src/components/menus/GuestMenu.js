import React from 'react';
import { useTranslation } from 'react-i18next';
import routes from '../../router/routes.json';
import MenuWrapper from './Wrapper';
import NavButton from '../misc/NavButton';

const GuestMenu = () => {
  const { t } = useTranslation('common');
  return (
    <MenuWrapper>
      <NavButton to={routes.login.uri}>{t(routes.login.title)}</NavButton>
    </MenuWrapper>
  );
};

export default GuestMenu;
