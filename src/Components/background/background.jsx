import React from "react";
import photoroom from "../../images/Photoroom.png";
import "./background.css";
import img_1 from "../../images/background-icon-1.png";
import img_2 from "../../images/background-icon-2.png";
import img_3 from "../../images/background-icon-3.png";
import img_4 from "../../images/background-icon-4.png";
import img_5 from "../../images/background-icon-5.png";
import img_6 from "../../images/background-icon-6.png";
import img_7 from "../../images/background-icon-7.png";
import img_8 from "../../images/background-icon-8.png";
import img_9 from "../../images/background-icon-9.png";

const Background = () => {
  return (
    <>
      <img src={photoroom} className="overlay background-image" />
      <div className="overlay background-icons-container">
        <img src={img_1} className="overlay img-icon-1" />
        <img src={img_2} className="overlay img-icon-2" />
        <img src={img_3} className="overlay img-icon-3" />
        <img src={img_4} className="overlay img-icon-4" />
        <img src={img_5} className="overlay img-icon-5" />
        <img src={img_6} className="overlay img-icon-6" />
        <img src={img_7} className="overlay img-icon-7" />
        <img src={img_8} className="overlay img-icon-8" />
        <img src={img_9} className="overlay img-icon-9" />
      </div>
    </>
  );
};

export default Background;
