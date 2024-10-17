import React from "react";
import { VscLightbulbSparkle } from "react-icons/vsc";
import { FaRegHandshake } from "react-icons/fa6";
import { PiTarget } from "react-icons/pi";
import { BiNetworkChart } from "react-icons/bi";

const HowWorkValues = () => {
  return (
    <>
      <div className="w-5/6 m-auto py-28 flex items-center justify-center">
        <div className="w-2/5 pl-8 flex flex-col items-start justify-start">
          <h1 className="text-left text-white text-6xl leading-snug">
            Our Values
          </h1>
        </div>
        <div className="w-3/5 py-auto px-16 grid grid-cols-2 gap-10 gap-x-16 text-left text-white">
          <div className="border-t-2 p-5 pt-8 border-white">
            <VscLightbulbSparkle size="70" />
            <h1 className="py-3 text-3xl font-bold">Innovation</h1>
            <p className="text-sm">
              We are committed to pushing the boundaries of medical technology
              to deliver cutting-edge solutions.
            </p>
          </div>
          <div className="border-t-2 p-5 pt-8 border-white">
            <PiTarget size="70" />
            <h1 className="py-3 text-3xl font-bold">Accuracy</h1>
            <p className="text-sm">
              Our top priority is to provide precise and reliable diagnostic
              insights.
            </p>
          </div>
          <div className="border-t-2 p-5 pt-8 border-white">
            <FaRegHandshake size="70" />
            <h1 className="py-3 text-3xl font-bold">Accessibility</h1>
            <p className="text-sm">
              We strive to make advanced diagnostic tools available to
              healthcare professionals and patients worldwide.
            </p>
          </div>
          <div className="border-t-2 p-5 pt-8 border-white">
            <BiNetworkChart size="70" />
            <h1 className="py-3 text-3xl font-bold">Collaboration</h1>
            <p className="text-sm">
              We believe in the power of teamwork and collaboration, both within
              our team and with healthcare providers.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default HowWorkValues;
