import { useState } from 'react'
import useWebSocket from 'react-use-websocket'

export function SelectLobby({ user }) {
    const WS_URL = 'http://127.0.0.1:5500'
    const { sendJsonMessage } = useWebSocket(WS_URL, {
        share: true,
    })

    const [lobbyID, setLobbyID] = useState("")
    const joinLobby = (lobbyID) => {

    }
    const createLobby = () => {
        // Create the lobby
        const createdID = "123456"

        // Join the created lobby
        joinLobby(createdID)
    }

    return (
        <>
            <h1>Private Lobby</h1>
            <form
                onSubmit={(e) => {
                    e.preventDefault()
                    joinLobby(lobbyID)
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