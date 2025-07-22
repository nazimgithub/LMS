import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3001/employees")
      .then((res) => res.json())
      .then((data) => setEmployees(data))
      .catch((err) => console.error(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const employee = employees.find(
      (u) => u.email === email && u.password === password
    );

    if (employee.status === "In-Active") {
      setError("Your account is In-Active. Please contact HR.");
      return;
    }

    if (employee) {
      localStorage.setItem("isLoggedIn", "true");
      if (role === "HR") {
        navigate("/dashboard");
      } else {
        navigate(`/emp-dashboard/${employee.id}`);
      }
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <>
      <div
        className="container-fluid"
        style={{ backgroundImage: "url(/login-page-bg.jpg)", height: "100vh" }}
      >
        <div className="row align-items-center h-100">
          <div className="col-sm-4"></div>
          <div className="col-sm-4">
            <div className="card opacity-75">
              <div className="card-body">
                <h3 className="card-title text-center mb-3">Login</h3>
                <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                  <input
                    type="email"
                    className="form-control mb-3 border p-2"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email"
                  />
                  <input
                    type="password"
                    className="form-control mb-3 border p-2"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                  />
                  <div className="text-center">
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        value="Employee"
                        onChange={(e) => setRole(e.target.value)}
                      />
                      <label
                        className="form-check-label"
                        for="flexRadioDefault1"
                      >
                        Employee
                      </label>
                    </div>
                    <div className="form-check form-check-inline mb-3">
                      <input
                        className="form-check-input"
                        type="radio"
                        value="HR"
                        onChange={(e) => setRole(e.target.value)}
                      />
                      <label
                        className="form-check-label"
                        for="flexRadioDefault2"
                      >
                        HR
                      </label>
                    </div>
                    <br />
                    {error && <p className="text-danger font-500">{error}</p>}
                    <button type="submit" className="btn btn-primary">
                      Login
                    </button>
                  </div>
                </form>
                <p className="text-center mt-3">
                  <Link to="/signup">Signup</Link>
                </p>
              </div>
            </div>
            <div className="col-sm-4"></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
