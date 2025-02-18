import { useState } from 'react'
import { useSocketIO } from 'react-use-websocket'

export function SelectLobby({ user, onLobbyJoin }) {
    const WS_URL = 'ws://127.0.0.1:5500'
    const socket = useSocketIO(WS_URL)

    const [lobbyID, setLobbyID] = useState("")
    const createLobby = () => {
        // Create the lobby
        const createdID = "123456"

        // Join the created lobby
        onLobbyJoin(createdID)
    }

    return (
        <>
            <h1>Private Lobby</h1>
            <form
                onSubmit={(e) => {
                    e.preventDefault()
                    onLobbyJoin(lobbyID)
                }}
            >
                <input
                    type="text"
                    value={lobbyID}
                    maxLength="6"
                    placeholder="Enter lobby code"
                    onChange={(e) => setLobbyID(e.target.value)}
                    required/>
                <button type="submit">Join</button>
            </form>
            <button
                onClick={(e) => {
                    e.preventDefault()
                    createLobby()
                }}
            >Create Private Lobby</button>
        </>
    )
}