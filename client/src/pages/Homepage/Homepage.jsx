import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Title from "./Sections/Title";
import WhyUs from "./Sections/WhyUs";
import Features from "./Sections/Features";
import UserReviews from "./Sections/UserReviews";
import Footer from "../../components/Footer/Footer";
import { Element } from "react-scroll";

const Homepage = () => {
  return (
    <div>
      <Navbar />
      <Title />
      <Element name="why-us" id="why-us">
        <WhyUs />
      </Element>
      <Element name="features" id="features">
        <Features />
      </Element>
      <Element name="user-reviews" id="user-reviews">
        <UserReviews />
      </Element>
      <Footer />
    </div>
  );
};

export default Homepage;
