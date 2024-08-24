import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import AboutUsTitle from "./Sections/AboutUsTitle";
import AboutUsCards from "./Sections/AboutUsCards";
import AboutUsValues from "./Sections/AboutUsValues";
import Footer from "../../components/Footer/Footer";

const AboutUs = () => {
  return (
    <>
      <Navbar />
      <AboutUsTitle />

      {/* our mission */}
      <AboutUsCards
        image="https://firebasestorage.googleapis.com/v0/b/raylabs-804be.appspot.com/o/AboutUs%20page%2Fgetty_501539900_112940.jpg?alt=media&token=86800ca3-d2cf-4861-8689-4f8d30e125e7"
        title="Our Mission"
        description="At RayLabs, our mission is to revolutionize medical diagnostics through advanced technology and innovation. We are dedicated to providing accurate, efficient, and accessible diagnostic solutions to improve healthcare outcomes for everyone."
      />

      {/* who we are */}
      <AboutUsCards
        isFlexReverse={true}
        image="https://firebasestorage.googleapis.com/v0/b/raylabs-804be.appspot.com/o/AboutUs%20page%2Fteamwork_collaboration_developers_development_engineers_binary_code_virtual_interface_by_dean_mitchell_gettyimages-1055056834_2400x1600-100802360-large.webp?alt=media&token=7d943700-5723-4ec4-b3cf-cb52aa591efd"
        title="Who We Are"
        description="RayLabs is a cutting-edge medical technology company founded by a passionate team of healthcare professionals, data scientists, and engineers. Our diverse team brings together expertise from various fields to create a seamless diagnostic experience that bridges the gap between technology and healthcare."
      />

      {/* what we do */}
      <AboutUsCards
        image="https://firebasestorage.googleapis.com/v0/b/raylabs-804be.appspot.com/o/AboutUs%20page%2Fdoctor-looks-at-imaging-exam-results-on-ipad.webp?alt=media&token=3b9a6aad-69a0-4c12-b486-4531afa5d0c2"
        title="What We Do"
        description="RayLabs specializes in developing AI-powered diagnostic tools that analyze medical images and provide preliminary diagnostic insights. Our flagship product, the RayLabs app, is designed to assist healthcare professionals and patients by offering quick and reliable analyses of X-ray images."
      />

      {/* our technology */}
      <AboutUsCards
        isFlexReverse={true}
        image="https://firebasestorage.googleapis.com/v0/b/raylabs-804be.appspot.com/o/AboutUs%20page%2F1525767455777.png?alt=media&token=4daabca4-4e5f-4336-a57f-15f0c1e41075"
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
