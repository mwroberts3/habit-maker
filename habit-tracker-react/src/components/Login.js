import { useState } from 'react'
import { FaCubes } from 'react-icons/fa'

let signUpConfirm = false

const Login = ( {validLoginCheck} ) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [remember, setRemember] = useState(false)
    
    const [errMsg, setErrMsg] = useState('')

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
            if (res.token) {
                console.log(res.token)
                localStorage.setItem('token', res.token)
                validLoginCheck(true)
            } else {
                setErrMsg(res.message)
            }
        })
    }

    const showConfirmPassword = (e) => {
        e.preventDefault()
        // console.log(signupSequence)
        document.getElementById('confirm-password-input').classList.remove('hidden')
    
        signUpConfirm = true
    }
    
    const validateSignup = (e) => {
        e.preventDefault()

        fetch(`http://localhost:5050/signup`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "email": email,
                "password": password,
                "confirmPassword": confirmPassword,
            })
        })
        .then((res) => res.json())
        .then(res => {
            if (res.token) {
                console.log(res.token)
                localStorage.setItem('token', res.token)
                validLoginCheck(true)
            } else {
                setErrMsg(res.message)
            }
        })
    }

    return (
        <div id='login-container'>
        <div>
            <h1>Habit Maker</h1>&nbsp;<FaCubes size={20}/>
        </div>
        <p id='error-msg-display'>{errMsg !== '' ? `${errMsg}` : (<span>&nbsp;</span>)}</p>
        <form className="login" id="login-signup-form" name="login"> 
            <input id="login-email" name="email" type="text" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
            <input id="login-pw" name="password" type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            <input id='confirm-password-input' className='hidden' name="confirmPassword" type="password" placeholder="confirm password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
            <div id='remember-me-container'>
            <input id="store-session-checkbox" type="checkbox" value={remember} onChange={(e) => setRemember(e.target.checked)}/>
            <label htmlFor="remember-login">Remember Me</label>
            </div>
            <div id='login-btns-container'>
            <button id="login-submit" className="light-btn" onClick={(e) => {
                validateLogin(e)
            }}>Login</button>
            <button id="signup-submit" className="light-btn" onClick={(e) => { 
                signUpConfirm ? 
                validateSignup(e) :showConfirmPassword(e)                    
            }}>Signup</button>
            </div>
        </form>
        </div>
    )
}

export default Login
