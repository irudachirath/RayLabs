import React from "react";
import { Link } from "react-router-dom";

const NavListElement = ({ link, text }) => {
  return (
    <li className="relative p-3 px-5 group">
      <div className="absolute w-0 h-full border-b-4 border-[#8F3E97] top-0 left-0 transition-all duration-300 group-hover:w-full"></div>
      <Link
        to={link}
        className="relative text-white font-semibold group-hover:text-[#fff]"
      >
        {text}
      </Link>
    </li>
  );
};

export default NavListElement;
