import React from 'react';
import { useTranslation } from 'react-i18next';
import routes from '../../router/routes.json';
import MenuWrapper, { MenuSection } from './Wrapper';
import AccountMenu from './AccountMenu';
import NavButton from '../misc/NavButton';

const UserMenu = () => {
  const { t } = useTranslation('common');
  return (
    <MenuWrapper>
      <MenuSection>
        <NavButton to={routes.boards.uri}>{t('boards')}</NavButton>
      </MenuSection>
      <MenuSection>
        <AccountMenu />
      </MenuSection>
    </MenuWrapper>
  );
};

export default UserMenu;
