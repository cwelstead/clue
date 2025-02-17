

export function Login({ onLogin }) {


    return (
        <>
            <h1>Welcome</h1>
            <button onClick={(e) => {
                e.preventDefault()
                onLogin("Admin")
            }}>
                Click to login
            </button>
        </>
    )
}