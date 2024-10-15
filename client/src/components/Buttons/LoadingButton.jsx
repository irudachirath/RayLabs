import React from "react";
import { Spin } from "antd";

const LoadingButton = ({ onClick, loading, disable, text }) => {
  return (
    <div>
      <button
        onClick={onClick}
        disabled={loading || disable}
        className={`bg-[#8f3e97] text-white py-[10px] px-[20px] text-md rounded-md cursor-pointer border-none transition-colors duration-300 hover:bg-[#722d78] disabled:bg-[#8f3e97] disabled:cursor-not-allowed disabled:opacity-50`}
      >
        {loading && (
          <span className="mr-2 my-auto" data-testid="spinner">
            <Spin style={{ color: "#ffffff" }} />
          </span>
        )}{" "}
        {text}
      </button>
    </div>
  );
};

export default LoadingButton;
