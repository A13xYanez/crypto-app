import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


export default function Footer(props) {
    const username = props.username
    const password = props.password
    const navigate = useNavigate()


    function handleDelete(event) {
        event.preventDefault()
        axios.delete(`http://localhost:4000/deleteAccount/${username}/${password}`)
        .then(res => console.log(res))
        .catch(err => console.log(err))
        navigate('/')
    }


    function handleSignOut(event) {
        event.preventDefault()
        navigate('/')
    }

    return (
        <footer className='footer'>
            <form className='delete--form' onSubmit={handleDelete}>
                <button><span>Delete Account</span></button>
            </form>
            <form className='signOut--form' onSubmit={handleSignOut}>
                <button><span>Sign Out</span></button>
            </form>
        </footer>
    )
}