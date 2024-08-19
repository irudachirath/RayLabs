import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import PrimaryButton from "../PrimaryButton/PrimaryButton";
import NavListElement from "./NavListElement";

const Navbar = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <header className="w-full h-[70px] fixed top-0 left-0 z-10">
      <div className="w-full h-full bg-black bg-opacity-60 backdrop-blur-md flex items-center">
        <nav className="text-white w-full h-full flex justify-between items-center px-8">
          <Link to="/">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/raylabs-804be.appspot.com/o/Landing%20Page%2Flogo-rayLabs3.png?alt=media&token=6ffa96d9-d1ec-449e-9cba-10c3f3d9a182"
              alt="logo"
              className="h-12 object-fill"
            />
          </Link>
          <ul className="flex items-center space-x-8">
            <NavListElement link="/" text="Home" />
            <NavListElement link="/image-input-report" text="Services" />
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
                <Link to={isLoginPage ? "/register" : "/login"}>
                  <div className="h-9 w-full">
                    <PrimaryButton
                      text={
                        isLoginPage ? "Register as a User" : "Login as a User"
                      }
                      className="px-6"
                      removeTranslate={true}
                    />
                  </div>
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
