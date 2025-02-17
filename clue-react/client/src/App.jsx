import { useState } from 'react'
import './App.css'
import { SelectLobby } from './components/SelectLobby'
import { InLobby } from './components/InLobby'
import { Login } from './components/Login'

function App() {
  const [user, setUser] = useState("")
  const [lobby, setLobby] = useState("")

  if (user) {
    if (lobby) {
      return (
        <InLobby />
      )
    } else {
      return (
        <SelectLobby user={user} />
      )
    }
  } else {
    return (
      <Login onLogin={setUser} />
    )
  }
}

export default App
