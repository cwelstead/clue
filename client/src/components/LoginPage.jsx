import { useEffect } from 'react';
import React from 'react';
import { Login } from './Login';
import { useNavigate } from "react-router-dom";



export function LoginPage({handleLogin}) {
    const navigate = useNavigate();
    const redirectToSignup = () => {
        navigate("/signup");
    };
    useEffect(() => {
        // Prevent scrolling on the body
        document.body.style.overflow = 'hidden';
        return () => {
            // Clean up the overflow style when the component unmounts
            document.body.style.overflow = '';
        };
    }, []);

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
            overflow: 'hidden', // Ensure no overflow within the component
        }}>
            {/* Background Image Wrapper with Inner Shadow*/}
            <div
                style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                zIndex: 0,
                boxShadow: 'inset 0px 0px 100px 100px rgba(0, 0, 0, 0.25)', // Inner shadow
                overflow: 'hidden' // Ensures shadow applies correctly
                }}
            >
                {/* Background Image */}
                <img 
                    src="src/assets/kauffman-building.png"
                    alt="background"
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover', // Changed from fill to cover
                    }}
                />

                {/* Overlay with #2A1A1A at 57% opacity */}
                <div 
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(42, 26, 26, 0.57)', // Converted to RGBA
                        zIndex: 1
                    }}
                />
            </div>

            {/* Title */}
            <h1 style={{
                fontFamily: 'Playfair Display',
                fontSize: '48px',
                fontWeight: 700,
                letterSpacing: '0.48px',
                color: '#F8F5E3',
                marginTop: '202px',
                zIndex: 1,
            }}>
                Kauffman Clue
            </h1>

            {/* Login Component */}
            <div style={{
                width: '400px',
                marginTop: '24px',
                zIndex: 1,
                position: 'relative',
            }}>
                <Login handleLogin={handleLogin} redirectToSignup={redirectToSignup} />
            </div>

            {/* Seal Image */}
            <img 
                src="src/assets/clue-stamp.png"
                alt="seal"
                style={{
                width: '171.76px',
                height: '171.76px',
                position: 'relative',
                bottom: '100px',
                left: '200px',
                zIndex: 1,
                }}
            />
        </div>
    );
};