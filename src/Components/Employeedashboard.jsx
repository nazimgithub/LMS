import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
                <button className="btn btn-primary">View Details</button>
              </div>
            </div>
          </div>
          <div className="col-sm-4 mt-5">
            <div className="card opacity-75">
              <div className="card-body">
                <h4 className="card-title text-center mb-3">
                  {user.name} View your Leave Details
                </h4>
                <button className="btn btn-primary">View Leave Status</button>
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
                      name="startdate"
                      value={formData.startdate}
                      onChange={handleChange}
                      required
                    />
                    <label className="form-label">End date</label>
                    <input
                      type="date"
                      className="form-control"
                      name="enddate"
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
                  <button type="submit" className="btn btn-primary">
                    Apply Leave
                  </button>
                </form>
              </div>
            </div>
          </div>
          <div className="col-sm-2"></div>
        </div>
      </div>
    </>
  );
}

export default Employeedashboard;
