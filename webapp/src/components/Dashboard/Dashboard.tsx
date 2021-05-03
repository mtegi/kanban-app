import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import DashboardWrapper from './styled/DashboardWrapper';
import AppContext from '../../utils/AppContext';
import { useAsync } from 'react-async-hook';
import BoardApi from '../../api/BoardApi';
import { ChartData } from './Charts/chartTypes';
import OpenClosedPieChart from './Charts/OpenClosedPieChart';
import MemberTaskChart from './Charts/MemberTaskChart';
import TaskNumberChart from './Charts/TaskNumberChart';
import NewTaskChart from './Charts/NewTaskChart';

type DashboardData = {
  openClosed: Array<ChartData>;
  memberTasks: Array<ChartData>;
  taskNumber: Array<ChartData>;
  newTasks: Array<ChartData>;
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
        taskNumber: data.result.taskTimeLine.data.map((entry) => ({
          name: entry.day,
          value: entry.totalTasks,
        })),
        newTasks: data.result.taskTimeLine.data
          .filter((entry) => entry.tasks > 0)
          .map((entry) => ({
            name: entry.day,
            value: entry.tasks,
            index: 1,
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
          <TaskNumberChart
            label={t('total-tasks-chart')}
            data={chartData.taskNumber}
            width={800}
            height={400}
          />
          <NewTaskChart
            label={t('new-tasks-chart')}
            data={chartData.newTasks}
            width={800}
            height={100}
          />
        </>
      )}
    </DashboardWrapper>
  );
};

export default Dashboard;
