import React, { useState, useEffect } from "react";
import "./ImageInputReport.css";
import {
  FaUserCircle,
  FaTrashAlt,
  FaSun,
  FaGem,
  FaQuestionCircle,
  FaPowerOff,
} from "react-icons/fa";
import axios from "axios";
import ImageInput from "./ImageInput";
import LoadingButton from "../../components/Buttons/LoadingButton";
import toast from "react-hot-toast";
import { logo } from "../../utils";
import PrimaryButton from "../../components/Buttons/PrimaryButton";

const ImageInputReport = () => {
  const userId = "VIFU4wZqem8HJd9bAIlc";
  const [uploadedImages, setUploadedImages] = useState([null]);
  const [updatedImageLinks, setUpdatedImageLinks] = useState();
  const [btnVisible, setBtnVisible] = useState(true);
  const [imageFields, setImageFields] = useState([0]);
  const [loading, setLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [imageResults, setImageResults] = useState(null);
  const [reportId, setReportId] = useState(null);

  const handleImageChange = (event, index) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedImages((prevImages) => {
        const updatedImages = [...prevImages];
        updatedImages[index] = file; // Store the file object, not the URL
        setBtnVisible(true);
        return updatedImages;
      });
    }
  };

  const handleImageAdd = () => {
    const newFieldIndex = imageFields.length;
    // Check if the last uploaded image is not null
    if (uploadedImages[uploadedImages.length - 1] !== null) {
      if (newFieldIndex < 5) {
        setImageFields([...imageFields, newFieldIndex]);
        setUploadedImages([...uploadedImages, null]);
        setUploadSuccess(false);
      } else {
        setBtnVisible(false);
      }
    } else {
      toast.error("Please upload the current image before adding a new one.");
    }
  };

  const handleImageUpload = () => {
    if (uploadedImages.every((image) => image == null)) {
      toast.error("Please choose at least one image to upload.");
      return;
    }
    const formData = new FormData();
    uploadedImages.forEach((image, index) => {
      if (image) formData.append(`image`, image);
    });

    //Append the userId to the form data
    formData.append("userId", userId);

    setLoading(true);
    axios
      .post("http://localhost:5000/api/v1/images/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        setUpdatedImageLinks(response.data.imageUrls);
        setLoading(false);
        setUploadSuccess(true);
        toast.success("Images uploaded successfully.");
      })
      .catch((error) => {
        setLoading(false);
        console.error(error);
      });
  };

  const handleReportSave = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/reports",
        {
          userId: userId,
          data: data,
          description: "Image analysis report",
          location: "Unknown",
          timeStamp: new Date().toISOString(),
        }
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async () => {
    if (!updatedImageLinks || updatedImageLinks.length === 0) {
      toast.error("Please upload images before submitting.");
      return;
    }

    try {
      setSubmitLoading(true);
      const response = await axios.post(
        "http://localhost:8000/model/api/v1/predict/",
        {
          imageUrls: updatedImageLinks,
        }
      );
      setImageResults(response.data); // Set the response data directly
      setSubmitLoading(false);
      toast.success("Images submitted for analysis successfully.");
      const id = await handleReportSave(response.data);
      setReportId(id);
      toast.success("Report saved successfully.");
    } catch (error) {
      console.error(error);
      setSubmitLoading(false);
      toast.error("Error submitting the images for analysis.");
    }
  };

  const handleReport = () => {
    const id = reportId.id; // Replace with the actual ID
    const url = `/report/${id}`;
    window.open(url, "_blank");
  };

  return (
    <div className="main-grid">
      <div className="container-sidebar">
        <div className="account-info">
          <FaUserCircle className="profile-icon" />
          <div>
            <div className="account-name">Antoine Piedanna</div>
            <div className="account-type">Free account</div>
          </div>
        </div>
        <div className="w-full">
          <button className="new-chat-btn">+ Start a new chat</button>
          <div className="settings">
            {[
              { icon: FaTrashAlt, text: "Clear all conversations" },
              { icon: FaSun, text: "Switch Light Mode" },
              { icon: FaGem, text: "Upgrade to GPT Pro" },
              { icon: FaQuestionCircle, text: "Updates & FAQ" },
              { icon: FaPowerOff, text: "Log out" },
            ].map((item, index) => (
              <div key={index} className="settings-item tracking-wider">
                <item.icon className="icon" />
                {item.text}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="container">
        <div className="">
          <img className="logo" src={logo} alt="RayLabs Logo" />
        </div>
        <div className="scroll-container">
          <div className="header">
            <div className="flex justify-center mb-2">
              <div>
                <h1 className="title">Image Analysis </h1>
              </div>
              <div className="bg-pink-gradient-secondary ml-2 px-2">
                <h1 className="title">RayLabs</h1>
              </div>
            </div>
            <p className="tagline">
              The power of AI at your service - Tame the knowledge!
            </p>
          </div>
          <div className="image-upload">
            {imageFields.map((index) => (
              <div key={index}>
                <ImageInput
                  index={index}
                  uploadedImage={uploadedImages[index]}
                  onImageChange={(event) => handleImageChange(event, index)}
                  imageResult={imageResults && imageResults.data[index]}
                />
              </div>
            ))}
            <div className="flex gap-6">
              <button
                disabled={!btnVisible}
                onClick={handleImageAdd}
                className="button-submit"
              >
                Add more Images
              </button>
              <LoadingButton
                onClick={handleImageUpload}
                loading={loading}
                disable={uploadSuccess}
                text="Upload Images"
              />
            </div>
          </div>
        </div>
        <div className="fixed bottom-[10px] w-2/3 py-3">
          <div className="flex justify-center gap-4">
            <LoadingButton
              onClick={handleSubmit}
              loading={submitLoading}
              text="Submit"
            />
            {reportId && (
              <LoadingButton text="View Report" onClick={handleReport} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageInputReport;
