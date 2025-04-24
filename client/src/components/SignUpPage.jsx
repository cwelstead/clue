import React, { useState } from "react";
import { Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getAuth, validatePassword } from "firebase/auth";

export function SignUpPage({ handleSignUp }) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }try {
            setLoading(true);
            setError(""); // Clear any previous errors

            const auth = getAuth();
            const status = await validatePassword(auth, password);
            
            if (!status.isValid) {
                // Build error message based on what criteria weren't met
                const errorMessages = [];
                if (status.meetsMinPasswordLength === false) {
                    errorMessages.push("Password requires at least 6 characters");
                }
                if (status.containsLowercaseLetter === false) {
                    errorMessages.push("Missing lowercase letter");
                }
                if (status.containsUppercaseLetter === false) {
                    errorMessages.push("Missing uppercase letter");
                }
                if (status.containsNumericCharacter === false) {
                    errorMessages.push("Missing number");
                }
                
                setError(`Password doesn't meet requirements: ${errorMessages.join(", ")}`);
                return;
            }

            await handleSignUp(email, password);
            // Add a timeout to redirect after showing the success message
            setTimeout(() => {
                navigate("/");
            }, 400);
        } catch (error) {
            // Display the specific error message from Firebase
            setError(error.message || "Failed to create an account");
            setSuccess(""); // Clear any success message if there's an error
        } finally {
            setLoading(false);
        }
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
            {/* Background Image Wrapper with Inner Shadow*/}
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
                {/* Background Image */}
                <img 
                    src="src/assets/kauffman-building.png"
                    alt="background"
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
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
                        backgroundColor: 'rgba(42, 26, 26, 0.57)',
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
                marginTop: '150px',
                zIndex: 1,
            }}>
                Create Account
            </h1>

            {/* Signup Form */}
            <div style={{
                width: '400px',
                marginTop: '24px',
                zIndex: 1,
                padding: '20px',
                backgroundColor: 'rgba(234, 215, 183, 1)',
                backgroundBlendMode: 'overlay',
                borderRadius: '8px',
                border: '2px solid #C19A6B',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                overflow: 'hidden',
            }}>
                {error && <Alert variant="danger">{error}</Alert>}
                
                {/* Email Field */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{
                        fontFamily: 'Courier New',
                        fontSize: '16px',
                        letterSpacing: '0.08em',
                        color: '#2C2C2C',
                    }}>
                    Email
                    </label>
                    <input
                        type="email"
                        placeholder="Enter your email, detective..."
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                </div>
        
                {/* Password Field */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{
                        fontFamily: 'Courier New',
                        fontSize: '16px',
                        letterSpacing: '0.08em',
                        color: '#2C2C2C',
                    }}>
                        Password
                    </label>
                    <input
                        type="password"
                        placeholder="Enter your secret code..."
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
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
                </div>

                {/* Confirm Password Field */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{
                        fontFamily: 'Courier New',
                        fontSize: '16px',
                        letterSpacing: '0.08em',
                        color: '#2C2C2C',
                    }}>
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        placeholder="Confirm your secret code..."
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
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
                </div>

                {/* Sign Up Button */}
                <button 
                    onClick={handleSubmit}
                    disabled={loading}
                    style={{
                        height: '55px',
                        background: '#7F1700',
                        border: 'none',
                        borderRadius: '8px',
                        fontFamily: 'Courier New',
                        fontSize: '18px',
                        fontWeight: 700,
                        letterSpacing: '0.09em',
                        color: '#E1B530',
                        cursor: loading ? 'not-allowed' : 'pointer',
                        opacity: loading ? 0.7 : 1,
                        transition: 'opacity 0.2s',
                    }}
                >
                {loading ? "CREATING ACCOUNT..." : "CREATE ACCOUNT"}
                </button>
                
                {/* Back to Login Link */}
                <div style={{ textAlign: 'center' }}>
                    <button
                        onClick={() => navigate("/login")}
                        style={{
                            background: 'none',
                            border: 'none',
                            fontFamily: 'Courier New',
                            fontSize: '14px',
                            color: '#5A1A1A',
                            textDecoration: 'underline',
                            cursor: 'pointer',
                        }}
                    >
                        Back to Login
                    </button>
                </div>
            </div>

            {/* Seal Image */}
            <img 
                src="src/assets/clue-stamp.png"
                alt="seal"
                style={{
                width: '171.76px',
                height: '171.76px',
                position: 'absolute',
                bottom: '100px',
                right: '200px',
                zIndex: 1,
                }}
            />
        </div>
    );
}
