import React from 'react'

export default function Nav() {
    return (
        <nav className='nav'>
            <h1 className='nav--logo'>Crypto-nite</h1>
            <ul className='nav--links'>
                <li>Home</li>
                <li>Crypto</li>
                <li>Profile</li>
                <li>Settings</li>
            </ul>
        </nav>
    )
}