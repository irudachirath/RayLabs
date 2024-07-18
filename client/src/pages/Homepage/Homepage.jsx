import React from "react";
import Title from "./Sections/Title";
import WhyUs from "./Sections/WhyUs";
import Features from "./Sections/Features";
import UserReviews from "./Sections/UserReviews";
import Footer from "../../components/Footer/Footer";

const Homepage = () => {
  return (
    <div>
      <Title />
      <WhyUs />
      <Features />
      <UserReviews />
      <Footer />
    </div>
  );
};

export default Homepage;
