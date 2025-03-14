import React from "react";

const suspects = [
  {
    name: "Dr. Cooper",
    color: "#007913",
    car: "src/assets/DrCooper.svg",
  },
  {
    name: "Theresa",
    color: "#cfcfcf",
    car: "src/assets/Theresa.svg",
  },
  {
    name: "Bob",
    color: "#7c40ab",
    car: "src/assets/Bob.svg",
  },
  {
    name: "Adam",
    color: "#bb011a",
    car: "src/assets/Adam.svg",
  },
  {
    name: "Val",
    color: "#1f6dd4",
    car: "src/assets/Val.svg",
  },
  {
    name: "Firestone",
    color: "#ffb94f",
    car: "src/assets/Firestone.svg",
  },
];

const SuspectsList = () => {
  return (
    <div>
      <div 
        style={{ 
          display: "flex", 
          gap: "20px",
          flexWrap: "wrap",
          justifyContent: "left",
        }}
      >
        {suspects.map((suspect, index) => (
          <div
            key={index}
            style={{
              border: "2px solid black",
              borderRadius: "10px",
              backgroundImage: `url(${suspect.car})`,
              backgroundSize: "auto",
              backgroundPosition: "center",
              color: "white",
              height: "160px",
              width: "103px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              textAlign: "center",
              minWidth: "103px"
            }}
          >
          </div>
        ))}
      </div>
    </div>
  );
};

export default SuspectsList;
