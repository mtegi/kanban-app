export declare type ChartData = {
  name: string;
  value: number;
};

type ChartProps = {
  label: string;
  data: Array<ChartData>;
  width: number;
  height: number;
};
