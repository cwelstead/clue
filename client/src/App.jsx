import { useState } from 'react'
import './App.css'
import './index.css'
import { SelectLobby } from './components/SelectLobby.jsx'
import { InLobby } from './components/InLobby.jsx'
import { socket } from './socket.js'
import { useEffect } from 'react'
import { Roles } from '../../classes/Lobby.js'
import { LoginPage } from './components/LoginPage.jsx'
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { InGame } from './components/InGame.jsx'
import GameState from "./components/GameState/GameState.jsx"
import LOBBYPage from "./components/Navigation/index.jsx"
import ProfilePage from "./components/ProfilePage/ProfilePage.jsx" // Import ProfilePage

/*
 * THIS FILE IS FOR CLIENT-SIDE LOGIC
*/

function App() {
    // Holds the values for client data
    const [user, setUser] = useState("")
    const [lobby, setLobby] = useState({})
    const [playerPositions, setPlayerPositions] = useState(null)
    const [currentPlayer, setCurrentPlayer] = useState("")
    const [spacesToMove, setSpacesToMove] = useState(-1)
    const [role, setRole] = useState("")
    // Add navigation state management
    const [navState, setNavState] = useState("main")
    // Add user stats state
    const [userStats, setUserStats] = useState({
        correctAccusations: 0,
        gamesPlayed: 0,
        totalSpacesMoved: 0
    })

    // Load user stats when component mounts or user changes
    useEffect(() => {
        if (user) {
            // Load user stats from localStorage
            const storedStats = localStorage.getItem(`userStats_${user.id}`);
            if (storedStats) {
                setUserStats(JSON.parse(storedStats));
            }
        }
    }, [user]);

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
                            setNavState("main"); // Set navigation state to main after login
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
                            setNavState("main"); // Set navigation state to main after signup
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

    const buttons = [
        {label: 'PASSAGE', onClick: null, disabledCondition: true},
        {label: 'ROLL', onClick: rollDice, disabledCondition: false},
        {label: 'SUGGEST', onClick: null, disabledCondition: true},
        {label: 'ACCUSE', onClick: null, disabledCondition: true},
    ];

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

        socket.on('game-start-success', ({playerPositions, currentPlayer, spacesToMove}) => {
            console.log("Game start success!")
            setPlayerPositions(new Map(JSON.parse(playerPositions)))
            setCurrentPlayer(currentPlayer)
            setSpacesToMove(spacesToMove)
        })

        socket.on('gamestate-update', ({playerPositions, currentPlayer, spacesToMove}) => {
            setPlayerPositions(new Map(JSON.parse(playerPositions)))
            setCurrentPlayer(currentPlayer)
            setSpacesToMove(spacesToMove)
        })
        
        // Add cleanup to prevent memory leaks
        return () => {
            socket.off('lobby-create-success');
            socket.off('lobby-join-success');
            socket.off('lobby-join-fail');
            socket.off('lobby-update');
            socket.off('game-start-success');
            socket.off('gamestate-update');
        };
    }, [user]); // Add user as dependency to ensure correct behavior when user changes

    // Updated user stats update function - can be called after games
    function updateUserStats(gameStats) {
        const updatedStats = {
            correctAccusations: userStats.correctAccusations + (gameStats.madeCorrectAccusation ? 1 : 0),
            gamesPlayed: userStats.gamesPlayed + 1,
            totalSpacesMoved: userStats.totalSpacesMoved + (gameStats.spacesMoved || 0)
        };
        
        // Save to localStorage
        localStorage.setItem(`userStats_${user.id}`, JSON.stringify(updatedStats));
        setUserStats(updatedStats);
        
        return updatedStats;
    }

    if (user) {
        if (navState === "ProfilePage") {
            return (
                <ProfilePage 
                    user={{ username: user.name, ...user }}
                    setNavState={setNavState}
                    stats={userStats}
                />
            )
        } else if (navState === "lobby-select") {
            return (
                <SelectLobby 
                    joinLobbyWithID={joinLobbyWithID}
                    setNavState={setNavState}
                />
            )
        } else if (lobby.id) {
            if (playerPositions) {
                return (
                    <GameState
                        playerPositions={playerPositions}
                        movePlayerToPlace={movePlayerToPlace}
                        movePlayerToCell={movePlayerToCell}
                        role={role}
                        currentPlayer={currentPlayer}
                        buttons={buttons}
                        spacesToMove={spacesToMove} />
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
                <LOBBYPage 
                    solveACase={() => setNavState("lobby-select")} 
                    setNavState={setNavState} 
                />
            )
        }
    } else {
        return (
            <LoginPage handleLogin={onLogin} handleSignUp={onSignUp}/>
        )
    }
}

export default App
