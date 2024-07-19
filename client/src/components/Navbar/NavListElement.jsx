import React from "react";
import { Link } from "react-router-dom";

const NavListElement = ({ link, text }) => {
  return (
    <li className="relative px-8 py-3 border-l-4 border-[#8F3E97] group">
      <div className="absolute w-0 h-full bg-pink-gradient-secondary top-0 left-0 transition-all duration-300 group-hover:w-full"></div>
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
