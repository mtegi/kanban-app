import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import DashboardWrapper from './styled/DashboardWrapper';
import AppContext from '../../utils/AppContext';
import { useAsync } from 'react-async-hook';
import BoardApi from '../../api/BoardApi';
import { Cell, Pie, PieChart } from 'recharts';
import { ChartData } from './Charts/chartTypes';
import OpenClosedPieChart from './Charts/OpenClosedPieChart';

type dashboardData = {
  open: number;
  closed: number;
  memberTasks: Array<{ name: string; taskNumber: 2 }>;
};

const Dashboard = () => {
  const { t } = useTranslation();
  const { state } = useContext(AppContext);
  const data = useAsync(BoardApi.getReportDetails, [state.boardId]);
  const [pieData, setPieData] = useState<Array<ChartData>>(null);

  useEffect(() => {
    if (data.result) {
      setPieData([
        { name: t('open'), value: data.result.open },
        { name: t('closed'), value: data.result.closed },
      ]);
    }
  }, [data.result]);

  return (
    <DashboardWrapper>
      {pieData && (
        <OpenClosedPieChart
          label={t('open-closed-chart')}
          data={pieData}
          width={400}
          height={400}
        />
      )}
    </DashboardWrapper>
  );
};

export default Dashboard;
