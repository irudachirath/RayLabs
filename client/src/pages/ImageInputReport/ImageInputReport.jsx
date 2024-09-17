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
import { set } from "@ant-design/plots/es/core/utils";

const ImageInputReport = () => {
  const [uploadedImages, setUploadedImages] = useState([null]);
  const [updatedImageLinks, setUpdatedImageLinks] = useState();
  const [btnVisible, setBtnVisible] = useState(true);
  const [imageFields, setImageFields] = useState([0]);
  const [loading, setLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [imageResults, setImageResults] = useState(null);

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
      alert(
        "Please upload an image in the last field before adding a new one."
      );
    }
  };

  const handleImageUpload = () => {
    if (uploadedImages.every((image) => image == null)) {
      alert("Please select at least one image to upload.");
      return;
    }
    const formData = new FormData();
    uploadedImages.forEach((image, index) => {
      if (image) formData.append(`image`, image);
    });
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
      })
      .catch((error) => {
        setLoading(false);
        console.error(error);
      });
  };

  const handleSubmit = async () => {
    setSubmitLoading(true);
    if (!updatedImageLinks || updatedImageLinks.length === 0) {
      alert("Please upload images before submitting.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/model/api/v1/predict/",
        {
          imageUrls: updatedImageLinks,
        }
      );
      setImageResults(response.data); // Set the response data directly
      setSubmitLoading(false);
    } catch (error) {
      console.error(error);
      alert("Error submitting report.");
    }
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
          <img
            className="logo"
            src="https://firebasestorage.googleapis.com/v0/b/raylabs-804be.appspot.com/o/Landing%20Page%2Flogo-rayLabs3.png?alt=media&token=6ffa96d9-d1ec-449e-9cba-10c3f3d9a182"
            alt="RayLabs Logo"
          />
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
            {console.log(imageResults)}
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
          <LoadingButton
            onClick={handleSubmit}
            loading={submitLoading}
            text="Submit"
          />
        </div>
      </div>
    </div>
  );
};

export default ImageInputReport;
