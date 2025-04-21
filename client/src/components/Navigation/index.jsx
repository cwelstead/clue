import React, { useState } from "react";
import LobbyKauffmanClue from "./LobbyKauffmanClue";
import backgroundImage from "/KauffmanLobby.png";
import { SelectLobby } from "../SelectLobby";

export default function LOBBYPage({ user, onLobbyJoin }) {
  const [navState, setNavState] = useState("")

  if (navState) {
    return (
      <div className="lobby-page-wrapper" style={{ height: '100vh' }}>
        { navState === "instructions" &&
          <div></div>
        }
        { navState === "player-profile" &&
          <div></div>
        }
        { navState === "lobby-select" &&
          <SelectLobby user={user} onLobbyJoin={onLobbyJoin} setNavState={setNavState} />
        }
      </div>
    )
  }
  else {
    return (
      <div className="lobby-page-wrapper" style={{ height: '100vh' }}>
        <LobbyKauffmanClue
          backgroundImage={backgroundImage}
          setNavState={setNavState} />
      </div>
    );
  }
}