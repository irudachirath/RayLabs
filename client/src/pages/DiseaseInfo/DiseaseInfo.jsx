import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import "./DiseaseInfo.css";
import DiseaseInfoTiltle from "./Section/DiseaseInfoTiltle";

const DiseaseInfo = () => {
  const conditions = [
    {
      title: "Atelectasis",
      description:
        "Atelectasis is the collapse or closure of part or all of a lung, resulting in reduced or absent gas exchange. It may be caused by a blockage of the airways or shallow breathing and can occur after surgery or due to lung disease.",
      link: "https://www.mayoclinic.org/diseases-conditions/atelectasis/symptoms-causes/syc-20369684",
    },
    {
      title: "Cardiomegaly",
      description:
        "Cardiomegaly refers to an enlarged heart, which may result from high blood pressure, heart valve disease, or heart failure. It is a sign of another condition rather than a disease in itself.",
      link: "https://www.mayoclinic.org/diseases-conditions/enlarged-heart/symptoms-causes/syc-20355436",
    },
    {
      title: "Effusion",
      description:
        "Pleural effusion is the abnormal buildup of fluid in the space between the lungs and the chest wall. It can be caused by infections, heart failure, or cancer, leading to difficulty in breathing.",
      link: "https://www.webmd.com/lung/pleural-effusion-symptoms-causes-treatments",
    },
    {
      title: "Infiltration",
      description:
        "Pulmonary infiltrates refer to substances (such as fluid or cells) that are denser than air and accumulate in the lung tissues, often due to infections, inflammation, or lung disease.",
      link: "https://www.sciencedirect.com/topics/medicine-and-dentistry/pulmonary-infiltrate#:~:text=Pulmonary%20infiltrates%20can%20represent%20pulmonary,Prompt%20appropriate%20treatment%20is%20vital.",
    },
    {
      title: "Lung Mass",
      description:
        "A lung mass is an abnormal growth in the lungs, which could be benign or malignant (cancerous). Larger than nodules, they often require further testing to determine the cause.",
      link: "https://www.mayoclinic.org/diseases-conditions/lung-cancer/symptoms-causes/syc-20374620",
    },
    {
      title: "Pulmonary Nodule",
      description:
        "A pulmonary nodule is a small, round growth in the lung. While most are benign, some can be early-stage lung cancer, and further testing is often necessary to determine their cause.",
      link: "https://www.lung.org/lung-health-diseases/warning-signs-of-lung-disease/nodules",
    },
    {
      title: "Pneumonia",
      description:
        "Pneumonia is an infection that inflames the air sacs in one or both lungs, which may fill with fluid. It can be caused by bacteria, viruses, or fungi and is characterized by cough, fever, and difficulty breathing.",
      link: "https://www.mayoclinic.org/diseases-conditions/pneumonia/symptoms-causes/syc-20354204",
    },
    {
      title: "Pneumothorax",
      description:
        "Pneumothorax is the presence of air or gas in the chest cavity, which can cause the lung to collapse. It can occur spontaneously or as a result of injury or medical procedures.",
      link: "https://www.mayoclinic.org/diseases-conditions/pneumothorax/symptoms-causes/syc-20350367",
    },
    {
      title: "Lung Consolidation",
      description:
        "Lung consolidation refers to the filling of the lung’s airspaces with fluid, pus, blood, or cells, typically due to pneumonia or other infections, making the lung tissue appear solid on imaging.",
      link: "https://radiopaedia.org/articles/consolidation",
    },
    {
      title: "Pulmonary Edema",
      description:
        "Pulmonary edema is a condition caused by excess fluid in the lungs, which collects in the air sacs, making it difficult to breathe. It is commonly caused by heart problems or direct lung injury.",
      link: "https://www.mayoclinic.org/diseases-conditions/pulmonary-edema/symptoms-causes/syc-20377009",
    },
    {
      title: "Emphysema",
      description:
        "Emphysema is a chronic lung condition that causes shortness of breath due to the destruction of the air sacs in the lungs. It is often a result of long-term smoking and leads to reduced oxygen exchange.",
      link: "https://www.physio-pedia.com/Emphysema",
    },
    {
      title: "Pulmonary Fibrosis",
      description:
        "Pulmonary fibrosis is a lung disease that occurs when lung tissue becomes damaged and scarred. This stiffens the lungs, making it difficult for them to work properly, leading to progressive shortness of breath.",
      link: "https://www.mayoclinic.org/diseases-conditions/pulmonary-fibrosis/symptoms-causes/syc-20353690",
    },
    {
      title: "Pleural Thickening",
      description:
        "Pleural thickening involves the thickening of the lining of the lungs (the pleura) due to inflammation or long-term exposure to harmful substances, such as asbestos. It can cause chest pain and difficulty breathing.",
      link: "https://www.mesothelioma.com/asbestos-cancer/pleural-thickening/",
    },
    {
      title: "Hernia",
      description:
        "A hiatal hernia occurs when part of the stomach pushes up through the diaphragm into the chest cavity. It can cause symptoms such as heartburn, acid reflux, and difficulty swallowing.",
      link: "https://www.urmc.rochester.edu/encyclopedia/content.aspx?contenttypeid=22&contentid=lunghernia",
    },
  ];

  return (
    <>
      <Navbar />
      <DiseaseInfoTiltle />
      <div className="medical-container">
        <section className="conditions">
          {conditions.map((condition, index) => (
            <div
              key={index}
              className={`card ${index % 2 === 0 ? "left" : "right"}`}
            >
              <div className="card-image"></div>
              <div className="card-text">
                <h2>{condition.title}</h2>
                <p>{condition.description}</p>
                <a
                  href={condition.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="read-more"
                >
                  Read More
                </a>
              </div>
            </div>
          ))}
        </section>
      </div>
      <Footer />
    </>
  );
};

export default DiseaseInfo;
