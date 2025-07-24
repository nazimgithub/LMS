import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "./Header";
import Swal from "sweetalert2";

function Employeedashboard() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    startdate: "",
    enddate: "",
    reason: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [error, setError] = useState("");

  const today = new Date().toISOString().split("T")[0]; // 'YYYY-MM-DD'

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    // Fetch from local JSON file (Webpack will handle this in dev)
    fetch("http://localhost:3001/employees")
      .then((res) => res.json())
      .then((data) => {
        const foundUser = data.find((u) => u.id === id);
        setUser(foundUser);
      })
      .catch((error) => console.error("Error fetching users:", error));
  }, [id]);

  if (!user) {
    return <div>Loading or user not found...</div>;
  }

  const handleLeave = (e) => {
    e.preventDefault();

    handleStartDateChange(formData.startdate);
    handleEndDateChange(formData.enddate);

    const applyLeave = {
      startdate: formData.startdate,
      enddate: formData.enddate,
      reason: formData.reason,
      leave_applied_date: new Date().toISOString().slice(0, 10),
      leave_status: "Pending",
      employee_id: id,
    };

    fetch("http://localhost:3001/leaves", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(applyLeave),
    })
      .then((res) => res.json())
      .then((data) => {
        // Show success popup
        Swal.fire({
          icon: "success",
          title: "Leave Applied!",
          text: `User Leave applied successfully.`,
        });

        // Reset form
        setFormData({ startdate: "", enddate: "", reason: "" });
      })
      .catch((err) => {
        console.error(err);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong while applying leave for employee.",
        });
      });
  };

  const handleCancel = () => {
    setFormData({ startdate: "", enddate: "", reason: "" });
  };
  const handleShowDetails = () => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedUser(null);
  };

  const handleLeavesDetails = () => {
    navigate(`/leave-details/${id}`);
  };

  const handleStartDateChange = (startDate) => {
    const selected = startDate;
    if (selected < today) {
      setError("Start date cannot be before today.");
    } else {
      setError("");
      setStartDate(selected);
    }
  };
  const handleEndDateChange = (endDate) => {
    const selected = endDate;
    if (selected < today) {
      setError("End date cannot be before today.");
    } else if (startDate && selected < startDate) {
      setError("End date cannot be before the start date.");
    } else {
      setError("");
      setEndDate(selected);
    }
  };

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
                <h4 className="card-title text-center mb-3">
                  Welcome {user.name}
                </h4>
                <button className="btn btn-primary" onClick={handleShowDetails}>
                  View Details
                </button>
              </div>
            </div>
          </div>
          <div className="col-sm-4 mt-5">
            <div className="card opacity-75">
              <div className="card-body">
                <h4 className="card-title text-center mb-3">
                  {user.name} View your Leave Details
                </h4>
                <button
                  className="btn btn-primary"
                  onClick={handleLeavesDetails}
                >
                  View Leave Status
                </button>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-sm-2"></div>
          <div className="col-sm-8 mt-1">
            <div className="card opacity-75">
              <div className="card-body">
                <h4 className="card-title text-center mb-3">Apply Leave</h4>
                <form onSubmit={handleLeave}>
                  <div className="mb-3">
                    <label className="form-label">Start date</label>
                    <input
                      type="date"
                      className="form-control"
                      id="startdate"
                      name="startdate"
                      value={formData.startdate}
                      min={today}
                      onChange={handleChange}
                      required
                    />
                    <label className="form-label">End date</label>
                    <input
                      type="date"
                      className="form-control"
                      name="enddate"
                      id="enddate"
                      min={today}
                      value={formData.enddate}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="exampleFormControlTextarea1"
                      className="form-label"
                    >
                      Reason for leave
                    </label>
                    <textarea
                      className="form-control"
                      name="reason"
                      value={formData.reason}
                      onChange={handleChange}
                      required
                      rows="3"
                    ></textarea>
                  </div>
                  <button type="submit" className="btn btn-primary me-3">
                    Apply Leave
                  </button>
                  <button onClick={handleCancel} className="btn btn-danger">
                    Cancel
                  </button>
                </form>
              </div>
            </div>
          </div>
          <div className="col-sm-2"></div>
        </div>
        {error && <p className="text-danger">{error}</p>}

        {showModal && <Modal onClose={handleCloseModal} user={selectedUser} />}
      </div>
    </>
  );
}

function Modal({ onClose, user }) {
  return (
    <div style={styles.backdrop}>
      <div style={styles.modal}>
        <h3 className="text-center mb-3">User Details</h3>
        <hr />
        <table>
          <tr>
            <td>
              <strong>Name</strong>
            </td>
            <td>&nbsp;:&nbsp;</td>
            <td className="text-capitalize">{user.name}</td>
          </tr>
          <tr>
            <td>
              <strong>Email</strong>
            </td>
            <td>&nbsp;:&nbsp;</td>
            <td>{user.email}</td>
          </tr>
          <tr>
            <td>
              <strong>Department</strong>
            </td>
            <td>&nbsp;:&nbsp;</td>
            <td>{user.dept}</td>
          </tr>
          <tr>
            <td>
              <strong>Date of Join</strong>
            </td>
            <td>&nbsp;:&nbsp;</td>
            <td>{user.joining_date}</td>
          </tr>
          <tr>
            <td>
              <strong>Role</strong>
            </td>
            <td>&nbsp;:&nbsp;</td>
            <td>{user.role}</td>
          </tr>
        </table>
        <hr />
        <button className="btn btn-primary" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}

const styles = {
  backdrop: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    background: "#fff",
    padding: "20px",
    borderRadius: "8px",
    minWidth: "500px",
  },
};

export default Employeedashboard;
