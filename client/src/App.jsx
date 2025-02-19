import { useState } from 'react'
import './App.css'
import { SelectLobby } from './components/SelectLobby'
import { InLobby } from './components/InLobby'
import { Login } from './components/Login'
import { socket } from './socket.js'
import { useEffect } from 'react'

import { User } from '../../classes/User.js'

function App() {
  const [user, setUser] = useState("")
  const [lobby, setLobby] = useState("")

  function loginWithUsername(username) {
    console.log(`Attempting login with username ${username} and ID ${socket.id}`)
    socket.emit('login', {
      name: username,
      id: socket.id
    })
    setUser({name: username, id: socket.id})
  }

  function joinLobbyWithID(id) {
    console.log(`Attempting to join lobby ${id}`)
    socket.emit('lobby-connect', {
      username: user.name,
      userID: user.id,
      lobbyID: id,
    })
  }

  function leaveLobby() {
    socket.emit('lobby-disconnect', socket.id)
    setLobby("")
  }

  useEffect(() => {
    // All socket messages will go here
    socket.on('lobby-create-success', (id) => {
      joinLobbyWithID(id)
    })
    socket.on('lobby-join-success', ({ name, id, players, takenRoles}) => {
      console.log(`Lobby joined: ${name} with ID ${id}`)
      setLobby({
        name: name,
        id: id,
        players: new Map(JSON.parse(players)),
        takenRoles: takenRoles,
      })
    })
    socket.on('lobby-join-fail', (lobbyID) => {
      alert(`Failed to join lobby ${lobbyID} :(`)
    })
    socket.on('lobby-update', ({ players, takenRoles }) => {
      setLobby({
        name: lobby.name,
        id: lobby.id,
        players: new Map(JSON.parse(players)),
        takenRoles: takenRoles,
      })
    })
  })

  if (user) {
    if (lobby) {
      return (
        <InLobby lobby={lobby} onLeave={leaveLobby} />
      )
    } else {
      return (
        <SelectLobby user={user} onLobbyJoin={joinLobbyWithID} />
      )
    }
  } else {
    return (
      <Login onLogin={loginWithUsername} />
    )
  }
}

export default App
