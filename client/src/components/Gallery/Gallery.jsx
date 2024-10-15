import React from "react";
import { Galleria } from "primereact/galleria";

export default function Gallery({ imagesProp }) {
  const [images, setImages] = React.useState(imagesProp);

  const responsiveOptions = [
    {
      breakpoint: "991px",
      numVisible: 4,
    },
    {
      breakpoint: "767px",
      numVisible: 3,
    },
    {
      breakpoint: "575px",
      numVisible: 1,
    },
  ];

  React.useEffect(() => {
    // Update internal state if imagesProp changes
    setImages(imagesProp);
  }, [imagesProp]);

  const itemTemplate = (item) => {
    return (
      <img src={item.imageSrc} alt={item.alt} style={{ maxHeight: "400px" }} />
    );
  };

  const thumbnailTemplate = (item) => {
    return <img src={item.thumbnailImageSrc} alt={item.alt} />;
  };

  return (
    <div className="card">
      <Galleria
        value={images}
        responsiveOptions={responsiveOptions}
        numVisible={5}
        style={{ maxWidth: "640px" }}
        item={itemTemplate}
        thumbnail={thumbnailTemplate}
        circular
        showIndicators={false} // Hides indicators
      />
    </div>
  );
}
