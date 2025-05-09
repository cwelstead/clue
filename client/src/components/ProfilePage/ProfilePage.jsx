import './ProfilePage.css';
import React, { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { db } from '../../firebase.jsx';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';

const ProfilePage = ({ user, setNavState }) => {
  const [profileCard, setProfileCard] = useState('src/assets/suspectCards/Theresa.svg');
  const [stats, setStats] = useState({ correctAccusations: 0, gamesPlayed: 0, totalSpacesMoved: 0 });
  const [loading, setLoading] = useState(true);

  // Navigation handlers
  const handleBack = () => setNavState('');
  const handleJoinGame = () => setNavState('lobby-select');

  useEffect(() => {
    const uid = user?.uid || getAuth().currentUser?.uid;
    if (!uid) return;

    const userRef = doc(db, 'users', uid);

    // Listen for real-time updates
    const unsubscribe = onSnapshot(
      userRef,
      (snap) => {
        if (snap.exists()) {
          const data = snap.data().stats;
          setStats({
            correctAccusations: data.correctAccusations || 0,
            gamesPlayed: data.gamesPlayed || 0,
            totalSpacesMoved: data.totalSpacesMoved || 0,
          });
        } else {
          setStats({ correctAccusations: 0, gamesPlayed: 0, totalSpacesMoved: 0 });
        }
        setLoading(false);
      },
      (err) => {
        console.error('Error fetching stats:', err);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [user]);

  if (loading) {
    return <div className="profile-page">Loading stats...</div>;
  }

  return (
    <div className="profile-page">
      <div className="deep-color-overlay">
        <button className="back-button" onClick={handleBack}>
          Back
        </button>

        <div className="main-content">
          <div className="profile-card">
            <div className="profile-image-container">
              <img
                src={profileCard}
                alt="Profile"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </div>
          </div>

          <div className="stats-container">
            <div className="username-frame">
              <div className="username-label">{getAuth().currentUser?.email}</div>
              <input
                type="text"
                className="username-input"
                value={user?.username || 'Guest'}
                readOnly
              />
            </div>

            <div className="statistics-frame">
              <div className="statistics-content">
                <h2>Statistics</h2>

                <div className="stat-row">
                  <span>Correct Accusations</span>
                  <span className="stat-value">{stats.correctAccusations}</span>
                </div>
                <div className="stat-row">
                  <span>Games Played</span>
                  <span className="stat-value">{stats.gamesPlayed}</span>
                </div>
                <div className="stat-row">
                  <span>Total Spaces Moved</span>
                  <span className="stat-value">{stats.totalSpacesMoved}</span>
                </div>
              </div>
            </div>

            <button className="join-game-button" onClick={handleJoinGame}>
              Join A Game
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
