import { useEffect, useState } from 'react';
import React from 'react';

export function LoginPage({ handleLogin, handleSignUp }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSignUp, setIsSignUp] = useState(false);
    const [name, setName] = useState('');

    useEffect(() => {
        // Prevent scrolling on the body
        document.body.style.overflow = 'hidden';
        return () => {
            // Clean up the overflow style when the component unmounts
            document.body.style.overflow = '';
        };
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isSignUp) {
            handleSignUp({ name, email, password });
        } else {
            handleLogin({ email, password });
        }
    };

    const toggleMode = () => {
        setIsSignUp(!isSignUp);
        setEmail('');
        setPassword('');
        setName('');
    };

    return (
        <div className="w-full h-screen fixed top-0 left-0 flex flex-col items-center overflow-hidden" style={{ background: '#2A1A1A' }}>
            {/* Background Image Wrapper with Inner Shadow */}
            <div className="absolute w-full h-full z-0 overflow-hidden" style={{ boxShadow: 'inset 0px 0px 100px 100px rgba(0, 0, 0, 0.25)' }}>
                {/* Background Image */}
                <img 
                    src="src/assets/kauffman-building.png"
                    alt="background"
                    className="w-full h-full object-cover"
                />

                {/* Overlay with #2A1A1A at 57% opacity */}
                <div 
                    className="absolute top-0 left-0 w-full h-full z-1"
                    style={{ backgroundColor: 'rgba(42, 26, 26, 0.57)' }}
                />
            </div>

            {/* Title */}
            <h1 className="text-5xl font-bold text-center mt-48 z-10 tracking-wider" style={{ fontFamily: 'Playfair Display', color: '#F8F5E3' }}>
                Kauffman Clue
            </h1>

            {/* Login Form */}
            <div className="w-96 bg-white bg-opacity-90 rounded-lg p-6 mt-6 z-10 shadow-lg">
                <h2 className="text-2xl font-semibold mb-6 text-center">
                    {isSignUp ? 'Sign Up' : 'Log In'}
                </h2>
                
                <form onSubmit={handleSubmit}>
                    {isSignUp && (
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                                Full Name
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="name"
                                type="text"
                                placeholder="Enter your name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                    )}
                    
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            id="password"
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    
                    <div className="flex items-center justify-between">
                        <button
                            className="w-full bg-amber-800 hover:bg-amber-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            {isSignUp ? 'Sign Up' : 'Log In'}
                        </button>
                    </div>
                </form>
                
                <div className="text-center mt-4">
                    <button
                        className="text-blue-600 hover:text-blue-800 text-sm"
                        onClick={toggleMode}
                    >
                        {isSignUp 
                            ? 'Already have an account? Log in' 
                            : "Don't have an account? Sign up"}
                    </button>
                </div>
            </div>

            {/* Seal Image */}
            <img 
                src="src/assets/clue-stamp.png"
                alt="seal"
                className="w-40 h-40 absolute bottom-16 right-16 z-10"
            />
        </div>
    );
}