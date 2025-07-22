import { useState } from "react";
import Swal from "sweetalert2";

export default function Signup() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    dept: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //console.log("Form Submitted:", formData);
    const newUser = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      dept: formData.dept,
      joining_date: new Date().toISOString().slice(0, 10),
      status: "In-Active",
      role: "Employee",
    };

    fetch("http://localhost:3001/employees", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    })
      .then((res) => res.json())
      .then((data) => {
        // Show success popup
        Swal.fire({
          icon: "success",
          title: "Signup Successful!",
          text: `You can login after approved by HR.`,
        });

        // Reset form
        setFormData({ name: "", email: "", dept: "", password: "" });
      })
      .catch((err) => {
        console.error(err);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong while adding the user.",
        });
      });
  };

  return (
    <div
      className="container-fluid"
      style={{ backgroundImage: "url(/login-page-bg.jpg)", height: "100vh" }}
    >
      <div className="row align-items-center h-100">
        <div className="col-sm-4"></div>
        <div className="col-sm-4">
          <div className="card opacity-75">
            <div className="card-body">
              <h4 className="card-title text-center mb-3">Signup</h4>
              <form onSubmit={handleSubmit}>
                {step === 1 && (
                  <div>
                    <input
                      className="form-control mb-3"
                      type="text"
                      name="name"
                      placeholder="Enter name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={nextStep}
                    >
                      Please enter your name
                    </button>
                  </div>
                )}

                {step === 2 && (
                  <div>
                    <input
                      type="email"
                      name="email"
                      className="form-control mb-3"
                      placeholder="Enter email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                    <div>
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={prevStep}
                      >
                        Please enter your valida email Id
                      </button>
                      <button
                        type="button"
                        className="btn btn-dark"
                        onClick={nextStep}
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div>
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      name="dept"
                      value={formData.dept}
                      onChange={handleChange}
                      required
                    >
                      <option selected>-- Select Department --</option>
                      <option value="Admin">Admin</option>
                      <option value="Account">Account</option>
                      <option value="Operation">Operation</option>
                    </select>
                    <div>
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={prevStep}
                      >
                        Please enter your valida email Id
                      </button>
                      <button
                        type="button"
                        className="btn btn-dark"
                        onClick={nextStep}
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )}

                {step === 4 && (
                  <div>
                    <input
                      type="password"
                      name="password"
                      className="form-control mb-3"
                      placeholder="Enter password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                    <div>
                      <button
                        type="button"
                        className="btn btn-dark"
                        onClick={prevStep}
                      >
                        Back
                      </button>
                      <button className="btn btn-primary" type="submit">
                        Submit
                      </button>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
        <div className="col-sm-4"></div>
      </div>
    </div>
  );
}
