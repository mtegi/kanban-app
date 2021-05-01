import { ChartProps } from '../chartTypes';
import ChartContainer from '../ChartContainer';
import { Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';
import React from 'react';

const TaskNumberChart = ({ label, width, height, data }: ChartProps) => {
  return (
    <ChartContainer label={label} width={width} height={height}>
      <LineChart width={width} height={height} data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Line type="stepAfter" dataKey="value" stroke="#00f241" />
      </LineChart>
    </ChartContainer>
  );
};

export default TaskNumberChart;
