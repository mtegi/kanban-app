import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import DashboardWrapper from './styled/DashboardWrapper';
import AppContext from '../../utils/AppContext';
import { useAsync } from 'react-async-hook';
import BoardApi from '../../api/BoardApi';
import { ChartData } from './Charts/chartTypes';
import OpenClosedPieChart from './Charts/OpenClosedPieChart';
import MemberTaskChart from './Charts/MemberTaskChart';

type DashboardData = {
  openClosed: Array<ChartData>;
  memberTasks: Array<ChartData>;
};

const Dashboard = () => {
  const { t } = useTranslation();
  const { state } = useContext(AppContext);
  const data = useAsync(BoardApi.getReportDetails, [state.boardId]);
  const [chartData, setChartData] = useState<DashboardData>(null);

  useEffect(() => {
    if (data.result) {
      setChartData({
        openClosed: [
          { name: t('open'), value: data.result.open },
          { name: t('closed'), value: data.result.closed },
        ],
        memberTasks: data.result.memberTasks.map((entry) => ({
          name: t(entry.name),
          value: entry.taskNumber,
        })),
      });
    }
  }, [data.result]);

  return (
    <DashboardWrapper>
      {chartData && (
        <>
          <OpenClosedPieChart
            label={t('open-closed-chart')}
            data={chartData.openClosed}
            width={400}
            height={400}
          />
          <MemberTaskChart
            label={t('member-tasks-chart')}
            data={chartData.memberTasks}
            width={400}
            height={400}
          />
        </>
      )}
    </DashboardWrapper>
  );
};

export default Dashboard;
