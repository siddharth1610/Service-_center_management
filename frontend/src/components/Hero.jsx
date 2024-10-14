import React from 'react'

const Hero = ({title,imageUrl}) => {
  
  
  return (
   <div className='hero container'>
    <div className='banner'>
        
    
       
        <h1>{title}</h1>
        <p>
        Welcome to our Xolt Service Center, where expertise meets efficiency. With a passion for precision and a commitment to quality, we specialize in repairing and maintaining a wide range of electronic devices. Whether it's your smartphone, laptop, or household appliances, trust us to restore functionality swiftly and reliably. Your satisfaction is our priority, ensuring every repair is handled with care by our skilled technicians. Experience seamless service and exceptional results at our Electronics Service Center today.

        </p>
    </div>
    <div className='banner'>
        <img src={imageUrl}  />
    </div>
   </div>
  )
}

export default Hero