const http = require('http')
const {WebSocketServer} = require('ws')

const url = require('url')
const uuidv4 = require("uuid").v4

const server = http.createServer()

const wsServer = new WebSocketServer( { server } )
const port = 5000

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

wsServer.on('connection', (connection, request) => {
    const { username } = url.parse(request.url, true).query
    const uuid = uuidv4()

    console.log(`${username} connected`)

    connections[uuid] = connection
    users[uuid] = {
        username: username,
        state: {
            x: 0,
            y: 0,
            // presence (maybe GameState?)
        },
    }

    connection.on('message', message => handleMessage(message, uuid))
    connection.on('close', () => handleClose(uuid))
})