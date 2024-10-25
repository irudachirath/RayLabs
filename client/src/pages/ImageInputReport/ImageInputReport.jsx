import React, { useState, useEffect } from "react";
import "./ImageInputReport.css";
import { FaHistory, FaQuestionCircle, FaPowerOff } from "react-icons/fa";
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";
import axios from "axios";
import ImageInput from "./ImageInput";
import LoadingButton from "../../components/Buttons/LoadingButton";
import toast from "react-hot-toast";
import { logo } from "../../utils";
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";
import Logout from "../Login/Logout";
import HorizontalNonLinearStepper from "../../components/Stepper/Stepper";
import { Avatar, Space } from "antd";
import { UserOutlined } from "@ant-design/icons";

const ImageInputReport = () => {
  const [uploadedImages, setUploadedImages] = useState([null]);
  const [updatedImageLinks, setUpdatedImageLinks] = useState();
  const [btnVisible, setBtnVisible] = useState(true);
  const [imageFields, setImageFields] = useState([0]);
  const [loading, setLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [imageResults, setImageResults] = useState(null);
  const [reportId, setReportId] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
  const [topDiseases, setTopDiseases] = useState([]);
  const [allFoundDiseases, setAllFoundDiseases] = useState([]);

  const getUserId = async () => {
    try {
      const accessToken = await document.cookie
        .split("; ")
        .find((row) => row.startsWith("accessToken="))
        .split("=")[1];
      const decodedToken = await jwtDecode(accessToken);
      return decodedToken.user.id;
    } catch (error) {
      throw new Error("Invalid access token or no access token provided.");
    }
  };

  // Function to get and decode cookie
  const getCookie = (name) => {
    const cookieArr = document.cookie.split("; ");
    const cookie = cookieArr.find((row) => row.startsWith(`${name}=`));
    if (cookie) {
      const value = cookie.split("=")[1];
      return decodeURIComponent(value); // Decode the URL-encoded string
    }
    return null;
  };

  const handleImageChange = (event, index) => {
    const file = event.target.files[0];
    if (file) {
      if (activeStep <= 1) {
        setActiveStep(1);
      }
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

  const handleImageUpload = async () => {
    if (uploadedImages.every((image) => image == null)) {
      toast.error("Please choose at least one image to upload.");
      return;
    }
    const formData = new FormData();
    await uploadedImages.forEach((image, index) => {
      if (image) formData.append(`image`, image);
    });

    const userId = await getUserId();
    //Append the userId to the form data
    formData.append("userId", userId);

    setLoading(true);
    axios
      .post(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/images/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        setUpdatedImageLinks(response.data.imageUrls);
        setActiveStep(2);
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
      const userId = await getUserId();
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/reports`,
        {
          userId: userId,
          data: data,
          description: "Image analysis report",
          location: "Unknown",
          timeStamp: new Date().toISOString(),
        }
      );
      const reportId = response.data.id;
      return reportId;
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
        `${import.meta.env.VITE_FASTAPI_BACKEND_URL}/model/api/v1/predict/`,
        {
          imageUrls: updatedImageLinks,
        }
      );
      setImageResults(response.data); // Set the response data directly
      setSubmitLoading(false);
      await setActiveStep(3);
      toast.success("Images submitted for analysis successfully.");
      const id = await handleReportSave(response.data);
      await setActiveStep(4);
      toast.success("Report saved successfully.");
      await setReportId(id);
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/reports/text-report/${id}`
      );
      await setActiveStep(5);
      toast.success("Text report genarated and saved successfully.");
      await setActiveStep(6);
    } catch (error) {
      console.error(error);
      setSubmitLoading(false);
      toast.error("Error submitting the images for analysis.");
    }
  };

  const handleReport = () => {
    // const id = reportId; // Replace with the actual ID
    const url = `/report/${reportId}`;
    window.open(url, "_blank");
  };

  return (
    <div className="main-grid">
      <div className="container-sidebar">
        <Link to="/" className="account-info text-white hover:text-gray-200">
          <Space direction="vertical" size={16}>
            <Space wrap size={10}>
              <Avatar size={45} icon={<UserOutlined />} />
            </Space>
          </Space>
          <div className="pl-2 flex flex-col justify-start items-start">
            <div className="account-name">
              {getCookie("username") &&
                getCookie("username")[0].toUpperCase() +
                  getCookie("username").slice(1)}
            </div>
            <div className="account-type">Free account</div>
          </div>
        </Link>
        <div className="w-full">
          <Link to="/image-inpur-report" target="_blank">
            <button className="new-chat-btn">+ Start a new page</button>
          </Link>
          <div className="settings">
            {[
              {
                icon: IoChatbubbleEllipsesSharp,
                text: "Chat with Chatbot",
                to: "/chatbot",
              },
              { icon: FaHistory, text: "Report History", to: "/user-history" },
              {
                icon: FaQuestionCircle,
                text: "Disease Informations",
                to: "/disease-info",
              },
            ].map((item, index) => (
              <Link
                to={item.to}
                key={index}
                className="settings-item tracking-wider"
              >
                <item.icon className="icon" />
                {item.text}
              </Link>
            ))}
            <Logout
              button={
                <div className="settings-item tracking-wider">
                  <FaPowerOff className="icon" />
                  Log out
                </div>
              }
            />
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
          <div className="w-full py-4">
            <HorizontalNonLinearStepper activeStep={activeStep} />
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
            {!reportId && (
              <LoadingButton
                onClick={handleSubmit}
                loading={submitLoading}
                text="Submit"
              />
            )}
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
