import React,{useContext} from 'react'
import { UserContext } from '../utils/UserContext'

const Hero = ({title,imageUrl}) => {
  // const {user}=useContext(UserContext)
  // console.log(user);
  
  return (
   <div className='hero container'>
    <div className='banner'>
        
    {/* <h5>
                  Welcome {
                    `${user.data.firstName} ${user.data.lastName}`}{" "}
                </h5> */}

       
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