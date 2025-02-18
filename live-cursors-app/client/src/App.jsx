import { useEffect, useState } from 'react'
import { Login } from './components/Login'
import { Home } from './Home'

import { socket } from './socket.js'

function App() {
  const [username, setUsername] = useState("")

  useEffect(() => {
    function onConnect() {
      setIsConnected(true)
      console.log("connected")
    }

    socket.on('connect', onConnect);
  }, [])

  return username ? (
    <Home username={username} />
  ) : (
    <Login onSubmit={setUsername}/>
  )
}

export default App
