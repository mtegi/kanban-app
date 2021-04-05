import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from '../Layout';
import SEO from '../seo';
import UserMenu from '../menus/UserMenu';
import routes from '../../router/routes.json';
import MyAccount from '../pages/account/MyAccount';
import BoardManager from '../boards/manager/BoardManager';
import MainBoardView from '../boards/main/MainBoardView';
import BoardCreator from '../boards/creator/BoardCreator';
import { BoardProvider } from '../boards/context/BoardContext';
import JoinBoard from '../boards/join/JoinBoard';
import { AppContextProvider } from '../../utils/AppContext';
import Dashboard from '../Dashboard/Dashboard';

const UserMainView = () => (
  <AppContextProvider>
    <BoardProvider>
      <Layout menu={<UserMenu />}>
        <SEO />
        <Routes>
          <Route path={routes.boards.uri} element={<BoardManager />} />
          <Route path={`${routes.boards.uri}/:id`} element={<MainBoardView />} />
          <Route path={routes.myAccount.uri} element={<MyAccount />} />
          <Route path={routes.boards.create.uri} element={<BoardCreator />} />
          <Route path={routes.boards.join.uri} element={<JoinBoard />} />
          <Route path={routes.dashboard.uri} element={<Dashboard />} />
        </Routes>
      </Layout>
    </BoardProvider>
  </AppContextProvider>
);

export default UserMainView;
