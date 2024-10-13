import React, { useState } from "react";
import { ImageList, ImageListItem, Box } from "@mui/material";

const MuiImageViewer = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(images[0]);
  const imageWidth = "550px"; // Width of the main image

  return (
    <div className="flex flex-col items-center w-full max-w-[800px] m-auto">
      <Box
        sx={{
          width: imageWidth, // Ensures the main image is this width
          textAlign: "center",
          marginBottom: "20px",
          display: "flex",
          justifyContent: "center", // Centers the main image
        }}
      >
        <img
          src={selectedImage}
          alt="Selected"
          className="rounded-lg h-[400px] shadow-lg shadow-[#8F3E97]"
        />
      </Box>
      <div style={{ overflowX: "auto", width: `calc(${imageWidth} - 50px)` }}>
        <ImageList
          sx={{
            width: "fit-content", // Lets the ImageList grow as needed
            height: 120,
            display: "flex",
            flexWrap: "nowrap",
          }}
        >
          {images.map((image, index) => (
            <ImageListItem
              key={index}
              sx={{
                width: 110, // Fixed width for thumbnails
                height: 100,
                marginRight: "8px", // Space between items
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <img
                src={image}
                alt={`Thumbnail ${index}`}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                onClick={() => setSelectedImage(image)}
              />
            </ImageListItem>
          ))}
        </ImageList>
      </div>
    </div>
  );
};

export default MuiImageViewer;
