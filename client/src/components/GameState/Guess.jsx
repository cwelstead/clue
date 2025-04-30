import React, { useEffect, useState } from 'react';
import { CARDS } from '../../../../classes/Cards';

const Guess = ({ onClose, guessType, makeGuess }) => { //Accept onClose prop
    const [selectedRoom, setSelectedRoom] = useState(null)
    const [selectedSuspect, setSelectedSuspect] = useState(null)
    const [selectedWeapon, setSelectedWeapon] = useState(null)

    const roomCards = CARDS.filter(card => card.type == "room")
    const suspectCards = CARDS.filter(card => card.type == "suspect")
    const weaponCards = CARDS.filter(card => card.type == "weapon")

    function checkSubmitGuess() {
        if (selectedRoom && selectedSuspect && selectedWeapon) {
            makeGuess(selectedSuspect, selectedWeapon, selectedRoom)
        }
    }

    useEffect(() => {
        // Prevent scrolling on the body
        document.body.style.overflow = 'hidden';
        return () => {
            // Clean up the overflow style when the component unmounts
            document.body.style.overflow = '';
        };
    }, []);

    // Enhanced card component with click handling and overlay
    const CardComponent = ({ src, isSelected, onClick }) => {
        return (
            <div
                style={{
                    border: "2px solid black",
                    borderRadius: "10px",
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
                    cursor: "pointer",
                    overflow: "hidden",
                }}
                onClick={onClick}
            >
                <img src={src} style={{ objectFit: 'fill', margin: '-2px' }} />
                {!isSelected && (
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
                    <h1 style={{
                        fontFamily: 'Courier New',
                        fontSize: '36px',
                        fontWeight: 700,
                        letterSpacing: '0.1em',
                        color: '#000',
                        paddingBottom: '5px',
                        marginBottom: '15px'
                    }}>
                        {guessType}
                    </h1>
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
                        {suspectCards.map(card => (
                            <CardComponent src={`./src/assets/${card.type}Cards/${card.id}.svg`} key={card.id}
                                isSelected={card == selectedSuspect}
                                onClick={(e) => {
                                    e.preventDefault()
                                    setSelectedSuspect(card)
                                }} />
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
                        {weaponCards.map(card => (
                            <CardComponent src={`./src/assets/${card.type}Cards/${card.id}.svg`} key={card.id}
                                isSelected={card == selectedWeapon}
                                onClick={(e) => {
                                    e.preventDefault()
                                    setSelectedWeapon(card)
                                }} />
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
                        {roomCards.map(card => (
                            <CardComponent src={`./src/assets/${card.type}Cards/${card.id}.svg`} key={card.id}
                                isSelected={card == selectedRoom}
                                onClick={(e) => {
                                    e.preventDefault()
                                    setSelectedRoom(card)
                                }} />
                        ))}
                    </div>
                </div>
                {/* Submitting a guess */}
                <button onClick={checkSubmitGuess}>SUBMIT</button>
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
    )
}

export default Guess