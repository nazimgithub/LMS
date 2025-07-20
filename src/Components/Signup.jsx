import React from "react";
import { Link } from "react-router-dom";

function Signup() {
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
                <h3 className="card-title text-center mb-3">Signup</h3>
                <form>
                  <input
                    type="email"
                    className="form-control mb-3"
                    id="email"
                    aria-describedby="emailHelp"
                    placeholder="Enter email"
                  />
                  <div className="text-center">
                    <button type="submit" className="btn btn-primary">
                      Please enter your valid email Id
                    </button>
                  </div>
                  <input
                    type="password"
                    className="form-control mb-3"
                    id="password"
                    placeholder="Password"
                  />
                  <div className="text-center">
                    <button type="submit" className="btn btn-primary">
                      Enter Password
                    </button>
                  </div>
                </form>
                <p className="text-center mt-3">
                  <Link to="/">Login</Link>
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

export default Signup;
