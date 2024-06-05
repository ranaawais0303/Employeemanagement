import React, { useState, useEffect } from "react";
import { CategoryScale } from "chart.js";
// import { Pie } from "react-chartjs-2"; // Import Pie chart component
import Chart from "chart.js/auto";
import PieChart from "./PieChart";
import { useSelector } from "react-redux";

const Chart3 = () => {
  const [groupedData, setGroupedData] = useState({}); // Empty object initially
  const { dataSet } = useSelector((store) => store.calendar);

  useEffect(() => {
    Chart.register(CategoryScale); // Register ArcElement
  }, []);
  // Function for generating chart data (optional, for better organization)
  const createChartData = (dataSet) => {
    const labels = Object.keys(dataSet || groupedData); // Use dataSets if available, otherwise fallback
    const values = Object.values(dataSet || groupedData).map(
      (item) => item.total
    );
    console.log(labels, values, "912: labels and values");
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
  console.log(chartData, "911:chart data");

  //   const options = {

  //   };

  return (
    <div>
      <PieChart chartData={chartData} />
    </div>
  );
};

export default Chart3;
