"use client";
import BarChart, { chartinfo } from "@/components/BarChart/barchart";
import { fetchChart } from "@/components/controller";
import React, { useState, useEffect } from "react";

export default function chartGrowth() {
  const [chartData, setChartData] = useState<chartinfo[]>([]);
  const fetchData = async () => {
    const data = await fetchChart();
    setChartData(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h1>Number of applications in each job of company</h1>
      <div className="w-1/3 h-full">
        <BarChart data={chartData} />
      </div>
    </div>
  );
}
