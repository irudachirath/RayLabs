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

const ImageInputReport = () => {
  const [uploadedImages, setUploadedImages] = useState([null]);
  const [btnVisible, setBtnVisible] = useState(true);
  const [imageFields, setImageFields] = useState([0]);

  // Logging the uploaded images array whenever it changes
  useEffect(() => {
    console.log(uploadedImages);
  }, [uploadedImages]);

  const handleImageChange = (event, index) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      const updatedImages = [...uploadedImages];
      updatedImages[index] = imageUrl;
      setUploadedImages(updatedImages);
    }
  };

  const handleImageAdd = () => {
    const newFieldIndex = imageFields.length;
    // Check if the last uploaded image is not null
    if (uploadedImages[uploadedImages.length - 1] !== null) {
      if (newFieldIndex < 5) {
        setImageFields([...imageFields, newFieldIndex]);
        setUploadedImages([...uploadedImages, null]);
      } else {
        setBtnVisible(false);
      }
    } else {
      alert(
        "Please upload an image in the last field before adding a new one."
      );
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
        <div className="w-full overflow-auto">
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
              <div className="grid-container-1" key={index}>
                {uploadedImages[index] ? (
                  <img
                    className="img-xray"
                    src={uploadedImages[index]}
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
                    Upload square image, less than 100KB
                  </h4>
                  <input
                    type="file"
                    accept="image/*"
                    className="file-input"
                    onChange={(e) => handleImageChange(e, index)}
                  />
                </div>
              </div>
            ))}
            {btnVisible && (
              <button onClick={handleImageAdd} className="button-submit">
                Add more Images
              </button>
            )}
          </div>
        </div>
        <div className="fixed bottom-[10px] w-2/3 py-3 background-style">
          <button type="submit" className="button-submit">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageInputReport;
