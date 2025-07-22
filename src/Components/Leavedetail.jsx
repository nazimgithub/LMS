import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "./Header";
import { formatDate, getStatusClass } from "../utils";

function Leavedetail() {
  const { id } = useParams();
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/leaves")
      .then((res) => res.json())
      .then((data) => {
        const employeeLeaves = data.filter((u) => u.employee_id === id);
        setLeaves(employeeLeaves);
      })
      .catch((error) => console.error("Error fetching users:", error));
  }, [id]);

  return (
    <>
      <Header />
      <div
        className="container-fluid"
        style={{
          backgroundImage: "url(/login-page-bg.jpg)",
          minHeight: "100vh",
        }}
      >
        <div className="row">
          <div className="col-sm-1"></div>
          <div className="col-sm-10 mt-5">
            {leaves.length === 0 ? (
              <p>No leave records found.</p>
            ) : (
              <table className="table table-bordered table-striped table-hover">
                <thead>
                  <tr>
                    <th>S. No</th>
                    <th>Start Date</th>
                    <th>Start Date</th>
                    <th>Reason</th>
                    <th>Leave Apply On</th>
                    <th>HR Comment</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {leaves.map((leave, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{formatDate(leave.startdate)}</td>
                      <td>{formatDate(leave.enddate)}</td>
                      <td>{leave.reason}</td>
                      <td>{formatDate(leave.leave_applied_date)}</td>
                      <td>{leave.description}</td>
                      <td>
                        <span className={getStatusClass(leave.leave_status)}>
                          {leave.leave_status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
          <div className="col-sm-1"></div>
        </div>
      </div>
    </>
  );
}

export default Leavedetail;
