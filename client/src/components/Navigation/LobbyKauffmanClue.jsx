import React from "react";
import { Button } from "./LobbyComponents";
import { SelectLobby } from "../SelectLobby";
import KauffmanClueInstructions from "../KauffmanClueInstructions";

export default function LobbyKauffmanClue({ backgroundImage, setNavState }) {
  return (
    <div
      className="lobby-wrapper"
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
      }}
    >
      {/* Background image layer */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        zIndex: 1,
      }} />
      
      {/* Overlay layer */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(42, 26, 26, 0.55)',
        zIndex: 2,
      }} />
      
      {/* Content layer */}
      <div style={{
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        zIndex: 3,
      }}>
        <div className="lobby-content" style={{
          padding: '3rem',
          width: '100%',
          maxWidth: '450px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
          <h1 className="lobby-title font-playfair" style={{
            fontSize: '2.8rem',
            color: 'white',
            marginBottom: '0.5rem',
            textAlign: 'center',
            fontFamily: '"Playfair Display", serif',
            fontWeight: 'bold'
          }}>
            Kauffman Clue
          </h1>
          
          <p className="lobby-subtext font-inter" style={{
            fontSize: '1.1rem',
            color: 'white',
            marginBottom: '3rem',
            textAlign: 'center'
          }}>
            Gather your friends & solve the mystery!
          </p>
          
          <div className="lobby-button-group" style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            width: '100%',
          }}>
            <KauffmanClueInstructions/>
            <button
              className="btn-dark"
              style={{
                backgroundColor: 'rgba(43, 43, 43, 0.95)',
                border: '2px solid white',
                borderRadius: '10px',
                height: '82px',
                fontSize: '23px',
                fontWeight: '400',
                marginBottom: '12px',
                width: '100%',
                color: 'white',
              }}
              onClick={(e) => {
                e.preventDefault()
                setNavState("player-profile")
              }}
            >
              Player Profile
            </button>
            <button
              className="btn-yellow"
              style={{
                backgroundColor: '#d4a017',
                border: '2px solid white',
                borderRadius: '10px',
                height: '100px',
                fontSize: '27px',
                fontWeight: '600',
                width: '100%',
                color: 'white',
              }}
              onClick={(e) => {
                e.preventDefault()
                setNavState("lobby-select")
              }}
            >
              Solve A Case
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}