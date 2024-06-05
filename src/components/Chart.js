import React, { useEffect } from "react";
import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";
import PieChart from "./PieChart";
import { useSelector } from "react-redux";

const ChartComp = ({ setShowPieChart }) => {
  const { dataSet } = useSelector((store) => store.calendar);

  useEffect(() => {
    Chart.register(CategoryScale);
  }, []);

  // in this set the data for chart that type of data required for chart
  const createChartData = (dataSet) => {
    const labels = Object.keys(dataSet);
    const values = Object.values(dataSet).map((item) => item.total);

    return {
      labels,
      datasets: [
        {
          label: "Total Value by Date",
          data: values,

          backgroundColor: [
            "rgba(255, 99, 132, 0.2)", // Light red
            "rgba(54, 162, 235, 0.2)", // Light blue
            "rgba(255, 206, 86, 0.2)", // Light orange
            "rgba(75, 192, 192, 0.2)", // Light green
            "rgba(153, 102, 255, 0.2)", // Light blue
          ],

          borderColor: [
            "rgba(255, 99, 132, 1)", // Red
            "rgba(54, 162, 235, 1)", // Blue
            "rgba(255, 206, 86, 1)", // Orange
            "rgba(75, 192, 192, 1)", // Green
            "rgba(153, 102, 255, 1)", // Blue
          ],

          borderWidth: 1,
        },
      ],
    };
  };

  const chartData = createChartData(dataSet);

  return (
    <div>
      <PieChart chartData={chartData} setShowPieChart={setShowPieChart} />
    </div>
  );
};

export default ChartComp;
