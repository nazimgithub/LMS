import React from "react";
import { Link } from "react-router-dom";

function Login() {
  return <>
    <div className="container-fluid" style={{ backgroundImage: "url(/login-page-bg.jpg)", height: "100vh"  }}>
      <div className="row align-items-center h-100">
        <div className="col-sm-4"></div>
        <div className="col-sm-4">
          <div className="card opacity-75">
            <div className="card-body">
              <h3 className="card-title text-center mb-3">Login</h3>
  <form>
    <input type="email" className="form-control mb-3" id="email" aria-describedby="emailHelp" placeholder="Enter email" />
    <input type="password" className="form-control mb-3" id="password" placeholder="Password" />
    <div className="text-center">
<div className="form-check form-check-inline">
  <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1"/>
  <label className="form-check-label" for="flexRadioDefault1">
    Employee
  </label>
</div>
<div className="form-check form-check-inline mb-3">
  <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2"/>
  <label className="form-check-label" for="flexRadioDefault2">
    HR
  </label>
</div>
<br/>
<button type="submit" className="btn btn-primary">Login</button>
    </div>
  </form>
  <p className="text-center mt-3"><Link to="/signup">Signup</Link></p>
            </div>
          </div>
          <div className="col-sm-4"></div>
        </div>
      </div>
      </div>
  </>;
}

export default Login;
