import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../src/utils/UserContext";
import { Navigate } from "react-router-dom";
import { GoCheckCircleFill } from "react-icons/go";
import { AiFillCloseCircle } from "react-icons/ai";
import { toast } from "react-toastify";

const Dashboard = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:8000/api/v1/appointment/getAllAppointments",
          { withCredentials: true }
        );
        setAppointments(data.appointments);
        //console.log(data.data);
      } catch (error) {
        setAppointments([]);
      }
    };
    fetchAppointments();
  }, []);

  const handleUpdateStatus = async (appointmentId, status) => {
    try {
      const { data } = await axios.put(
        `http://localhost:8000/api/v1/appointment/update/${appointmentId}`,
        { status },
        { withCredentials: true }
      );
      setAppointments((prevAppointments) =>
        prevAppointments.map((appointment) =>
          appointment._id === appointmentId
            ? { ...appointment, status }
            : appointment
        )
      );
      toast.success(data.message);
      console.log(data);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const { isAuthenticated, admin } = useContext(UserContext);
  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }
  return (
    <section className="dashboard page">
      <div className="banner">
        <div className="firstBox">
          {/* <img src="/doc.png" alt="docImg" /> */}
          <div className="content">
            <div>
              <p>Hello ,</p>
              <h5>{admin && `${admin.firstName} ${admin.lastName}`}</h5>
            </div>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facilis,
              nam molestias. Eaque molestiae ipsam commodi neque. Assumenda
              repellendus necessitatibus itaque.
            </p>
          </div>
        </div>
        <div className="secondBox">
          <p>Total Appointments:</p>
          <h3>{appointments.length}</h3>
        </div>
        <div className="thirdBox">
          <p>Registered Persons</p>
          <h3>10</h3>
        </div>
      </div>
      <div className="banner">
        <h5>Appointments</h5>
        <table>
          <thead>
            <tr>
              <th>Customers</th>
              <th>Date</th>
              <th>Assigned Person</th>
              <th>Department</th>
              <th>Status</th>
              <th>Visited</th>
            </tr>
          </thead>
          <tbody>
            {appointments && appointments.length > 0
              ? appointments.map((appointment) => {
                  return (
                    <tr key={appointment._id}>
                      <td>{`${appointment.firstName} ${appointment.lastName}`}</td>
                      <td>{appointment.appointment_date.substring(0, 16)}</td>
                      <td>{`${appointment.person.firstName} ${appointment.person.lastName}`}</td>
                      <td>{appointment.department}</td>
                      <td>
                        <select
                          className={
                            appointment.status === "Pending"
                              ? "value-pending"
                              : appointment.status === "Accepted"
                              ? "value-accepted"
                              : "value-rejected"
                          }
                          value={appointment.status}
                          onChange={(e) =>
                            handleUpdateStatus(appointment._id, e.target.value)
                          }
                        >
                          <option value="Pending" className="value-pending">
                            Pending
                          </option>
                          <option value="Accepted" className="value-accepted">
                            Accepted
                          </option>
                          <option value="Rejected" className="value-rejected">
                            Rejected
                          </option>
                        </select>
                      </td>
                      <td>
                        {appointment.hasVisited === true ? (
                          <GoCheckCircleFill className="green" />
                        ) : (
                          <AiFillCloseCircle className="red" />
                        )}
                      </td>
                    </tr>
                  );
                })
              : "No Appointment Found"}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Dashboard;
