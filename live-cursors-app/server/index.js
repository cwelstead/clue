import { createServer } from 'http'
import { Server } from 'socket.io'
import { WebSocketServer } from 'ws'
import url from 'url'
import { v4 } from 'uuid'

const server = createServer()
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173"
    }
})
const port = 8000

const connections = {}
const users = {}

const broadcastUsers = () => {
    Object.keys(connections).forEach(uuid => {
        const connection = connections[uuid]
        const message = JSON.stringify(users)
        connection.send(message)
    })
}

const handleMessage = (bytes, uuid) => {
    const message = JSON.parse(bytes.toString())
    const user = users[uuid]

    user.state = message
    broadcastUsers()
}

const handleClose = uuid => {
    delete connections[uuid]
    delete users[uuid]

    broadcastUsers()
}

server.listen(port, () => {
    console.log(`WebSocket server is running on port ${port}`)
})

io.on('connection', socket => {
    const uuid = v4()

    console.log(`${socket.id} connected`)

    connections[uuid] = connection
    users[uuid] = {
        username: socket.id,
        state: {
            x: 0,
            y: 0,
            // presence (maybe GameState?)
        },
    }

    connection.on('message', message => handleMessage(message, uuid))
    connection.on('close', () => handleClose(uuid))
})