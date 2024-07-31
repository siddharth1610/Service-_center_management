import React, { useContext,useState } from "react";
import {UserContext} from "../utils/UserContext";
import { toast } from "react-toastify";
import {Link, useNavigate } from "react-router-dom";
import axios from "axios";


const Navbar = () => {
  const [show, setShow] = useState(false);

  const { isAuthenticated, setIsAuthenticated,user } = useContext(UserContext);
  //console.log(user);
  
  // let {firstName}=user?.data

  const navigateTo = useNavigate();

  const handlelogout = async () => {
    await axios
      .get("http://localhost:8000/api/v1/user/customer/logout", {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        setIsAuthenticated(false);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };
  const gotoLogin = () => {
    navigateTo("/login");
  };
  

  
  return (
    <nav className="container">
      <div className="logo">Xolt</div>
      <div className={show ? "navLinks showmenu" : "navLinks"}>
        <div className="links">
          <Link to={"/"}>Home</Link>
          <Link to={"/appointment"}>Appointment</Link>
          <Link to={"/aboutUs"}>About Us</Link>
          <Link to={"/products"}>Products</Link>
          {/* <span>Welcome {firstName}</span> */}
        </div>
        {isAuthenticated ? (
          <button className="logoutBtn btn" onClick={handlelogout}>
            LOGOUT
          </button>
        ) : (
          <button className="logoutBtn btn" onClick={gotoLogin}>
            LOGIN
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
