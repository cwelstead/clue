// AlertPopup.jsx
import React, { useEffect } from "react";

/**
 * Props expected from parent
 * --------------------------------------------------------------
 * • onConfirm : () => void             — OK‑button handler
 * • refuter   : { role:string } | null — player who showed a card (null ⇒ nobody)
 * • cardImage : string | undefined     — ONLY sent to the suggesting player
 * • sourceID  : string                 — id of the player who made the suggestion
 * • myID      : string                 — id for *this* client
 */
const AlertPopup = ({
  onConfirm,
  refuter = null,
  cardImage,
}) => {
  /* freeze background scroll while popup is open */
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  /* logic */
  const isSource = true;
  const refuterName = (refuter ? refuter.role : "NOBODY").toUpperCase();

  /* PNG exported from Figma, e.g. src/assets/shareBackgrounds/BOB.png */
  const outerBg = {
    backgroundImage: `url("./src/assets/shareBackgrounds/${refuterName}.png")`,
    backgroundSize: "cover",
    backgroundPosition: "center"
  };

  /* styles */
  const overlay = {
    position: "fixed",
    inset: 0,
    background: "rgba(42,26,26,0.82)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000
  };

  const cardShell = {
    width: 339,
    height: 540,
    borderRadius: 20,
    boxShadow: "0 8px 16px rgba(0,0,0,.5)",
    padding: 6,
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    ...outerBg
  };

  const innerCard = {
    marginTop: 11,
    width: 306,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const btn = {
    marginTop: 20,
    background: "#FFFFFF",
    color: "#000",
    border: "none",
    borderRadius: 4,
    padding: "10px 36px",
    fontSize: 16,
    fontWeight: "bold",
    cursor: "pointer",
    letterSpacing: 0.5,
    boxShadow: "0 2px 6px rgba(0,0,0,.25)",
    transition: "transform .15s ease"
  };

  const cardImageStyle = {
    width: "100%",
    objectFit: "contain"
  };

  console.log("Card image path:", cardImage); // For debugging
  console.log("Is source player:", isSource); // For debugging

  if (isSource) {
    console.log("%cSHOW CARD", "color:limegreen", { cardImage });
  }
  /* render */
  return (
    <div style={overlay}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        {/* outer gradient frame */}
        <div style={cardShell}>
          {/* inner panel: card image only for suggestor */}
          <div style={innerCard}>
            {isSource && cardImage ? (
              <img
                src={cardImage}
                alt="Card shown to disprove"
                style={cardImageStyle}
              />
            ) : null}
          </div>
        </div>

        {/* OK button */}
        <button
          style={btn}
          onClick={onConfirm}
          onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.05)")}
          onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default AlertPopup;