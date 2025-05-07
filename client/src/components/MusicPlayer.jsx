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
            <audio ref={audioRef} loop src="src/assets/sfx/ominous-music-background.mp3">
                Your browser does not support the audio element.
            </audio>

            {/* Toggle Music Button */}
            <button onClick={toggleMusic} style={{ position: "absolute", top: 10, right: 10 }}>
                {isPlaying ? "Pause Music" : "Play Music"}
            </button>
        </>
    );
}
