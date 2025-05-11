// NOTE: Rolling dice animation was a stretch goal that we reached!
import { useState, useEffect } from 'react';

// This component will be triggered by the existing ROLL button
export default function DiceRollerPopup({ isOpen, onClose, onRollComplete }) {
  const [dice, setDice] = useState([1, 1]);
  const [isRolling, setIsRolling] = useState(false);
  const [rollCompleted, setRollCompleted] = useState(false);
  
  // Reset state when popup opens
  useEffect(() => {
    if (isOpen) {
      setRollCompleted(false);
      rollDiceAnimation();
    }
  }, [isOpen]);
  
  // Animation for rolling dice
  const rollDiceAnimation = () => {
    setIsRolling(true);
    
    // Simulate dice rolling animation with multiple updates
    const totalDuration = 1500; // Total animation time in ms
    const intervals = 10; // Number of "rolls" to show
    const intervalTime = totalDuration / intervals;
    
    let count = 0;
    const rollInterval = setInterval(() => {
      const die1 = Math.floor(Math.random() * 6) + 1;
      const die2 = Math.floor(Math.random() * 6) + 1;
      setDice([die1, die2]);
      
      count++;
      if (count >= intervals) {
        clearInterval(rollInterval);
        setIsRolling(false);
        setRollCompleted(true);
      }
    }, intervalTime);
  };

  const handleOkClick = () => {
    onRollComplete(dice[0] + dice[1]);
  };

  // SVG for each die face
  const renderDie = (value) => {
    const dotPositions = {
      1: [{ cx: 50, cy: 50 }],
      2: [{ cx: 25, cy: 25 }, { cx: 75, cy: 75 }],
      3: [{ cx: 25, cy: 25 }, { cx: 50, cy: 50 }, { cx: 75, cy: 75 }],
      4: [{ cx: 25, cy: 25 }, { cx: 25, cy: 75 }, { cx: 75, cy: 25 }, { cx: 75, cy: 75 }],
      5: [{ cx: 25, cy: 25 }, { cx: 25, cy: 75 }, { cx: 50, cy: 50 }, { cx: 75, cy: 25 }, { cx: 75, cy: 75 }],
      6: [{ cx: 25, cy: 25 }, { cx: 25, cy: 50 }, { cx: 25, cy: 75 }, { cx: 75, cy: 25 }, { cx: 75, cy: 50 }, { cx: 75, cy: 75 }]
    };
    
    const dots = dotPositions[value].map((dot, index) => (
      <circle 
        key={index} 
        cx={dot.cx} 
        cy={dot.cy} 
        r={7} 
        fill="#f5e6d0"
      />
    ));
    
    return (
      <svg viewBox="0 0 100 100" className={`w-24 h-24 shadow-lg ${isRolling ? 'animate-bounce' : ''}`}>
        <defs>
          <filter id="inner-shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="3" result="blur" />
            <feOffset dx="0" dy="0" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.7" />
            </feComponentTransfer>
            <feBlend in="SourceGraphic" in2="blur" mode="multiply" />
          </filter>
        </defs>
        <rect 
          x={5} 
          y={5} 
          width={90} 
          height={90} 
          rx={10} 
          fill="#7f1700"
          stroke="#373029"
          strokeWidth={2}
          filter="url(#inner-shadow)"
        />
        {dots}
      </svg>
    );
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(42, 26, 26, 0.7)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000
    }}>
      <div style={{
        backgroundColor: 'var(--gray_800_04)', 
        borderRadius: 'var(--radius-lg)',
        padding: '2rem',
        boxShadow: 'var(--shadow-xs)',
        fontFamily: '"Inter", sans-serif',
        color: 'var(--white_a700)',
        width: '360px'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '1.5rem',
          margin: '1rem 0 2rem'
        }}>
          {renderDie(dice[0])}
          {renderDie(dice[1])}
        </div>
        
        <div style={{
          textAlign: 'center',
          fontFamily: '"IBM Plex Mono", monospace',
          fontWeight: 600,
          fontSize: '1.5rem',
          marginBottom: '1.5rem'
        }}>
          Total: {dice[0] + dice[1]}
        </div>
        
        {/* OK Button - only shown after rolling animation completes */}
        {rollCompleted && (
          <button 
            onClick={handleOkClick}
            style={{
              width: '100%',
              height: '54px',
              fontSize: '18px',
              fontFamily: '"Inter", sans-serif',
              fontWeight: 500,
              backgroundColor: 'var(--yellow_800)',
              color: 'var(--white_a700)',
              border: '2px solid var(--white_a700)',
              borderRadius: 'var(--radius-lg)',
              cursor: 'pointer',
              transition: 'all 0.2s ease-in-out'
            }}
            onMouseOver={(e) => e.currentTarget.style.opacity = '0.85'}
            onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
          >
            OK
          </button>
        )}
      </div>
    </div>
  );
}