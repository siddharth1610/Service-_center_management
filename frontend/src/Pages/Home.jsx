import React, { useContext } from 'react'
import Hero from '../components/Hero'
import Departments from '../components/Departments'
import Biography from '../components/Biography'
import { UserContext } from '../utils/UserContext'


const Home = () => {

  
  
  return (
    <>
    
    <Hero title={"Welcome to Xolt | Your Trusted Accesories Service Provider"} imageUrl={"/a.jpg"} />
    
    <Biography title={"Our Services:"} imageUrl={"/phone.jpg"} />
    <Departments/>
    
    </>
  )
}

export default Home