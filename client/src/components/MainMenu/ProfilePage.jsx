import './ProfilePage.css';
import React, { useState } from 'react';

const ProfilePage = ({
  user,  // This will have user.username and other user properties
  setNavState,
  stats = {
    correctAccusations: 0,
    gamesPlayed: 0,
    totalSpacesMoved: 0
  } 
  }) => {
  // Default card image - can be updated based on user preferences
  const [profileCard, setProfileCard] = useState("src/assets/suspectCards/Theresa.svg");

  const handleBack = () => {
    setNavState("");
  };

  const handleJoinGame = () => {
    setNavState("lobby-select");
  };

  //Below I want to create a back button to navigate back to the "Navigation Page" the sylying is already made
  // I also want the card image shown to update based on the specific user and what card is their most played
  // The Join a game button should navigate the user to SelectLobby
  // The username of the user should be updated in the Username box
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
              <div className="username-label">Username</div>
              <input 
                type="text" 
                className="username-input"
                value={user?.username || "Guest"}
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
