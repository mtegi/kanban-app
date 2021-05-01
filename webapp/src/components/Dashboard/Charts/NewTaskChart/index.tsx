import { ChartProps } from '../chartTypes';
import ChartContainer from '../ChartContainer';
import { Line, LineChart, Scatter, Tooltip, XAxis, YAxis, ZAxis, ScatterChart } from 'recharts';
import React from 'react';
import { useTranslation } from 'react-i18next';

const NewTaskChart = ({ label, width, height, data }: ChartProps) => {
  const { t } = useTranslation();
  const parseDomain = () => [
    0,
    Math.max.apply(
      null,
      data.map((entry) => entry.value)
    ),
  ];

  return (
    <ChartContainer label={label} width={width} height={height}>
      <ScatterChart
        width={width}
        height={height}
        data={data}
        margin={{
          top: 40,
          right: 0,
          bottom: 0,
          left: 0,
        }}
      >
        <XAxis dataKey="name" interval={0} tickLine={{ transform: 'translate(0, -6)' }} />
        <YAxis
          type="number"
          dataKey="index"
          tick={false}
          tickLine={false}
          axisLine={false}
          label={{ value: t('day'), position: 'insideRight' }}
        />
        <ZAxis type="number" dataKey="value" domain={parseDomain()} range={[0, 500]} />
        <Tooltip />
        <Scatter data={data} fill="#8884d8" />
      </ScatterChart>
    </ChartContainer>
  );
};

export default NewTaskChart;
