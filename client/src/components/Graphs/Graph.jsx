import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";

const Graph = ({ results, series, height = 350, horizontal = true }) => {
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
    fill: {
      colors: ["#cf45a3", "#af3eb7", "#8f36db", "#6a2fef", "#2f47fd"],
      type: "gradient",
      gradient: {
        shade: "dark",
        type: horizontal ? "horizontal" : "vertical",
        shadeIntensity: 0.5,
        gradientToColors: [
          "#8f36bb",
          "#6f3e77",
          "#4f368b",
          "#2f2f7f",
          "#4f27bf",
        ],
        inverseColors: horizontal ? true : false,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100],
      },
    },
    stroke: {
      show: true,
      width: 1,
      colors: ["#ffffff20"], // This line makes the lines between bars grey
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
    annotations: {},
  });

  if (horizontal) {
    chartOptions.annotations.xaxis = [
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
    ];
  } else {
    chartOptions.annotations.yaxis = [
      {
        y: 0.5,
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
    ];
  }

  useEffect(() => {
    setChartOptions((prevOptions) => ({
      ...prevOptions,
      fill: {
        colors: [
          function ({ value, seriesIndex, w }) {
            if (value > 0.5) {
              return "#ff0000";
            } else {
              return "#8f3e97";
            }
          },
        ],
      },
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
