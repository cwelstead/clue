import { useState, useRef } from "react";
import { socket } from "../socket"
import { Roles } from "../../../classes/Lobby"

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
            {/* Background Music */}
            <audio ref={audioRef} loop>
                <source src="/ominous-music-background.mp3" type="audio/mp3" />
                Your browser does not support the audio element.
            </audio>

            {/* Toggle Music Button */}
            <button onClick={toggleMusic} style={{ position: "absolute", top: 10, right: 10 }}>
                {isPlaying ? "Pause Music" : "Play Music"}
            </button>

            <h1 id="lobby-name">{lobby.name}</h1>
            <h1 id="lobby-id">{lobby.id}</h1>
            <ul>
                {Array.from(lobby.players, ([id, player]) => (
                    <li key={id}>
                        {player.username} as {player.role}, {player.ready? "ready" : "not ready"}
                    </li>
                ))}
            </ul>
            <button
                onClick={(e) => {
                    e.preventDefault()
                    onReadyToggle()
                }}
            >Ready Up</button>
            <button
                onClick={(e) => {
                    e.preventDefault()
                    onLeave()
                }}
            >Leave Lobby</button>

            <br></br>
            <br></br>
            {Object.values(Roles).map((value, key) => (
                <button
                    key={key}
                    disabled={lobby.takenRoles.has(value)}
                    onClick={(e) => {
                        e.preventDefault()
                        onSwitchRole(value)
                    }}>
                    {value}
                </button>
            ))}
            <br></br>
            <br></br>
            <button
                disabled={!lobby.readyToStart}
                onClick={(e) => {
                    e.preventDefault()
                    onGo()
                }}
            >Go</button>
        </>
    )
}