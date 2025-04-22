import { useState, useRef } from "react";
import { Roles } from "../../../classes/Lobby"
import { MusicPlayer } from "./MusicPlayer";

export function InLobby({ lobby, onReadyToggle, onSwitchRole, onLeave, onGo }) {
    const [isPlaying, setIsPlaying] = useState(false); // State to track if music is playing
    const audioRef = useRef(null); // Reference to the audio element

    const toggleMusic = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play().catch(error => console.log("Playback error:", error));
            }
            setIsPlaying(!isPlaying);
        }
    };

    return (
        <>
            {/* Music Player Button - Positioned at the top right */}
            <div style={{
                position: 'fixed',
                top: '20px',
                right: '20px',
                zIndex: 10,
            }}>
                <MusicPlayer />
            </div>

            {/* Background Wrapper */}
            <div style={{
                width: '100vw',
                height: '100vh',
                position: 'fixed',
                top: 0,
                left: 0,
                backgroundImage: `url(src/assets/lobby.png)`, // Use backgroundImage and the imported image
                backgroundPosition: 'center',   // Ensure it's centered
                backgroundSize: 'cover',         // Cover the entire area
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                {/* Inner Shadow Overlay */}
                <div style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(42, 26, 26, 0.57)', // Dark overlay to improve readability
                    zIndex: 0,
                }} />

                {/* Lobby Container */}
                <div style={{
                    padding: '20px',
                    position: 'relative',
                    backgroundColor: 'rgba(234, 215, 183, 0.95)', // Slight transparency
                    borderRadius: '8px',
                    border: '2px solid #C19A6B',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px',
                    alignItems: 'center',
                    maxWidth: '500px',
                    zIndex: 1,
                }}>
                    {/* Lobby Name */}
                    <h1 style={{
                        fontFamily: 'Playfair Display',
                        fontSize: '24px',
                        fontWeight: 700,
                        letterSpacing: '0.08em',
                        color: '#2C2C2C',
                        textAlign: 'center',
                    }}>
                        {lobby.name}
                    </h1>

                    {/* Lobby ID */}
                    <h2 style={{
                        fontFamily: 'Courier New',
                        fontSize: '18px',
                        fontWeight: 700,
                        letterSpacing: '0.08em',
                        color: '#5A1A1A',
                        textAlign: 'center',
                    }}>
                        Lobby Code: {lobby.id}
                    </h2>

                    {/* Player List */}
                    <ul style={{
                        listStyleType: 'none',
                        padding: '0',
                        width: '100%',
                        textAlign: 'center',
                    }}>
                        {Array.from(lobby.players, ([id, player]) => (
                            <li key={id} style={{
                                fontFamily: 'IBM Plex Mono',
                                fontSize: '16px',
                                color: '#2C2C2C',
                                padding: '8px 0',
                                borderBottom: '1px solid #C19A6B',
                            }}>
                                {player.username} as {player.role}, {player.ready ? "ready" : "not ready"}
                            </li>
                        ))}
                    </ul>

                    {/* Ready Up Button */}
                    <button 
                        onClick={(e) => {
                            e.preventDefault();
                            onReadyToggle();
                        }}
                        style={{
                            height: '50px',
                            width: '100%',
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
                        READY UP
                    </button>

                    {/* Leave Lobby Button */}
                    <button 
                        onClick={(e) => {
                            e.preventDefault();
                            onLeave();
                        }}
                        style={{
                            height: '50px',
                            width: '100%',
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
                        LEAVE LOBBY
                    </button>
                    
                    <button
                        disabled={!lobby.readyToStart}
                        onClick={(e) => {
                            e.preventDefault()
                            onGo()
                        }}
                        style={{
                            height: '50px',
                            width: '100%',
                            background: lobby.readyToStart? 'linear-gradient(180deg, rgb(70, 200, 65) 0%, rgb(50, 170, 45) 100%)' : '#ccc',
                            border: 'none',
                            borderRadius: '8px',
                            fontFamily: 'Courier New',
                            fontSize: '18px',
                            fontWeight: 700,
                            letterSpacing: '0.09em',
                            color: lobby.readyToStart? '#2A1A1A' : '#666',
                            cursor: 'pointer',
                            transition: 'opacity 0.2s',
                        }}
                    >START GAME</button>... {/* Role Selection */}
                    <div style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        gap: '10px',
                        marginTop: '20px',
                    }}>
                        {Object.values(Roles).map((value, key) => (
                            <button
                                key={key}
                                disabled={lobby.takenRoles.has(value)}
                                onClick={(e) => {
                                    e.preventDefault();
                                    onSwitchRole(value);
                                }}
                                style={{
                                    height: '45px',
                                    width: '120px',
                                    background: lobby.takenRoles.has(value) ? '#ccc' : '#2A1A1A',
                                    border: 'none',
                                    borderRadius: '8px',
                                    fontFamily: 'Courier New',
                                    fontSize: '14px',
                                    fontWeight: 700,
                                    letterSpacing: '0.07em',
                                    color: lobby.takenRoles.has(value) ? '#666' : '#E1B530',
                                    cursor: lobby.takenRoles.has(value) ? 'not-allowed' : 'pointer',
                                    transition: 'opacity 0.2s',
                                }}
                            >
                                {value}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
