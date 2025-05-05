import { useState, useEffect } from 'react';
import { socket } from '../socket.js';

export function SelectLobby({ onLobbyJoin, setNavState, joinFail, setJoinFail }) {
    const [lobbyID, setLobbyID] = useState("");
    
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = '';
        };
    }, []);

    const createLobby = () => {
        socket.emit('lobby-create');
    };

    return (
        <div style={{
            width: '100vw',
            height: '100vh',
            position: 'fixed',
            top: 0,
            left: 0,
            background: '#2A1A1A',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            overflow: 'hidden',
        }}>
            <div
                style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    zIndex: 0,
                    boxShadow: 'inset 0px 0px 100px 100px rgba(0, 0, 0, 0.25)',
                    overflow: 'hidden'
                }}
            >
                <img 
                    src="/src/assets/KauffmanLobby.png"
                    alt="background"
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                    }}
                />
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

            <h1 style={{
                fontFamily: 'Playfair Display',
                fontSize: '48px',
                fontWeight: 700,
                letterSpacing: '0.48px',
                color: '#F8F5E3',
                marginTop: '202px',
                zIndex: 1,
            }}>
                Select Lobby
            </h1>

            <div style={{
                padding: '20px',
                position: 'relative',
                backgroundColor: 'rgba(234, 215, 183, 1)',
                backgroundBlendMode: 'overlay',
                borderRadius: '8px',
                border: '2px solid #C19A6B',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                overflow: 'hidden',
                zIndex: 1,
            }}>
                <label style={{
                    fontFamily: 'Courier New',
                    fontSize: '16px',
                    letterSpacing: '0.08em',
                    color: '#2C2C2C',
                }}>
                    Lobby Code
                </label>
                <input
                    type="text"
                    value={lobbyID}
                    maxLength="6"
                    placeholder="Enter lobby code..."
                    onChange={(e) => {
                        setLobbyID(e.target.value)
                        setJoinFail(false)
                    }}
                    required
                    style={{
                        height: '50px',
                        background: '#F5E6D0',
                        border: '1px solid #000000',
                        borderRadius: '8px',
                        padding: '0 15px',
                        fontFamily: 'IBM Plex Mono',
                        fontSize: '14px',
                        fontWeight: 300,
                        letterSpacing: '0.07em',
                        color: '#6E6E6E',
                    }}
                />
                {joinFail &&
                    <p style={{
                        fontFamily: 'Courier New',
                        fontSize: '12px',
                        letterSpacing: '0.08em',
                        color: '#2C2C2C',
                        margin: '0px'
                    }}>
                        Failed to join lobby
                </p>}
                <button 
                    onClick={(e) => {
                        e.preventDefault();
                        onLobbyJoin(lobbyID);
                    }}
                    style={{
                        height: '55px',
                        background: 'linear-gradient(180deg, rgba(225,181,48,1) 0%, rgba(212,160,23,1) 100%)',
                        border: 'none',
                        borderRadius: '8px',
                        fontFamily: 'Courier New',
                        fontSize: '18px',
                        fontWeight: 700,
                        letterSpacing: '0.09em',
                        color: '#5A1A1A',
                        cursor: 'pointer',
                        transition: 'opacity 0.2s',
                    }}
                >
                    JOIN
                </button>
                <button 
                    onClick={(e) => {
                        e.preventDefault();
                        createLobby();
                    }}
                    style={{
                        width: '100%',
                        height: '55px',
                        background: '#7F1700',
                        border: 'none',
                        borderRadius: '8px',
                        fontFamily: 'Courier New',
                        fontSize: '16px',
                        fontWeight: 700,
                        letterSpacing: '0.08em',
                        color: '#E1B530',
                        cursor: 'pointer',
                        transition: 'opacity 0.2s',
                    }}
                >
                    CREATE LOBBY
                </button>
                <button
                    onClick={(e) => {
                        e.preventDefault()
                        setNavState("")
                    }}
                    style={{
                        width: '100%',
                        height: '35px',
                        background: 'transparent',
                        border: '1px solid #7F1700',
                        borderRadius: '4px',
                        fontFamily: 'Courier New',
                        fontSize: '12px',
                        fontWeight: 600,
                        letterSpacing: '0.05em',
                        color: '#7F1700',
                        cursor: 'pointer',
                        padding: '0 15px',
                        transition: 'background-color 0.2s',
                        marginRight: '10px',
                        display: 'block',  // Make it a block element
                        margin: '0 auto',  // Center it horizontally
                    }}
                >
                    BACK
                </button>
            </div>
        </div>
    );
}
