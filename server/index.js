import express from 'express'
import { Server } from 'socket.io'
import { Lobby, Roles } from '../classes/Lobby.js'
import cors from 'cors'
import { GameState } from '../classes/GameState.js'

/*
 * THIS FILE IS FOR SERVER-SIDE LOGIC
 * 
 * Authors: Cole Welstead
 * Credit to Dave Gray for the starting code and tutorial
*/

/*
 * SETTING UP THE SERVER
*/

// Controls what port the server should listen on
const PORT = process.env.PORT || 8080
const app = express();

// Enable CORS for all routes
app.use(cors({
  origin: 'http://localhost:5173', // Your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

app.post('/authenticate', (req, res) => {
    console.log("Received authentication request");
    res.json({ success: true, message: "Authenticated successfully" });
});
// Rest of your server code...

// Starts the server
const expressServer = app.listen(PORT, () => {
    console.log(`Server is up and running! Listening with port ${PORT}`);
});

const io = new Server(expressServer, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
      allowedHeaders: ['Content-Type', 'Authorization'],
      credentials: true,
    },
  });


// Keeps track of users are currently connected
const UsersState = {
    users: [],
    setUsers: function(newUsersArray) {
        this.users = newUsersArray;
    },
}

// Keeps track of lobbies that are active
const LobbiesState = {
    lobbies: [],
    setLobbies: function(newLobbiesArray) {
        this.lobbies = newLobbiesArray;
    },
}

// Functions that manage and update the LobbiesState
function createLobby(name) {
    const lobby = new Lobby(name)
    LobbiesState.setLobbies([
        ...LobbiesState.lobbies.filter(existingLobby => existingLobby.getID() !== lobby.getID()),
        lobby
    ])
    return lobby
}
function destroyLobby(id) {
    LobbiesState.setLobbies(LobbiesState.lobbies.filter(lobby => lobby.getID() !== id));
}

// Abstraction to make getting a user's lobby easier
// Returns a Lobby object
function getLobbyFromUser(id) {
    try {
        const lobbyID = UsersState.users.find((user) => user.id === id).lobby
        const lobby = LobbiesState.lobbies.find((lobby) => lobby.getID() === lobbyID)

        return lobby
    } catch (e) {
        // Usually happens when id is undefined
        console.log(`Could not get lobby from user ${id}`)
    }
}

// Keeps track of the GameState objects that are associated with lobbies
const gameStates = new Map()

/*
 * SERVER-SIDE EVENTS
*/

// Event that handles client connection and listens for messages sent by the client
io.on('connection', socket => {
    console.log(`User ${socket.id} connected`);

    // Login and authentication
    socket.on('login', ({ name, id }) => {
        UsersState.setUsers([
            ...UsersState.users.filter(existingUser => existingUser.id !== id),
            {
                name: name,
                id: id,
                lobby: ""
            }
        ])
        console.log(`User ${id} successfully logged in as ${name}`)
    })

    // Lobby manipulation
    socket.on('lobby-create', ({name}) => {
        const createdLobby = createLobby(name)
        console.log(`Lobby created with name ${createdLobby.getName()} ID ${createdLobby.getID()}`)

        socket.emit('lobby-create-success', createdLobby.getID())
    })

    socket.on('lobby-connect', ({username, userID, lobbyID}) => {
        let joinSuccess = true
        
        // Step 1: Find lobby, if it exists
        const lobbyToJoin = LobbiesState.lobbies.find((lobby) => lobby.getID() === lobbyID)
        
        // Step 2: Check if lobby has space for client
        if (!lobbyToJoin || lobbyToJoin.isFull()) {
            joinSuccess = false
        } else {
            // Step 3: Join lobby
            if (userID) {
                lobbyToJoin.addPlayer({name: username, id: userID, socket: socket.id})
                UsersState.users.find((user) => user.id === userID).lobby = lobbyToJoin.getID()
                socket.join(lobbyToJoin.getID())
            }
        }

        // Step 4: Notify client of success or failure
        if (joinSuccess) {
            // Step 4a: Notify all in lobby of available role change
            socket.broadcast.to(lobbyToJoin.getID()).emit('lobby-update', {
                players: lobbyToJoin.getPlayers(),
                takenRoles: lobbyToJoin.getTakenRoles(),
                readyToStart: false
            })
            // Step 4b: Notify client of success
            socket.emit('lobby-join-success', {
                name: lobbyToJoin.getName(),
                id: lobbyToJoin.getID(),
                players: lobbyToJoin.getPlayers(),
                takenRoles: lobbyToJoin.getTakenRoles(),
            })
        } else {
            // Step 4c: Fail gracefully
            socket.emit('lobby-join-fail', lobbyID)
        }
    })

    socket.on('ready-toggle', () => {
        if (socket.id === undefined || UsersState.users.find((user) => user.id === socket.id) === undefined) {
            return false
        }
        
        const lobby = getLobbyFromUser(socket.id)
        lobby.readyPlayer(socket.id)
        
        io.to(lobby.getID()).emit('lobby-update', {
            players: lobby.getPlayers(),
            takenRoles: lobby.getTakenRoles(),
            readyToStart: lobby.readyToStart(),
        })
    })

    socket.on('switch-role', ({id, role}) => {
        const lobby = getLobbyFromUser(id)
        if (lobby.switchRole(id, role)) {
            io.to(lobby.getID()).emit('lobby-update', {
                players: lobby.getPlayers(),
                takenRoles: lobby.getTakenRoles(),
                readyToStart: lobby.readyToStart(),
            })
        }
    })

    socket.on('game-start', () => {
        const lobby = getLobbyFromUser(socket.id)

        try {
            if (lobby.readyToStart()) {
                console.log(`Starting game for lobby ${lobby.getID()}`)
                const gameState = new GameState(lobby)
                gameStates.set(lobby.getID(), gameState)
                gameState.nextTurn()
                io.to(lobby.getID()).emit('game-start-success', ({
                    playerPositions: gameState.getPlayerPositions(),
                    playerCards: gameState.getPlayerCards(),
                    currentPlayer: gameState.getCurrentPlayerRole(),
                    spacesToMove: gameState.getSpacesToMove()
                }))
            }
        } catch (e) {
            console.log(`Error starting game: ${e}`)
            console.log(e.stack)
        }
    })

    function removeUserFromLobby(id) {
        // socket does a lot of weird things during development e.g. emitting events multiple times
        // this if statement is designed to prevent errors from weird reloads or disconnects
        if (id === undefined || UsersState.users.find((user) => user.id === id) === undefined) {
            return false
        }

        const lobbyToLeave = getLobbyFromUser(id)
        if (lobbyToLeave && lobbyToLeave.removePlayer(id)) {
            UsersState.users.find((user) => user.id === id).lobby = ""
            if (lobbyToLeave.isEmpty()) {
                lobbyToLeave.deactivateLobby()
                destroyLobby(lobbyToLeave.getID())
            } else {
                socket.broadcast.to(lobbyToLeave.getID()).emit('lobby-update', {
                    players: lobbyToLeave.getPlayers(),
                    takenRoles: lobbyToLeave.getTakenRoles(),
                })
            }
            return true
        } else {
            // something happened, throw an error or fail gracefully
            console.log(`Could not remove ${id} from lobby ${lobbyToLeave}`)
            return false
        }
    }

    socket.on('lobby-disconnect', (userID) => {
        removeUserFromLobby(userID)
        console.log(`User ${socket.id} left a lobby, leaving ${UsersState.users.length} active users and ${LobbiesState.lobbies.length} active lobbies`);
    })

    // GameState functions
    socket.on('move-place', ({id, destPlace}) => {
        const lobby = getLobbyFromUser(id)
        const player = lobby.getPlayer(id)
        const gameState = gameStates.get(lobby.getID())

        // Move the player
        if (id == gameState.getCurrentPlayer() && gameState.movePlayerToPlace(player, destPlace)) {
            io.to(lobby.getID()).emit('gamestate-update', ({
                playerPositions: gameState.getPlayerPositions(),
                currentPlayer: gameState.getCurrentPlayerRole(),
                spacesToMove: gameState.getSpacesToMove()
            }))
        }
    })

    socket.on('move-cell', ({id, destX, destY}) => {
        const lobby = getLobbyFromUser(id)
        const player = lobby.getPlayer(id)
        const gameState = gameStates.get(lobby.getID())

        if (id == gameState.getCurrentPlayer() && gameState.movePlayerToCell(player, destX, destY)) {
            // If out of spaces to move, end turn
            if (gameState.spaceMoved() === 0) {
                gameState.nextTurn()
            }

            io.to(lobby.getID()).emit('gamestate-update', ({
                playerPositions: gameState.getPlayerPositions(),
                currentPlayer: gameState.getCurrentPlayerRole(),
                spacesToMove: gameState.getSpacesToMove()
            }))
        }
    })

    socket.on('roll-dice', ({id, number}) => {
        const lobby = getLobbyFromUser(id)
        const gameState = gameStates.get(lobby.getID())

        if (id == gameState.getCurrentPlayer()) {
            gameState.setSpacesToMove(number)

            io.to(lobby.getID()).emit('gamestate-update', ({
                playerPositions: gameState.getPlayerPositions(),
                currentPlayer: gameState.getCurrentPlayerRole(),
                spacesToMove: gameState.getSpacesToMove()
            }))
        }
    })

    socket.on('suggestion', ({id, guess}) => {
        const lobby = getLobbyFromUser(id)
        const player = lobby.getPlayer(id)
        const gameState = gameStates.get(lobby.getID())

        // Tell rest of lobby what suggestion is being made
        io.to(lobby.getID()).emit('suggestion-alert', {
            source: player,
            guess: guess
        })

        const playerToProveWrong = gameState.getSuggestionProof(guess)

        if (playerToProveWrong) {
            // Get socket of player
            const socketID = playerToProveWrong.socket

            socket.broadcast.to(socketID).emit('select-proof', ({
                source: player,
                guess: guess
            }))
        } else {
            io.to(lobby.getID()).emit('no-proof', ({
                source: player
            }))

            gameState.nextTurn()
            io.to(lobby.getID()).emit('gamestate-update', ({
                playerPositions: gameState.getPlayerPositions(),
                currentPlayer: gameState.getCurrentPlayerRole(),
                spacesToMove: gameState.getSpacesToMove()
            }))
        }
    })

    socket.on('proof-selected', ({id, card, target}) => {
        const lobby = getLobbyFromUser(id)
        const player = lobby.getPlayer(id)

        // Get socket of target
        // Make sure target remains a player object in frontend
        const socketID = target.socket

        io.to(lobby.getID()).emit('suggestion-proof-alert', {
            source: target,
            refuter: player
        })
        // show dialogue to them, tell others player is looking at a card
        console.log(`Broadcasting card to ${socketID}`)
        socket.broadcast.to(socketID).emit('suggestion-proof-view', {
            refuter: player,
            card: card
        })
    })

    socket.on('proof-confirmed', ({id}) => {
        const lobby = getLobbyFromUser(id)
        const gameState = gameStates.get(lobby.getID())
        
        gameState.nextTurn()
        io.to(lobby.getID()).emit('gamestate-update', ({
            playerPositions: gameState.getPlayerPositions(),
            currentPlayer: gameState.getCurrentPlayerRole(),
            spacesToMove: gameState.getSpacesToMove()
        }))
    })

    socket.on('end-turn', (id) => {
        const lobby = getLobbyFromUser(id)
        const gameState = gameStates.get(lobby.getID())
        gameState.nextTurn()
        io.to(lobby.getID()).emit('gamestate-update', ({
            playerPositions: gameState.getPlayerPositions(),
            currentPlayer: gameState.getCurrentPlayerRole(),
            spacesToMove: gameState.getSpacesToMove()
        }))
    })

    // When user disconnects
    socket.on('disconnect', () => {
        // Disconnect from lobby
        removeUserFromLobby(socket.id)

        // Remove from users list
        UsersState.setUsers([
            ...UsersState.users.filter(user => user.id !== socket.id),
        ]);
        console.log(`User ${socket.id} disconnected, leaving ${UsersState.users.length} active users and ${LobbiesState.lobbies.length} active lobbies`);
    });
});