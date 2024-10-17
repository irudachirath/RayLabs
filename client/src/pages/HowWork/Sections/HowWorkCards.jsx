import React from "react";

const HowWorkCards = ({ isFlexReverse = false, image, title, description }) => {
  return (
    <div className="mx-20 mt-6 flex flex-col items-center justify-center">
      {/* Title Section */}
      <div className="text-4xl text-white font-bold pb-6">{title}</div>

      {/* Image Section */}
      <div className="relative w-full h-auto mb-6">
        <div className="w-full border-[2px] bg-[#8F3E97] border-[#8F3E97] rounded-[20px]">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-contain object-center rounded-[20px]"
          />
        </div>
      </div>

      {/* Description Section */}
      <div className="w-full bg-[#222222] py-10">
        <div className="w-10/12 mx-auto">
          <div className="text-white text-xl px-20 text-justify">{description}</div>
        </div>
      </div>
    </div>
  );
};

export default HowWorkCards;
