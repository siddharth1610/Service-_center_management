import React, { useEffect, useState } from "react";

const AppointmentForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [productId, setProductId] = useState("");
  const [gender, setGender] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [department, setDepartment] = useState("Pediatrics");
  const [personFirstName, setPersonFirstName] = useState("");
  const [personLastName, setPersonLastName] = useState("");
  const [complaintMessage, setComplaintMessage] = useState("");
  const [hasVisited, setHasVisited] = useState(false);

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

  const [persons, setPersons] = useState([]);
  useEffect(() => {
    const fetchperson = async () => {
      const { data } = await axios.get("", {
        withCredentials: true,
      });
      setPersons(data.persons);
      console.log(data.persons);
    };
    fetchperson();
  }, []);
  const handleAppointment = async (e) => {
    e.preventDefault();
    try {
    } catch (error) {}
  };

  return (
    <>
      <div className="container form-component appointment-form">
        <h2>Appointment</h2>
        <form onSubmit={handleAppointment}>
          <div>
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="number"
              placeholder="Mobile Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div>
            <select value={gender} onChange={(e) => setGender(e.target.value)}>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Others">Others</option>
            </select>
            <input
              type="date"
              placeholder="Appointment Date"
              value={appointmentDate}
              onChange={(e) => {
                setAppointmentDate(e.target.value);
              }}
            />
          </div>
          <div>
            <select
              value={department}
              onChange={(e) => {
                setDepartment(e.target.value);
                setPersonFirstName("");
                setPersonLastName("");
              }}
            >
              {serviceArray.map((dept, index) => {
                return (
                  <option value={dept} key={index}>
                    {dept}
                  </option>
                );
              })}
            </select>
            <select
              value={`${personFirstName} ${personLastName}`}
              onChange={(e) => {
                const [firstName, lastName] = e.target.value.split(" ");
                setPersonFirstName(firstName);
                setPersonLastName(lastName);
              }}
            >
              <option value="">Select Person</option>
              {persons
                .filter((pers) => pers.personDepartment === department)
                .map((pers, index) => {
                  return (
                    <option
                      value={`${pers.firstName} ${pers.lastName}`}
                    ></option>
                  );
                })}
            </select>
          </div>
          <div>
            <input
              type="text"
              placeholder="Product Id"
              value={productId}
              onChange={(e) => {
                setProductId(e.target.value);
              }}
            />
          </div>

          <textarea
            rows="10"
            value={complaintMessage}
            onChange={(e) => setComplaintMessage(e.target.value)}
            placeholder="Write Complint here...."
          />
          <div
            style={{
              gap: "10px",
              justifyContent: "flex-end",
              flexDirection: "row",
            }}
          >
            <p style={{ marginBottom: 0 }}>Have you visited before?</p>
            <input
              type="checkbox"
              checked={hasVisited}
              onChange={(e) => setHasVisited(e.target.checked)}
              style={{ flex: "none", width: "25px" }}
            />
          </div>
          <button style={{ margin: "0 auto" }}>GET APPOINTMENT</button>
        </form>
      </div>
    </>
  );
};

export default AppointmentForm;
