/*
 * THIS FILE IS FOR CLIENT-SIDE LOGIC
 * 
 * Authors: Cole Welstead
 * Credit to Dave Gray for the starting code and tutorial
*/

const socket = io('http://127.0.0.1:5500')

// Constants for all relevant HTML elements on the page (for chat tutorial)
const msgInput = document.querySelector('#message');
const nameInput = document.querySelector('#name');
const chatRoom = document.querySelector('#room');
const activity = document.querySelector('.activity');
const usersList = document.querySelector('.user-list');
const roomList = document.querySelector('.room-list');
const chatDisplay = document.querySelector('.chat-display');

// Constants for all relevant HTML element on the page (for lobbies)
const privateCodeInput = document.querySelector('#private-lobby-code')

// Methods related to lobbies
function enterLobby(lobbyID) {
    
    socket.emit('lobby-connect', {
        userID: "", // todo make connection details more detailed
        lobbyID: lobbyID,
    })
}

function enterPrivateLobby(e) {
    e.preventDefault()
    privateCodeInput.value = ""
    if (!enterLobby(getPrivateLobby())) {
        privateCodeInput.focus()
    }
}
document.querySelector('.form-private-lobby').addEventListener('submit', enterPrivateLobby)

function enterPublicLobby(e) {
    e.preventDefault()
    enterLobby("") // TODO: figure out a way to get the lobby ID
}

function getPrivateLobby() {
    return privateCodeInput.value;
}
function getPublicLobby() {

}

/*
 * RECEIVING MESSAGES FROM THE SERVER
*/
socket.on('lobby-join-success', (lobby) => {
    // Step 1: Load lobby details for new view

    // Step 2: Switch view to lobby screen
})
socket.on('lobby-join-fail', (lobbyID) => {
    // Notify user of failure
})

// All below methods are from the chat room tutorial

function sendMessage(e) {
    e.preventDefault();

    if (nameInput.value && msgInput.value && chatRoom.value) {
        socket.emit('message', {
            name: nameInput.value,
            text: msgInput.value,
        });
        msgInput.value = "";
    }

    msgInput.focus();
}

function enterRoom(e) {
    e.preventDefault();

    if (nameInput.value && chatRoom.value) {
        socket.emit('enterRoom', {
            name: nameInput.value,
            room: chatRoom.value,
        });
    }
}

document.querySelector('.form-msg').addEventListener('submit', sendMessage);
document.querySelector('.form-join').addEventListener('submit', enterRoom);

msgInput.addEventListener('keypress', () => {
    socket.emit('activity', nameInput.value);
});

// Listen for messages
socket.on("message", (data) => {
    activity.textContent = "";
    const { name, text, time } = data;
    const li = document.createElement('li');
    li.className = 'post';
    if (name === nameInput.value) li.className = 'post post--left';
    if (name !== nameInput.value && name !== 'Admin') li.className = 'post post--right';
    if (name !== 'Admin') {
        li.innerHTML = `<div class="post__header ${
            name === nameInput.value
                ? 'post__header--user'
                : 'post__header--reply'
            }">
            <span class="post__header--name">${name}</span>
            <span class="post__header--time">${time}</span>
            </div>
            <div class="post__text">${text}</div>`;
    } else {
        li.innerHTML = `<div class="post__text">${text}</div>`;
    }

    document.querySelector('.chat-display').appendChild(li);

    chatDisplay.scrollTop = chatDisplay.scrollHeight;
});

let activityTimer;
socket.on("activity", (name) => {
    activity.textContent = `${name} is typing...`;

    // Clear after 1 second
    clearTimeout(activityTimer);
    activityTimer = setTimeout(() => {
        activity.textContent = "";
    }, 1000);
});

socket.on('userList', ({ users }) => {
    showUsers(users);
})

socket.on('roomList', ({ rooms }) => {
    showRooms(rooms);
})

function showUsers(users) {
    usersList.textContent = ''
    if (users) {
        usersList.innerHTML = `<em>Users in ${chatRoom.value}:</em>`;
        users.forEach((user, i) => {
            usersList.textContent += ` ${user.name}`
            if (users.length > 1 && i !== users.length - 1) {
                usersList.textContent += ",";
            }
        });
    }
}

function showRooms(rooms) {
    roomList.textContent = ''
    if (rooms) {
        roomList.innerHTML = '<em>Active rooms:</em>';
        rooms.forEach((room, i) => {
            roomList.textContent += ` ${room}`
            if (rooms.length > 1 && i !== rooms.length - 1) {
                roomList.textContent += ",";
            }
        });
    }
}