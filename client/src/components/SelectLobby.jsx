import { useState } from 'react'
import { socket } from '../socket.js'

export function SelectLobby({ user, onLobbyJoin }) {

    const [lobbyID, setLobbyID] = useState("")
    const createLobby = () => {
        socket.emit('lobby-create', {
            name: "Test Lobby", // does a lobby need a name?
        })
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