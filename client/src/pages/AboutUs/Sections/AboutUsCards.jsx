import React from "react";

const AboutUsCards = ({ isFlexReverse = false, image, title, description }) => {
  return (
    <div
      className={`mx-20 mt-6 flex ${
        isFlexReverse && "flex-row-reverse"
      } items-center justify-center`}
    >
      <div className="relative w-1/3 h-full">
        <div
          className={`relative ${
            isFlexReverse && "left-32"
          } w-2/3 h-96 border-[30px] bg-[#8F3E97] border-[#8F3E97] rounded-[40px]`}
        >
          <div className="w-full h-full bg-[#222222] rounded-[20px]"></div>
        </div>
        <img
          src={image}
          alt={title}
          className={`absolute top-16 ${
            isFlexReverse ? "right-[88px]" : "left-16"
          } w-4/5 h-2/3 object-cover object-center rounded-[40px]`}
        />
      </div>
      <div className="w-2/3 bg-[#222222] -mt-6 py-10">
        <div className="w-10/12 mx-auto">
          <div className="text-4xl text-white font-bold pb-10">{title}</div>
          <div className="text-white text-lg px-20 text-justify">
            {description}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUsCards;
