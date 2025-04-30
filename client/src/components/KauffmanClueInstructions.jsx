import React, { useState } from "react";
import "../components/styles/font.css";
import { Button } from "./Navigation/LobbyComponents";

export default function KauffmanClueInstructions() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <div>
      <Button 
        onClick={openModal}
        className="btn-dark"
        style={{
          backgroundColor: 'rgba(43, 43, 43, 0.95)',
          border: '2px solid white',
          borderRadius: '10px',
          height: '82px',
          fontSize: '23px',
          fontWeight: '400',
          color: 'white',
          marginBottom: '12px',
          width: '100%'
        }}
      >
        Game Instructions
      </Button>

      {/* Modal Overlay with blur effect */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-sm"
          onClick={handleOverlayClick}
        >
        {/* Modal Content with explicit styling */}
          <div 
            className="bg-white rounded-lg shadow-xl max-w-4xl max-h-[90vh] w-full overflow-y-auto m-4"
            style={{
              backgroundColor: '#FAF9F6',
              borderRadius: '0.5rem',
              boxShadow:
                '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
              maxWidth: '56rem',
              maxHeight: '90vh',
              width: '60%',
              minWidth: '410px',
              overflow: 'auto',
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 60,
            }}
          >
            {/* Close button */}
            <div className="flex justify-end p-2" style={{ display: 'flex', justifyContent: 'flex-end', padding: '0.5rem'}}>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
                style={{ color: '#e1b530' }}
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ height: '1.5rem', width: '1.5rem' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Instructions Content */}
            <div className="p-6 text-#4d4844 font-[Inter]" style={{ textAlign: 'left', margin: '1.5rem', color: '#4d4844'}}>
              <h1 className="text-2xl font-bold mb-5 font-[Bricolage Grotesque]" style={{ color: '#1E272C' }}>Kauffman Clue</h1>
              <p className="italic mb-8 text-lg" style={{ color: '#7f0000' }}>For 3–6 players | Ages 8 and up</p>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 font-[Bricolage Grotesque]" style={{ color: '#343a40' }}>Objective</h2>
                <p className="mb-4">
                  A crime has occurred in the Kauffman Residence Hall. The security guard has been found dead under
                  mysterious circumstances. 
                  <p>Your task is to determine:</p>
                </p>
                <ul className="list-disc ml-8 mb-4 space-y-2">
                  <li>Who committed the crime?</li>
                  <li>In which Room did it occur?</li>
                  <li>With what Weapon?</li>
                </ul>
                <p className="mt-4">The first player to correctly identify all three wins the game.</p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 font-[Bricolage Grotesque]" style={{ color: '#343a40' }}>Game Overview</h2>
                <p>
                  In Kauffman Clue, all setup is handled for you by the digital system. This includes
                  shuffling and dealing cards, placing tokens, and tracking movement. Your role is to
                  collect clues, make logical deductions, and identify the correct combination of Suspect,
                  Room, and Weapon.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 font-[Bricolage Grotesque]" style={{ color: '#343a40' }}>Gameplay</h2>
                <p className="font-semibold mb-3">Turn Sequence:</p>
                <ol className="list-decimal ml-8 mb-4 space-y-3">
                  <li>
                    <strong className="font-bold">Roll the Die:</strong> Click the <em>"Roll Dice"</em> button to determine your
                    movement allowance.
                  </li>
                  <li>
                    <strong className="font-bold">Move Your Token:</strong> Navigate toward a Room following the movement rules
                    enforced by the system.
                  </li>
                  <li>
                    <strong className="font-bold">Make a Suggestion:</strong> If you end your movement in a Room, click
                    <em> "Make Suggestion"</em> and select a Suspect and a Weapon. The Room you are in is
                    automatically part of the Suggestion.
                  </li>
                </ol>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 font-[Bricolage Grotesque]" style={{ color: '#343a40' }}>Suggestions</h2>
                <ul className="list-disc ml-8 mb-4 space-y-2">
                  <li>The system moves the selected Suspect and Weapon to the Room.</li>
                  <li>Players try to disprove the Suggestion in turn order.</li>
                  <li>
                    If a player can disprove it, a pop-up shows one matching card and who revealed it.
                  </li>
                  <li>If no one can disprove, it may be correct.</li>
                </ul>
                <p className="mt-4">Only one Suggestion may be made per Room entry.</p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 font-[Bricolage Grotesque]" style={{ color: '#343a40' }}>Detective Notebook</h2>
                <p>
                  Use the digital notebook (top menu) to track what you've seen, who showed it, and
                  eliminate possibilities.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 font-[Bricolage Grotesque]" style={{ color: '#343a40' }}>Accusation</h2>
                <p className="mb-4">
                  If you believe you know the three cards in the Case File, click <em>"Make Accusation"</em>
                  and name any Suspect, Weapon, and Room.
                </p>
                <ul className="list-disc ml-8 mb-4 space-y-2">
                  <li>If correct: You win and the mystery is solved.</li>
                  <li>
                    If incorrect: You're out of the running to win but continue to play and reveal cards.
                  </li>
                </ul>
                <p className="mt-4">Each player may only make one Accusation per game.</p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 font-[Bricolage Grotesque]" style={{ color: '#343a40' }}>Winning the Game</h2>
                <p>
                  The game ends immediately when a player makes a correct Accusation. The solution is
                  revealed to all.
                </p>
              </section>

              <section className="mb-4">
                <h2 className="text-2xl font-semibold mb-4 font-[Bricolage Grotesque]" style={{ color: '#343a40' }}>Additional Rules</h2>
                <ul className="list-disc ml-8 mb-4 space-y-2">
                  <li>You may include your own cards in a Suggestion.</li>
                  <li>One Suggestion per Room visit.</li>
                  <li>You may Suggest and Accuse on the same turn.</li>
                  <li>Multiple Suspects and Weapons can share a Room.</li>
                  <li>
                    If moved by another's Suggestion, you may Suggest again in that Room without moving.
                  </li>
                </ul>
              </section>
            </div>
          </div>
        </div>
      )}
      
      {/* Styles for fonts and other customizations */}
      <style>{`
        @import url('../pages/styles/font.css');
        
        h1, h2 {
          font-family: 'Bricolage Grotesque', serif;
          font-weight: 600;
        }
        
        body, p, li, ul, ol {
          font-family: 'Inter', sans-serif;
        }
        
        /* Force left alignment and proper margins */
        .list-disc {
          margin-left: 2rem !important;
        }
        
        .list-decimal {
          margin-left: 2rem !important;
        }
      `}</style>
    </div>
  );
}