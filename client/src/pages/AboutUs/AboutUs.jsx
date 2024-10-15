import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import AboutUsTitle from "./Sections/AboutUsTitle";
import AboutUsCards from "./Sections/AboutUsCards";
import AboutUsValues from "./Sections/AboutUsValues";
import Footer from "../../components/Footer/Footer";
import { mission, whoWeAre, whatWeDo, ourTechnology } from "../../utils";

const AboutUs = () => {
  return (
    <>
      <Navbar />
      <AboutUsTitle />

      {/* our mission */}
      <AboutUsCards
        image={mission}
        title="Our Mission"
        description="At RayLabs, our mission is to revolutionize medical diagnostics through advanced technology and innovation. We are dedicated to providing accurate, efficient, and accessible diagnostic solutions to improve healthcare outcomes for everyone."
      />

      {/* who we are */}
      <AboutUsCards
        isFlexReverse={true}
        image={whoWeAre}
        title="Who We Are"
        description="RayLabs is a cutting-edge medical technology company founded by a passionate team of healthcare professionals, data scientists, and engineers. Our diverse team brings together expertise from various fields to create a seamless diagnostic experience that bridges the gap between technology and healthcare."
      />

      {/* what we do */}
      <AboutUsCards
        image={whatWeDo}
        title="What We Do"
        description="RayLabs specializes in developing AI-powered diagnostic tools that analyze medical images and provide preliminary diagnostic insights. Our flagship product, the RayLabs app, is designed to assist healthcare professionals and patients by offering quick and reliable analyses of X-ray images."
      />

      {/* our technology */}
      <AboutUsCards
        isFlexReverse={true}
        image={ourTechnology}
        title="Our Technology"
        description="Our state-of-the-art algorithms and machine learning models are trained on extensive datasets to ensure high accuracy and reliability. By leveraging the power of AI, we aim to reduce the burden on healthcare systems and provide timely diagnoses, ultimately improving patient care and outcomes."
      />

      {/* our values */}
      <AboutUsValues />

      <Footer />
    </>
  );
};

export default AboutUs;
