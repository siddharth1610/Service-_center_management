import React from 'react'
import Hero from '../components/Hero'
import AppointmentForm from '../components/AppointmentForm'

const Appointment = () => {
  return (
    <>
    <Hero title={"Schedule Your Appointment | Xolt Service Provider"} imageUrl={"/Adv.png"} />
    <AppointmentForm/>


    </>
    
  )
}

export default Appointment