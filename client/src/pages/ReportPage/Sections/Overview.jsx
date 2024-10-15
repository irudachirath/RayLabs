import React, { useState, useEffect } from "react";
import CarouselTemp from "../../../components/Carousel/CarouselTemp";
import { Spin } from "antd";
import {
  ExclamationCircleOutlined,
  CameraOutlined,
  CalendarOutlined,
  FieldTimeOutlined,
} from "@ant-design/icons";
import RadialBarChart from "../../../components/Graphs/RadialBarChart";

const SubmittedImagesCard = ({ report }) => (
  <>
    <CarouselTemp images={report.data.map((d) => d.image_url)} />
    <h1 className="text-lg mt-3 text-white font-semibold text-center">
      Submitted Images
    </h1>
  </>
);

const IdentifiedDiseasesCard = ({ results }) => {
  return (
    <>
      <div className="flex justify-start text-xl items-center gap-x-4 mt-3 text-orange-400 border-[1px] border-orange-400 bg-orange-400 bg-opacity-30 rounded-xl px-4 py-2">
        <ExclamationCircleOutlined />
        <div> We Found 3 Diseases as Positive </div>
      </div>
      <div className="flex justify-start items-center my-4">
        {results.map((result, index) => (
          <RadialBarChart key={index} results={result} height={200} />
        ))}
      </div>
      <h1 className="text-lg text-white font-semibold text-center mb-2">
        Identified Diseases Confidence
      </h1>
    </>
  );
};

const StatCard = ({ title, value, icon: IconComponent }) => (
  <div className="py-6 flex gap-4 items-center justify-start">
    <div className="text-4xl text-white">
      <IconComponent
        className="p-1 text-4xl bg-gradient-to-tr from-purple-500 via-pink-500 to-red-500 rounded-lg"
        style={{ fill: "url(#gradient)" }}
      />
    </div>
    <div className="flex flex-col gap-1 items-start justify-start">
      <h1 className="text-base text-white font-semibold text-start">{title}</h1>
      <h1 className="text-base text-white font-semibold text-center">
        {value}
      </h1>
    </div>
  </div>
);

const Overview = ({ report, loading }) => {
  const [statData, setStatData] = useState([]);
  const [results, setResults] = useState([]);

  const cardStyle =
    "flex flex-col justify-center items-center bg-[#000000] border-[#bbbbbb83] border-[1px] mt-2 h-fit rounded-lg";

  useEffect(() => {
    if (!loading) {
      setStatData([
        {
          title: "Images Submitted",
          value: report.data.length,
          icon: CameraOutlined,
        },
        {
          title: "Date Submitted",
          value: new Date(report.timeStamp).toLocaleDateString(),
          icon: CalendarOutlined,
        },
        {
          title: "Prediction Time",
          value: "2.5s",
          icon: FieldTimeOutlined,
        },
      ]);
      setResults([
        {
          desease: "Phneumonia",
          percentage: 67,
        },
        {
          desease: "Covid-19",
          percentage: 80,
        },
        {
          desease: "Tuberculosis",
          percentage: 90,
        },
      ]);
    }
  }, [loading]);

  return (
    <>
      <h1 className="text-xl text-start pb-2 font-semibold text-white">
        Overview
      </h1>
      <div className="flex justify-center gap-3">
        <div className={`w-2/5 p-2 ${cardStyle}`}>
          <>
            {loading ? (
              <span className="mr-2 my-auto">
                <Spin style={{ color: "#ffffff" }} />
              </span>
            ) : (
              <>
                <SubmittedImagesCard report={report} />
              </>
            )}
          </>
        </div>
        <div className="w-3/5 flex flex-col gap-3">
          <div className="w-full grid grid-cols-3 gap-3">
            {statData.map((data, index) => (
              <div
                key={index}
                className={`w-full h-full flex flex-col bg-[#000000] border-[#bbbbbb83] border-[1px] mt-2 rounded-lg px-5 items-start justify-center`}
              >
                {loading ? (
                  <span className="mr-2 my-auto">
                    <Spin style={{ color: "#ffffff" }} />
                  </span>
                ) : (
                  <>
                    <StatCard
                      title={data.title}
                      value={data.value}
                      icon={data.icon}
                    />
                  </>
                )}
              </div>
            ))}
          </div>
          <div className={`w-full mt-2 p-4 ${cardStyle}`}>
            <>
              {loading ? (
                <span className="mr-2 my-auto">
                  <Spin style={{ color: "#ffffff" }} />
                </span>
              ) : (
                <>
                  <IdentifiedDiseasesCard results={results} />
                </>
              )}
            </>
          </div>
        </div>
      </div>
    </>
  );
};

export default Overview;
