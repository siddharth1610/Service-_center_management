import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const Departments = () => {
  const servicesArray = [
    {
      name: "Smartphone Repair",
      imageUrl: "/smartphone.webp",
    },
    {
      name: "Laptop Repair",
      imageUrl: "/laptop-repa.jpeg",
    },
    {
      name: "Tablet Repair",
      imageUrl: "/tablet.jpeg",
    },

    {
      name: "Battery Replacement",
      imageUrl: "/battery.jpeg",
    },
    {
      name: "Data Recovery",
      imageUrl: "/data rec.jpeg",
    },

    {
      name: "Device Diagnostics",
      imageUrl: "/device.jpeg",
    },
  ];

  const responsive = {
    extraLarge: {
      breakpoint: { max: 3000, min: 1324 },
      items: 4,
      slidesToSlide: 1, // optional, default to 1.
    },
    large: {
      breakpoint: { max: 1324, min: 1005 },
      items: 3,
      slidesToSlide: 1, // optional, default to 1.
    },
    medium: {
      breakpoint: { max: 1005, min: 700 },
      items: 2,
      slidesToSlide: 1, // optional, default to 1.
    },
    small: {
      breakpoint: { max: 700, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };
  return (
    <div className="container departments">
      <h1>More Services:</h1><br/>
      <Carousel responsive={responsive}removeArrowOnDeviceType={[
            // "superLargeDesktop",
            // "desktop",
            "tablet",
            "mobile",
          ]}
      >
      {servicesArray.map((ser, index) => {
        return (
          <div className="card" key={index}>
            <div className="depart-name">
              {ser.name}
              <img src={ser.imageUrl} alt="services" />
            </div>
          </div>
        );
      })}</Carousel>
    </div>
  );
};

export default Departments;
