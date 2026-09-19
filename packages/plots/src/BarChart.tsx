import { BarChart as MuiBarChart } from '@mui/x-charts/BarChart';

export type BarChartItem = {
  label: string;
  value: number;
};

type BarChartProps = {
  data: BarChartItem[];
  seriesLabel?: string;
  height?: number;
};

export function BarChart({ data, seriesLabel, height = 320 }: BarChartProps) {
  return (
    <MuiBarChart
      height={height}
      xAxis={[
        {
          scaleType: 'band',
          data: data.map((item) => item.label),
        },
      ]}
      series={[
        {
          data: data.map((item) => item.value),
          label: seriesLabel,
        },
      ]}
    />
  );
}
