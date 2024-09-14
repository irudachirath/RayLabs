import React from "react";
import ReportCard from "./ReportCard";
import ViewReport from "./ViewReport";

const ImageInput = ({ index, uploadedImage, onImageChange, imageResult }) => {
  const [showReport, setShowReport] = React.useState(false);

  const handleReport = () => {
    setShowReport(!showReport);
  };

  return (
    <div>
      <div className="flex">
        <div className="grid-container-1" key={index}>
          {uploadedImage ? (
            <img
              className="img-xray"
              src={URL.createObjectURL(uploadedImage)}
              alt="X-ray"
            />
          ) : (
            <img
              className="img-xray"
              src="/src/assets/placeholder.png"
              alt="X-ray"
            />
          )}
          <div className="upload-area">
            <h4 className="text-start tracking-widest">
              Upload your image, less than 1MB
            </h4>
            <input
              type="file"
              accept="image/*"
              className="file-input"
              onChange={onImageChange}
            />
          </div>
        </div>
        {imageResult && (
          <div className="h-10 w-10 mt-auto mb-5">
            <ViewReport onClick={handleReport} />
          </div>
        )}
      </div>
      {showReport && (
        <ReportCard data={imageResult} index={index} key={index} />
      )}
    </div>
  );
};

export default ImageInput;
