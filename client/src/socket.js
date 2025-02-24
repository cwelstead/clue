import { io } from 'socket.io-client'

// This class may be considered a factory, I may rename it if we deem it necessary
const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://127.0.0.1:5000'

export const socket = io(URL) // used by the entire app for communicating with the server