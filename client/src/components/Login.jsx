import { useState } from "react";

export function Login({ defaultUsername = '', defaultPassword = '', handleLogin, handleSignUp }) {
    const [username, setUsername] = useState(defaultUsername);
    const [password, setPassword] = useState(defaultPassword);
    
    return (
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
            }}>
  
            {/* Username Field */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{
                    fontFamily: 'Courier New',
                    fontSize: '16px',
                    letterSpacing: '0.08em',
                    color: '#2C2C2C',
                }}>
                Username
                </label>
                <input
                    type="text"
                    placeholder="Enter your name, detective..."
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
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
                    placeholder="Secret Code..."
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

            {/* Login Button */}
            <button 
                onClick={(e) => {
                    e.preventDefault()
                    handleLogin(username, password)
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
            LOGIN
            </button>
    
            {/* Sign Up Button */}
            <button 
                onClick={(e) => {
                    e.preventDefault()
                    handleSignUp()
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
                SIGN UP
            </button>
        </div>
    );
};