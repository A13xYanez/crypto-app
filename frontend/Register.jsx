import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import img from './assets/login-img.jpg'

export default function Register(props) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();

    function handleSubmit(event) {
        event.preventDefault()
        axios.post('http://localhost:4000/register', {username, password})
        .then(res => {
            if (res.data.status === "registered") {
                props.onSubmit(username, password)
                navigate('/home')
            }
        })
        .catch(err => console.log(err))
    }

    return (
        <main className='main'>
            <div className='main--login'>
                <h1>Create an account today</h1>
                <form className='main--form' autoComplete='off' onSubmit={handleSubmit}>
                    <label for='username'>Username</label>
                    <input type='text' className='form--username' name='username' required
                    onChange={e => setUsername(e.target.value)} />
                    <label for='password'>Password</label>
                    <input type='password' className='form--password' name='password'
                    onChange={e => setPassword(e.target.value)} required  />
                    <button><span>Register</span></button>
                </form>
                <div className='main--register'>
                    <h4>Already have an account?</h4>
                    <Link to='/'>Login</Link>
                </div>
            </div>
            <div className='main--design'>
                <img src={img} />
            </div>
        </main>
    )
}
