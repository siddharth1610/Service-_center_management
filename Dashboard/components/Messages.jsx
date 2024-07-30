import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../src/utils/UserContext'
import { Navigate } from 'react-router-dom';
import axios from 'axios';

const Messages = () => {
  const[messages,setMessages]=useState([])
  const {isAuthenticated} = useContext(UserContext)

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const {data}= await axios.get(
          "http://localhost:8000/api/v1/feedback/getAllFeedback",
          { withCredentials: true }
        );
        setMessages(data.data);
       //console.log(data.data);
      } catch (error) {
        console.log(error.response.data.message);
      }
    };
    fetchMessages();
  }, [])
  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
    <section className="page messages">
      <h1>FEEDBACKS :</h1>
      <div className="banner">
        {messages && messages.length > 0 ? (
          messages.map((element) => {
            return (
              <div className="card" key={element._id}>
                <div className="details">
                  <p>
                    First Name: <span>{element.firstName}</span>
                  </p>
                  <p>
                    Last Name: <span>{element.lastName}</span>
                  </p>
                  <p>
                    Email: <span>{element.email}</span>
                  </p>
                  <p>
                    Phone: <span>{element.phone}</span>
                  </p>
                  <p>
                    Message: <span>{element.message}</span>
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <h1>No Messages!</h1>
        )}
      </div>
    </section>
  );
};

export default Messages