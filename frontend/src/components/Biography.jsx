import React from "react";

const Biography = ({ title, imageUrl }) => {
  return (
    <div className="container biography">
      <div className="banner">
        <img src={imageUrl} alt="" />
      </div>
      <div className="banner">
        <h1>{title}</h1>
        
          We offer a comprehensive suite of services, including:
          <br />
          <br />

          <h6>1. Device Diagnostics:</h6> Accurate and thorough evaluations to identify and resolve issues.
          <br />
          <h6>2. Repairs:</h6> From screen replacements and battery issues to complex
          hardware repairs, we handle it all.
          <br />
          <h6>3. Maintenance:</h6> Regular check-ups and maintenance to keep your devices running smoothly.
          <br />
          <h6>4. Data Recovery:</h6> Professional data recovery services to retrieve lost or corrupted files.
          <br />
          <h6>5. Upgrades:</h6> Enhancements and upgrades to boost performance and extend the lifespan of your devices.
        
      </div>
    </div>
  );
};

export default Biography;
