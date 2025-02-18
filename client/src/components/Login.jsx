import { useState } from "react"


export function Login({ onLogin }) {
    const [username, setUsername] = useState("")

    return (
        <>
            <h1>Welcome</h1>
            <form
                onSubmit={(e) => {
                    e.preventDefault()
                    onLogin(username)
                }}
            >
                <input
                    type="text"
                    value={username}
                    maxLength="12"
                    placeholder="What's your name?"
                    onChange={(e) => setUsername(e.target.value)}
                    required/>
                <button type="submit">Join</button>
            </form>
        </>
    )
}