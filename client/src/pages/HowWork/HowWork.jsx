import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import HowWorkTitle from "./Sections/HowWorkTitle";
import HowWorkCards from "./Sections/HowWorkCards";
import { Timeline } from "antd";
import Footer from "../../components/Footer/Footer";
import { howWeWork_landingPage, howWeWork_inputImage, howWeWork_inputImage2, howWeWork_inputImage3,submitted,uploaded } from "../../utils";
import styles from './HowWork.module.css';

const HowWork = () => {
  return (
    <>
      <Navbar />
      <HowWorkTitle />

      <Timeline className={styles.timelineCustom} mode="alternate">
        <Timeline.Item>
          <HowWorkCards
            image={howWeWork_landingPage}
            title="Services"
            description="First Click on the Services button to see the services we provide"
          />
        </Timeline.Item>
        <Timeline.Item>
          <HowWorkCards
            isFlexReverse={true}
            image={howWeWork_inputImage}
            title="Start Uploading"
            description="From your local device, upload an X-ray image to the RayLabs app using 'Choose files' button."
          />
        </Timeline.Item>
        <Timeline.Item>
          <HowWorkCards
            image={howWeWork_inputImage2}
            title="Choose X-Ray Images"
            description="Select the X-ray image you wish to analyze."
          />
        </Timeline.Item>
        <Timeline.Item>
          <HowWorkCards
            isFlexReverse={true}
            image={howWeWork_inputImage3}
            title="Add More Images"
            description="For multiple images, click on the 'Add More Images' button."
          />
        </Timeline.Item>
        <Timeline.Item>
          <HowWorkCards
            isFlexReverse={true}
            image={uploaded}
            title="Upload Images"
            description="Click on the 'Upload Images' button to upload the selected X-ray images."
          />
        </Timeline.Item>
        <Timeline.Item>
          <HowWorkCards
            isFlexReverse={true}
            image={submitted}
            title="Submit"
            description="Click on the 'Submit' button to get the analysis of the X-ray image."
          />
        </Timeline.Item>
      </Timeline>

      <Footer />
    </>
  );
};

export default HowWork;

