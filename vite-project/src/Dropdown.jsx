import React, { useState } from "react";
import yellowSvg from "./assets/svg/yellow.svg";
import redSvg from "./assets/svg/red.svg";
import graySvg from "./assets/svg/gray.svg";
import blueSvg from "./assets/svg/blue.svg";
import blackSvg from "./assets/svg/black.svg";
import greenSvg from "./assets/svg/green.svg";
import orangeSvg from "./assets/svg/orange.svg";
import whiteSvg from "./assets/svg/white.svg";


// import option2Svg from "./assets/svg/option2.svg";
// import option3Svg from "./assets/svg/option3.svg";

const DropdownMenu = () => {
  // State to store the selected option
  const [selectedOption, setSelectedOption] = useState("");
  
  // Function to handle change in selected option
  const handleChange = (e) => {
    setSelectedOption(e.target.value);
  };

  // Function to render the SVG based on the selected option
  const renderSvg = () => {
    switch (selectedOption) {
      case "yellow":
        return <img src={yellowSvg} className="svg" alt="yellow" />;
      case "red":
        return <img src={redSvg} className="svg" alt="red" />;
      case "gray":
        return <img src={graySvg} className="svg" alt="gray" />;
      case "blue":
        return <img src={blueSvg} className="svg" alt="blue" />;
      case "black":
        return <img src={blackSvg} className="svg" alt="black" />;
      case "green":
        return <img src={greenSvg} className="svg" alt="green" />;
      case "orange":
        return <img src={orangeSvg} className="svg" alt="orange" />;
      case "white":
        return <img src={whiteSvg} className="svg" alt="white" />;
      default:
        return null;
    }
  };

  return (
    <div>
      <label htmlFor="options">Select an option:</label>
      <select id="options" value={selectedOption} onChange={handleChange}>
        <option value="">Select an option</option>
        <option value="yellow">Yellow</option>
        <option value="red">Red</option>
        <option value="gray">Gray</option>
        <option value="blue">Blue</option>
        <option value="black">Black</option>
        <option value="green">Green</option>
        <option value="orange">orange</option>
        <option value="white">white</option>


        {/* Add more options as needed */}
      </select>
      <div className="svg-container">
        Selected Option: {selectedOption && renderSvg()}
      </div>
    </div>
  );
};

export default DropdownMenu;
