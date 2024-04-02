import React from 'react'
import { useState, useEffect} from 'react'
import axios from 'axios'

export default function Main() {
    const [data, setData] = useState(null)

    const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en`

    useEffect(() => {
        axios.get(url)
        .then((res) => setData(res.data))
        .catch((err) => console.log(err))
    }, [])
    
    return (
        <main className='main'>
            <div className='main--cards'>
                {data != null ? data.map((item) => (
                    <div className='card'>
                        <img src={item.image} />
                        <div className='card--text'>
                            <h3>{item.name}</h3>
                            <p>Price: ${item.current_price}</p>
                        </div>
                        <button value={item.id}>Buy</button>
                    </div>
                )): console.log("data is null")}
            </div>
        </main>
    )
}