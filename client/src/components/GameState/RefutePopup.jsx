import React, { useEffect, useState } from 'react';
import { CARDS } from '../../../../classes/Cards';

const RefutePopup = ({ onSubmit, cards, suggestState }) => {
    const [selectedCard, setSelectedCard] = useState(null)

    const guessedCards = Object.values(suggestState.guess)
    const availableCards = cards.filter(card => guessedCards.find(({id}) => id == card.id))

    function checkSubmitCard() {
        if (selectedCard) {
            onSubmit(selectedCard)
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
                        Select a card to show to {suggestState.source.role}
                    </h2>
                    <div style={{
                        display: "flex",
                        gap: "20px",
                        flexWrap: "wrap",
                        justifyContent: "center",
                        marginBottom: '15px'
                    }}>
                        {availableCards.map(card => (
                            <CardComponent src={`./src/assets/${card.type}Cards/${card.id}.svg`} key={card.id}
                                isSelected={card == selectedCard}
                                onClick={(e) => {
                                    e.preventDefault()
                                    setSelectedCard(card)
                                }} />
                        ))}
                    </div>
                </div>
                {/* Submitting a guess */}
                <button onClick={checkSubmitCard}>SUBMIT</button>
            </div>
        </div>
    )
}

export default RefutePopup