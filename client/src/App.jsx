import { useState } from 'react'
import './App.css'
import { SelectLobby } from './components/SelectLobby.jsx'
import { InLobby } from './components/InLobby.jsx'
import { socket } from './socket.js'
import { useEffect } from 'react'
import { Roles } from '../../classes/Lobby.js'
import { LoginPage } from './components/LoginPage.jsx'
import { InGame } from './components/InGame.jsx'

/*
 * THIS FILE IS FOR CLIENT-SIDE LOGIC
 * 
 * Authors: Cole Welstead
*/

function App() {
    // Holds the values for client data
    const [user, setUser] = useState("")
    const [lobby, setLobby] = useState("")
    const [gameState, setGameState] = useState(null)

    // Placeholder function until authentication is implemented
    function onLogin(username, password) {
        console.log(`Attempting login with username ${username} and ID ${socket.id}`)
        socket.emit('login', {
            name: username,
            id: socket.id,
        })
        setUser({ name: username, id: socket.id })
    }

    function onSignUp() {
        console.log("Sign up button clicked")
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
    function startGame() {
        socket.emit('game-start')
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
                readyToStart: false
            })
        })

        socket.on('lobby-join-fail', (lobbyID) => {
            console.warn(`Failed to join lobby ${lobbyID}`)
        })

        socket.on('lobby-update', ({ players, takenRoles, readyToStart }) => {
            setLobby({
                name: lobby.name,
                id: lobby.id,
                players: new Map(JSON.parse(players)),
                takenRoles: new Set(JSON.parse(takenRoles)),
                readyToStart: readyToStart,
            })
        })

        socket.on('game-start-success', (game) => {
            setGameState(game)
        })
    })

    // Front-end code, returns the correct screen based on gathered data
    if (user) {
        if (lobby) {
            if (gameState) {
                return (
                    <InGame />
                )
            } else {
                return (
                    <InLobby
                        lobby={lobby}
                        onReadyToggle={readyToggle}
                        onSwitchRole={switchRole}
                        onLeave={leaveLobby}
                        onGo={startGame} />
                )
            }
        } else {
            return (
                <SelectLobby user={user} onLobbyJoin={joinLobbyWithID} />
            )
        }
    } else {
        return (
            <LoginPage handleLogin={onLogin} handleSignUp={onSignUp}/>
        )
    }
}

export default App