import React from 'react';
import { Cell, Pie, PieChart } from 'recharts';
import ChartContainer from '../ChartContainer';
import { ChartProps } from '../chartTypes';

const COLORS = ['#0088FE', '#FF8042'];

export const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  name,
  value,
}) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.4;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="#37474f"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
    >
      {name} ({value})
    </text>
  );
};

const OpenClosedPieChart = ({ label, width, height, data }: ChartProps) => {
  return (
    <ChartContainer label={label} width={width} height={height}>
      <PieChart height={height} width={width}>
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
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ChartContainer>
  );
};

export default OpenClosedPieChart;
