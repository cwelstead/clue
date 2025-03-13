import { io } from 'socket.io-client'

// This class may be considered a factory, I may rename it if we deem it necessary
const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://127.0.0.1:8080'

// Initialize Socket.IO client with proper CORS and transport settings
export const socket = io(URL, {
    transports: ['websocket', 'polling'], // Ensure websocket transport is used
});