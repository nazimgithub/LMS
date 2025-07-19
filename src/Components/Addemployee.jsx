import { useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";


function Addemployee() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    dept: "",
  });

  const generatePassword = () => {
    // Simple random password generator
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let password = "";
    for (let i = 0; i < 10; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
  };


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value },
      { ...formData, [e.target.email]: e.target.value },
      { ...formData, [e.target.dept]: e.target.value }
    );
  };


  const handleAddEmployee = (e) => {
  e.preventDefault();

  const password = generatePassword();

    const newUser = {
      name: formData.name,
      email: formData.email,
      dept: formData.dept,
      joining_date: new Date().toISOString().slice(0, 10),
      password,
      role: "Employee"
    };


  fetch("http://localhost:3001/employees", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newUser)
    })
      .then(res => res.json())
      .then(data => {
        // Show success popup
      Swal.fire({
        icon: "success",
        title: "User Added!",
        text: `User ${data.name} added as a Employee successfully.`
      });

      // Reset form
        setFormData({ name: "", email: "", dept: "" });
      })
      .catch(err => {
        console.error(err);
        Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong while adding the user."
      });
      });
  };



  return <>
  <div className="container-fluid" style={{ backgroundImage: "url(/login-page-bg.jpg)", height: "100vh"  }}>
  <div className="row align-items-center h-100">
    <div className="col-sm-4"></div>
    <div className="col-sm-4">
      <div className="card opacity-75">
        <div className="card-body">
          <h3 className="card-title text-center mb-3">Add New Employee</h3>
          <form onSubmit={handleAddEmployee}>
            <input type="text" className="form-control mb-3" placeholder="Enter employee name" name="name" value={formData.name}
            onChange={handleChange} required/>
            <input type="email" className="form-control mb-3" placeholder="Enter employee email" name="email" value={formData.email}
            onChange={handleChange} required/>
            <select className="form-select" aria-label="Default select example" name="dept" value={formData.dept}
            onChange={handleChange} required>
  <option selected>-- Select Department --</option>
  <option value="Human Resource">Human Resource</option>
  <option value="Admin">Admin</option>
  <option value="Account">Account</option>
  <option value="Operation">Operation</option>
</select>

            <div className="text-center mt-3">
              <button type="submit" className="btn btn-primary">Save</button>
            </div>
          </form>
          <p className="text-center mt-3"><Link to="/dashboard">Back</Link></p>
        </div>
      </div>
    </div>
    <div className="col-sm-4"></div>
  </div>
  </div>
  </>;
}

export default Addemployee;