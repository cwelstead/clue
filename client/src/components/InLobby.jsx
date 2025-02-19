import { socket } from "../socket"

export function InLobby({ lobby, onLeave }) {

    return (
        <>
            <h1 id="lobby-name">{lobby.name}</h1>
            <h1 id="lobby-id">{lobby.id}</h1>
            <h1>{lobby.players.keys()}</h1>
            <button
                onClick={(e) => {
                    e.preventDefault()
                    onLeave()
                }}
            >Leave Lobby</button>
        </>
    )
}