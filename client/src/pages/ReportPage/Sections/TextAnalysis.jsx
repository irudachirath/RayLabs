import React, { useState, useEffect } from "react";
import { Spin } from "antd";
import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";
import { QuestionCircleOutlined } from "@ant-design/icons";
import MarkdownText from "../../../components/MarkdownText/MarkdownText";

const TextAnalysis = ({ report, loading }) => {
  const cardStyle =
    "flex flex-col justify-center items-center bg-[#000000] border-[#bbbbbb83] border-[1px] h-fit rounded-lg";

  const getOtherConditions = (topConditions, allConditions) => {
    console.log(topConditions);
    console.log(allConditions);

    const topDiseaseNames = topConditions.map((condition) => condition.disease);

    const otherConditions = allConditions.filter(
      (condition) => !topDiseaseNames.includes(condition.disease)
    );
    console.log(otherConditions);

    return otherConditions;
  };

  // Function to remove the first bolded word (**...**)
  const removeFirstBoldWord = (str) => {
    return str.replace(/\*\*.*?\*\*/, "").trim();
  };

  const otherConditions = getOtherConditions(
    report.topConditions,
    report.allFoundConditions
  );

  return (
    <>
      <h1 className="text-xl text-start pb-2 font-semibold text-white">
        Text Report
      </h1>
      <div className="flex justify-center gap-3 mt-3">
        <div className={`w-1/2 flex flex-col gap-3`}>
          <div className={`w-full p-2 py-4 ${cardStyle}`}>
            <>
              {loading ? (
                <span className="mr-2 my-auto">
                  <Spin style={{ color: "#ffffff" }} />
                </span>
              ) : (
                <div className="w-full px-12">
                  <div className="w-full flex justify-center items-center gap-3">
                    <h1 className="text-lg text-white font-semibold text-center mt-2">
                      Potential Top Diseases Identified
                    </h1>
                    <Tooltip
                      TransitionComponent={Zoom}
                      title="These are the top diseases identified by the AI model. These diseases are selected based on the avarage probability for each disease for every image uploaded."
                      placement="right"
                    >
                      <QuestionCircleOutlined style={{ color: "#ffffff" }} />
                    </Tooltip>
                  </div>
                  <ui className="mx-5 w-full">
                    {report.topConditions.map((disease, index) => (
                      <li
                        key={index}
                        className="text-white text-base py-1 text-start"
                      >
                        {disease.disease}
                      </li>
                    ))}
                  </ui>
                </div>
              )}
            </>
          </div>
          <div className={`w-full p-2 py-4 ${cardStyle}`}>
            <>
              {loading ? (
                <span className="mr-2 my-auto">
                  <Spin style={{ color: "#ffffff" }} />
                </span>
              ) : (
                <div className="w-full px-12">
                  <div className="w-full flex justify-center items-center gap-3">
                    <h1 className="text-lg text-white font-semibold text-center mt-2">
                      Possible Minor Conditions Highlighted
                    </h1>
                    <Tooltip
                      TransitionComponent={Zoom}
                      title="This diagnosis is suggested based on a significant indication from atleast one of the analyzed images."
                      placement="right"
                    >
                      <QuestionCircleOutlined style={{ color: "#ffffff" }} />
                    </Tooltip>
                  </div>
                  <ui className="mx-5 w-full">
                    {otherConditions.map((disease, index) => (
                      <li
                        key={index}
                        className="text-white text-base py-1 text-start"
                      >
                        {disease.disease}
                      </li>
                    ))}
                  </ui>
                </div>
              )}
            </>
          </div>
        </div>
        <div className={`w-1/2 p-2 py-4 ${cardStyle}`}>
          <>
            {loading ? (
              <span className="mr-2 my-auto">
                <Spin style={{ color: "#ffffff" }} />
              </span>
            ) : (
              <>
                <h1 className="text-lg text-white font-semibold text-center my-2">
                  Summary of Findings
                </h1>
                <p className="text-white text-justify p-4">
                  {report.textReport.report.summary}
                </p>
              </>
            )}
          </>
        </div>
      </div>
      <h1 className="text-xl text-start my-3 font-semibold text-white">
        Disease Info
      </h1>
      <div className="w-full grid grid-cols-2 gap-3">
        {report.textReport.report.data.map((data, index) => (
          <>
            <div className={`w-full p-4 ${cardStyle}`}>
              <>
                {loading ? (
                  <span className="mr-2 my-auto">
                    <Spin style={{ color: "#ffffff" }} />
                  </span>
                ) : (
                  <>
                    <h1 className="text-xl text-red-500 font-semibold text-center my-2">
                      {data.condition}
                    </h1>
                    <p className="text-white text-justify mb-2 px-4">
                      <div className="markdown">
                        <MarkdownText
                          text={removeFirstBoldWord(data.details)}
                        />
                      </div>
                    </p>
                  </>
                )}
              </>
            </div>
          </>
        ))}
      </div>
    </>
  );
};

export default TextAnalysis;
