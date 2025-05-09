import { useState, useRef } from "react";

export function MusicPlayer() {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);

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
            <button onClick={toggleMusic} style={{ backgroundColor: '#c19a6b', position: "absolute", top: 10, right: 10, fontFamily: 'Courier New', color: "#fff" }}>
                {isPlaying ? "⏸" : "▶"}
            </button>
        </>
    );
}
