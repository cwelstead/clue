import React, { useState } from "react";
import LobbyKauffmanClue from "./LobbyKauffmanClue";
import backgroundImage from "../../assets/kauffman-building.png";
import { SelectLobby } from "../SelectLobby";
import ProfilePage from "../ProfilePage/ProfilePage";

export default function LOBBYPage({ onLobbyJoin, joinFail, setJoinFail }) {
  const [navState, setNavState] = useState("")

  if (navState) {
    return (
      <div className="lobby-page-wrapper" style={{ height: '100vh' }}>
        { navState === "instructions" &&
          <div></div>
        }
        { navState === "player-profile" &&
          <ProfilePage setNavState={setNavState} />
        }
        { navState === "lobby-select" &&
          <SelectLobby onLobbyJoin={onLobbyJoin} setNavState={setNavState} joinFail={joinFail} setJoinFail={setJoinFail} />
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