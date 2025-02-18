import { useEffect, useRef } from 'react'
import throttle from 'lodash.throttle'
import { useSocketIO } from 'react-use-websocket'

export function Home({ username }) {
    // const WS_URL = 'http://127.0.0.1:8000'
    // const { sendJsonMessage } = useSocketIO(WS_URL)

    // const THROTTLE = 50
    // const sendJsonMessageThrottled = useRef(throttle(sendJsonMessage, THROTTLE))

    // useEffect(() => {
    //     window.addEventListener("mousemove", e=> {
    //         sendJsonMessageThrottled.current({
    //             x: e.clientX,
    //             y: e.clientY
    //         })
    //     })
    // }, [])

    return <h1>Hello, {username}</h1>
}