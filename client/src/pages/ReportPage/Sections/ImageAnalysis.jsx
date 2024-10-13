import React, { useState, useEffect } from "react";
import Graph from "../../../components/Graphs/Graph";
import { Spin } from "antd";

const MultiColumnGraph = ({ results }) => {
  const height = 350 + 100 * results.data.length;
  const getImagePred = (preds) => {
    const imagePred = {};
    console.log(preds);
    preds["prediction"].map((pred) => {
      imagePred[pred.disease] = pred.sigmoid_value.toFixed(3);
    });
    console.log(imagePred);
    return imagePred;
  };

  const getSeries = (results) => {
    const series = [];

    results.data.map((result, index) => {
      // let fileName = result.image_url.split("/").pop();
      // fileName = fileName.split("?")[0];
      // fileName = fileName.replace("images%", "");

      series.push({
        name: `Image ${index + 1}`,
        data: Object.values(getImagePred(result)),
      });
    });
    return series;
  };

  return (
    <div style={{ width: "100%", height: "100%" }}>
      {/* <Carousel autoplay arrows={true}> */}
      {/* {results.data.map((result, index) => (
          <ImageResults key={index} predictions={result} />
        ))} */}
      <Graph
        results={getImagePred(results.data[0])}
        series={getSeries(results)}
        height={500}
        horizontal={false}
      />
      {/* </Carousel> */}
    </div>
  );
};

const ImageAnalysis = ({ report, loading }) => {
  const [avgPred, setAvgPred] = useState({});

  const cardStyle =
    "flex flex-col justify-center items-center bg-[#000000] border-[#bbbbbb83] border-[1px] mt-2 h-fit rounded-lg";

  const getAverageModelValue = (results) => {
    const avgPred = {};
    results.data.map((result) => {
      result.prediction.map((pred) => {
        if (avgPred[pred.disease] === undefined) {
          avgPred[pred.disease] = pred.sigmoid_value;
        } else {
          avgPred[pred.disease] += pred.sigmoid_value;
        }
      });
    });
    Object.keys(avgPred).map((key) => {
      avgPred[key] /= results.data.length;
    });
    return avgPred;
  };

  return (
    <>
      <h1 className="text-xl text-start pb-2 mt-5 font-semibold text-white">
        Image Analysis
      </h1>
      <div className="flex justify-center gap-3">
        <div className={`w-1/2 p-2 py-4 ${cardStyle}`}>
          <>
            {loading ? (
              <span className="mr-2 my-auto">
                <Spin style={{ color: "#ffffff" }} />
              </span>
            ) : (
              <>
                {/* avarage prediction of all images graph */}
                <Graph results={getAverageModelValue(report)} />
                <h1 className="text-lg text-white font-semibold text-center mb-2">
                  Average Probabilities for All Images
                </h1>
              </>
            )}
          </>
        </div>
        <div className="w-1/2 flex flex-col gap-3">
          <div className={`w-full mt-2 p-4 ${cardStyle}`}>
            <>
              {loading ? (
                <span className="mr-2 my-auto">
                  <Spin style={{ color: "#ffffff" }} />
                </span>
              ) : (
                <></>
              )}
            </>
          </div>
        </div>
      </div>
      <div className={`w-full h-fit mt-2 p-4 ${cardStyle}`}>
        <>
          {loading ? (
            <span className="mr-2 my-auto">
              <Spin style={{ color: "#ffffff" }} />
            </span>
          ) : (
            <>
              <MultiColumnGraph results={report} />
              <h1 className="text-lg text-white font-semibold text-center mb-2">
                Image Probabilities for each Disease
              </h1>
            </>
          )}
        </>
      </div>
    </>
  );
};

export default ImageAnalysis;
