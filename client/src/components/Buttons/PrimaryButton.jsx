import React from "react";

const PrimaryButton = ({
  text,
  onClick,
  removeTranslate = false,
  type,
  className = "",
  icon = <></>,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`w-full h-full bg-[#8F3E97] text-white rounded-full drop-shadow-xl tracking-wider flex justify-center items-center hover:border-[#b750c1] hover:bg-[#b750c1] hover:shadow-lg transition-transform ${
        !removeTranslate ? "hover:-translate-y-1" : ""
      } duration-300 focus:outline-none  ${className}`}
    >
      {icon}
      {text}
    </button>
  );
};

export default PrimaryButton;
