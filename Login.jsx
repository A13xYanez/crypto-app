import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import img from './assets/login-img.jpg'


export default function Login(props) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();

    function handleSubmit(event) {
        event.preventDefault()
        axios.post('http://localhost:4000/login', {username, password})
        .then(res => {
            if (res.data.status === "success") {
                props.onSubmit(username, password)
                localStorage.setItem('crypto-nite_jwt', res.data.accessToken)
                navigate('/home')
            }
        })
        .catch(err => console.log(err))
    }

    return (
        <main className='main'>
            <div className='main--login'>
                <h1>Log into your account</h1>
                <form className='main--form' autoComplete='off' onSubmit={handleSubmit}>
                    <label for='username'>Username</label>
                    <input type='text' className='form--username' name='username' required
                    onChange={e => setUsername(e.target.value)} />
                    <label for='password'>Password</label>
                    <input type='password' className='form--password' name='password' required
                    onChange={e => setPassword(e.target.value)} />
                    <button><span>Log In</span></button>
                </form>
                <div className='main--register'>
                    <h4>Don't have an account?</h4>
                    <Link to='/register'>Sign up</Link>
                </div>
            </div>
            <div className='main--design'>
                <img src={img} />
            </div>
        </main>
    )
}