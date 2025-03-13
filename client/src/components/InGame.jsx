import { useEffect } from "react";

export function InGame() {
    useEffect(() => {
            // Prevent scrolling on the body
            document.body.style.overflow = 'hidden';
            return () => {
                // Clean up the overflow style when the component unmounts
                document.body.style.overflow = '';
            };
    }, []);

    return (
        <div
        style={{
            width: '100vw',
            height: '100vh',
            position: 'fixed',
            top: 0,
            left: 0,
            background: '#2A1A1A',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            overflow: 'hidden', // Ensure no overflow within the component
        }}
        >
            {/* Background Image */}
            <img 
                src="src/assets/game-example.svg"
                alt="background"
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'fill', // Changed from fill to cover
                }}
            />
        </div>
    )
}