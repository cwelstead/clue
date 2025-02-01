// requires ws module
const WebSocket = require('ws');

// holds WebSocket server instance
const wss = new WebSocket.Server({ port: 8080});

// holds channels (can be used to broadcast messages selectively, great for our game lobbies)
const channels = {};

// event listeners for WebSocket connections and messages
wss.on('connection', (ws) => {
    // send initial data to the client
    ws.send('Welcome to the WebSocket Server');

    // Join a specific channel
    const channel = 'general';
    if (!channels[channel]) {
        channels[channel] = []
    }
    channels[channel].push(ws);
});
  
wss.on('message', (message) => {
    // handle incoming messages
    console.log('Received message: ', message);

    // send a response to the client
    ws.send('Message received successfully!');

    // Broadcast message to all clients in the channel
    channels[channel].forEach((client) => {
        client.send(message);
    });
});

wss.on('close', () => {
    // Remove client from the channel
    channels[channel] = channels[channel].filter((client) => client !== ws);
});

// Starts WebSocket server
console.log('WebSocket server is running...');