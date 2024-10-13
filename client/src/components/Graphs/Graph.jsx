import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";

const Graph = ({ results, series, height = 350, horizontal = true }) => {
  console.log(results);
  const [chartOptions, setChartOptions] = useState({
    chart: {
      type: "bar",
      foreColor: "#fff",
      height: height, // Dynamically set the height here
    },
    plotOptions: {
      bar: {
        horizontal: horizontal, // This line makes the chart horizontal
      },
    },
    colors: ["#8f3e97"],
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        type: horizontal ? "horizontal" : "vertical",
        shadeIntensity: 0.5,
        gradientToColors: ["#af4583", "#8f0097"],
        inverseColors: true,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100],
      },
    },
    stroke: {
      show: true,
      width: 1,
      colors: ["#bbbbbb83"], // This line makes the lines between bars grey
    },
    grid: {
      borderColor: "#bbbbbb83", // This line makes the grid lines grey
    },
    dataLabels: {
      enabled: false,
    },
    series: series
      ? series
      : [
          {
            name: "Model Prediction",
            data: Object.values(results).map((val) => Number(val.toFixed(3))), // Round to 3 decimal places
          },
        ],
    xaxis: {
      // get all the keys from the results array
      categories: Object.keys(results),
      min: 0,
      max: 1,
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val.toFixed(3); // Round to 3 decimal places
        },
      },
    },
    annotations: {
      xaxis: [
        {
          x: 0.5,
          strokeDashArray: 0,
          borderColor: "#ff0000",
          label: {
            borderColor: "#ff0000",
            style: {
              color: "#fff",
              background: "#ff0000",
            },
          },
        },
      ],
    },
  });

  useEffect(() => {
    setChartOptions((prevOptions) => ({
      ...prevOptions,
      colors: [
        function ({ value, seriesIndex, w }) {
          if (value > 0.5) {
            return "#ff0000";
          } else {
            return "#8f3e97";
          }
        },
      ],
    }));
  }, [results]);

  return (
    <div id="chart" style={{ width: "100%", height: `${height}px` }}>
      {" "}
      {/* Use height prop here */}
      <ReactApexChart
        options={chartOptions}
        series={chartOptions.series}
        type="bar"
        height={height}
      />
    </div>
  );
};

export default Graph;
