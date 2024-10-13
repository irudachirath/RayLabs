import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import PrimaryButton from "../Buttons/PrimaryButton";
import NavListElement from "./NavListElement";
import ModalTemplete from "../Modals/ModalTemplete";
import Login from "../../pages/Login/Login";
import { logo } from "../../utils";

const Navbar = ({ isBlured = true }) => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
            <NavListElement link="/image-input-report" text="Services" />
            <NavListElement link="/user-history" text="User History" />
            <NavListElement link="/help" text="How we Work" />
            <NavListElement link="/about" text="About" />
            <li>
              {isLoggedIn ? (
                <div className="h-9 w-full">
                  <PrimaryButton
                    text="Logout"
                    className="px-6"
                    removeTranslate={true}
                  />
                </div>
              ) : (
                <div className="h-9 w-full">
                  <ModalTemplete
                    text={
                      isLoginPage ? "Register as a User" : "Login as a User"
                    }
                    content={
                      <div>
                        <Login />
                      </div>
                    }
                  />
                </div>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
