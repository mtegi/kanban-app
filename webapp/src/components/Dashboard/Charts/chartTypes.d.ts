export declare type ChartData = {
  name: string;
  value: number;
  index?: number;
};

type ChartProps = {
  label: string;
  data: Array<ChartData>;
  width: number;
  height: number;
};
