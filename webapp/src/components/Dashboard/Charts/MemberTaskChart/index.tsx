import React from 'react';
import { Cell, Pie, PieChart, Tooltip } from 'recharts';
import ChartContainer from '../ChartContainer';
import { ChartProps } from '../chartTypes';
import { renderCustomizedLabel } from '../OpenClosedPieChart';
import { randomColor } from '../../../../utils/func';

const MemberTaskChart = ({ label, width, height, data }: ChartProps) => {
  return (
    <ChartContainer label={label} width={width} height={height}>
      <PieChart height={height} width={width}>
        <Tooltip />
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={'90%'}
          labelLine={false}
          label={renderCustomizedLabel}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={randomColor()} />
          ))}
        </Pie>
      </PieChart>
    </ChartContainer>
  );
};

export default MemberTaskChart;
