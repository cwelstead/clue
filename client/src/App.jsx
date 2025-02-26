import { useState } from 'react'
import './App.css'
import { SelectLobby } from './components/SelectLobby.jsx'
import { InLobby } from './components/InLobby.jsx'
import { Login } from './components/Login.jsx'
import { socket } from './socket.js'
import { useEffect } from 'react'
import { Roles } from '../../classes/Lobby.js'
import { BetterLogin } from './components/BetterLogin.jsx'

/*
 * THIS FILE IS FOR CLIENT-SIDE LOGIC
 * 
 * Authors: Cole Welstead
*/

function App() {
    // Holds the values for client data
    const [user, setUser] = useState("")
    const [lobby, setLobby] = useState("")
    // const [gameState, setGameState]

    // Placeholder function until authentication is implemented
    function loginWithUsername(username) {
        console.log(`Attempting login with username ${username} and ID ${socket.id}`)
        socket.emit('login', {
        name: username,
        id: socket.id,
        })
        setUser({ name: username, id: socket.id })
    }

    // Functions to handle buttons from the SelectLobby component
    function joinLobbyWithID(id) {
        console.log(`Attempting to join lobby ${id}`)
        socket.emit('lobby-connect', {
        username: user.name,
        userID: user.id,
        lobbyID: id,
        })
    }

    // Functions to handle buttons from the InLobby component
    function readyToggle() {
        socket.emit('ready-toggle')
    }
    function switchRole(role) {
        socket.emit('switch-role', ({
            id: socket.id, 
            role: role
        }))
    }
    function leaveLobby() {
        socket.emit('lobby-disconnect', socket.id)
        setLobby("")
    }

    // Essential functions go here, such as receiving socket messages
    useEffect(() => {
        socket.on('lobby-create-success', (id) => {
        joinLobbyWithID(id)
        })
        socket.on('lobby-join-success', ({ name, id, players, takenRoles }) => {
        console.log(`Lobby joined: ${name} with ID ${id}`)
        setLobby({
            name: name,
            id: id,
            players: new Map(JSON.parse(players)),
            takenRoles: new Set(JSON.parse(takenRoles)),
        })
        })
        socket.on('lobby-join-fail', (lobbyID) => {
        console.warn(`Failed to join lobby ${lobbyID}`)
        })
        socket.on('lobby-update', ({ players, takenRoles }) => {
        setLobby({
            name: lobby.name,
            id: lobby.id,
            players: new Map(JSON.parse(players)),
            takenRoles: new Set(JSON.parse(takenRoles)),
        })
        })
    })

    // Front-end code, returns the correct screen based on gathered data
    if (user) {
        if (lobby) {
        return (
            <InLobby lobby={lobby} onReadyToggle={readyToggle} onSwitchRole={switchRole} onLeave={leaveLobby} />
        )
        } else {
        return (
            <SelectLobby user={user} onLobbyJoin={joinLobbyWithID} />
        )
        }
    } else {
        return (
            <BetterLogin />
        // <Login onLogin={loginWithUsername} />
        )
    }
}

export default App