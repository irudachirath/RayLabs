import React from "react";
import { HiArrowLongRight } from "react-icons/hi2";
import { Link } from "react-scroll";

const Title = () => {
  return (
    <>
      <div className="relative w-full h-full">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/raylabs-804be.appspot.com/o/Landing%20Page%2Fbg_image.png?alt=media&token=516d4cd3-edb6-44ec-9098-27c36fdc1087"
          alt="bg_image"
          className="w-full h-screen object-cover"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-pink-gradient"></div>
      </div>
      <div className="w-full absolute top-1/2 left-0">
        <div className="pl-32 pt-14 text-left">
          <h1 className="text-6xl pb-4 text-white tracking-wide">
            You know where to go <br /> if you need <strong>answers</strong>
          </h1>
          <p className="text-2xl text-white tracking-widest">
            RayLabs is a fully automated personal diagnostic assistant
          </p>
        </div>
      </div>
      <div className="absolute bottom-0 w-full">
        <div className="w-full grid grid-cols-3 gap-x-5 py-10">
          <Link
            to="why-us"
            smooth={true}
            duration={500}
            className="flex justify-center items-center cursor-pointer group"
          >
            <div className="text-white text-xl font-bold transition-transform duration-300 group-hover:-translate-x-2">
              Why Choose Raylabs
            </div>
            <HiArrowLongRight
              className="ml-2 text-white transition-transform duration-300 group-hover:translate-x-2"
              size="45"
            />
          </Link>
          <Link
            to="features"
            smooth={true}
            duration={500}
            className="flex justify-center items-center cursor-pointer group"
          >
            <div className="text-white text-xl font-bold transition-transform duration-300 group-hover:-translate-x-2">
              Explore Features
            </div>
            <HiArrowLongRight
              className="ml-2 text-white transition-transform duration-300 group-hover:translate-x-2"
              size="45"
            />
          </Link>
          <Link
            to="user-reviews"
            smooth={true}
            duration={500}
            className="flex justify-center items-center cursor-pointer group"
          >
            <div className="text-white text-xl font-bold transition-transform duration-300 group-hover:-translate-x-2">
              User Feedbacks
            </div>
            <HiArrowLongRight
              className="ml-2 text-white transition-transform duration-300 group-hover:translate-x-2"
              size="45"
            />
          </Link>
        </div>
      </div>
    </>
  );
};

export default Title;
