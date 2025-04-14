import { useState } from 'react'
import './App.css'
import { SelectLobby } from './components/SelectLobby.jsx'
import { InLobby } from './components/InLobby.jsx'
import { socket } from './socket.js'
import { useEffect } from 'react'
import { Roles } from '../../classes/Lobby.js'
import { LoginPage } from './components/LoginPage.jsx'
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { InGame } from './components/InGame.jsx'
import GameState from "./components/GameState/GameState.jsx"

/*
 * THIS FILE IS FOR CLIENT-SIDE LOGIC
*/

function App() {
    // Holds the values for client data
    const [user, setUser] = useState("")
    const [lobby, setLobby] = useState("")
    const [playerPositions, setPlayerPositions] = useState(null)

    function onLogin(email, password) {
        console.log(`Attempting login with username ${email} and ID ${socket.id}`);
    
        const auth = getAuth();
    
        // Functions to handle user authentication
        signInWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                const user = userCredential.user;
                const token = await user.getIdToken(); // Get Firebase token
    
                // Send token to backend for validation
                fetch("http://localhost:8080/authenticate", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({ userID: socket.id }),
                })
                    .then(response => response.json())
                    .then(data => {
                        if (data.success) {
                            console.log("User authenticated with backend");
                            socket.emit("login", {
                                name: email,
                                id: socket.id,
                            });
                            setUser({ name: email, id: socket.id });
                        } else {
                            console.error("Authentication failed on backend:", data.message);
                        }
                    })
                    .catch(error => console.error("Error sending token to backend:", error));
            })
            .catch(error => {
                console.error("Firebase login error:", error.message);
            });
    }

    function onSignUp(email, password) {
        console.log("sign up button clicked")
        const auth = getAuth();

        createUserWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                const user = userCredential.user;
                const token = await user.getIdToken();
                
                // Register the new user with your backend
                fetch("http://localhost:8080/register", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        userID: socket.id,
                        email: email 
                    }),
                })
                    .then(response => response.json())
                    .then(data => {
                        if (data.success) {
                            console.log("User registered with backend");
                            socket.emit("login", {
                                name: email,
                                id: socket.id,
                            });
                            setUser({ name: email, id: socket.id });
                        } else {
                            console.error("Registration failed on backend:", data.message);
                        }
                    })
                    .catch(error => console.error("Error registering with backend:", error));
            })
            .catch(error => {
                console.error("Firebase signup error:", error.message);
            });
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

    // Functions to manipulate GameState


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

        socket.on('game-start-success', (playerPositions) => {
            setPlayerPositions(new Map(JSON.parse(playerPositions)))
            console.log(`Player positions: ${playerPositions}`)
        })
    })

    // Front-end code, returns the correct screen based on gathered data
    if (user) {
        if (lobby) {
            if (playerPositions) {
                return (
                    <GameState playerPositions={playerPositions} />
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