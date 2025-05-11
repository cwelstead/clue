import React, { useEffect } from 'react';

const EndgamePopup = ({ endgamePopupState, role }) => {
    useEffect(() => {
        // Prevent scrolling on the body
        document.body.style.overflow = 'hidden';
        return () => {
            // Clean up the overflow style when the component unmounts
            document.body.style.overflow = '';
        };
    }, []);

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
                width: '40%',
                maxWidth: '1200px',
                marginBlock: "70px",
                zIndex: 1,
                backgroundColor: 'rgba(234, 215, 183, 1)',
                padding: '20px',
                borderRadius: '8px',
                border: '10px solid #C19A6B',
                backgroundPosition: "center",
            }}>
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
                        {endgamePopupState.type == 'correct' && endgamePopupState.accuser.role == role && "YOU WIN!"}
                        {endgamePopupState.type == 'correct' && endgamePopupState.accuser.role != role && "YOU LOSE!"}
                        {endgamePopupState.type == 'incorrect' && endgamePopupState.accuser.role == role && "YOU'RE OUT!"}
                        {endgamePopupState.type == 'incorrect' && endgamePopupState.accuser.role != role && `${endgamePopupState.accuser.role} IS OUT`}
                    </h2>
                    <p style={{
                        fontFamily: 'Courier New',
                        fontSize: '20px',
                        fontWeight: 700,
                        letterSpacing: '0.1em',
                        color: '#000',
                    }}>
                        {endgamePopupState.type == 'correct' && endgamePopupState.accuser.role == role &&
                        "Your accusation was correct. Congratulations!"}

                        {endgamePopupState.type == 'correct' && endgamePopupState.accuser.role != role &&
                        `${endgamePopupState.accuser.role}'s  accusation of ${endgamePopupState.guess.suspect.phrase} 
                        in ${endgamePopupState.guess.room.phrase} with ${endgamePopupState.guess.weapon.phrase}
                        was correct.`}

                        {endgamePopupState.type == 'incorrect' && endgamePopupState.accuser.role == role &&
                        "Your accusation was incorrect. Better luck next time!"}

                        {endgamePopupState.type == 'incorrect' && endgamePopupState.accuser.role != role &&
                        `${endgamePopupState.accuser.role}'s accusation of ${endgamePopupState.guess.suspect.phrase} in 
                        ${endgamePopupState.guess.room.phrase} with ${endgamePopupState.guess.weapon.phrase}
                        was incorrect.`}
                    </p>
                </div>
                {/* Submitting a guess */}
                <button onClick={endgamePopupState.onClose}
                    style={{
                    padding: '10px',
                    background: '#7F1700',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    }}>CONFIRM</button>
            </div>
        </div>
    )
}

export default EndgamePopup