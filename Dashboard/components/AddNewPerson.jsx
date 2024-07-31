import React, { useContext, useState } from "react";
import { UserContext } from "../src/utils/UserContext";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const AddNewPerson = () => {
  const { isAuthenticated } = useContext(UserContext);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [personDepartment, setPersonDepartment] = useState("");
  const [personAvatar, setPersonAvatar] = useState("");
  const [personAvatarPreview, setPersonAvatarPreview] = useState("");

  const navigateTo = useNavigate();

  const serviceArray = [
    "Smartphone Repair",
    "Laptop Repair",
    "Tablet Repair",
    "Game Console Repair",
    "Home Appliance Repair",
    "Screen Replacement",
    "Battery Replacement",
    "Data Recovery",
    "Software Installation",
    "Device Diagnostics",
  ];

  const handleAvatar = (e) => {
    const file = e.target.files[0];
   // console.log(e.target.files[0]);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setPersonAvatarPreview(reader.result);
      setPersonAvatar(file);
    };
  };

  const handleAddNewPerson = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("dob", dob);
      formData.append("gender", gender);
      formData.append("personDepartment", personDepartment);
      formData.append("personAvatar", personAvatar);
      formData.append("password", password);

      const response =  await axios
        .post(
          "http://localhost:8000/api/v1/user/person/addNewPerson",
          formData,
          {
            withCredentials: true,
            headers: { "Content-Type": "multipart/form-data" },
          }
        )
        toast.success(response.data.message);
          
          navigateTo("/");
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
  };

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
    <>
      <section className="page">
        <section className="container  add-doctor-form">
          <h1 className="form-title">REGISTER A NEW PERSON</h1>

          <form onSubmit={handleAddNewPerson}>
            <div className="first-wrapper">
              <div>
                <img
                  src={
                    personAvatarPreview
                      ? `${personAvatarPreview}`
                      : "/person.jpg"
                  }
                />
                <input type="file" onChange={handleAvatar} />
              </div>

              <div>
                <input
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                />

                <input
                  type="text"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
                <input
                  type="number"
                  placeholder="Mobile number"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                  }}
                />

                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
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

                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <select
                  value={personDepartment}
                  onChange={(e) => setPersonDepartment(e.target.value)}
                >
                  <option value="">Select Department</option>
                  {serviceArray.map((element, index) => {
                    return (
                      <option value={element} key={index}>
                        {element}
                      </option>
                    );
                  })}
                </select>

                <button type="submit">ADD NEW PERSON</button>
              </div>
            </div>
          </form>
        </section>
      </section>
    </>
  );
};

export default AddNewPerson;
