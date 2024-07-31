import React,{useContext, useState} from 'react'
import { UserContext } from '../src/utils/UserContext';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const AddNewAdmin = () => {
  const { isAuthenticated  } = useContext(UserContext);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");

  const navigateTo =useNavigate();

  const handleAddNewAdmin =async(e)=>{
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/api/v1/user/admin/addnewadmin",{firstName, lastName, email, phone, dob, gender, password },{
        withCredentials:true,
        headers: {"Content-Types":"application/json"},
      })                                                //Admin role skipped due to backend
      toast.success(response.data.message);
      
      navigateTo("/")
      setFirstName("");
          setLastName("");
          setEmail("");
          setPhone("");
          setDob("");
          setGender("");
          setPassword("");
    } catch (error) {
      toast.error(error.response.data.message);
    }

  }

  if(!isAuthenticated){
    return <Navigate to ={"/login"}/>
  }

  return (
    <>
    <section className='page'>
    <div className='container form-component add-admin-form'>
      
      
        <h1 className='form-title'>ADD NEW ADMIN</h1>
        
        <form onSubmit={handleAddNewAdmin} >
          <div>
            <input type="text"
            placeholder='First Name'
            value={firstName}
            onChange={(e)=>{
setFirstName(e.target.value)
            }} />
            <input type="text"
            placeholder='Last Name'
            value={lastName}
            onChange={(e)=>{
setLastName(e.target.value)
            }} />
          </div>
          <div>
            <input type="text"
            placeholder='Email'
            value={email}
            onChange={(e)=>{
setEmail(e.target.value)
            }} />
            <input type="number"
            placeholder='Mobile number'
            value={phone}
            onChange={(e)=>{
setPhone(e.target.value)
            }} />
          </div>
          <div>
            <select value={gender} onChange={(e) => setGender(e.target.value)}>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Others">Others</option>
            </select>
            <input
              type={"date"}
              placeholder="Date of Birth"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            />
          </div>
          <div>
          <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
         
          <div style={{ justifyContent: "center", alignItems: "center" }}>
            <button type="submit">ADD NEW ADMIN</button>
          </div>
        </form>
      
    </div>

    </section>
    
    
    </>
  )
}

export default AddNewAdmin