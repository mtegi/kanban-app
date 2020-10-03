import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from '../Layout';
import SEO from '../seo';
import GuestMenu from '../menus/GuestMenu';
import routes from '../../router/routes.json';
import Login from '../pages/account/Login';
import Register from '../pages/account/Register';

const GuestMainView = () => (
  <Layout menu={<GuestMenu />}>
    <SEO />
    <Routes>
      <Route path={routes.login.uri} element={<Login />} />
    </Routes>
    <Routes>
      <Route path={routes.register.uri} element={<Register />} />
    </Routes>
  </Layout>
);

export default GuestMainView;
