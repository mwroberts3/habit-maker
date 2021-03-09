import { useState } from 'react'

const Login = ( {validLoginCheck} ) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [remember, setRemember] = useState(false)

    const validateLogin = (e) => {
        e.preventDefault()
        console.log('login button clicked')
        console.log(email, password, remember)

        fetch(`http://localhost:5050/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password,
                rememberMe: remember
            })
        })
        .then(res => {
            return res.json()
        })
        .then(res => {
            console.log(res)
            console.log(res.token)
            validLoginCheck(true)
        })
    }
    
    const validateSignup = (e) => {
        e.preventDefault()
        console.log('signup button clicked')
        console.log(email, password, confirmPassword)
      }

    return (
        <form className="login" id="login-signup-form" name="login"> 
            <input id="login-email" name="email" type="text" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
            <input id="login-pw" name="password" type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            <input name="confirmPassword" type="password" placeholder="confirm password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
            <button id="login-submit" className="light-btn" onClick={(e) => {
                validateLogin(e)
            }}>Login</button>
            <button id="signup-submit" className="light-btn" onClick={(e) => {
                validateSignup(e)
            }}>Signup</button>
            <input id="store-session-checkbox" type="checkbox" value={remember} onChange={(e) => setRemember(e.target.checked)}/>
            <label htmlFor="remember-login">Remember Me</label>
        </form>
    )
}

export default Login
