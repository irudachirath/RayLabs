import React, { useState } from "react";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";

function Footer() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (event) => {
    event.preventDefault();
    console.log("Subscribed to newsletter!");
    setEmail("");
  };

  return (
    <footer className="w-full bg-[#222222] box-border">
      <div className="flex items-center w-full h-14 bg-[#8F3E97] text-white">
        <h2 className="w-1/2 text-lg text-left pl-14 tracking-widest font-semibold">
          Talk to our Customer support for assistance
        </h2>
        <div className="w-1/2 flex justify-end pr-6 py-6 gap-6">
          <button
            className={`bg-transparent border-2 border-white text-white text-xs rounded-full tracking-wider flex justify-center items-center focus:outline-none`}
          >
            Request a call now
          </button>
          <button
            className={`bg-transparent border-2 border-white text-white text-xs rounded-full tracking-wider flex justify-center items-center focus:outline-none`}
          >
            Talk to us on Whatsapp
          </button>
        </div>
      </div>
      <div className="flex justify-between items-center px-20 pt-8">
        <div className="w-1/5 flex flex-col items-start gap-4">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/raylabs-804be.appspot.com/o/Landing%20Page%2Flogo-rayLabs3.png?alt=media&token=6ffa96d9-d1ec-449e-9cba-10c3f3d9a182"
            alt="RayLabs Logo"
            className="w-3/5 h-auto"
          />
          <p className="w-4/5 text-base text-white text-left">
            One Step Solution for all your medical needs
          </p>
          <div className="flex items-center">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook className="w-6 h-6 mr-4 text-white transition-colors duration-300 hover:text-[#8F3E97]" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram className="w-6 h-6 mr-4 text-white transition-colors duration-300 hover:text-[#8F3E97]" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter className="w-6 h-6 mr-4 text-white transition-colors duration-300 hover:text-[#8F3E97]" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin className="w-6 h-6 mr-4 text-white transition-colors duration-300 hover:text-[#8F3E97]" />
            </a>
          </div>
        </div>
        <div className="w-1/5 flex flex-col items-center gap-2">
          <h3 className="text-xl font-bold text-white mb-4">
            Subscribe to Our Newsletter
          </h3>
          <form
            className="w-full flex flex-col gap-2"
            onSubmit={handleSubscribe}
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="p-3 text-xs border-2 border-[#afafaf] rounded-lg w-full bg-transparent focus:outline-none"
            />
            <button
              type="submit"
              className="py-2 px-4 text-xs text-white bg-[#333] rounded-md hover:bg-[#222] hover:border-[#8F3E97] focus:outline-none"
            >
              Subscribe
            </button>
          </form>
        </div>
        <div className="w-1/5 flex flex-col items-start gap-2">
          <h3 className="text-xl font-bold text-white mb-4">Contact Us</h3>
          <div className="flex items-center mb-2">
            <FaEnvelope className="mr-2 text-white text-lg" />
            <a
              href="mailto:teamnovacoders@gmail.com"
              className="text-white text-sm hover:text-[#8F3E97]"
            >
              info@raylabs.com
            </a>
          </div>
          <div className="flex items-center mb-2">
            <FaPhone className="mr-2 text-white text-lg" />
            <a
              href="tel:4146875892"
              className="text-white text-sm hover:text-[#8F3E97]"
            >
              0114-687-5892
            </a>
          </div>
          <div className="flex items-center mb-2">
            <FaMapMarkerAlt className="mr-2 text-white text-lg" />
            <address className="text-white text-sm">
              Katubedda, Moratuwa
            </address>
          </div>
        </div>
      </div>
      <div className="text-center mt-4 py-2 border-t border-[#676767]">
        <p className="text-white text-xs">
          Copyright © RayLabs 2024 | All Rights Reserved
        </p>
      </div>
    </footer>
  );
}

export default Footer;
