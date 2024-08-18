import React, { useState } from 'react';
import './ImageInputReport.css';
import { FaUserCircle, FaTrashAlt, FaSun, FaGem, FaQuestionCircle, FaPowerOff } from 'react-icons/fa';

const ImageInputReport = () => {
  const [uploadedImages, setUploadedImages] = useState([null, null]);

  const handleImageChange = (event, index) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      const updatedImages = [...uploadedImages];
      updatedImages[index] = imageUrl;
      setUploadedImages(updatedImages);
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
        <button className="new-chat-btn">+ Start a new chat</button>

        <div className="settings">
          <div className="settings-item"><FaTrashAlt className="icon" />Clear all conversations</div>
          <div className="settings-item"><FaSun className="icon" />Switch Light Mode</div>
          <div className="settings-item"><FaGem className="icon" />Upgrade to GPT Pro</div>
          <div className="settings-item"><FaQuestionCircle className="icon" />Updates & FAQ</div>
          <div className="settings-item logout"><FaPowerOff className="icon" />Log out</div>
        </div>
      </div>

      <div className="container">
        <div className="header">
          <img className="logo" src="client/src/assets/logo.png" alt="RayLabs Logo" />
          <h1 className="title">Image Analysis RayLabs</h1>
          <p className="tagline">The power of AI at your service - Tame the knowledge!</p>
        </div>
        <div className="image-upload">
          {[0, 1].map((index) => (
            <div className="grid-container-1" key={index}>
              <img className="img-xray" src={uploadedImages[index]} alt="X-ray" />
              <div className="upload-area">
                <h4>Upload square image, less than 100KB</h4>
                <input type="file" accept="image/*" className="file-input" onChange={(e) => handleImageChange(e, index)} />
              </div>
            </div>
          ))}
        </div>
        <button type="submit" className="button-submit">Submit</button>
      </div>
    </div>
  );
};

export default ImageInputReport;