import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from '../Layout';
import SEO from '../seo';
import GuestMenu from '../menus/GuestMenu';
import routes from '../../router/routes.json';
import Login from '../pages/account/Login';
import Register from '../pages/account/Register';
import ActivateAccount from '../pages/account/ActivateAccount';

const GuestMainView = () => (
  <Layout menu={<GuestMenu />}>
    <SEO />
    <Routes>
      <Route path={routes.login.uri} element={<Login />} />
      <Route path={routes.register.uri} element={<Register />} />
      <Route path={routes.activate.uri} element={<ActivateAccount />} />
    </Routes>
  </Layout>
);

export default GuestMainView;
