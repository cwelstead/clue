/* src/ClueInfoSheet.jsx */
import React, { useEffect, useState } from 'react';

const ClueInfoSheet = ({ onClose }) => { //Accept onClose prop
  // Hardcoded arrays for simplicity
  const suspects = [
    { name: "Dr. Cooper", car: "src/assets/suspectCards/DrCooper.svg" },
    { name: "Theresa", car: "src/assets/suspectCards/Theresa.svg" },
    { name: "Bob", car: "src/assets/suspectCards/Bob.svg" },
    { name: "Adam", car: "src/assets/suspectCards/Adam.svg" },
    { name: "Val", car: "src/assets/suspectCards/Val.svg" },
    { name: "Firestone", car: "src/assets/suspectCards/Firestone.svg" }
  ];

  const weapons = [
    { name: "Desk Chair", car: "src/assets/weaponCards/DESK_CHAIR.svg" },
    { name: "Projector", car: "src/assets/weaponCards/PROJECTOR.svg" },
    { name: "Scissors", car: "src/assets/weaponCards/SCISSOR.svg" },
    { name: "Laptop Charger", car: "src/assets/weaponCards/LAPTOP_CHARGER.svg" },
    { name: "Monitor", car: "src/assets/weaponCards/MONITOR.svg" },
    { name: "Textbook", car: "src/assets/weaponCards/TEXTBOOK.svg" }
  ];

  const rooms = [
    { name: "Great Hall", car: "src/assets/roomCards/GREAT_HALL.svg" },
    { name: "Conference", car: "src/assets/roomCards/CONFERENCE.svg" },
    { name: "DS Room", car: "src/assets/roomCards/DS_ROOM.svg" },
    { name: "Mega Lounge", car: "src/assets/roomCards/MEGA_LOUNGE.svg" },
    { name: "Main Office", car: "src/assets/roomCards/MAIN_OFFICE.svg" },
    { name: "112", car: "src/assets/roomCards/112.svg" },
    { name: "Selleck", car: "src/assets/roomCards/SELLECK.svg" },
    { name: "110", car: "src/assets/roomCards/110.svg" },
    { name: "Study", car: "src/assets/roomCards/STUDY.svg" }
  ];

  // State to track which cards have been crossed off
  const [crossedOffCards, setCrossedOffCards] = useState({
    suspects: {},
    weapons: {},
    rooms: {}
  });

  useEffect(() => {
    // Prevent scrolling on the body
    document.body.style.overflow = 'hidden';
    return () => {
      // Clean up the overflow style when the component unmounts
      document.body.style.overflow = '';
    };
  }, []);

  // Handle card click
  const handleCardClick = (type, name) => {
    setCrossedOffCards(prevState => {
      const newState = { ...prevState };
      // Toggle the crossed off state
      newState[type] = {
        ...prevState[type],
        [name]: !prevState[type][name]
      };
      return newState;
    });
  };

  // Enhanced card component with click handling and overlay
  const CardComponent = ({ card, type, isCrossedOff }) => {
    return (
      <div
        style={{
          border: "2px solid black",
          borderRadius: "10px",
          backgroundImage: `url(${card.car})`,
          backgroundSize: "auto",
          backgroundPosition: "center",
          height: "160px",
          width: "103px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          textAlign: "center",
          minWidth: "103px",
          position: "relative",
          cursor: "pointer"
        }}
        onClick={() => handleCardClick(type, card.name)}
      >
        {isCrossedOff && (
          <div style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.70)",
            borderRadius: "8px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}>
          </div>
        )}
      </div>
    );
  };

  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      position: 'fixed',
      top: 0,
      left: 0,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      overflowY: 'auto',
      paddingBottom: '50px',
      zIndex: 1000 // Ensure it's on top of everything
    }}>
      {/* Background Image Wrapper with Inner Shadow*/}
      <div
        style={{
          position: 'fixed',
          width: '100%',
          height: '100%',
          zIndex: 0,
          boxShadow: 'inset 0px 0px 100px 100px rgba(0, 0, 0, 0.25)',
          overflow: 'hidden'
        }}
      >
        {/* Overlay with #2A1A1A at 57% opacity */}
        <div 
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(42, 26, 26, 0.57)',
            zIndex: 1
          }}
        />
      </div>

      {/* Container for all cards */}
      <div style={{
        width: '80%',
        maxWidth: '1200px',
        marginBlock: "70px",
        zIndex: 1,
        backgroundColor: 'rgba(234, 215, 183, 1)',
        padding: '20px',
        borderRadius: '8px',
        border: '10px solid #C19A6B',
        backgroundPosition: "center",
      }}>
        {/* Suspects Section */}
        <div style={{ marginBottom: '10px' }}>
          <h2 style={{
            fontFamily: 'Courier New',
            fontSize: '24px',
            fontWeight: 700,
            letterSpacing: '0.1em',
            color: '#7F1700',
            borderBottom: '2px solid #7F1700',
            paddingBottom: '5px',
            marginBottom: '15px'
          }}>
            SUSPECTS
          </h2>
          <div style={{ 
            display: "flex", 
            gap: "20px",
            flexWrap: "wrap",
            justifyContent: "left",
          }}>
            {suspects.map((suspect, index) => (
              <CardComponent 
                key={index} 
                card={suspect} 
                type="suspects"
                isCrossedOff={crossedOffCards.suspects[suspect.name]} 
              />
            ))}
          </div>
        </div>

        {/* Weapons Section */}
        <div style={{ marginBottom: '10px' }}>
          <h2 style={{
            fontFamily: 'Courier New',
            fontSize: '24px',
            fontWeight: 700,
            letterSpacing: '0.1em',
            color: '#7F1700',
            borderBottom: '2px solid #7F1700',
            paddingBottom: '5px',
            marginBottom: '15px'
          }}>
            WEAPONS
          </h2>
          <div style={{ 
            display: "flex", 
            gap: "20px",
            flexWrap: "wrap",
            justifyContent: "left",
          }}>
            {weapons.map((weapon, index) => (
              <CardComponent 
                key={index} 
                card={weapon} 
                type="weapons"
                isCrossedOff={crossedOffCards.weapons[weapon.name]} 
              />
            ))}
          </div>
        </div>

        {/* Rooms Section */}
        <div>
          <h2 style={{
            fontFamily: 'Courier New',
            fontSize: '24px',
            fontWeight: 700,
            letterSpacing: '0.1em',
            color: '#7F1700',
            borderBottom: '2px solid #7F1700',
            paddingBottom: '5px',
            marginBottom: '15px'
          }}>
            ROOMS
          </h2>
          <div style={{ 
            display: "flex", 
            gap: "20px",
            flexWrap: "wrap",
            justifyContent: "left",
          }}>
            {rooms.map((room, index) => (
              <CardComponent 
                key={index} 
                card={room} 
                type="rooms"
                isCrossedOff={crossedOffCards.rooms[room.name]} 
              />
            ))}
          </div>
        </div>
      </div>
        {/*Add a button to close the component*/}
        <button onClick={onClose} style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            padding: '10px',
            background: '#7F1700',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            zIndex: '1001',
        }}>
            Close
        </button>
    </div>
  );
};

export default ClueInfoSheet;
