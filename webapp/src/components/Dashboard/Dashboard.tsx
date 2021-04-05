import React, { useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import DashboardWrapper from './styled/DashboardWrapper';
import AppContext from '../../utils/AppContext';

const Dashboard = () => {
  const { t } = useTranslation();
  const { state } = useContext(AppContext);

  useEffect(() => {
    alert(state.boardId);
  }, []);

  return <DashboardWrapper />;
};

export default Dashboard;
