import { useState } from 'react'
import { FaBullseye } from 'react-icons/fa'

let signUpConfirm = false

const Login = ( {validLoginCheck, serverUrl} ) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [remember, setRemember] = useState(false)
    const [loginText, setLoginText] = useState('Login')
    
    const [errMsg, setErrMsg] = useState('')

    const validateLogin = (e) => {
        e.preventDefault()

        fetch(`${serverUrl}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password,
                rememberMe: remember
            })
        })
        .then(res => {
            return res.json()
        })
        .then(res => {
            if (res.token) {
                localStorage.setItem('token', res.token)
                validLoginCheck(true)
            } else {
                setErrMsg(res.message)
            }
        })
    }

    const closeSignup = (e) => {
        e.preventDefault()
        document.getElementById('confirm-password-input').classList.add('hidden')

        signUpConfirm = false

        setLoginText('Login')
    }

    const showConfirmPassword = (e) => {
        e.preventDefault()
        document.getElementById('confirm-password-input').classList.remove('hidden')
    
        signUpConfirm = true

        setLoginText('Cancel')
    }
    
    const validateSignup = (e) => {
        e.preventDefault()

        fetch(`${serverUrl}/signup`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "username": username,
                "password": password,
                "confirmPassword": confirmPassword,
            })
        })
        .then((res) => res.json())
        .then(res => {
            if (res.token) {
                localStorage.setItem('token', res.token)
                validLoginCheck(true)
            } else {
                setErrMsg(res.message)
            }
        })
    }

    return (
        <div>
        <h1 id="HT-header">Habit Target</h1> <FaBullseye className="header-icon" size={52}/>
        <div id='login-container'>
        <p id='error-msg-display'>{errMsg !== '' ? `${errMsg}` : (<span>&nbsp;</span>)}</p>
        <form className="login" id="login-signup-form" name="login"> 
            <input id="login-email" name="username" type="text" placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)}/>
            <input id="login-pw" name="password" type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            <input id='confirm-password-input' className='hidden' name="confirmPassword" type="password" placeholder="confirm password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
            <div id='remember-me-container'>
                <input id="store-session-checkbox" type="checkbox" value={remember} onChange={(e) => setRemember(e.target.checked)}/>
                <label htmlFor="remember-login">Remember Me</label>
            </div>
            <div id='login-btns-container'>
            <button id="login-submit" className="light-btn" onClick={(e) => {
                loginText !== 'Cancel' ?validateLogin(e) : closeSignup(e)
            }}>{loginText}</button>
            <button id="signup-submit" className="light-btn" onClick={(e) => { 
                signUpConfirm ? 
                validateSignup(e) :showConfirmPassword(e)                    
            }}>Signup</button>
            </div>
        </form>
        </div>
    </div>
    )
}

export default Login
