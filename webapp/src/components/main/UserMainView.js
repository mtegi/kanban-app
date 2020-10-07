import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from '../Layout';
import SEO from '../seo';
import UserMenu from '../menus/UserMenu';
import routes from '../../router/routes.json';
import MyAccount from '../pages/account/MyAccount';

const UserMainView = () => (
  <Layout menu={<UserMenu />}>
    <SEO />
    <Routes>
      <Route path={routes.myAccount.uri} element={<MyAccount />} />
    </Routes>
  </Layout>
);

export default UserMainView;
