import React from "react";

const rooms = [
  { 
    name: "Great Hall",
    car: "src/assets/GREAT_HALL.svg",
  },
  { 
    name: "Conference",
    car: "src/assets/CONFERENCE.svg",
  },
  { 
    name: "DS Room",
    car: "src/assets/DS_ROOM.svg",
  },
  { 
    name: "Mega Lounge",
    car: "src/assets/MEGA_LOUNGE.svg",
  },
  { 
    name: "Main Office",
    car: "src/assets/MAIN_OFFICE.svg",
  },
  { 
    name: "112",
    car: "src/assets/112.svg",
  },
  { 
    name: "Selleck",
    car: "src/assets/SELLECK.svg",
  },
  { 
    name: "110",
    car: "src/assets/110.svg",
  },
  { 
    name: "Study",
    car: "src/assets/STUDY.svg",
  }
];

const RoomsList = () => {
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
        {rooms.map((room, index) => (
          <div
            key={index}
            style={{
              border: "2px solid black",
              borderRadius: "10px",
              backgroundImage: `url(${room.car})`,
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

export default RoomsList;


