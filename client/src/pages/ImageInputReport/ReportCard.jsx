import React from "react";
import Graph from "../../components/Graphs/Graph";

const ReportCard = ({ data, index }) => {
  return (
    <div
      key={index}
      className="bg-white p-4 rounded-xl my-4 flex items-center justify-center"
    >
      <Graph results={data.prediction} />
    </div>
  );
};

export default ReportCard;
