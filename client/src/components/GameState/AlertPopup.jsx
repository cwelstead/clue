import React, { useEffect, useState } from 'react';
import { CARDS } from '../../../../classes/Cards';

const AlertPopup = ({ onConfirm, card, suggestState }) => {
    useEffect(() => {
        // Prevent scrolling on the body
        document.body.style.overflow = 'hidden';
        return () => {
            // Clean up the overflow style when the component unmounts
            document.body.style.overflow = '';
        };
    }, []);

    // Enhanced card component with click handling and overlay
    const CardComponent = ({ src, }) => {
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
            >
                <img src={src} style={{ objectFit: 'fill', margin: '-2px' }} />
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
                        {suggestState.type == 'no-proof-view' && 
                        "No one could prove you wrong."}
                        {suggestState.type == 'suggestion-proof-view' &&
                        `${suggestState.refuter.role} IS SHOWING YOU A CARD`}
                    </h2>
                    <div style={{
                        display: "flex",
                        gap: "20px",
                        flexWrap: "wrap",
                        justifyContent: "center",
                    }}>
                        {card && (
                            <CardComponent src={`./src/assets/${card.type}Cards/${card.id}.svg`} />
                        )}
                    </div>
                </div>
                {/* Submitting a guess */}
                <button onClick={onConfirm}>CONFIRM</button>
            </div>
        </div>
    )
}

export default AlertPopup