import React from 'react'
import Hero from "../components/Hero.jsx"
import Biography from '../components/Biography.jsx'
import FeedBackform from "../components/FeedBackform.jsx"

const AboutUs = () => {
  return (
    <>
    <Hero title={"Learn More About Us"} imageUrl={"/abou1.webp"}/>
    <Biography imageUrl={"/about2.webp"}/>
    <FeedBackform/>
    </>
    
  )
}

export default AboutUs