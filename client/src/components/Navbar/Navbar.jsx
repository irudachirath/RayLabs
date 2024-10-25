import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import NavListElement from "./NavListElement";
import Login from "../../pages/Login/Login";
import Logout from "../../pages/Login/Logout";
import { logo } from "../../utils";
import { Dropdown, Space, Menu } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";

const itemsServices = [
  {
    key: "1",
    label: (
      <Link to="/image-input-report" className="text-base p-1 px-2">
        Image Analysis
      </Link>
    ),
  },
  {
    key: "2",
    label: (
      <Link to="/chatbot" className="text-base p-1 px-2">
        Chatbot
      </Link>
    ),
  },
];

const itemsHowWeWork = [
  {
    key: "1",
    label: (
      <Link to="/help" className="text-base p-1 px-2">
        User Guide
      </Link>
    ),
  },
  {
    key: "2",
    label: (
      <Link to="/disease-info" className="text-base p-1 px-2">
        Disease Info
      </Link>
    ),
  },
];

const menuServices = (
  <Menu>
    {itemsServices.map((item) => (
      <Menu.Item key={item.key}>{item.label}</Menu.Item>
    ))}
  </Menu>
);

const menuHowWeWork = (
  <Menu>
    {itemsHowWeWork.map((item) => (
      <Menu.Item key={item.key}>{item.label}</Menu.Item>
    ))}
  </Menu>
);

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

const Navbar = ({ isBlured = true }) => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const [pictureUrl, setPictureUrl] = useState(getCookie("picture"));

  useEffect(() => {
    setPictureUrl(getCookie("picture")); // Update whenever the cookie changes
  }, [isLoggedIn]); // Rerun this when `isLoggedIn` changes

  return (
    <header className={`w-full h-[70px] fixed top-0 left-0 z-10`}>
      <div
        className={`w-full h-full ${
          isBlured ? "bg-black bg-opacity-60" : "bg-[#111111]"
        } backdrop-blur-md flex items-center`}
      >
        <nav className="text-white w-full h-full flex justify-between items-center px-8">
          <Link to="/">
            <img src={logo} alt="logo" className="h-12 object-fill" />
          </Link>
          <ul className="flex items-center space-x-8">
            <NavListElement link="/" text="Home" />
            <Dropdown overlay={menuServices}>
              <a
                onClick={(e) => e.preventDefault()}
                className="text-white font-semibold hover:text-white"
              >
                <Space>
                  <NavListElement link="" text="Services" />
                </Space>
              </a>
            </Dropdown>

            {isLoggedIn && (
              <NavListElement link="/user-history" text="User History" />
            )}
            <Dropdown overlay={menuHowWeWork}>
              <a
                onClick={(e) => e.preventDefault()}
                className="text-white font-semibold hover:text-white"
              >
                <Space>
                  <NavListElement link="" text="How we Work" />
                </Space>
              </a>
            </Dropdown>
            <NavListElement link="/about" text="About" />
            <li>
              <div className="flex flex-row-reverse items-center justify-center h-9 w-full gap-6">
                {isLoggedIn ? (
                  <>
                    <Logout />
                  </>
                ) : (
                  <Login />
                )}
              </div>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
