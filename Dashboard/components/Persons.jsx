import axios from 'axios';
import React,{useContext, useState,useEffect} from 'react'
import { UserContext } from '../src/utils/UserContext';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Persons = () => {
  const [persons, setPersons] = useState([]);
  const { isAuthenticated } = useContext(UserContext);
  useEffect(() => {
    const fetchPersons = async () => {
      try {
        const  data  = await axios.get(
          "http://localhost:8000/api/v1/user/allperson",
          { withCredentials: true }
        );
        setPersons(data.data.data);
        //console.log(data.data.data);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };
    fetchPersons();
  }, []);

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }
  return (
    <section className="page doctors">
      <h1>PERSONS:</h1>
      <div className="banner">
        {persons && persons.length > 0 ? (
          persons.map((element) => {
            return (
              <div className="card" key={element._id} >
                <img
                  src={element.personAvatar && element.personAvatar.url}
                  alt="doctor avatar"
                />
                <h4>{`${element.firstName} ${element.lastName}`}</h4>
                <div className="details">
                  <p>
                    Email: <span>{element.email}</span>
                  </p>
                  <p>
                    Phone: <span>{element.phone}</span>
                  </p>
                  <p>
                    DOB: <span>{element.dob.substring(0, 10)}</span>
                  </p>
                  <p>
                    Department: <span>{element.personDepartment}</span>
                  </p>
                 
                  <p>
                    Gender: <span>{element.gender}</span>
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <h1>No Registered Person Found!</h1>
        )}
      </div>
    </section>
  );
};

export default Persons