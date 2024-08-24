import React from "react";

const AboutUsTitle = () => {
  return (
    <>
      <div className="relative w-full h-full">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/raylabs-804be.appspot.com/o/AboutUs%20page%2F360_F_819531041_9ziyokGErhTXg6Nsrkj7mm95gxnNv80S%20(1).png?alt=media&token=4e7fb252-b38b-4360-8c43-ab88dd5cf6ef"
          alt="bg_image"
          className="w-full h-[600px] object-cover object-bottom"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-pink-gradient"></div>
        <div className="absolute -bottom-5 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path
              fill="#222222"
              fill-opacity="1"
              d="M0,224L80,218.7C160,213,320,203,480,218.7C640,235,800,277,960,272C1120,267,1280,213,1360,186.7L1440,160L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
            ></path>
          </svg>
        </div>
        <div className="w-full absolute top-[40%] left-0">
          <div>
            <h1 className="text-6xl pb-4 text-white font-bold tracking-wide">
              About Us
            </h1>
            <p className="text-2xl text-white tracking-widest">
              RayLabs is a fully automated personal diagnostic assistant
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUsTitle;
