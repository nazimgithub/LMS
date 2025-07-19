import React from "react";
import Header from "./Header";

function Employeedashboard() {
  return <>
    <Header />
    <div className="container-fluid" style={{ backgroundImage: "url(/login-page-bg.jpg)", height: "100vh"  }}>
    <div className="row">
      <div className="col-sm-4 mt-5">
        <div className="card opacity-75">
          <div className="card-body">
            <h4 className="card-title text-center mb-3">Welcome John Doe</h4>
            <button className="btn btn-primary">View Details</button>
          </div>
        </div>
      </div>
      <div className="col-sm-4 mt-5">
        <div className="card opacity-75">
          <div className="card-body">
            <h4 className="card-title text-center mb-3">John Doe View your Leave Details</h4>
            <button className="btn btn-primary">View Leave Status</button>
          </div>
        </div>
      </div>
    </div>
    <hr/>
    <div className="row">
      <div className="col-sm-2"></div>
      <div className="col-sm-8 mt-1">
        <div className="card opacity-75">
          <div className="card-body">
            <h4 className="card-title text-center mb-3">Apply Leave</h4>
            <form>
              <div className="mb-3">
  <label className="form-label">Start date</label>
  <input type="date" className="form-control" id="startdate"/>
  <label className="form-label">End date</label>
  <input type="date" className="form-control" id="enddate"/>
</div>
<div className="mb-3">
  <label for="exampleFormControlTextarea1" className="form-label">Reason for leave</label>
  <textarea className="form-control" id="reason" rows="3"></textarea>
</div>
            </form>
            <button className="btn btn-primary">Apply Leave</button>
          </div>
        </div>
      </div>
      <div className="col-sm-2"></div>
    </div>
    </div>
  </>;
}

export default Employeedashboard;
