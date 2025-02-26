import { useEffect } from 'react';
import React from 'react';

export function BetterLogin() {
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
          src="https://dashboard.codeparrot.ai/api/image/Z7OjPjO_YEiK21yG/image-8.png"
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
        <LoginComponent defaultUsername="" defaultPassword="" />
      </div>

      {/* Seal Image */}
      <img 
        src="https://dashboard.codeparrot.ai/api/image/Z7OjPjO_YEiK21yG/adobe-ex.png"
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

const LoginComponent = ({ defaultUsername = '', defaultPassword = '' }) => {
  const [username, setUsername] = React.useState(defaultUsername);
  const [password, setPassword] = React.useState(defaultPassword);

  const handleLogin = () => {
    console.log('Login clicked:', { username, password });
  };

  const handleSignUp = () => {
    console.log('Sign up clicked');
  };

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
        onClick={handleLogin}
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
        onClick={handleSignUp}
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