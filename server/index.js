import express from 'express'
import { Server } from 'socket.io'
import path from 'path'
import { fileURLToPath } from 'url'
import { User } from '../classes/User.js'
import { Lobby } from '../classes/Lobby.js'

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
const PORT = process.env.PORT || 5000
const ADMIN = "Admin"

const app = express();

// Directs the client to the "public" folder containing client-side code
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
app.use(express.static(path.join(__dirname, "public")))


// Starts the server
const expressServer = app.listen(PORT, () => {
    console.log(`Server is up and running! Listening with port ${PORT}`);
});

const io = new Server(expressServer, {
    cors: {
        origin: process.env.NODE_ENV === "production" ? false :
        ["http://localhost:5000","http://127.0.0.1:5000", "http://localhost:5173"]
    }
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

/*
 * SERVER-SIDE EVENTS
*/

// Event that handles client connection and listens for messages sent by the client
io.on('connection', socket => {
    console.log(`User ${socket.id} connected`);

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

    socket.on('lobby-create', ({name}) => {
        console.log(`Creating lobby with name ${name}`)
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
        } else { // Step 3: Join lobby
            if (userID) {
                lobbyToJoin.addPlayer({name: username, id: userID})
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
            })
            // Step 4b: Notify client of success
            socket.emit('lobby-join-success', {
                name: lobbyToJoin.getName(),
                id: lobbyToJoin.getID(),
                players: lobbyToJoin.getPlayers(),
                takenRoles: lobbyToJoin.getTakenRoles(),
            })
        } else {
            socket.emit('lobby-join-fail', lobbyID)
        }
    })

    socket.on('ready-toggle', () => {
        if (socket.id === undefined || UsersState.users.find((user) => user.id === socket.id) === undefined) {
            // console.log("Undefined user")
            return false
        }
        const lobbyID = UsersState.users.find((user) => user.id === socket.id).lobby
        const lobby = LobbiesState.lobbies.find((lobby) => lobby.getID() === lobbyID)
        lobby.readyPlayer(socket.id)
        
        io.to(lobbyID).emit('lobby-update', {
            players: lobby.getPlayers(),
            takenRoles: lobby.getTakenRoles(),
        })
    })

    function removeUserFromLobby(id) {
        // socket does a lot of weird things during development e.g. emitting events multiple times
        // this if statement is designed to prevent errors from weird reloads or disconnects
        if (id === undefined || UsersState.users.find((user) => user.id === id) === undefined) {
            // console.log("Undefined user")
            return false
        }
        const lobbyIDToLeave = UsersState.users.find((user) => user.id === id).lobby
        if (lobbyIDToLeave) {
            const lobbyToLeave = LobbiesState.lobbies.find((lobby) => lobby.getID() === lobbyIDToLeave)
            if (lobbyToLeave !== undefined && lobbyToLeave.removePlayer(id)) {
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
                console.log(`Could not remove ${id} lobby ID ${lobbyIDToLeave}`)
                return false
            }
        }
    }

    socket.on('lobby-disconnect', (userID) => {
        removeUserFromLobby(userID)
        console.log(`User ${socket.id} left a lobby, leaving ${UsersState.users.length} active users and ${LobbiesState.lobbies.length} active lobbies`);
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