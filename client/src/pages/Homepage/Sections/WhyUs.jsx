import React from "react";
import { Link } from "react-router-dom";
import { BsRobot } from "react-icons/bs";
import { MdOutlineScreenSearchDesktop } from "react-icons/md";
import { PiTarget } from "react-icons/pi";
import { GoRocket } from "react-icons/go";
import PrimaryButton from "../../../components/PrimaryButton/PrimaryButton";

const WhyUs = () => {
  return (
    <>
      <div className="w-5/6 m-auto border-b-2 border-white pb-14 pt-28 flex items-center justify-center">
        <div className="w-2/5 pl-8 flex flex-col items-start justify-start">
          <h1 className="text-left text-white text-6xl leading-snug">
            Why Choose <br />
            RayLabs ?
          </h1>
          <div className="h-28 py-8">
            <Link to="/about">
              <PrimaryButton text="Learn More about RayLabs" />
            </Link>
          </div>
        </div>
        <div className="w-3/5 py-auto px-16 grid grid-cols-2 gap-10 gap-x-16 text-left text-white">
          <div className="border-t-2 p-5 pt-8 border-white">
            <BsRobot size="70" />
            <h1 className="py-3 text-3xl font-bold">Automated</h1>
            <p className="text-sm">
              RayLabs is a fully automated personal diagnostic assistant. It
              provides you with the most accurate results in the shortest time
              possible.
            </p>
          </div>
          <div className="border-t-2 p-5 pt-8 border-white">
            <MdOutlineScreenSearchDesktop size="70" />
            <h1 className="py-3 text-3xl font-bold">Easy to Use</h1>
            <p className="text-sm">
              RayLabs is designed to be user-friendly. It is easy to use and
              provides you with the information you need in a simple and
              straightforward way.
            </p>
          </div>
          <div className="border-t-2 p-5 pt-8 border-white">
            <PiTarget size="70" />
            <h1 className="py-3 text-3xl font-bold">Accurate</h1>
            <p className="text-sm">
              RayLabs uses the latest technology to provide you with the most
              accurate results. It is constantly updated to ensure that you get
              the best possible information.
            </p>
          </div>
          <div className="border-t-2 p-5 pt-8 border-white">
            <GoRocket size="70" />
            <h1 className="py-3 text-3xl font-bold">Fast</h1>
            <p className="text-sm">
              RayLabs is fast and efficient. It provides you with the
              information you need in a matter of seconds, so you can get the
              answers you need quickly and easily.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default WhyUs;
