import React from 'react';
import { Routes } from 'react-router-dom';
import Layout from '../Layout';
import SEO from '../seo';
import UserMenu from '../menus/UserMenu';

const UserMainView = () => (
  <Layout menu={<UserMenu />}>
    <SEO />
    <Routes />
  </Layout>
);

export default UserMainView;
