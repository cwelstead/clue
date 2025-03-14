import React from "react";

const weapons = [
  { 
    name: "Desk Chair",
    car: "src/assets/DESK_CHAIR.svg",
  },
  { 
    name: "Projector",
    car: "src/assets/PROJECTOR.svg",
  },
  { 
    name: "Scissors",
    car: "src/assets/SCISSOR.svg",
  },
  { 
    name: "Laptop Charger",
    car: "src/assets/LAPTOP_CHARGER.svg", 
  },
  { 
    name: "Monitor",
    car: "src/assets/MONITOR.svg", 
  },
  { 
    name: "Textbook",
    car: "src/assets/TEXTBOOK.svg", 
  },
];

const WeaponsList = () => {
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
        {weapons.map((weapon, index) => (
          <div
            key={index}
            style={{
              border: "2px solid black",
              borderRadius: "10px",
              backgroundImage: `url(${weapon.car})`,
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

export default WeaponsList;
