import React, { useContext, useState } from "react";
import { UserContext } from "../src/utils/UserContext";
import { TiHome } from "react-icons/ti";
import { RiLogoutBoxFill } from "react-icons/ri";
import { AiFillMessage } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaUserDoctor } from "react-icons/fa6";
import { MdAddModerator } from "react-icons/md";
import { IoPersonAddSharp } from "react-icons/io5";
import {Navigate, useNavigate } from "react-router-dom";
import { MdAddShoppingCart } from "react-icons/md";
import axios from "axios";
import { toast } from "react-toastify";

const Sidebar = () => {
  const [show,setShow] = useState(false);

  const { isAuthenticated, setIsAuthenticated } = useContext(UserContext);
  console.log(isAuthenticated);

  const handlelogout = async () => {
    await axios
      .get("http://localhost:8000/api/v1/user/admin/logout", {
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

  const navigateTo = useNavigate();

  const gotoHomePage = () => {
    navigateTo("/");
    setShow(!show);
  };
  const gotoAllpersons = () => {
    navigateTo("/allPersons");
    setShow(!show);
  };
  const gotoMessagesPage = () => {
    navigateTo("/Messages");
    setShow(!show);
  };
  const gotoAddNewPerson = () => {
    navigateTo("/AddNewPerson");
    setShow(!show);
  };
  const gotoAddNewAdmin = () => {
    navigateTo("/admin/addnew");
    setShow(!show);
  };
  const AddNewProduct = () => {
    navigateTo("/AddAllproduct");
    setShow(!show);
  };
  

  
  
 
  return (
    <>
    <nav
      style={!isAuthenticated ? { display: "none" } : { display: "flex" }}
      className={show ? "show sidebar" : "sidebar"}
    >
      <div className="links">
      <TiHome onClick={gotoHomePage} />
          <FaUserDoctor onClick={gotoAllpersons} />
          <MdAddModerator onClick={gotoAddNewAdmin} />
          <IoPersonAddSharp onClick={gotoAddNewPerson} />
          <AiFillMessage onClick={gotoMessagesPage} />
          <MdAddShoppingCart onClick={AddNewProduct} />
          <RiLogoutBoxFill onClick={handlelogout} />
      </div>
    </nav>
    <div className="wrapper" style={!isAuthenticated ? { display: "none" } : { display: "flex" }}>
    
      <GiHamburgerMenu className="hamburger" onClick={() => setShow(!show)} />
    </div>
    </>

  );
};

export default Sidebar;
