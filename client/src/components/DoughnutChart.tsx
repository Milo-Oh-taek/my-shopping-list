import React from 'react';
import 'chart.js/auto';
import { Doughnut } from 'react-chartjs-2';

export interface doughnutData {
  datasets: object[];
  labels: string[];
}

interface PropsType {
  chartData: doughnutData | any;
}

const options = {
  responsive: true,
  maintainAspectRatio: true,
};
const DoughnutChart = ({ chartData }: PropsType) => {
  return <div>{<Doughnut data={chartData} options={options} />}</div>;
};

export default DoughnutChart;
