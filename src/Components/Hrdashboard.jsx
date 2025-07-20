import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import { formatDate, getStatusClass } from "../utils";

function Hrdashboard() {
  const [employees, setEmployees] = useState([]);
  const [leaves, setLeaves] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentLeave, setCurrentLeave] = useState(null);
  const [approvalStatus, setApprovalStatus] = useState("Approved");
  const [description, setDescription] = useState("");

  useEffect(() => {
    Promise.all([
      fetch("http://localhost:3001/employees").then((res) => res.json()),
      fetch("http://localhost:3001/leaves").then((res) => res.json()),
    ])
      .then(([employees, leaves]) => {
        setEmployees(employees);
        setLeaves(leaves);
      })
      .catch((err) => console.error("Error in parallel fetches:", err));
  }, []);

  function openModal(leave) {
    setCurrentLeave(leave);
    setApprovalStatus("Approved");
    setDescription("");
    setIsModalOpen(true);
  }

  function handleSubmit() {
    const updatedLeave = {
      status: approvalStatus,
      description: approvalStatus === "not_approved" ? description : "",
    };

    fetch(`http://localhost:3001/leaves/${currentLeave.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedLeave),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Updated:", data);
        // optionally re-fetch or update state
        // ✅ Update local state
        setLeaves((prevLeaves) =>
          prevLeaves.map((leave) =>
            leave.id === currentLeave.id ? { ...leave, ...updatedLeave } : leave
          )
        );

        setIsModalOpen(false);
      })
      .catch((err) => {
        console.error("Failed to update:", err);
      });
  }

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
                <th>Status</th>
              </thead>
              <tbody>
                {employees.map((data, index) => (
                  <tr key={data.id}>
                    <td>{index + 1}</td>
                    <td>{data.name}</td>
                    <td>{data.dept}</td>
                    <td>{data.email}</td>
                    <td>
                      <strong>
                        <span className={getStatusClass(data.status)}>
                          {data.status}
                        </span>
                      </strong>
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
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={() => openModal(data)}
                        >
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

        {/* Modal */}
        {isModalOpen && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0,0,0,0.5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                background: "#fff",
                padding: 20,
                borderRadius: 8,
                minWidth: 500,
              }}
            >
              <h5>
                Approve/Reject Leave : Employee Id: {currentLeave.employee_id}
              </h5>
              <hr />
              <p>
                Leave Start Date:{" "}
                <strong>{formatDate(currentLeave.startdate)}</strong>
              </p>
              <p>
                Leave End Date:{" "}
                <strong>{formatDate(currentLeave.enddate)}</strong>
              </p>

              <p>
                Leave Reason:{" "}
                <strong className="text-danger">{currentLeave.reason}</strong>
              </p>

              <div>
                <label>
                  <input
                    type="radio"
                    name="approval"
                    value="approved"
                    checked={approvalStatus === "approved"}
                    onChange={() => setApprovalStatus("approved")}
                  />
                  Approved
                </label>
                <br />
                <label>
                  <input
                    type="radio"
                    name="approval"
                    value="not_approved"
                    checked={approvalStatus === "not_approved"}
                    onChange={() => setApprovalStatus("not_approved")}
                  />
                  Not Approved
                </label>
              </div>

              {approvalStatus === "not_approved" && (
                <div className="mt-2">
                  <label>Reason for rejection:</label>
                  <textarea
                    className="form-control"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                  ></textarea>
                </div>
              )}

              <div className="mt-3 d-flex justify-content-end">
                <button
                  className="btn btn-secondary me-2"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button className="btn btn-success" onClick={handleSubmit}>
                  Submit
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Hrdashboard;
