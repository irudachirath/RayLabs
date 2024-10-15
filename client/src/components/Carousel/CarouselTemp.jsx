import React from "react";
import { Carousel } from "antd";
const contentStyle = {
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
  width: "100%",
};
const CarouselTemp = ({ images }) => (
  <div style={{ width: "100%" }}>
    <Carousel autoplay arrows={true}>
      {images.map((image, index) => (
        <div key={index}>
          <img src={image} alt="Report Image" style={contentStyle} />
        </div>
      ))}
    </Carousel>
  </div>
);
export default CarouselTemp;
