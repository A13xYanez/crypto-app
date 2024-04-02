import React from 'react'
import img from '../assets/cryptocoin.jpg'

export default function Banner(props) {
    return (
        <div className='banner'>
            <div className='banner--img'>
                <img src={img} />
            </div>
            <div className='banner--text'>
                <h1>Welcome, {props.username}</h1>
                <h2>To use the application, check your available balance <br/> and make a deposit to move money into your buying power.</h2>
                <h2>To move money back into your available balance make a <br/> withdraw, money will be taken out from your buying power.</h2>
            </div>
        </div>
    )
}
