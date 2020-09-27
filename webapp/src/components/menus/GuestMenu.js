import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import routes from '../../router/routes.json';
import MenuWrapper from './Wrapper';

const GuestMenu = () => {
  const { t } = useTranslation();
  return (
    <MenuWrapper>
      <Link to={routes.login.uri}>
        <Button>{t(routes.login.title)}</Button>
      </Link>
    </MenuWrapper>
  );
};

export default GuestMenu;
