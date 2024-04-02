import React from 'react'
import Nav from './home-components/Nav'
import Banner from './home-components/Banner'
import Header from './home-components/Header'
import Main from './home-components/Main'
import Footer from './home-components/Footer'

export default function Home(props) {
    return (
        <>
            <Nav />
            <Banner username={props.username} />
            <Header username={props.username} password={props.password} />
            <Main />
            <Footer username={props.username} password={props.password} />
        </>
    )
}
