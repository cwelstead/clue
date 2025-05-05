import React, { useEffect } from 'react';

const AlertPopup = ({ onConfirm = () => {}, onClose = () => {} }) => {
  useEffect(() => {
    // Prevent scrolling on the body when popup is shown
    document.body.style.overflow = 'hidden';
    return () => {
      // Restore scrolling when component unmounts
      document.body.style.overflow = '';
    };
  }, []);

  // Premium game color palette - crafted for high contrast & visual sophistication
  const gameColors = {
    cardBg: '#FFF',        // Deep almost-black with subtle warmth
    cardInnerBg: '#36322A',   // Tan parchment color from the provided palette
    textColor: '#FFFFFF',     // Rich red text for inner card for contrast against tan
    outerTextColor: '#36322A', // Pure white for outer shell text
    borderColor: '#000000',   // True black for crisp definition
    overlayColor: 'rgba(42, 26, 26, 0.82)', // Atmospheric darkened overlay
    buttonBg: '#FFFFFF',      // Pure white button as requested
    buttonText: '#000000',    // Pure black text as requested
    buttonShadow: 'rgba(0, 0, 0, 0.25)' // Subtle shadow for depth
  };

  const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: gameColors.overlayColor,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  };

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '20px'
  };

  const cardStyle = {
    width: '339px',
    height: '540px',
    backgroundColor: gameColors.cardBg,
    borderRadius: '25px',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.5)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '6px',
    position: 'relative'
  };

  const innerCardStyle = {
    marginTop: '11px',
    width: '304px',
    height: '466px',
    backgroundColor: gameColors.cardInnerBg,
    borderRadius: '18px',
    border: `4px solid ${gameColors.borderColor}`,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: 'inset 0 0 8px rgba(0, 0, 0, 0.4)' // Inner shadow for depth
  };

  const messageStyle = {
    fontFamily: '"Bricolage Grotesque", sans-serif',
    fontSize: '41px',
    fontWeight: 800,
    color: gameColors.textColor,
    textAlign: 'center',
    lineHeight: '1.2',
    padding: '0 16px',
    textShadow: '0 1px 1px rgba(0, 0, 0, 0.2)' // Subtle text shadow for depth
  };

  const sharingTextStyle = {
    width: '100%',
    padding: '10px 10px',
    color: gameColors.outerTextColor,
    fontFamily: '"Bricolage Grotesque", sans-serif',
    textAlign: 'left',
    marginTop: '10px',
  };

  const buttonStyle = {
    backgroundColor: gameColors.buttonBg,
    color: gameColors.buttonText,
    border: 'none',
    borderRadius: '1px',
    padding: '10px 36px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    boxShadow: `0 2px 6px ${gameColors.buttonShadow}`,
    letterSpacing: '0.5px',
    fontFamily: '"Inter", sans-serif'
  };

  // TODO: Make it so if it is the users turn then you will show the inner card the if not only show the outer card.
  // (Everyone but the player whos tun it is should just see the oute card)
  return (
    <div style={overlayStyle}>
      <div style={containerStyle}>
        <div style={cardStyle}>

          <div style={innerCardStyle}>
            <div style={messageStyle}>
              Nobody could prove you wrong.
            </div>
          </div>
          <div style={sharingTextStyle}>
            <span style={{ fontSize: '30px', fontWeight: '600', paddingLeft: '15px' }}>NOBODY</span>
            <span style={{ fontSize: '20px', fontWeight: 'normal' }}> is sharing</span>
          </div>
        </div>
        
        <button 
          onClick={onConfirm} 
          style={buttonStyle}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
            e.currentTarget.style.boxShadow = `0 4px 10px ${gameColors.buttonShadow}`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = `0 2px 6px ${gameColors.buttonShadow}`;
          }}
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default AlertPopup;