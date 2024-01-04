import React from "react";
import { Bar } from "react-chartjs-2";
import { UUID } from "crypto";
import Chart, { LinearScale, CategoryScale } from "chart.js/auto";
Chart.register(LinearScale, CategoryScale);

export interface chartinfo {
  jobid: UUID;
  x: string;
  y: number;
}

export interface BarChartProps {
  data: chartinfo[];
  width?: number;
  height?: number;
}

const BarChart: React.FC<BarChartProps> = ({
  data,
  width = 400,
  height = 300,
}) => {
  const maxCount = Math.max(...data.map((item) => item.y));
  const chartData = {
    labels: data.map((item) => item.x),
    datasets: [
      {
        label: "Number of Employees",
        data: data.map((item) => item.y),
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        suggestedMax: maxCount + 1,
      },
    },
  };

  return (
    <Bar data={chartData} options={options} width={width} height={height} />
  );
};

export default BarChart;
