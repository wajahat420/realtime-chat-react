import { useState } from "react"

const Login = () => {

    const [email, setEmail] = useState('')

    const handleLogin = () => {
        localStorage.setItem('email', email)
        window.location.reload(false)
    }

    return(
        <div className="login">
            <div className="login_inner">
                <label>Email</label>
                <input type="text" placeholder="email" onChange={(e) => setEmail(e.target.value)} />
                <label>Password</label>
                <input type="password" placeholder="password" />
                <button onClick={handleLogin}>LOGIN</button>
            </div>
        </div>
    )
}

export default Login