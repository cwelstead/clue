import React from "react";
import LobbyKauffmanClue from "./LobbyKauffmanClue";
import backgroundImage from "/KauffmanLobby.png";
import { SelectLobby } from "../SelectLobby";

export default function LOBBYPage() {
  return (
    <div className="lobby-page-wrapper" style={{ height: '100vh' }}>
      <LobbyKauffmanClue backgroundImage={backgroundImage} solveACase={SelectLobby} />
    </div>
  );
}