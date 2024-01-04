import React from "react";
import { Pie } from "react-chartjs-2";
import { UUID } from "crypto";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { ChartProps } from "./barchart";
//Chart.register(LinearScale, CategoryScale);
ChartJS.register(ArcElement, Tooltip, Legend);
const generateRandomColor = (numColors: number): string[] => {
  const colors = [];
  for (let i = 0; i < numColors; i++) {
    const color = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
      Math.random() * 256
    )}, ${Math.floor(Math.random() * 256)}, 0.2)`;
    colors.push(color);
  }
  return colors;
};

const PieChart: React.FC<ChartProps> = ({
  data,
  width = 200,
  height = 200,
}) => {
  const chartData = {
    labels: data.map((item) => item.x),
    datasets: [
      {
        label: "Rate of Applications",
        data: data.map((item) => item.y),
        backgroundColor: generateRandomColor(data.length),
        borderColor: generateRandomColor(data.length),
        borderWidth: 1,
      },
    ],
  };

  const options = {
    radius: "80%",
  };

  return (
    <Pie data={chartData} options={options} width={width} height={height} />
  );
};

export default PieChart;
