import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import routes from '../../router/routes.json';
import MenuWrapper from './Wrapper';
import AccountMenu from './AccountMenu';

const UserMenu = () => {
  const { t } = useTranslation('common');
  return (
    <MenuWrapper>
      <AccountMenu />
    </MenuWrapper>
  );
};

export default UserMenu;
