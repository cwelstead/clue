import useWebSocket from 'react-use-websocket'

export function Home({ username }) {
    const WS_URL = 'http://127.0.0.1:5000'
    const { sendJsonMessage } = useWebSocket(WS_URL, {
        share: true,
        queryParams: { username }
    })

    return <h1>Hello, {username}</h1>
}