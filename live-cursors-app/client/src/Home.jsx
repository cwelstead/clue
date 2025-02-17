import { useEffect, useRef } from 'react'
import throttle from 'lodash.throttle'
import useWebSocket from 'react-use-websocket'

export function Home({ username }) {
    const WS_URL = 'http://127.0.0.1:5000'
    const { sendJsonMessage } = useWebSocket(WS_URL, {
        share: true,
        queryParams: { username }
    })

    const THROTTLE = 50
    const sendJsonMessageThrottled = useRef(throttle(sendJsonMessage, THROTTLE))

    useEffect(() => {
        window.addEventListener("mousemove", e=> {
            sendJsonMessageThrottled.current({
                x: e.clientX,
                y: e.clientY
            })
        })
    }, [])

    return <h1>Hello, {username}</h1>
}