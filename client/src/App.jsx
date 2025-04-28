import { useState } from 'react'
import './App.css'
import './index.css'
import { SelectLobby } from './components/SelectLobby.jsx'
import { InLobby } from './components/InLobby.jsx'
import { socket } from './socket.js'
import { useEffect } from 'react'
import { LoginPage } from './components/LoginPage.jsx'
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import GameState from "./components/GameState/GameState.jsx"
import LOBBYPage from "./components/Navigation/index.jsx"

/*
 * THIS FILE IS FOR CLIENT-SIDE LOGIC
*/

function App() {
    // Holds the values for client data
    const [user, setUser] = useState("")
    const [lobby, setLobby] = useState({})
    const [playerPositions, setPlayerPositions] = useState(null)
    const [cards, setCards] = useState([])
    const [currentPlayer, setCurrentPlayer] = useState("")
    const [spacesToMove, setSpacesToMove] = useState(-1)
    const [role, setRole] = useState("")

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
    function movePlayerToPlace(place) {
        socket.emit('move-place', ({id: user.id, destPlace: place}))
    }

    function movePlayerToCell(x, y) {
        socket.emit('move-cell', ({
            id: user.id,
            destX: x,
            destY: y,
        }))
    }

    function rollDice() {
        // Show something to the player...
        console.log("Rolling the dice!")
    
        // Calculate the roll
        const roll = 2 + Math.floor(Math.random() * 6) + Math.floor(Math.random() * 6)
    
        socket.emit('roll-dice', ({id: user.id, number: roll}))
    }

    function sendGuess(guess, type) {
        if (type == 'SUGGEST') {
            socket.emit('suggestion', ({id: user.id, guess: guess}))
        } else if (type == 'ACCUSE') {
            socket.emit('accusation', ({id: user.id, guess: guess}))
        }
    }

    function endTurn() {
        socket.emit('end-turn', (user.id))
    }

    // Essential functions go here, such as receiving socket messages
    useEffect(() => {
        socket.on('lobby-create-success', (id) => {
            joinLobbyWithID(id)
        })

        socket.on('lobby-join-success', ({ name, id, players, takenRoles }) => {
            console.log(`Lobby joined: ${name} with ID ${id}`)
            const playersMap = new Map(JSON.parse(players))
            
            setLobby(lobby => ({
                ...lobby,
                ...{
                name: name,
                id: id,
                players: playersMap,
                takenRoles: new Set(JSON.parse(takenRoles)),
                readyToStart: false
                }
            }))
            const userPlayer = playersMap.get(user.id)
            if (userPlayer) {
                setRole(userPlayer.role)
            }
        })

        socket.on('lobby-join-fail', (lobbyID) => {
            console.warn(`Failed to join lobby ${lobbyID}`)
        })

        socket.on('lobby-update', ({ players, takenRoles, readyToStart }) => {
            const playersMap = new Map(JSON.parse(players))

            setLobby(lobby => ({
                ...lobby,
                ...{
                players: playersMap,
                takenRoles: new Set(JSON.parse(takenRoles)),
                readyToStart: readyToStart
                }
            }))
            const userPlayer = playersMap.get(user.id)
            if (userPlayer) {
                setRole(userPlayer.role)
            }
        })

        socket.on('game-start-success', ({playerPositions, playerCards, currentPlayer, spacesToMove}) => {
            console.log("Game start success!")

            if (playerCards) {
                const playerCardsMap = new Map(JSON.parse(playerCards))
                setCards([...cards, ...playerCardsMap.get(socket.id)])
            }
            
            setPlayerPositions(new Map(JSON.parse(playerPositions)))
            setCurrentPlayer(currentPlayer)
            setSpacesToMove(spacesToMove)
        })

        socket.on('gamestate-update', ({playerPositions, currentPlayer, spacesToMove}) => {
            setPlayerPositions(new Map(JSON.parse(playerPositions)))
            setCurrentPlayer(currentPlayer)
            setSpacesToMove(spacesToMove)
        })

        socket.on('suggestion-proof-view', ({source, card}) => {

        })

        socket.on('suggestion-proof-alert', ({source, target}) => {

        })

        socket.on('no-proof', () => {
            console.log("No proof")
        })
    })

    // Front-end code, returns the correct screen based on gathered data
    if (user) {
        if (lobby.id) {
            if (playerPositions) {
                return (
                    <GameState
                        playerPositions={playerPositions}
                        movePlayerToPlace={movePlayerToPlace}
                        movePlayerToCell={movePlayerToCell}
                        role={role}
                        currentPlayer={currentPlayer}
                        cards={cards}
                        spacesToMove={spacesToMove}
                        rollDice={rollDice}
                        sendGuess={sendGuess}
                        endTurn={endTurn} />
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
                <LOBBYPage solveACase={SelectLobby} onLobbyJoin={joinLobbyWithID}/>
            )
        }
    } else {
        return (
            <LoginPage handleLogin={onLogin} handleSignUp={onSignUp}/>
        )
    }
}

export default App