import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'

export default function Header(props) {
    const [deposit, setDeposit] = useState(0)
    const [withdraw, setWithdraw] = useState(0)
    const [availableFunds, setAvailableFunds] = useState(0)
    const [buyingPower, setBuyingPower] = useState(0)
    const username = props.username
    const password = props.password
    

    function handleDeposit(event) {
        event.preventDefault()
        axios.put(`http://localhost:4000/depositFunds/${deposit}/${username}/${password}`)
        .then(res => {setBuyingPower(res.data.deposited), setAvailableFunds(res.data.remaining)})
        .catch(err => console.log(err))
    }

    function handleWithdraw(event) {
        event.preventDefault()
        axios.put(`http://localhost:4000/withdrawFunds/${withdraw}/${username}/${password}`)
        .then(res => {setAvailableFunds(res.data.withdrawn), setBuyingPower(res.data.remaining)})
        .catch(err => console.log(err))
    }

    useEffect(() => {
        axios.get(`http://localhost:4000/balances/${username}/${password}`)
        .then(res => {setAvailableFunds(res.data.available), setBuyingPower(res.data.power)})
        .catch(err => console.log(err))
    }, [])

    return (
        <header className='header'>
            <div className='header--transfer'>
                <form className='form--deposit' autoComplete='off' onSubmit={handleDeposit}>
                    <div className='transfer--deposit'>
                        <h1>Deposit</h1>
                        <input type='text' placeholder='Deposit' name='deposit'
                        onChange={e => setDeposit(e.target.value)} />
                        <button><span>Deposit</span></button>
                    </div>
                </form>
                <form className='form--withdraw' autoComplete='off' onSubmit={handleWithdraw}>
                    <div className='transfer--withdraw'>
                        <h1>Withdraw</h1>
                        <input type='text' placeholder='Withdraw' name='withdraw'
                        onChange={e => setWithdraw(e.target.value)} />
                        <button><span>Withdraw</span></button>
                    </div>
                </form>
            </div>
            <div className='header--balance'>
                <div className='balance--available'>
                    <h1>Available Balance</h1>
                    <h2>${availableFunds}</h2>
                </div>
                <div className='balance--buying'>
                    <h1>Buying Power</h1>
                    <h2>${buyingPower}</h2>
                </div>
            </div>
        </header>
    )
}
