import React, { useState, useEffect } from "react";
import ApexCharts from "react-apexcharts";

const RadialBarChart = ({ results, height = 215 }) => {
  const [options, setOptions] = useState({
    chart: {
      height: height, // Ensure height is consistent
      type: "radialBar",
    },
    colors: ["#8f3e97"],
    plotOptions: {
      radialBar: {
        hollow: {
          margin: 0,
          size: "70%",
          background: "transparent",
        },
        track: {
          dropShadow: {
            enabled: true,
            top: 2,
            left: 0,
            blur: 4,
            opacity: 0.15,
          },
        },
        dataLabels: {
          name: {
            offsetY: -10,
            color: "#fff",
            fontSize: "13px",
          },
          value: {
            color: "#fff",
            fontSize: "30px",
            show: true,
          },
        },
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        type: "vertical",
        gradientToColors: ["#cf4583"],
        stops: [0, 100],
      },
    },
    stroke: {
      lineCap: "round",
    },
    labels: ["Confidence"],
  });

  const [series, setSeries] = useState([67]);

  useEffect(() => {
    if (results === undefined) return;
    setSeries([results.percentage]);
  }, [results]);

  return (
    <div
      className="flex flex-col items-center w-full"
      style={{ width: "100%" }}
    >
      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <ApexCharts
          options={options}
          series={series}
          type="radialBar"
          height={height}
        />
      </div>
      <div className="flex justify-center gap-2 mb-2">
        <h1 className="text-base text-white font-semibold text-center">
          {results.desease}
        </h1>
        <h1 className="text-base text-orange-400 font-semibold text-center">
          Positive
        </h1>
      </div>
    </div>
  );
};

export default RadialBarChart;
