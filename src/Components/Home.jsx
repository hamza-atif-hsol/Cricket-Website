import React from 'react'
import Navbar from "./Navbar"
import Slider from './Slider'
import Updates from './Updates'
import Table from './Table'
import Features from './Features'
import Footer from './Footer'
import Squad from './Squad'
import Store from "./Store";

function Home() {
  return (
    <>
    <Navbar/>
    <div className='home-container'>
      <Slider/>
      <div className="home-sub-container1">
        <Updates/>
      </div>
      <div className="home-sub-container2">
        <Table/>
        <Features/>
      </div>
      <div className="home-sub-container3">
        <Store/>
      </div>
      <div className="home-sub-container4">
        <Squad/>
      </div>
    </div>
      <Footer/>
    </>
  )
}

export default Home
