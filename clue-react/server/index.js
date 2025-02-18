import express from 'express'
import { Server } from 'socket.io'
import path from 'path'
import { fileURLToPath } from 'url'
import { User } from '../classes/User.js'
import { Lobby } from '../../classes/Lobby.js'

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
    LobbiesState.setLobbies(LobbiesState.lobbies.filter(lobby => lobby.getID !== id));
}

/*
 * SERVER-SIDE EVENTS
*/

// Event that handles client connection and listens for messages sent by the client
io.on('connection', socket => {
    console.log(`User ${socket.id} connected`);

    socket.on('login', ({ name, id }) => {
        const user = new User(name, id)
        UsersState.setUsers([
            ...UsersState.users.filter(existingUser => existingUser.getID() !== user.getID()),
            user
        ])
        console.log(`User ${user.getID()} successfully logged in as ${user.getName()}`)
    })

    socket.on('lobby-create', ({name}) => {
        console.log(`Creating lobby with name ${name}`)
        const createdLobby = createLobby(name)
        console.log(`Lobby created with name ${createdLobby.getName()} ID ${createdLobby.getID()}`)

        socket.emit('lobby-create-success', {
            id: createdLobby.getID(),
        })
    })

    socket.on('lobby-connect', ({userID, lobbyID}) => {
        let joinSuccess = true
        // Step 1: Find lobby, if it exists
        const lobbyToJoin = LobbiesState.lobbies.find(lobby => lobby.getID() === lobbyID)
        // Step 2: Check if lobby has space for client
        if (!lobbyToJoin || lobbyToJoin.isFull()) {
            joinSuccess = false
        } else { // Step 3: Join lobby
            lobbyToJoin.addPlayer(userID)
            socket.join(lobbyToJoin)
        }
        // Step 4: Notify client of success or failure
        if (joinSuccess) {
            socket.emit('lobby-join-success', ({
                name: lobbyToJoin.getName(), 
                id: lobbyToJoin.getID()}))
        } else {
            socket.emit('lobby-join-fail', lobbyID)
        }
    })

    socket.on('lobby-disconnect', ({userID, lobbyID}) => {
        const lobbyToLeave = LobbiesState.lobbies.find(lobby => lobby.getID() === lobbyID)
        socket.leave(lobbyToLeave)
        lobbyToLeave.removePlayer(userID) // userID system is wack rn, once architecture is more solid this can be improved upon
        if (lobbyToLeave.isEmpty()) {
            lobbyToLeave.deactivateLobby()
            destroyLobby(lobbyID)
        }
        socket.emit('lobby-disconnect-success', {})
    })

    // When user disconnects
    socket.on('disconnect', () => {
        UsersState.setUsers([
            ...UsersState.users.filter(user => user.getID() !== socket.id),
        ]);
        console.log(`User ${socket.id} disconnected, leaving ${UsersState.users.length} active users`);
    });

    //
    // All below methods are from the chat room tutorial
    //

    // Event that triggers when the client enters a room
    socket.on('enterRoom', ({ name, room }) => {
        // leave previous room
        const prevRoom = getUser(socket.id)?.room;

        if (prevRoom) {
            socket.leave(prevRoom);
            io.to(prevRoom).emit('message', buildMsg(ADMIN, `${name} has left the room`));
        }

        const user = activateUser(socket.id, name, room);

        // Cannot update previous room users list until after the state update in activate user
        if (prevRoom) {
            io.to(prevRoom).emit('userList', {
                users: getUsersInRoom(prevRoom),
            });
        }

        // join room
        socket.join(user.room)

        // To user who joined
        socket.emit('message', buildMsg(ADMIN, `You have joined the ${room} chat room`));

        // To everyone else
        socket.broadcast.to(user.room).emit('message', buildMsg(ADMIN, `${user.name} has joined the room`));

        // Update user list for room
        io.to(user.room).emit('userList', {
            users: getUsersInRoom(user.room),
        });

        // Update rooms list for everyone
        io.emit('roomsList', {
            rooms: getAllActiveRooms(),
        });
    });
});