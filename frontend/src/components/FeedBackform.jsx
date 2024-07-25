import axios from "axios";
import React, { useState } from "react";

const FeedBackform = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [phone, setPhone] = useState("");

  const handleMessage = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:8000/api/v1/feedback/send",
        {firstName,lastName,email,phone,message},
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res);
        toast.success(res.data.message);
        setFirstName("");
        setLastName("");
        setEmail("");
        setPhone("");
        setMessage("");
      });
    } catch (error) {
        console.log(error);
        toast.error(error.response.data.message)
    }
  };

  return (
    <div className="container form-component message-form">
      <h2>Send Us A Feedback</h2>
      <form onSubmit={handleMessage}>
        <div>
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={setFirstName(e.target.value)}
          />

          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={setLastName(e.target.value)}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={setEmail(e.target.value)}
          />

          <input
            type="number"
            placeholder="Phone Number"
            value={phone}
            onChange={setPhone(e.target.value)}
          />
        </div>
        <div>
          <textarea
            rows={7}
            placeholder="Write Feedback here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
          <div style={{ justifyContent: "center", alignItems: "center" }}>
            <button type="submit">Send</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FeedBackform;
