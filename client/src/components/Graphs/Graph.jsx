import React from "react";
import { BarChart } from "@mui/x-charts/BarChart";

const Graph = ({ results }) => {
  const chartSetting = {
    xAxis: [
      {
        scaleType: "linear", // Numerical data on the x-axis
        label: "Probability",
        dataKey: "model_value",
      },
    ],
    yAxis: [
      {
        dataKey: "disease",
        scaleType: "band",
      },
    ],
    width: 700,
    height: 450,
    margin: { top: 50, right: 30, bottom: 50, left: 100 },
  };

  return (
    <BarChart
      dataset={results} // Pass the array of objects directly
      series={[
        {
          dataKey: "model_value", // Ensure this matches the key in your data objects
          label: "Disease Probability",
        },
      ]}
      layout="horizontal"
      {...chartSetting}
    />
  );
};

export default Graph;
