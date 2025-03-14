import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function SignUp({ handleSignUp }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");

        // Validate input
        if (!email || !email.includes('@') || !email.includes('.')) {
            setError("Please enter a valid email address");
            return;
        }
        
        if (!password || password.length < 6) {
            setError("Password must be at least 6 characters");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        // Call signup function
        handleSignUp(email, password);
    };

    return (
        <div className="signup-container" style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            padding: '20px',
            backgroundColor: '#333',
            color: '#fff'
        }}>
            <h2 style={{ marginBottom: '20px', color: '#E1B530' }}>Create Account</h2>
            
            {error && <div style={{ color: 'red', marginBottom: '15px' }}>{error}</div>}
            
            <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '400px' }}>
                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="email" style={{ display: 'block', marginBottom: '5px' }}>Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={{
                            width: '100%',
                            padding: '10px',
                            borderRadius: '5px',
                            border: '1px solid #555',
                            backgroundColor: '#444',
                            color: '#fff'
                        }}
                    />
                </div>
                
                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="password" style={{ display: 'block', marginBottom: '5px' }}>Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{
                            width: '100%',
                            padding: '10px',
                            borderRadius: '5px',
                            border: '1px solid #555',
                            backgroundColor: '#444',
                            color: '#fff'
                        }}
                    />
                </div>
                
                <div style={{ marginBottom: '20px' }}>
                    <label htmlFor="confirmPassword" style={{ display: 'block', marginBottom: '5px' }}>Confirm Password</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        style={{
                            width: '100%',
                            padding: '10px',
                            borderRadius: '5px',
                            border: '1px solid #555',
                            backgroundColor: '#444',
                            color: '#fff'
                        }}
                    />
                </div>
                
                <button
                    type="submit"
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
                        marginBottom: '15px'
                    }}
                >
                    CREATE ACCOUNT
                </button>
                
                <div style={{ textAlign: 'center' }}>
                    <button
                        type="button"
                        onClick={() => navigate("/")}
                        style={{
                            background: 'none',
                            border: 'none',
                            color: '#E1B530',
                            textDecoration: 'underline',
                            cursor: 'pointer',
                            fontSize: '14px'
                        }}
                    >
                        Already have an account? Sign in
                    </button>
                </div>
            </form>
        </div>
    );
}