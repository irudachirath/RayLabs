import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import NavListElement from "./NavListElement";
import ModalTemplete from "../Modals/ModalTemplete";
import Login from "../../pages/Login/Login";
import Logout from "../../pages/Login/Logout";
import { logo } from "../../utils";

const Navbar = ({ isBlured = true }) => {
  const clientId =
    "317549661140-kur4aa93oi628jqfo91qrgqkm5rtjcsr.apps.googleusercontent.com";
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // useEffect(() => {
  //   gapi.load("auth2", function () {
  //     gapi.auth2.init({
  //       client_id: clientId,
  //       scope: "",
  //     });
  //   });
  // }, []);

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
              <div className="h-9 w-full">
                <ModalTemplete
                  text={
                    !isLoggedIn
                      ? isLoginPage
                        ? "Register as a User"
                        : "Login as a User"
                      : "Logout"
                  }
                  content={
                    <div>
                      {!isLoggedIn ? (
                        <Login setIsLoggedIn={setIsLoggedIn} />
                      ) : (
                        <Logout setIsLoggedIn={setIsLoggedIn} />
                      )}
                    </div>
                  }
                />
              </div>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
