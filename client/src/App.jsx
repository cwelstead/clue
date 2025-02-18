import { useState } from 'react'
import './App.css'
import { SelectLobby } from './components/SelectLobby'
import { InLobby } from './components/InLobby'
import { Login } from './components/Login'
import { socket } from './socket.js'
import { useEffect } from 'react'

function App() {
  const [user, setUser] = useState("")
  const [lobby, setLobby] = useState("")

  function loginWithUsername(username) {
    setUser(username)
    console.log(`Attempting login with username ${username} and ID ${socket.id}`)
    socket.emit('login', {
      name: username,
      id: socket.id
    })
  }

  function joinLobbyWithID(id) {
    
  }

  useEffect(() => {
    // All socket messages will go here
  })

  if (user) {
    if (lobby) {
      return (
        <InLobby />
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
