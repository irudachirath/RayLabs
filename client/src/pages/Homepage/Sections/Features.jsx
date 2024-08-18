import React from "react";
import { Link } from "react-router-dom";

const Features = () => {
  const transition =
    "cursor-pointer transition-transform duration-300 hover:-translate-x-3 hover:-translate-y-3";
  return (
    <div className={`w-5/6 m-auto border-b-2 border-white pb-20 pt-28 flex`}>
      <div
        className={`relative w-2/3 m-auto h-[575px] flex text-white text-start`}
      >
        <div
          className={`absolute w-1/2 h-full rounded-l-2xl bg-[#903e977d]`}
        ></div>
        <Link
          to="/image-input-report"
          className={`absolute w-1/2 h-full rounded-l-2xl pt-6 p-10 text-white hover:text-white bg-[#8F3E97] ${transition}`}
        >
          <h1 className="py-4 text-4xl font-bold">
            Try Our Real-Time Medical Image Diagnostic Tool for Chest X-Ray
          </h1>
          <p>Upload your image and get the results.</p>
        </Link>
        <div className={`top-0 right-0 absolute w-1/2 h-full`}>
          <div
            className={`absolute w-full h-1/2 rounded-se-2xl bg-[#ff232381]`}
          ></div>
          <Link
            to="/chatbot"
            className={`absolute w-full h-1/2 rounded-se-2xl pt-6 p-10 text-white hover:text-white bg-[#FF2323] ${transition}`}
          >
            <h1 className="py-4 text-3xl font-bold">
              Interact with our AI chatbot for instant results
            </h1>
            <p>Ask questions you have related radiology and diseases</p>
          </Link>
          <div className={`bottom-0 absolute w-full h-1/2 flex`}>
            <div className={`absolute w-1/2 h-full bg-[#ffffff82]`}></div>
            <Link
              to="/help"
              className={`absolute w-1/2 h-full bg-white p-6 pt-4 text-black hover:text-black ${transition}`}
            >
              <h1 className="py-2 text-2xl font-extrabold">
                Need Help Using Our Tool?
              </h1>
              <p className="text-sm">
                If you are not sure how to use our AI tool, Start here.
              </p>
            </Link>
            <div
              className={`right-0 absolute w-1/2 h-full rounded-ee-2xl bg-[#60dad281]`}
            ></div>
            <Link
              to="/disease-info"
              className={`right-0 absolute w-1/2 h-full p-6 pt-4 text-black hover:text-black rounded-ee-2xl bg-[#60DAD1] ${transition}`}
            >
              <h1 className="py-2 text-2xl font-extrabold">
                Explore the categories of diseases you can identify
              </h1>
              <p className="text-sm">
                Discover various disease types and their characteristics with
                examples.
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
