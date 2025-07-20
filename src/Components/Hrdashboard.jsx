import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";

function Hrdashboard() {
  const [employees, setEmployees] = useState([]);
  const [leaves, setleaves] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/employees")
      .then((res) => res.json())
      .then((data) => setEmployees(data))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    Promise.all([
      fetch("http://localhost:3001/employees").then((res) => res.json()),
      fetch("http://localhost:3001/leaves").then((res) => res.json()),
    ])
      .then(([employees, leaves]) => {
        setEmployees(employees);
        setleaves(leaves);
      })
      .catch((err) => console.error("Error in parallel fetches:", err));
  }, []);

  const getStatusClass = (status) => {
    switch (status) {
      case "Approved":
        return "text-success";
      case "Rejected":
        return "text-danger";
      case "Pending":
      default:
        return "text-warning";
    }
  };

  return (
    <>
      <Header />
      <div
        className="container-fluid"
        style={{ backgroundImage: "url(/login-page-bg.jpg)", height: "100vh" }}
      >
        <div className="row">
          <div className="col-sm-4 mt-5">
            <div className="card opacity-75">
              <div className="card-body">
                <h3 className="card-title text-center mb-3">
                  Add New Employee
                </h3>
                <Link className="btn btn-primary" to="/add-employee">
                  Add Employee
                </Link>
              </div>
            </div>
            <div className="col-sm-4"></div>
          </div>
        </div>
        <hr></hr>
        <div className="row">
          <h4 className="text-center text-danger">Employee List</h4>
          <div className="col-sm-1"></div>
          <div className="col-sm-10 card mt-2">
            <table className="table table-striped mt-2">
              <thead>
                <th>S No.</th>
                <th>Employee Name</th>
                <th>Department</th>
                <th>Email</th>
                <th>Action</th>
              </thead>
              <tbody>
                {employees.map((data, index) => (
                  <tr key={data.id}>
                    <td>{index + 1}</td>
                    <td>{data.name}</td>
                    <td>{data.dept}</td>
                    <td>{data.email}</td>
                    <td>
                      <button className="btn btn-primary">Manage Leave</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="col-sm-1"></div>
        </div>
        <hr></hr>
        <div className="row">
          <h4 className="text-center text-danger">Leave Requests</h4>
          <div className="col-sm-1"></div>
          <div className="col-sm-10 card mt-2">
            <table className="table table-striped mt-2">
              <thead>
                <th>S No.</th>
                <th>Employee Id</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Reason</th>
                <th>Status</th>
                <th>Action</th>
              </thead>
              <tbody>
                {leaves.length > 0 ? (
                  leaves.map((data, index) => (
                    <tr key={data.id}>
                      <td>{index + 1}</td>
                      <td>{data.employee_id}</td>
                      <td>{data.startdate}</td>
                      <td>{data.enddate}</td>
                      <td>{data.reason}</td>
                      <td>
                        <span className={getStatusClass(data.leave_status)}>
                          {data.leave_status}
                        </span>
                      </td>
                      <td>
                        <button className="btn btn-primary">
                          Manage Leave
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5">No leave requests found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="col-sm-1"></div>
        </div>
      </div>
    </>
  );
}

export default Hrdashboard;
