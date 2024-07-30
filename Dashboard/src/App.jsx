import React, { useContext, useEffect } from 'react'
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import Dashboard from '../components/Dashboard'
import Login from "../components/Login"
import AddNewAdmin from "../components/AddNewAdmin"
import AddNewPerson from "../components/AddNewPerson"
import Messages from "../components/Messages"
import Persons from "../components/Persons"
import Sidebar from '../components/Sidebar'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserContext } from './utils/UserContext'
import axios from 'axios'
import AddAllproducts from '../components/AddAllproducts'
import "./App.css";



const App = () => {

  const {isAuthenticated,setIsAuthenticated,admin,setAdmin} = useContext(UserContext);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/v1/user/admin", { withCredentials: true });
        setIsAuthenticated(true);
       // console.log(response.data)
        setAdmin(response?.data?.user); //check it
        // console.log(setUser(response.data)); 
      } catch (error) {
        setIsAuthenticated(false);
        setAdmin({});
      }
    };
    fetchUser();
  }, [isAuthenticated]);

  return (
  
   <Router>
    <Sidebar/>
    <Routes>
      <Route path='/' element={<Dashboard/>} />
      <Route path="/login" element={<Login />} />
      <Route path='/allPerson' element={<Persons/>} />
      <Route path='/Messages' element={<Messages/>} />
      <Route path='/AddNewAdmin' element={<AddNewAdmin/>} />
      <Route path='/AddNewPerson' element={<AddNewPerson/>} />
      <Route path='/AddAllproduct' element={<AddAllproducts/>} />
    </Routes>
    <ToastContainer position="top-center" />
   </Router>
   
   
   
   
  )
}

export default App