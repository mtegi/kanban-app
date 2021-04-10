import React from 'react';
import ChartInnerWrapper from './styled/ChartInnerWrapper';
import ChartWrapper from './styled/ChartWrapper';

type Props = {
  label: string;
  width: number;
  height: number;
  children: React.ReactNode;
};

const ChartContainer = ({ label, width, height, children }: Props) => {
  return (
    <ChartWrapper width={width}>
      <label>{label}</label>
      <ChartInnerWrapper height={height} width={width}>
        {children}
      </ChartInnerWrapper>
    </ChartWrapper>
  );
};

export default ChartContainer;
