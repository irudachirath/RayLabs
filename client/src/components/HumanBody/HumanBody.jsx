import React from "react";
import { humanBodyPathd } from "../../utils";
import { v4 as uuidv4 } from "uuid";

const HumanBody = ({ percentage, width = 100, height = 200 }) => {
  // Ensure percentage is a number between 0 and 100
  const validPercentage = Math.max(0, Math.min(100, percentage));
  let color = {
    primary: "red",
    secondary: "black",
  };
  if (validPercentage <= 50 && validPercentage >= 25) {
    color.primary = "yellow";
    color.secondary = "red";
  } else if (validPercentage < 25) {
    color.primary = "green";
    color.secondary = "yellow";
  }

  // Generate unique IDs for mask and gradient
  const maskId = `humanMask-${uuidv4()}`;
  const gradientId = `fillGradient-${uuidv4()}`;

  return (
    <div
      className="human-body-container"
      style={{
        position: "relative",
        width: width,
        height: height,
        overflow: "hidden",
      }}
    >
      <svg
        viewBox="0 0 206.326 206.326"
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          left: 0,
          top: 0,
        }}
      >
        <defs>
          <mask id={maskId}>
            <rect x="0" y="0" width="100%" height="100%" fill="black" />
            <path fill="white" d={humanBodyPathd} />
          </mask>
          <linearGradient id={gradientId} x1="0" x2="0" y1="100%" y2="0%">
            <stop offset="0%" stopColor={color.secondary} />
            <stop offset={`${validPercentage}%`} stopColor={color.primary} />
            <stop offset={`${validPercentage}%`} stopColor="black" />
          </linearGradient>
        </defs>
        <rect
          x="0"
          y="0"
          width="fit-content"
          height="fit-content"
          fill={`url(#${gradientId})`}
          mask={`url(#${maskId})`}
        />
        <path
          fill="none"
          stroke={color.primary}
          strokeWidth="1"
          d={humanBodyPathd}
        />
      </svg>
    </div>
  );
};

export default HumanBody;
