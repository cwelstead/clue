import { socket } from "../socket"
import { Roles } from "../../../classes/Lobby"

export function InLobby({ lobby, onReadyToggle, onSwitchRole, onLeave }) {

    return (
        <>
            <h1 id="lobby-name">{lobby.name}</h1>
            <h1 id="lobby-id">{lobby.id}</h1>
            <ul>
                {Array.from(lobby.players, ([id, player]) => (
                    <li key={id}>
                        {player.username} as {player.role}, {player.ready? "ready" : "not ready"}
                    </li>
                ))}
            </ul>
            <button
                onClick={(e) => {
                    e.preventDefault()
                    onReadyToggle()
                }}
            >Ready Up</button>
            <button
                onClick={(e) => {
                    e.preventDefault()
                    onLeave()
                }}
            >Leave Lobby</button>

            <br></br>
            <br></br>
            {Object.values(Roles).map((value, key) => (
                <button
                    key={key}
                    disabled={lobby.takenRoles.has(value)}
                    onClick={(e) => {
                        e.preventDefault()
                        onSwitchRole(value)
                    }}>
                    {value}
                </button>
            ))}
        </>
    )
}