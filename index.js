import express from 'express'
import { Server } from 'socket.io'
import path from 'path'
import { fileURLToPath } from 'url'
import { Lobby } from './classes/Lobby.js'

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
const PORT = process.env.PORT || 5500;
const ADMIN = "Admin";

const app = express();

// Directs the client to the "public" folder containing client-side code
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "public")));

// Starts the server
const expressServer = app.listen(PORT, () => {
    console.log(`Server is up and running! Listening on port ${PORT}`);
});

const io = new Server(expressServer, {
    cors: {
        origin: process.env.NODE_ENV === "production" ? false :
        ["http://localhost:5500","http://127.0.0.1:5500"]
    }
});

// Keeps track of users are currently connected
const UsersState = {
    users: [],
    setUsers: function(newUsersArray) {
        this.users = newUsersArray;
    },
}

// Functions that manage and update the UsersState
function activateUser(id, name, room) {
    const user = { id, name, room };
    UsersState.setUsers([
        ...UsersState.users.filter(user => user.id !== id),
        user
    ]);
    return user;
}

function userLeavesApp(id) {
    UsersState.setUsers(UsersState.users.filter(user => user.id !== id));
}

function getUser(id) {
    return UsersState.users.find(user => user.id === id);
}

function getUsersInRoom(room) {
    return UsersState.users.filter(user => user.room === room);
}

function getAllActiveRooms() {
    return Array.from(new Set(UsersState.users.map(user => user.room)));
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

    socket.on('lobby-connect', ({userID, lobbyID}) => {
        let joinSuccess = true
        // Step 1: Find lobby, if it exists
        lobbyToJoin = LobbiesState.lobbies.find(lobby => lobby.getID() === lobbyID)
        // Step 2: Check if lobby has space for client
        if (!lobbyToJoin || lobbyToJoin.isFull()) {
            joinSuccess = false
        } else { // Step 3: Join lobby
            lobbyToJoin.addPlayer(userID)
        }
        // Step 4: Notify client of success or failure
        if (joinSuccess) {
            socket.emit('lobby-join-success', lobbyToJoin)
        } else {
            socket.emit('lobby-join-fail', lobbyID)
        }
    })

    // All below methods are from the chat room tutorial

    // Upon connection - only to user
    socket.emit('message', buildMsg(ADMIN, "Welcome to Chat App"));

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

    // When user disconnects - to all others
    socket.on('disconnect', () => {
        const user = getUser(socket.id);
        userLeavesApp(socket.id);

        if (user) {
            io.to(user.room).emit('message', buildMsg(ADMIN, `${user.name} has left the room`));

            io.to(user.room).emit('userList', {
                users: getUsersInRoom(user.room),
            });

            io.emit('roomList', {
                rooms:getAllActiveRooms(),
            });
        }

        console.log(`User ${socket.id} disconnected`);
    });

    // Listening for a message event
    socket.on('message', ({ name, text }) => {
        const room = getUser(socket.id)?.room;
        if (room) {
            io.to(room).emit('message', buildMsg(name, text));
        }
    });

    // Listen for activity (client is typing)
    socket.on('activity', (name) => {
        const room = getUser(socket.id)?.room;
        if (room) {
            socket.broadcast.to(room).emit('activity', name);
        }
    });
});

// Builds a message. May be extraneous when lobby system is fully implemented.
function buildMsg(name, text) {
    return {
        name,
        text,
        time: new Intl.DateTimeFormat('default', {
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric'
        }).format(new Date()),
    };
}