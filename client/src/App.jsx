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
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { SignUpPage } from './components/SignUpPage.jsx'
import ProfilePage from "./components/ProfilePage/ProfilePage.jsx" // Import ProfilePage
import DiceRollerPopup from './components/DiceRollerPopup.jsx'
import EndgamePopup from './components/GameState/EndgamePopup.jsx'

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
    const [isDicePopupOpen, setIsDicePopupOpen] = useState(false);
    const [suggestState, setSuggestState] = useState({type: ""})
    const [endgamePopupState, setEndgamePopupState] = useState({type: ""})
    const navigate = useNavigate();
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
        return signInWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                const user = userCredential.user;
                const token = await user.getIdToken();
                
                return fetch("http://localhost:8080/authenticate", {
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
                        navigate("/");
                        return true;
                    } else {
                        console.error("Authentication failed on backend:", data.message);
                        throw new Error(data.message || "Authentication failed on backend");
                    }
                });
            })
            .catch(error => {
                console.error("Firebase login error:", error.message);
                throw error; // Re-throw to be caught by the Login component
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
                            navigate("/"); // Navigate to home after successful signup
                        } else {
                            console.error("Registration failed on backend:", data.message);
                        }
                    })
                    .catch(error => console.error("Error registering with backend:", error));
            })
            .catch(error => {
                console.error("Firebase signup error:", error.message);
                if (error.code === 'auth/email-already-in-use') {
                    throw new Error("This email is already registered. Please try logging in instead.");
                } else {
                    throw error; // Re-throw other errors
                }
            });
    }

    function redirectToSignup() {
        console.log("being used")
        navigate("/signup");
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
        // Open the dice roller popup instead of immediately calculating
        setIsDicePopupOpen(true);
    }

    function handleRollComplete(rollResult) {
        // Close the popup
        setIsDicePopupOpen(false);
        
        // Send the result to the server
        socket.emit('roll-dice', ({id: user.id, number: rollResult}));
    }

    function sendGuess(guess, type) {
        if (type == 'SUGGEST') {
            socket.emit('suggestion', ({id: user.id, guess: guess}))
        } else if (type == 'ACCUSE') {
            socket.emit('accusation', ({id: user.id, guess: guess}))
        }
    }

    function submitProof(card) {
        socket.emit('proof-selected', {
            id: user.id,
            card: card,
            target: suggestState.source
        })
    }

    function endTurn() {
        socket.emit('end-turn', (user.id))
    }

    function closeEndgamePopup() {
        setEndgamePopupState({
            ...endgamePopupState,
            type: ''
        })
    }

    function exitGameState() {
        closeEndgamePopup()
        setLobby({
            ...lobby,
            ...{
                name: '',
                id: '',
                players: null,
                takenRoles: null,
                readyToStart: false
                }
        })
        setPlayerPositions(null)
        setCards([])
        setCurrentPlayer("")
        setSpacesToMove(-1)
        setRole("")
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
        
            // Once gamestate is updated, suggestion process is assumed to be over
            setSuggestState({
                ...suggestState,
                type: '',
                source: null,
                guess: null,
                refuter: null,
                card: null,
            })
        })

        /*
         * SUGGESTION FIELDS AND PROPERTIES
         * source: player object, has username and role
         * guess: the 3 cards that are guessed (suspect, room, weapon)
         * each card has an id, type, and phrase property
         * phrase is for easier suggestion messages (e.g. "suspect in room with weapon.")
         * refuter: player object, has username and role
         * card: card object, has id, type, and phrase
        */
        socket.on('suggestion-alert', ({source, guess}) => {
            setSuggestState({
                ...suggestState,
                type: 'suggestion-alert',
                source: source,
                guess: guess,
                refuter: null,
                card: null,
            })
        })

        socket.on('select-proof', ({source, guess}) => {
            setSuggestState({
                ...suggestState,
                type: 'select-proof',
                source: source,
                guess: guess,
                refuter: null,
                card: null,
            })        
        })

        socket.on('suggestion-proof-view', ({refuter, card}) => {
            setSuggestState({
                ...suggestState,
                type: 'suggestion-proof-view',
                source: null,
                guess: null,
                refuter: refuter,
                card: card,
            })
        })

        socket.on('suggestion-proof-alert', ({source, refuter}) => {
            setSuggestState({
                ...suggestState,
                type: 'suggestion-proof-alert',
                source: source,
                guess: null,
                refuter: refuter,
                card: null,
            })
        })

        socket.on('no-proof-view', ({source, guess}) => {
            console.log("No proof :(")
            setSuggestState({
                ...suggestState,
                type: 'no-proof-view',
                source: source,
                guess: null,
                refuter: null,
                card: null,
            })
        })

        socket.on('no-proof-alert', ({source, guess}) => {
            setSuggestState({
                ...suggestState,
                type: 'no-proof-alert',
                source: source,
                guess: guess,
                refuter: null,
                card: null,
            })
        })

        // Ending the game
        socket.on('game-end', ({winner, guess}) => {
            setEndgamePopupState({
                ...endgamePopupState,
                type: role == currentPlayer? 'win' : 'lose',
                guess: guess,
                winner: winner,
                onClose: exitGameState
            })
        })

        socket.on('player-loss', ({loser, guess}) => {
            setEndgamePopupState({
                ...endgamePopupState,
                type: role == currentPlayer? 'out' : 'other-out',
                guess: guess,
                loser: loser,
                onClose: youLose? exitGameState : closeEndgamePopup
            })
        })
        
        // Add cleanup to prevent memory leaks
        return () => {
            socket.off('lobby-create-success');
            socket.off('lobby-join-success');
            socket.off('lobby-join-fail');
            socket.off('lobby-update');
            socket.off('game-start-success');
            socket.off('gamestate-update');
            socket.off('suggestion-alert');
            socket.off('select-proof');
            socket.off('suggestion-proof-view');
            socket.off('suggestion-proof-alert');
            socket.off('no-proof-view');
            socket.off('no-proof-alert');
            socket.off('game-end');
            socket.off('player-loss');
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
        setUserStats({...userStats, ...updatedStats});
        
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
                    <>
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
                        suggestState={suggestState}
                        submitProof={submitProof}
                        endTurn={endTurn} />
                    
                    <DiceRollerPopup 
                        isOpen={isDicePopupOpen} 
                        onClose={() => setIsDicePopupOpen(false)}
                        onRollComplete={handleRollComplete} 
                    />
                    {endgamePopupState.type && <EndgamePopup endgamePopupState={endgamePopupState} />}
                </>
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
            <Routes>
            <Route path="/login" element={
                !user ? <LoginPage handleLogin={onLogin} redirectToSignup = {redirectToSignup}  /> : <Navigate to="/" />
            } />
            <Route path="/signup" element={
                !user ? <SignUpPage handleSignUp={onSignUp} /> : <Navigate to="/" />
            } />
            <Route path="/" element={
                user ? (
                    lobby ? (
                        gameState ? <GameState /> : <InLobby
                            lobby={lobby}
                            onReadyToggle={readyToggle}
                            onSwitchRole={switchRole}
                            onLeave={leaveLobby}
                            onGo={startGame} />
                    ) : <SelectLobby user={user} onLobbyJoin={joinLobbyWithID} />
                ) : <Navigate to="/login" />
            } />
        </Routes>
        )
    }
}

export default App
